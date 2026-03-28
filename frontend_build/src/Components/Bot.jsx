import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ChatBotIcon from "../Img/ChatBotIcon";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { API_ROUTES } from "../config/api";

const Bot = ({ open }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [loading, setLoading] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    setShowChatbot(open);
  }, [open]);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatHistory, loading]);

  const generateBotResponse = async (history) => {
    const userMessage = history[history.length - 1]?.text;
    setLoading(true);

    try {
      const response = await axios.post(API_ROUTES.chat, { question: userMessage });
      const generatedText = response.data.answer;
      setChatHistory((prev) => [...prev, { role: "model", text: generatedText }]);
    } catch (error) {
      const errMsg =
        error?.response?.data?.detail ||
        "An error occurred. Please identify a plant first via Search by Image.";
      setChatHistory((prev) => [...prev, { role: "model", text: errMsg }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-[Inter,sans-serif]">
      {/* Toggle Button */}
      <button
        onClick={() => setShowChatbot((prev) => !prev)}
        className="fixed bottom-8 right-9 w-14 h-14 rounded-full bg-[#6D4FC2] text-white flex items-center justify-center shadow-xl z-50 transition-transform duration-200 hover:scale-110"
        style={{ transform: showChatbot ? "rotate(90deg)" : "rotate(0deg)" }}
      >
        <span className={`material-symbols-outlined absolute transition-opacity duration-150 ${showChatbot ? "opacity-0" : "opacity-100"}`}>
          mode_comment
        </span>
        <span className={`material-symbols-outlined absolute transition-opacity duration-150 ${showChatbot ? "opacity-100" : "opacity-0"}`}>
          close
        </span>
      </button>

      {/* Chatbot Popup */}
      <div
        className={`fixed bottom-28 right-9 w-[400px] max-sm:w-full max-sm:right-0 max-sm:bottom-0 max-sm:rounded-t-2xl h-[77vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50 transition-all duration-200 origin-bottom-right ${
          showChatbot ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-[0.15] pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#6D4FC2]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
              <ChatBotIcon />
            </div>
            <h2 className="text-white font-semibold text-lg">AyurBot</h2>
          </div>
          <button
            onClick={() => setShowChatbot(false)}
            className="text-white material-symbols-outlined text-3xl rounded-full w-10 h-10 flex items-center justify-center hover:bg-[#593bab] transition-colors"
          >
            keyboard_arrow_down
          </button>
        </div>

        {/* Body */}
        <div ref={chatBodyRef} className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4">
          {/* Welcome message */}
          <div className="flex gap-3 items-end">
            <div className="w-9 h-9 rounded-full bg-[#6D4FC2] flex items-center justify-center shrink-0 mb-0.5">
              <ChatBotIcon />
            </div>
            <p className="bg-[#F6F2FF] text-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm text-sm max-w-[85%]">
              Hey there! 👋 <br /> How can I help you today? <br />
              <span className="text-xs text-gray-400">Tip: Identify a plant first using Search by Image!</span>
            </p>
          </div>

          {chatHistory.map((chat, i) => (
            <ChatMessage key={i} chat={chat} />
          ))}

          {loading && (
            <div className="flex gap-3 items-end">
              <div className="w-9 h-9 rounded-full bg-[#6D4FC2] flex items-center justify-center shrink-0">
                <ChatBotIcon />
              </div>
              <p className="bg-[#F6F2FF] text-gray-500 px-4 py-3 rounded-2xl rounded-bl-sm text-sm animate-pulse">
                Thinking...
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)]">
          <ChatForm
            chatHistory={chatHistory}
            setChatHistory={setChatHistory}
            generateBotResponse={generateBotResponse}
          />
        </div>
      </div>
    </div>
  );
};

export default Bot;
