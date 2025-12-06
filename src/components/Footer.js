import React from "react";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <footer className="bg-pink-50 text-gray-800 shadow-inner mt-10">
      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-3 gap-8">
        
        {/* --- Section logo --- */}
        <div>
          <h2 className="text-2xl font-bold text-pink-600">FlowLy</h2>
          <p className="text-sm mt-2 text-gray-600">
            Des bouquets qui parlent à votre cœur 🌸
          </p>
        </div>

        {/* --- Liens de navigation --- */}
        <ul className="flex flex-col space-y-2 text-sm font-medium">
          <li><Link to="/" className="hover:text-pink-600 transition">Accueil</Link></li>
          <li><Link to="/bouquets" className="hover:text-pink-600 transition">Bouquets</Link></li>
          <li><Link to="/about" className="hover:text-pink-600 transition">À propos</Link></li>
          <li><Link to="/contact" className="hover:text-pink-600 transition">Contact</Link></li>
        </ul>

        {/* --- Réseaux sociaux --- */}
        <div className="flex items-center space-x-4 justify-start md:justify-end">
          <a href="#" aria-label="Facebook" className="hover:text-pink-600">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-pink-600">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-pink-600">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </div>

      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-600">
        © {new Date().getFullYear()} <span className="font-semibold text-pink-600">FlowLy</span> — Tous droits réservés.
      </div>
    </footer>
  );
};

export default Footer;
