// ... tes imports existants
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setOpen(!open);
  const closeMenu = () => setOpen(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    closeMenu();
  };

  return (
    <nav className="bg-pink-600 text-white px-6 py-4 flex justify-between items-center shadow-md relative">
      <Link to="/" className="text-3xl font-bold">
        FlowLy
      </Link>

      <button className="lg:hidden text-3xl" onClick={toggleMenu}>
        ☰
      </button>

      {/* DESKTOP */}
      <div className="hidden lg:flex gap-8 items-center">
        <Link to="/" className="hover:underline">
          Accueil
        </Link>
        <Link to="/bouquets" className="hover:underline">
          Bouquets
        </Link>
        <Link to="/services" className="hover:underline">
          Services
        </Link>
        <Link to="/about" className="hover:underline">
          À propos
        </Link>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
        <Link to="/cart" className="hover:underline">
          Panier 🛒
        </Link>

        {user?.role === "employe" && (
          <Link to="/backoffice" className="hover:underline">
            Backoffice 🛠️
          </Link>
        )}

        {user ? (
          <>
            <span className="font-semibold">👋 {user.login}</span>
            <Link to="/profile" className="hover:underline">
              Profil
            </Link>
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

      {/* MOBILE */}
      {/* ... tu gardes ton menu slide comme tu l'avais, tu peux aussi tester user.role === "employe" pour afficher Backoffice */}
    </nav>
  );
}

export default Navbar;
