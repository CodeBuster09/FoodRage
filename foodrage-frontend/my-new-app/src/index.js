import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Contex from "./context/contex";

// 🌙 Check localStorage and apply dark mode class before rendering
const colorTheme = localStorage.getItem("color-theme");
if (colorTheme === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Contex>
        <App />
      </Contex>
    </BrowserRouter>
  </React.StrictMode>
);
