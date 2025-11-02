import React from "react";

export default function ResultCard({ data }) {
  const servant = data.servant || {};
  const description =
    data.description ||
    "AI-nya lagi kabur ke Throne of Heroes, gak sempat nulis hasilnya 😵‍💫";

  return (
    <div className="bg-white/10 hover:bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-indigo-400 transition-all duration-300 hover:-translate-y-1 max-w-lg">
      <div className="flex flex-col items-center text-center">
        {servant.image && (
          <img
            src={servant.image}
            alt={servant.name}
            className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md mb-3 object-cover"
          />
        )}

        <h2 className="text-2xl font-bold text-indigo-300 mb-1">
          {servant.name || "??? Servant"}
        </h2>
        <p className="text-sm uppercase text-indigo-200 mb-3">
          {servant.className || "Unknown Class"}
        </p>

        <div className="bg-gray-900/60 p-3 rounded-md border border-gray-700 text-sm text-left leading-relaxed w-full whitespace-pre-line">
          {description}
        </div>
      </div>
    </div>
  );
}
