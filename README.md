<!-- portfolio -->
<!-- slug: chaldea-ai -->
<!-- title: FateMatch AI - Servant Compatibility Analyzer -->
<!-- description: Application thats show place using AI recommend + Google Maps -->
<!-- image: https://github.com/user-attachments/assets/55a0f444-83a9-4c01-b6b4-4652152266b1 -->
<!-- tags: python, flask, react, ai -->

# 🔮 FateMatch AI — Servant Compatibility Analyzer

![WhatsApp Image 2025-11-02 at 9 55 58 PM](https://github.com/user-attachments/assets/55a0f444-83a9-4c01-b6b4-4652152266b1)

An **AI-powered personality matching** application that determines which *Fate/Grand Order* Servant best fits the user's personality.  
Built using **React (Frontend)** and **Flask (Backend)** — with a bit of extra **AI roasting spice** 😎

---

## 👨‍💻 Creator Identity

| Master Username |
|----------------|
| Fanthom |

---

## 🧠 Overview

**FateMatch AI** is a simple expert system that analyzes a user’s personality and matches it with the most compatible Servant from the **Fate/Grand Order** universe.  
In addition to compatibility analysis, the system also generates **logical explanations** and **funny roast lines** from the AI to make the user experience more engaging.

Users only need to provide:
1. **Master name / nickname**  
2. **A short personality description**  
3. (Optional) **Feedback on whether the result is accurate**

---

## ⚙️ Technologies Used

### Backend
- Python 3.x  
- Flask  
- Flask-CORS  
- OpenAI API (for reasoning + roasting)

### Frontend
- React + Vite  
- Tailwind CSS  
- Axios  
- Framer Motion (UI animations)

---

## 🚀 How to Run the Project

### 1️⃣ Run the Backend (Flask)
```php
cd backend
pip install flask flask-cors openai
python app.py
```
Backend will run at:
```bash
http://localhost:5000
```

### 2️⃣ Run the Frontend (React)
```php
cd frontend
npm install
npm run dev
```

Frontend will run at:
```bash
http://localhost:5173
```
### 🧩 Project Structure
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

### 🧠 System Workflow

1. The user provides their Master name and personality description.
2. The system uses AI reasoning to determine the most compatible Servant.
3. AI generates a compatibility explanation + a humorous roast.
4. The result is displayed in a Result Card with options:
  - 👍 Match
  - 👎 Not a match

## 🧾 API Endpoints

### 1️⃣ POST /analyze_match

Analyze the user’s personality and determine the matching Servant.

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

Save user feedback about whether the match result is accurate.

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

## 🧩 Additional Features

### 💬 Feedback System

- Users can vote whether the match result is accurate or not.
- Feedback is stored for future iteration improvements.

### 🔗 Share Button

- Results can be shared directly to social media (Twitter, WhatsApp, etc.)
- Implemented using Web Share API for convenience.

### ⏳ Loading Animation

- While AI processes the analysis, a full-screen loading animation is shown.

### 🎴 Centered Result Display

- Final results appear in a centered card for a clean and aesthetic presentation.

### 🧬 AI Matching Logic

1. User personality text is processed with an AI model to detect key personality traits.
2. These traits are mapped against the FGO Servant personality database.
3. The closest compatibility match is selected, along with reasoning and a roast.
4. User feedback helps refine future matching accuracy.

### 📁 Example Feedback File (feedback_data.json)
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
