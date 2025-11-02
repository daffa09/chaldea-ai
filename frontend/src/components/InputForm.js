import React, { useState } from "react";

const QUESTIONS = [
  "Ketika pertempuran sudah mencapai turn ke-30 dan musuh belum juga tumbang, apa yang biasanya kamu rasakan?",
  "Jika Servant-mu melanggar perintahmu di tengah pertempuran, bagaimana kamu akan bereaksi?",
  "Seberapa penting loyalitas seorang Servant bagi seorang Master menurutmu?",
  "Dalam misi Chaldea, kamu lebih suka bertarung sendirian atau bersama tim lain?",
  "Kalau Saint Quartz-mu habis, tapi banner favorit baru keluar, apa langkah gilamu selanjutnya?",
];

export default function InputForm({ onSubmit, loading }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(""));
  const [name, setName] = useState("");
  const [gender, setGender] = useState("male");

  const handleNext = (e) => {
    e.preventDefault();

    if (step === 0) {
      setStep(1);
      return;
    }

    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      onSubmit({ master_name: name, gender, answers });
    }
  };

  const handleChange = (val) => {
    const updated = [...answers];
    updated[step - 1] = val;
    setAnswers(updated);
  };

  return (
    <form onSubmit={handleNext} className="flex flex-col gap-6 text-gray-100">
      {step === 0 && (
        <div>
          <label className="block text-sm font-semibold mb-1">
            Nama Master
          </label>
          <input
            type="text"
            placeholder="Contoh: Gudao"
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      )}

      {step === 0 && (
        <div>
          <label className="block text-sm font-semibold mb-1">Gender</label>
          <select
            className="w-full p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-400"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      )}

      {step > 0 && (
        <div key={step} className="transition-all duration-300 ease-in-out">
          <h2 className="text-lg font-semibold mb-2">
            Pertanyaan {step}/{QUESTIONS.length}
          </h2>
          <p className="text-sm text-indigo-300 mb-3">{QUESTIONS[step - 1]}</p>
          <textarea
            rows="4"
            value={answers[step - 1] || ""}
            onChange={(e) => handleChange(e.target.value)}
            className="w-full p-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-400"
            placeholder="Jawaban kamu..."
            required
          />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-3 bg-indigo-600 hover:bg-indigo-700 font-semibold py-2 rounded-md transition-all duration-300 shadow-lg"
      >
        {loading
          ? "🔮 Analisis kompatibilitas dengan Throne of Heroes..."
          : step === 0
          ? "Mulai Tes dari Chaldea"
          : step < QUESTIONS.length
          ? "Lanjut ke Pertanyaan Berikutnya"
          : "Lihat Rekomendasi Servant!"}
      </button>
    </form>
  );
}
