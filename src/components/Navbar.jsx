import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  // 🔥 Déconnexion + retour à l'accueil
  const handleLogout = async () => {
    await logout();
    navigate("/"); // 🔥 redirection immédiate
    closeMenu();
  };

  return (
    <nav className="bg-pink-600 text-white px-6 py-4 flex justify-between items-center shadow-md relative">

      {/* LOGO */}
      <Link to="/" className="text-3xl font-bold">
        FlowLy
      </Link>

      {/* HAMBURGER (mobile) */}
      <button
        className="md:hidden text-3xl"
        onClick={toggleMenu}
      >
        ☰
      </button>

      {/* MENU DESKTOP */}
      <div className="hidden md:flex gap-8 items-center">
        <Link to="/" className="hover:underline">Accueil</Link>
        <Link to="/bouquets" className="hover:underline">Bouquets</Link>
        <Link to="/services" className="hover:underline">Services</Link>
        <Link to="/about" className="hover:underline">À propos</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>

        {user ? (
          <>
            <span className="font-semibold">👋 Bonjour, {user.login}</span>
            <Link to="/profile" className="hover:underline">Profil</Link>

            <button
              onClick={handleLogout}
              className="bg-white text-pink-600 px-3 py-1 rounded hover:bg-pink-100"
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-white text-pink-600 px-4 py-1 rounded hover:bg-pink-100"
            >
              Se connecter
            </Link>
            <Link
              to="/register"
              className="bg-white text-pink-600 px-4 py-1 rounded hover:bg-pink-100"
            >
              S'inscrire
            </Link>
          </>
        )}
      </div>

      {/* MENU MOBILE SLIDE RIGHT */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-pink-600 shadow-xl p-6 flex flex-col gap-6 transform transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Close */}
        <button className="self-end text-3xl" onClick={closeMenu}>
          ✕
        </button>

        <Link onClick={closeMenu} to="/" className="text-lg">Accueil</Link>
        <Link onClick={closeMenu} to="/bouquets" className="text-lg">Bouquets</Link>
        <Link onClick={closeMenu} to="/services" className="text-lg">Services</Link>
        <Link onClick={closeMenu} to="/about" className="text-lg">À propos</Link>
        <Link onClick={closeMenu} to="/contact" className="text-lg">Contact</Link>

        {user ? (
          <>
            <span className="font-semibold">👋 Bonjour, {user.login}</span>
            <Link onClick={closeMenu} to="/profile" className="text-lg">Profil</Link>

            <button
              onClick={handleLogout}
              className="bg-white text-pink-600 px-4 py-2 rounded"
            >
              Se déconnecter
            </button>
          </>
        ) : (
          <>
            <Link
              onClick={closeMenu}
              to="/login"
              className="bg-white text-pink-600 px-4 py-2 rounded"
            >
              Se connecter
            </Link>

            <Link
              onClick={closeMenu}
              to="/register"
              className="bg-white text-pink-600 px-4 py-2 rounded"
            >
              S'inscrire
            </Link>
          </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;
