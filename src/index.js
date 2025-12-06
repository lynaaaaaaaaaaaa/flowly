import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";


// Styles & libs externes
import "@fortawesome/fontawesome-free/css/all.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/store";

// Auth
import { AuthProvider } from "./context/AuthContext";

// Initialisation animations
AOS.init({ duration: 1000, once: true });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
