import React from "react";
import { Link } from "react-router-dom";
import bouquetHero from "../assets/images/bouquet1.jpg";
import bouquet2 from "../assets/images/bouquet2.jpg";
import bouquet3 from "../assets/images/bouquet3.jpg";
import bouquet4 from "../assets/images/bouquet4.jpg";

const Home = () => {
  return (
    <div className="font-sans bg-gradient-to-b from-pink-50 to-white text-gray-800">
      {/* 🌸 Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-20 bg-pink-100">
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-5xl font-bold text-pink-600 animate-fadeInUp">Bienvenue chez FlowLy</h1>

          <p className="text-lg text-gray-600">
            Offrez des émotions en fleurs 🌹 — Livraison rapide, bouquets uniques et soins personnalisés pour chaque occasion.
          </p>
          <Link
            to="/bouquets"
            className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-pink-700 transition"
          >
            Découvrir nos bouquets
          </Link>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src={bouquetHero}
            alt="Bouquet"
            className="rounded-3xl shadow-xl w-full"
          />
        </div>
      </section>

      {/* 💐 Section Nos coups de cœur */}
     <section data-aos="zoom-in" className="bg-animated py-20 text-center">
  <h2 className="text-3xl font-semibold text-pink-700 mb-8">
    Nos coups de cœur
  </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[bouquet2, bouquet3, bouquet4].map((img, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition overflow-hidden"
            >
              <img src={img} alt="Bouquet" className="w-full h-64 object-cover" />
              <div className="p-5 space-y-2">
                <h3 className="text-xl font-bold text-pink-600">
                  Bouquet {i + 1}
                </h3>
                <p className="text-gray-600 text-sm">
                  Un mélange harmonieux de fleurs fraîches pour illuminer votre journée.
                </p>
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full transition">
                  Acheter
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🌿 Pourquoi choisir FlowLy */}
      <section className="py-20 bg-pink-50 text-center">
        <h2 className="text-3xl font-semibold text-pink-700 mb-10">
          Pourquoi choisir FlowLy ?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-10">
          {[
            { title: "Fleurs fraîches", text: "Cueillies chaque matin pour une fraîcheur incomparable." },
            { title: "Livraison rapide", text: "Partout en 24h, avec soin et sourire." },
            { title: "Créations sur mesure", text: "Des bouquets personnalisés selon vos envies." },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold text-pink-600 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💞 CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-pink-400 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">
          Faites plaisir à vos proches dès aujourd’hui 💖
        </h2>
        <Link
          to="/bouquets"
          className="bg-white text-pink-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-pink-100 transition"
        >
          Commander maintenant
        </Link>
      </section>
    </div>
  );
};

export default Home;
