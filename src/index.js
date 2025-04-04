import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./App.css"; // إذا كنت أضفته
import "./index.css";
import './i18n'; // مهم جدًا



const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
