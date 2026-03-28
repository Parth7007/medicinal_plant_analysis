import React from "react";
import { FaCamera, FaSearch, FaLeaf } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import heroBg from "../Img/medicinal-plant-bg.jpg";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 px-5 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Medicinal Plant Analysis <br />
          <span className="text-green-400">Make Your Choice</span>
        </h1>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-center mt-6">
          <button
            className="flex items-center gap-3 px-6 py-4 text-lg font-bold bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-lg transition-transform hover:scale-105"
            onClick={() => navigate("search-by-image")}
          >
            <FaCamera className="text-2xl" /> Search by Image
          </button>
          <button
            className="flex items-center gap-3 px-6 py-4 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-transform hover:scale-105"
            onClick={() => navigate("get-info-by-prompt")}
          >
            <FaSearch className="text-2xl" /> Get Info by Prompt
          </button>
          <button
  className="flex items-center gap-3 px-6 py-4 text-lg font-bold bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white rounded-lg shadow-lg transition-transform hover:scale-105"
  onClick={() => navigate("remedy-chat")}
>
  <FaLeaf className="text-2xl" /> Find Remedies
</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
