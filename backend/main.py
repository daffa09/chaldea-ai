import os
import json
import random
import httpx
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
OPENROUTER_MODEL = os.getenv("OPENROUTER_MODEL", "deepseek/deepseek-chat-v3-0324")

# Load servants
with open("servants.json", "r", encoding="utf-8") as f:
    SERVANTS = json.load(f)


def filter_servants_by_gender(gender: str):
    """Filter servant berdasarkan gender user"""
    female_traits = ["genderFemale", "female"]
    male_traits = ["genderMale", "male"]

    if gender.lower() == "male":
        return [s for s in SERVANTS if any(t["name"] in female_traits for t in s.get("traits", []))]
    else:
        return [s for s in SERVANTS if any(t["name"] in male_traits for t in s.get("traits", []))]


@app.route("/recommend", methods=["POST"])
def recommend_servant():
    data = request.json
    master_name = data.get("master_name", "Unknown Master")
    gender = data.get("gender", "male").lower()
    answers = data.get("answers", [])

    if not answers or len(answers) < 5:
        return jsonify({"error": "Isi semua 5 pertanyaan dulu dong, Master!"}), 400

    # Gabungkan jawaban jadi 1 teks personality summary
    personality_text = "\n".join([f"Q{i+1}: {ans}" for i, ans in enumerate(answers)])

    # Filter servant sesuai gender
    candidates = filter_servants_by_gender(gender)
    if not candidates:
        return jsonify({"error": "Gak nemu servant yang cocok dengan gender pilihanmu."}), 404

    chosen = random.choice(candidates)

    # Prompt baru untuk hasil 2 paragraf (alasan + roasting gabung)
    prompt = f"""
    Kamu adalah AI yang memahami kepribadian manusia dari dunia Fate/Grand Order.
    Berikut hasil personality test dari Master bernama {master_name}:
    {personality_text}

    Berdasarkan hasil itu, pilih servant paling cocok yaitu {chosen['name']} ({chosen['className']}).

    Buatlah penjelasan dalam dua paragraf:
    - Paragraf pertama: jelaskan alasan kenapa kepribadian Master cocok dengan servant tersebut, gunakan nada analisis tapi tetap natural.
    - Paragraf kedua: tambahkan sedikit roasting atau sindiran lucu yang masih relevan dan ringan, gaya bercanda ala Fate universe.

    Jangan gunakan format JSON. Balas hanya dengan teks dua paragraf itu saja.
    """

    try:
        response = httpx.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
            },
            json={
                "model": OPENROUTER_MODEL,
                "messages": [{"role": "user", "content": prompt}],
                "max_tokens": 400,
            },
            timeout=40.0,
        )

        ai_data = response.json()
        content = ai_data.get("choices", [{}])[0].get("message", {}).get("content", "").strip()

        if not content:
            content = "AI-nya lagi bengong, gak bisa ngomong soal kecocokanmu sama servant ini 😵‍💫"

        output = {
            "timestamp": datetime.now().isoformat(),
            "master_name": master_name,
            "gender": gender,
            "answers": answers,
            "servant": {
                "name": chosen["name"],
                "className": chosen["className"],
                "rarity": chosen.get("rarity"),
                "attribute": chosen.get("attribute"),
                "image": chosen.get("face"),
            },
            "description": content,
        }

        return jsonify(output)

    except Exception as e:
        print("OpenRouter error:", e)
        return jsonify({"error": "Server AI lagi AFK nih. Coba lagi bentar."}), 500


@app.route("/feedback_match", methods=["POST"])
def feedback_match():
    """Endpoint buat nyimpen feedback cocok/tidaknya"""
    data = request.get_json()
    master = data.get("master_name")
    servant = data.get("servant_name")
    match = data.get("match")

    if not master or not servant:
        return jsonify({"error": "Data feedback gak lengkap."}), 400

    feedback_data = {
        "timestamp": datetime.now().isoformat(),
        "master_name": master,
        "servant_name": servant,
        "match": match,
    }

    try:
        feedback_path = "feedback.json"

        if os.path.exists(feedback_path):
            with open(feedback_path, "r", encoding="utf-8") as f:
                existing = json.load(f)
        else:
            existing = []

        existing.append(feedback_data)

        with open(feedback_path, "w", encoding="utf-8") as f:
            json.dump(existing, f, indent=2, ensure_ascii=False)

        return jsonify({"message": "Feedback diterima, terima kasih Master!"})

    except Exception as e:
        print("Feedback error:", e)
        return jsonify({"error": "Gagal menyimpan feedback."}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
