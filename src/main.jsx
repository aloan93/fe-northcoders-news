import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoadingProvider } from "./contexts/LoadingCon.jsx";
import { ErrorProvider } from "./contexts/ErrorCon.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ErrorProvider>
          <App />
        </ErrorProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
