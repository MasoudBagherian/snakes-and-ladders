import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import BoardContextProvider from "./board_context/BoardContextProvider";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <BoardContextProvider>
      <App />
    </BoardContextProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
