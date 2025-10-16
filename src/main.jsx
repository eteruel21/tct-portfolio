import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from './App.jsx';
import './index.css';

// Detectar entorno GitHub Pages (producción)
const isGitHub = window.location.hostname.includes('github.io');
const Router = isGitHub ? HashRouter : BrowserRouter;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
