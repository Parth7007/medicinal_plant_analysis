import React from "react";
import ChatBotIcon from "../Img/ChatBotIcon";

const ChatMessage = ({ chat }) => {
  const isBot = chat.role === "model";
  return (
    <div className={`flex gap-3 items-end ${isBot ? "" : "flex-col items-end"}`}>
      {isBot && (
        <div className="shrink-0 w-9 h-9 rounded-full bg-[#6D4FC2] flex items-center justify-center mb-0.5">
          <ChatBotIcon />
        </div>
      )}
      <p
        className={`px-4 py-3 rounded-2xl text-sm max-w-[85%] break-words whitespace-pre-line ${
          isBot
            ? "bg-[#F6F2FF] text-gray-800 rounded-bl-sm"
            : "bg-[#6D4FC2] text-white rounded-br-sm"
        }`}
      >
        {chat.text}
      </p>
    </div>
  );
};

export default ChatMessage;
