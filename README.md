# 🔮 FateMatch AI — Servant Compatibility Analyzer

Aplikasi berbasis **AI personality matching** yang menentukan *Servant Fate/Grand Order* mana yang paling cocok dengan kepribadian pengguna.  
Dibangun menggunakan **React (Frontend)** dan **Flask (Backend)** dengan sedikit bumbu **roasting dari AI** 😎

---

## 👨‍💻 Identitas Pembuat

| Username Master |
|------|
| Fanthom |

---

## 🧠 Deskripsi Singkat

**FateMatch AI** merupakan sistem pakar sederhana yang menganalisis kepribadian pengguna untuk menentukan *Servant* yang paling cocok dari semesta **Fate/Grand Order**.  
Selain memberikan hasil analisis kecocokan, sistem juga menyertakan **alasan logis** dan **roasting kocak** dari AI untuk memberikan pengalaman yang lebih interaktif.

Pengguna hanya perlu memasukkan:
1. **Nama / julukan Master**
2. **Deskripsi kepribadian singkat**
3. (Opsional) **Menilai apakah hasil cocok atau tidak**

---

## ⚙️ Teknologi yang Digunakan

### Backend
- Python 3.x  
- Flask  
- Flask-CORS  
- OpenAI API (untuk reasoning dan roasting)

### Frontend
- React + Vite  
- Tailwind CSS  
- Axios  
- Framer Motion (untuk animasi UI)

---

## 🚀 Cara Menjalankan Project

### 1️⃣ Jalankan Backend (Flask)
```php
cd backend
pip install flask flask-cors openai
python app.py
```
Secara default, backend akan berjalan di:
```bash
http://localhost:5000
```

### 2️⃣ Jalankan Frontend (React)
```php
cd frontend
npm install
npm run dev
```

Frontend akan berjalan di:
```bash
http://localhost:5173
```
### 🧩 Struktur Project
```bash
FateMatch-AI/
├── backend/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── ResultCard.jsx
│   │   │   └── LoadingScreen.jsx
│   │   └── ...
│   └── package.json
│
└── README.md
```

### 🧠 Alur Kerja Sistem

1. Pengguna memasukkan nama Master dan deskripsi kepribadian.
2. Sistem melakukan reasoning menggunakan model AI untuk menentukan Servant yang paling cocok.
3. AI menghasilkan alasan kecocokan dan roasting lucu.
4. Hasil ditampilkan dalam bentuk kartu hasil (ResultCard) dengan opsi:
  - 👍 Cocok
  - 👎 Tidak cocok

## 🧾 API Endpoints

### 1️⃣ POST /analyze_match
Menganalisis kepribadian pengguna dan menentukan Servant yang cocok.

Request Body
```php
{
  "master_name": "Fanthom",
  "personality": "Kesel dan marah, tapi tetap berjuang walau sendirian."
}
```

Response
```php
{
  "servant": {
    "name": "Nezha",
    "className": "Lancer",
    "image": "https://fategrandorder.fandom.com/nezha.png"
  },
  "compatibility": {
    "reason": "Nezha cocok dengan Master karena keduanya sama-sama pantang menyerah.",
    "roast": "Nezha sering dianggap 'Lancer yang bunuh diri', kayaknya kalian dua sekawan."
  }
}
```

### 2️⃣ POST /feedback_match
Menyimpan penilaian pengguna apakah hasilnya sesuai atau tidak.

Request Body
```php
{
  "master_name": "Fanthom",
  "servant_name": "Jeanne d'Arc",
  "match": true
}
```

Response
```php
{
  "status": "success",
  "message": "Feedback diterima dan disimpan ke feedback_data.json"
}
```

## 🧩 Fitur Tambahan

### 💬 Feedback System
- Pengguna dapat memberi feedback apakah hasilnya cocok atau tidak.
- Data disimpan untuk learning improvement pada iterasi selanjutnya.

### 🔗 Tombol Share
- Hasil analisis dapat dibagikan langsung ke media sosial (Twitter, WhatsApp, dsb).
- Menggunakan Web Share API untuk kemudahan berbagi.

### ⏳ Animasi Loading
- Saat AI sedang melakukan analisis, tampilan berubah menjadi animasi loading di tengah layar.

### 🎴 Centered Result Display
- Setelah hasil keluar, hanya kartu hasil yang ditampilkan di tengah layar agar fokus dan estetik.

### 🧬 Mekanisme “AI Matching Logic”
1. Deskripsi pengguna diproses oleh model AI untuk mendeteksi kata kunci kepribadian.
2. AI membandingkan kata kunci ini dengan database sifat Servant FGO.
3. Hasil terbaik dipilih berdasarkan kesamaan sifat dan disertai alasan (reason + roast).
4. Feedback pengguna digunakan untuk memperkuat pola kecocokan di masa depan.

### 📁 Contoh File Feedback (feedback_data.json)
```bash
[
  {
    "master_name": "Fanthom",
    "servant_name": "Jeanne d'Arc",
    "match": true
  },
  {
    "master_name": "Rin",
    "servant_name": "Gilgamesh",
    "match": false
  }
]
```