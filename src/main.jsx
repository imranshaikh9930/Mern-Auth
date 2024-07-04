import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CurrentUserProvider  } from "./Context/userContext.jsx";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CurrentUserProvider >
      <App />
    </CurrentUserProvider >
  </React.StrictMode>
);
