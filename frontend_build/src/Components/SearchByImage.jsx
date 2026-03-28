import React from "react";
import { useNavigate } from "react-router-dom";

const SearchByImage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <p className="text-xl text-gray-600 mb-4">Redirecting to Search by Image...</p>
        <button
          onClick={() => navigate("/search-by-image")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Go Now
        </button>
      </div>
    </div>
  );
};

export default SearchByImage;
