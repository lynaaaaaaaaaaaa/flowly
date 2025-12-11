import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { myFetch } from "../comm/myFetch";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, i) => sum + i.prix * i.quantite, 0);

  async function checkout() {
    if (!user) return navigate("/login");

    const res = await myFetch("/api/cart/checkout", {
      method: "POST",
      body: JSON.stringify({ items: cart }),
    });

    if (res.success) {
      alert("Achat réussi !");
      clearCart();
      navigate("/profile");
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Mon panier 🛒</h1>

      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>
                  {item.nom} x {item.quantite}
                </span>
                <span>
                  {item.prix * item.quantite} €
                </span>
                <button
                  className="text-red-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold mt-6">
            Total : {total} €
          </h2>

          <button
            onClick={checkout}
            className="mt-6 bg-pink-600 text-white px-6 py-2 rounded"
          >
            Valider l’achat 💳
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
