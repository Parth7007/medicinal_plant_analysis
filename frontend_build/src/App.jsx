import React from "react";
import Navbar from "./Components/Navbar";
import Chatbot from "./Components/Chatbot";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="font-[Inter,sans-serif]">
      <Navbar />
      <Outlet />
      <Chatbot />
    </div>
  );
}

export default App;
