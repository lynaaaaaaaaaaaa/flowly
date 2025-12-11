// src/context/CartContext.jsx
import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ➕ Ajouter un bouquet au panier
  function addToCart(bouquet) {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === bouquet.id);

      if (exists) {
        // on incrémente quantite
        return prev.map((item) =>
          item.id === bouquet.id
            ? { ...item, quantite: item.quantite + 1 }
            : item
        );
      }

      // premier ajout : on force quantite = 1
      return [...prev, { ...bouquet, quantite: 1 }];
    });
  }

  // ❌ Supprimer un bouquet
  function removeFromCart(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  // 🧹 Vider le panier
  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
