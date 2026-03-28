import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/remedy-chat", label: "Remedy Chat" },
    // { to: "/contact", label: "Contact" },
    { to:"/search-by-image",label:"Image Search"},
    { to:"/get-info-by-prompt",label:"Prompt Search"},
    { to: "/about", label: "About" },
    { to: "/faq", label: "FAQ" },
  ];

  return (
  <>
    {/* Navbar */}
    <nav className="fixed top-0 left-0 w-full h-16 bg-black/20 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-5 z-50">
      
      {/* Logo */}
      <div className="text-white text-2xl font-bold tracking-wide">
        AyurHelp
      </div>

      {/* Hamburger */}
      <div
        className="md:hidden flex flex-col justify-between w-7 h-5 cursor-pointer z-[70]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`h-[2px] w-full bg-white transition-all duration-300 ${
            isOpen ? "rotate-45 translate-y-[9px]" : ""
          }`}
        />
        <span
          className={`h-[2px] w-full bg-white transition-all duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-[2px] w-full bg-white transition-all duration-300 ${
            isOpen ? "-rotate-45 -translate-y-[9px]" : ""
          }`}
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-3">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="text-white px-4 py-2 text-sm rounded-lg hover:bg-white/20 transition"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>

    {/* 🔥 Overlay (Gradient + Soft Blur) */}
<div
  className={`fixed inset-0 transition-all duration-300 z-[40] ${
    isOpen
      ? "bg-gradient-to-br from-black/70 via-black/60 to-black/40 backdrop-blur-sm"
      : "bg-transparent pointer-events-none"
  }`}
  onClick={() => setIsOpen(false)}
/>
    {/* Mobile Menu */}
    <div
      className={`fixed top-0 right-0 h-screen w-[75%] bg-black/30 backdrop-blur-2xl border-l border-white/10 flex flex-col items-center justify-center gap-8 transform transition-transform duration-300 md:hidden z-[60] ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Close Button */}
      <button
        className="absolute top-5 right-6 text-white text-3xl hover:scale-110 transition"
        onClick={() => setIsOpen(false)}
      >
        ✕
      </button>

      {links.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="text-white text-xl px-6 py-3 rounded-lg hover:bg-white/20 transition"
          onClick={() => setIsOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </div>
  </>
);
};

export default Navbar;