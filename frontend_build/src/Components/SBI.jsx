import React, { useState } from "react";
import { API_ROUTES } from "../config/api";
import heroBg from "../Img/medicinal-plant-bg.jpg";

const SBI = () => {
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState("");
  const [plantInfo, setPlantInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setImage(file);
  };

  const handlePredict = async () => {
    if (!image) {
      setOutput("⚠️ Please upload an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);
      setOutput("🔄 Predicting... Please wait.");
      setPlantInfo([]);

      const response = await fetch(API_ROUTES.predict, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Prediction failed.");

      const data = await response.json();
      setOutput(`🌿 Predicted Plant: ${data.label} (Confidence: ${(data.confidence_score * 100).toFixed(2)}%)`);
      const points = data.plant_info.split("\n").filter((p) => p.trim() !== "");
      setPlantInfo(points);
    } catch (error) {
      console.error(error);
      setOutput("❌ Prediction failed. Please try again.");
      setPlantInfo([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center py-24 px-5 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 max-w-5xl w-full flex flex-col lg:flex-row gap-8 items-start">

        {/* Upload Panel */}
        <div className="flex-1 bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 p-6 text-center">
          <h2 className="text-2xl font-bold mb-2">🌱 Search by Image</h2>
          <p className="text-gray-300 mb-5">Upload an image to analyze medicinal plants.</p>

          <label className="block w-full cursor-pointer">
            <div className="border-2 border-dashed border-white/40 rounded-xl p-6 hover:border-green-400 transition-colors">
              <p className="text-gray-300 text-sm mb-2">Click to choose an image</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="mx-auto mt-3 max-w-[200px] rounded-xl shadow-lg"
                />
              ) : (
                <div className="text-4xl">📷</div>
              )}
            </div>
          </label>

          {image && (
            <p className="text-green-300 text-sm mt-3">✅ {image.name}</p>
          )}

          <button
            onClick={handlePredict}
            disabled={loading}
            className="mt-5 w-full py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 text-white font-bold rounded-xl text-lg transition-colors"
          >
            {loading ? "🔄 Predicting..." : "🔍 Predict"}
          </button>
        </div>

        {/* Output Panel */}
        <div className="flex-[2] bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">📊 Prediction Result</h2>

          {output ? (
            <p className="text-gray-100 text-base mb-4 bg-white/10 rounded-xl px-4 py-3">{output}</p>
          ) : (
            <p className="text-gray-400 text-sm text-center">Upload an image and click Predict to see results.</p>
          )}

          {plantInfo.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-3 text-green-300">🧪 About the Plant:</h3>
              <ul className="space-y-2">
                {plantInfo.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-2 text-gray-200 text-sm bg-white/10 rounded-lg px-4 py-2"
                  >
                    <span className="text-green-400 shrink-0">•</span>
                    {point.replace(/^[•\-\*\d\.]+\s*/, "")}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SBI;
