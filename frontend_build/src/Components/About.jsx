import React from "react";
import identifyImg from "../Img/identify.jpg";
import infoImg from "../Img/info.jpg";
import botImg from "../Img/bot.jpg";
import benefitImg from "../Img/benefit.jpg";
import heroBg from "../Img/medicinal-plant-bg.jpg";

const cards = [
  { img: identifyImg, title: "Identify Plants", desc: "Use our image recognition feature to identify medicinal plants effortlessly." },
  { img: infoImg, title: "Get Information", desc: "Retrieve comprehensive details about plants using text prompts." },
  { img: benefitImg, title: "Learn Benefits", desc: "Explore the medicinal benefits of various Ayurvedic plants." },
  { img: botImg, title: "AyurBot Chatbot", desc: "Interact with our AI-powered chatbot for instant insights on Ayurvedic plants." },
];

const About = () => (
  <section
    className="relative min-h-screen flex items-center justify-center py-24 px-5 bg-cover bg-center text-white"
    style={{ backgroundImage: `url(${heroBg})` }}
  >
    <div className="absolute inset-0 bg-black/65" />

    <div className="relative z-10 max-w-5xl w-full text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">About AyurHelp</h1>
      <p className="text-gray-200 text-lg mb-2">We provide insights into Ayurvedic plants and their medicinal uses.</p>
      <p className="text-gray-300 mb-12 max-w-3xl mx-auto">
        Our project aims to help users identify and understand the benefits of various medicinal plants
        through image recognition and prompt-based information retrieval.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white/15 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/25 transition-all duration-300 hover:-translate-y-1"
          >
            <img src={card.img} alt={card.title} className="w-full h-40 object-cover" />
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
              <p className="text-gray-300 text-sm">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
