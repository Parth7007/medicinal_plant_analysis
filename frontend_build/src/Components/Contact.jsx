import React from "react";
import person1 from "../Img/pranay.jpeg";
import person2 from "../Img/dhim.jpg";
import person3 from "../Img/niru.jpg";
import person4 from "../Img/vaish.jpg";
import heroBg from "../Img/medicinal-plant-bg.jpg";

const team = [
  { img: person1, name: "Pranay Dabhade", role: "Full-Stack Developer", phone: "+918605957962", wa: "8605957962" },
  { img: person2, name: "Dhimahi Patel", role: "Dataset Developer", phone: "+919309351392", wa: "9309351392" },
  { img: person3, name: "Niraj Pandit", role: "Backend Developer", phone: "+918421953795", wa: "8421953795" },
  { img: person4, name: "Vaishnavi Kadam", role: "ML Developer", phone: "+919529315072", wa: "9529315072" },
];

const Contact = () => (
  <section
    className="relative min-h-screen flex items-center justify-center py-24 px-5 bg-cover bg-center text-white"
    style={{ backgroundImage: `url(${heroBg})` }}
  >
    <div className="absolute inset-0 bg-black/65" />

    <div className="relative z-10 max-w-5xl w-full text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-300 mb-12 text-lg">Reach out to our team for any inquiries or assistance.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {team.map((person) => (
          <div
            key={person.name}
            className="bg-white/15 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 hover:bg-white/25 transition-all duration-300"
          >
            <img src={person.img} alt={person.name} className="w-full h-48 object-cover object-top" />
            <div className="p-5">
              <h2 className="text-lg font-semibold mb-1">{person.name}</h2>
              <p className="text-green-400 text-sm mb-4">{person.role}</p>
              <div className="flex flex-col gap-2">
                <a
                  href={`tel:${person.phone}`}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  📞 Make Call
                </a>
                <a
                  href={`https://wa.me/${person.wa}`}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-sm font-medium transition-colors"
                >
                  💬 Send Text
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Contact;
