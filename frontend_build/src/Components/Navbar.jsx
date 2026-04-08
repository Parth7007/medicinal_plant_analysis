import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "", label: "Home" },
    { to: "remedy-chat", label: "Remedy Chat" },
    { to: "about", label: "About" },
    { to: "faq", label: "FAQ" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-black/60 backdrop-blur-sm flex justify-between items-center px-5 z-50">
      <div className="text-white text-3xl font-bold tracking-wide">AyurHelp</div>

      <div
        className="text-white text-3xl cursor-pointer md:hidden z-[1100]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✖" : "☰"}
      </div>

      <div className="hidden md:flex gap-2">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-white px-5 py-2 text-base rounded hover:bg-white/30 transition-all duration-300"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div
        className={`fixed inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center gap-8 transition-transform duration-300 ease-in-out md:hidden z-40 ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-white text-2xl px-6 py-4 hover:bg-white/20 rounded-lg transition-all duration-300"
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
