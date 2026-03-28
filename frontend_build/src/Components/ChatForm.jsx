import React, { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
  const inputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputRef.current.value.trim();
    if (!userMessage) return;
    inputRef.current.value = "";

    const updatedHistory = [...chatHistory, { role: "user", text: userMessage }];
    setChatHistory(updatedHistory);
    generateBotResponse(updatedHistory);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 bg-white rounded-3xl border border-gray-200 shadow-sm px-3 py-2"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Message...!"
        required
        className="flex-1 h-12 px-3 text-sm outline-none bg-transparent"
      />
      <button
        type="submit"
        className="w-9 h-9 rounded-full bg-[#6D4FC2] hover:bg-[#593bab] text-white flex items-center justify-center text-lg transition-colors shrink-0"
      >
        ↑
      </button>
    </form>
  );
};

export default ChatForm;
