import React from 'react';
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import './index.css';

// Detectar entorno GitHub Pages (producción)
const isGitHub = window.location.hostname.includes('github.io');
const Router = isGitHub ? HashRouter : BrowserRouter;

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
