// src/config.js
const isBrowser = typeof window !== "undefined";

const isLocalBrowser =
  isBrowser &&
  (window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1");

export const base_url = isLocalBrowser
  ? "http://localhost:8000"
  : "https://to-do-list-8mi5.onrender.com";
