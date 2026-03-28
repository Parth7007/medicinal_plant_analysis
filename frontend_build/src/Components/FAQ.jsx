import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import heroBg from "../Img/medicinal-plant-bg.jpg";

const faqData = [
  { question: "What is Ayurveda?", answer: "Ayurveda is an ancient system of medicine that focuses on holistic healing and balance in life through natural remedies, diet, and lifestyle practices." },
  { question: "How does Ayurveda work?", answer: "Ayurveda works by balancing the three doshas (Vata, Pitta, Kapha) using herbs, diet, yoga, and meditation." },
  { question: "Is Ayurveda scientifically proven?", answer: "Many Ayurvedic practices have scientific backing, especially in areas of herbal medicine, stress relief, and gut health." },
  { question: "Can Ayurveda be used with modern medicine?", answer: "Yes, Ayurveda can complement modern medicine, but it's best to consult a healthcare professional before combining treatments." },
  { question: "What are the benefits of medicinal plants?", answer: "Medicinal plants provide various health benefits, including boosting immunity, aiding digestion, reducing stress, and treating common illnesses naturally." },
  { question: "How does Ayurvedic plant detection work?", answer: "Ayurvedic plant detection uses AI-based models to identify medicinal plants based on leaf structure, color, and other botanical features." },
  { question: "What is the role of AI in Ayurveda?", answer: "AI helps in Ayurveda by identifying medicinal plants, predicting disease susceptibility, and providing personalized Ayurvedic treatments based on body type (Prakriti)." },
  { question: "How accurate is an AI-based medicinal plant analysis?", answer: "AI-based medicinal plant analysis can achieve high accuracy when trained with a well-labeled dataset, but it requires validation with real-world testing." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      className="relative min-h-screen flex items-start justify-center py-24 px-5 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 max-w-3xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
        <p className="text-gray-300 text-center mb-10">Find answers to common questions about Ayurveda and AI-based medicinal plant analysis.</p>

        <div className="flex flex-col gap-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-base hover:bg-white/10 transition-colors"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`shrink-0 ml-4 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-6 pb-4 text-gray-300 text-sm leading-relaxed"
                  >
                    {item.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
