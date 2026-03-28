import React from "react";

const Card = ({ title, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative max-w-[262px] bg-[#f2f8f9] rounded-md p-8 m-3 cursor-pointer overflow-hidden z-0 transition-all duration-300"
    >
      {/* Expanding circle background */}
      <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[#00838d] z-[-1] transition-transform duration-300 ease-out group-hover:scale-[21]" />

      {/* Arrow corner */}
      <div className="absolute top-0 right-0 w-8 h-8 rounded-bl-full bg-[#00838d] flex items-center justify-center">
        <span className="text-white font-mono text-sm -mt-1 -mr-1">→</span>
      </div>

      <p className="text-[17px] font-normal text-[#666] leading-5 group-hover:text-white/80 transition-colors duration-300">
        {title}
      </p>
      <p className="text-sm text-[#666] mt-2 group-hover:text-white/80 transition-colors duration-300">
        {description}
      </p>
    </div>
  );
};

export default Card;
