import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const rootElement = document.getElementById("root")!;
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker

      .register("/service-worker.js")

      .then((registration) => {
        console.log("Service Worker registered: ", registration);
      })

      .catch((error) => {
        console.log("Service Worker registration failed: ", error);
      });
  });
}
