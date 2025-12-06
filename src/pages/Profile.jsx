import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-3xl font-bold text-pink-600 mb-4">Mon Profil</h2>

      <p><b>Nom complet :</b> {user.nom_complet}</p>
      <p><b>Login :</b> {user.login}</p>
    </div>
  );
}
