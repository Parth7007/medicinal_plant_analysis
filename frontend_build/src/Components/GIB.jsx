import React, { useState, useEffect, useRef } from "react";
import heroBg from "../Img/medicinal-plant-bg.jpg";
import { API_ROUTES } from "../config/api";

const suggestions = [
  "Herbs for healing",
  "Ayurvedic medicine for immunity",
  "Top Ayurvedic plants",
  "Ayurvedic benefits",
];

const formatMessage = (text) => {
  const lines = text.split("\n").filter((l) => l.trim() !== "");
  const elements = [];
  let listItems = [];

  lines.forEach((line, i) => {
    if (line.startsWith("**") && line.endsWith("**")) {
      if (listItems.length > 0) {
        elements.push(<ul key={`ul-${i}`} className="list-disc pl-5 mt-1 space-y-1">{listItems}</ul>);
        listItems = [];
      }
      elements.push(<h4 key={`h-${i}`} className="font-bold mt-3">{line.replace(/\*\*/g, "").trim()}</h4>);
    } else if (line.startsWith("*") || line.startsWith("-")) {
      const clean = line.replace(/^[\*\-]\s*/, "").replace(/\*\*/g, "").trim();
      listItems.push(<li key={`li-${i}`}>{clean}</li>);
    } else {
      if (listItems.length > 0) {
        elements.push(<ul key={`ul-${i}`} className="list-disc pl-5 mt-1 space-y-1">{listItems}</ul>);
        listItems = [];
      }
      elements.push(<p key={`p-${i}`} className="mt-2">{line}</p>);
    }
  });

  if (listItems.length > 0) {
    elements.push(<ul key="ul-last" className="list-disc pl-5 mt-1 space-y-1">{listItems}</ul>);
  }
  return elements;
};

const GIB = () => {
  const [prompt, setPrompt] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    const userMessage = { role: "user", text: prompt };
    setChatHistory((prev) => [...prev, userMessage]);
    setPrompt("");
    setLoading(true);

    try {
      const res = await fetch(API_ROUTES.prompt, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: userMessage.text }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Failed to get response");
      }
      const generatedText = data.answer || "No response received.";
      setChatHistory((prev) => [...prev, { role: "model", text: generatedText }]);
    } catch (error) {
      setChatHistory((prev) => [...prev, { role: "model", text: error.message || "Error fetching response. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start pt-24 pb-8 px-5 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-2xl flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-5 text-[#9bf318] underline decoration-wavy">
          Get Info By Prompt
        </h2>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap gap-3 justify-center mb-6">
          {suggestions.map((s) => (
            <button
              key={s}
              onClick={() => setPrompt(s)}
              className="px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm text-white text-sm border border-white/20 hover:bg-white/25 hover:scale-105 transition-all"
            >
              {s}
            </button>
          ))}
        </div>

        {/* Chat Window */}
        <div className="w-full bg-white/15 backdrop-blur-md rounded-2xl border border-white/20 flex flex-col h-[550px] overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {chatHistory.length === 0 && (
              <p className="text-gray-400 text-sm text-center mt-10">
                Ask anything about medicinal plants or Ayurveda...
              </p>
            )}
            {chatHistory.map((chat, i) => (
              <div
                key={i}
                className={`flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                    chat.role === "user"
                      ? "bg-blue-600/70 text-white rounded-br-sm"
                      : "bg-teal-600/70 text-white rounded-bl-sm"
                  }`}
                >
                  {chat.role === "user" ? <p>{chat.text}</p> : formatMessage(chat.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-teal-600/70 px-4 py-3 rounded-2xl rounded-bl-sm text-sm text-white animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex gap-2 p-3 bg-black/30 border-t border-white/20">
            <textarea
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your prompt for medicinal plant search..."
              className="flex-1 resize-none bg-white/10 border border-white/20 rounded-xl px-4 py-2 text-white placeholder-white/60 text-sm outline-none focus:border-[#9bf318] transition-colors"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-[#9bf318] hover:bg-[#b7ff40] disabled:bg-gray-500 text-black font-bold rounded-full text-xl transition-all hover:scale-110"
            >
              ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GIB;
