import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Contex from "./context/contex";

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
