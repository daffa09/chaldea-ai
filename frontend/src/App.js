import React, { useState } from "react";
import InputForm from "./components/InputForm";
import ResultCard from "./components/ResultCard";

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError("");
    setResults(null);
    setFeedbackSent(false);

    try {
      const res = await fetch("http://localhost:8000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal ambil rekomendasi");
      setResults(data);
    } catch (err) {
      console.error(err);
      setError("⚠️ Gagal terhubung ke server, coba lagi nanti!");
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = async (match) => {
    if (!results || feedbackSent) return;

    const payload = {
      master_name: results.master_name,
      servant_name: results.servant?.name,
      match,
    };

    try {
      await fetch("http://localhost:8000/feedback_match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setFeedbackSent(true);
    } catch (err) {
      console.error("Feedback gagal:", err);
      alert("Gagal kirim feedback ke server, coba lagi nanti.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white flex flex-col items-center justify-center p-6 relative">
      <h1 className="text-4xl font-extrabold mb-4 text-center drop-shadow-lg">
        FGO Personality Summon 🔮
      </h1>
      <p className="text-indigo-300 text-sm mb-8 italic text-center">
        "Selamat datang, Master. Chaldea AI System akan menentukan Servant yang
        paling cocok dengan jiwamu."
      </p>

      {/* Step 1: Input Form */}
      {!loading && !results && !error && (
        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl w-full max-w-lg animate-fadeIn">
          <InputForm onSubmit={handleSubmit} loading={loading} />
        </div>
      )}

      {/* Step 2: Loading Screen */}
      {loading && (
        <div className="flex flex-col items-center justify-center h-64 text-center animate-pulse">
          <div className="loader border-t-4 border-indigo-400 rounded-full w-16 h-16 mb-4 animate-spin"></div>
          <p className="text-lg text-indigo-300">
            Menganalisis kompatibilitas dengan Throne of Heroes...
          </p>
        </div>
      )}

      {/* Step 3: Error */}
      {error && <p className="text-red-400 mt-4 text-center">{error}</p>}

      {/* Step 4: Result */}
      {results && !loading && (
        <div className="flex flex-col items-center justify-center mt-6 animate-fadeIn">
          <ResultCard data={results} />

          {!feedbackSent ? (
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleFeedback(true)}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-semibold shadow-md transition"
              >
                ✅ Cocok banget!
              </button>
              <button
                onClick={() => handleFeedback(false)}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-semibold shadow-md transition"
              >
                ❌ Kurang cocok
              </button>
            </div>
          ) : (
            <p className="mt-6 text-indigo-300 italic">
              Terima kasih atas feedback-nya, Master 💫
            </p>
          )}
        </div>
      )}

      <footer className="mt-10 text-sm opacity-70">
        Made with 💀 by Master Fanthom
      </footer>

      {/* Small CSS Loader style */}
      <style jsx="true">{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.2);
          border-top-color: #818cf8;
          border-radius: 50%;
          width: 48px;
          height: 48px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
