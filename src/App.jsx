import { Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars, FaTimes,
  FaHome, FaTools, FaFileContract, FaInfoCircle,
  FaQuestionCircle, FaEnvelope, FaHammer
} from "react-icons/fa";

import Inicio from "./pages/Inicio.jsx";
import Cotizador from "./pages/Cotizador.jsx";
import PortfolioGaleria from "./PortfolioGaleria.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import FAQs from "./pages/FAQs.jsx";
import Construccion from "./pages/Construccion.jsx";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/portafolio", label: "Portafolio" },
  { to: "/cotizador", label: "Cotizador" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contacto", label: "Contacto" },
  { to: "/legal", label: "Legal" },
];

const linkBase =
  "px-3 py-2 rounded-xl text-sm font-semibold transition-colors";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Filtrar enlaces visibles en la página de construcción
  const visibleLinks =
    location.pathname === "/construccion"
      ? links.filter((link) => link.to !== "/portafolio")
      : links;

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => setMenuOpen(false), [location.pathname]);

  const renderLink = (link, isMobile = false) => (
    <NavLink
      key={link.to}
      to={link.to}
      onClick={() => isMobile && setMenuOpen(false)}
      className={({ isActive }) =>
        `${isMobile ? "py-2 text-sm font-semibold rounded-xl mx-6 my-1" : linkBase
        } ${isActive
          ? "bg-[#C1121F] text-white"
          : "bg-[#0D3B66] text-white hover:bg-[#1B4F72]"
        }`
      }
    >
      {link.label}
    </NavLink>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* === NAVBAR DESKTOP + MOBILE === */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* === LOGO + BOTÓN CONSTRUCCIÓN === */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/"
              className="text-xl font-bold tracking-tight text-[#1A1A1A]"
            >
              TCT <span className="text-[#0D3B66]">Services</span>
            </NavLink>

            {/* BOTÓN CONSTRUCCIÓN (solo escritorio) */}
            <NavLink
              to="/construccion"
              className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full 
                        bg-[#C1121F] text-white text-sm font-semibold shadow-md 
                        hover:bg-[#A10E1A] transition relative overflow-hidden 
                        animate-pulseLight"
            >
              🚧 CONSTRUCCIÓN
            </NavLink>
          </div>

          {/* BOTÓN MENÚ MÓVIL */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-[#0D3B66] font-bold text-xl focus:outline-none"
            aria-label="Abrir menú"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* MENÚ DESKTOP */}
          <nav className="hidden md:flex gap-2 flex-wrap">
            {visibleLinks.map((link) => renderLink(link))}
          </nav>
        </div>

        {/* MENÚ MÓVIL (sidebar tipo app) */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-[#0D3B66] text-white flex flex-col justify-center items-center z-50 space-y-5"
            >
              <button
                onClick={() => setMenuOpen(false)}
                className="absolute top-4 right-5 text-2xl"
              >
                <FaTimes />
              </button>

              {/* BOTÓN CONSTRUCCIÓN dentro del menú móvil */}
              <NavLink
                to="/construccion"
                onClick={() => setMenuOpen(false)}
                className="py-2 px-6 text-base font-semibold rounded-full bg-[#C1121F] hover:bg-[#A10E1A] animate-pulseLight"
              >
                🚧 Construcción
              </NavLink>

              {visibleLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-lg font-semibold px-4 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-[#C1121F] text-white"
                        : "text-white hover:bg-white/20"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* === RUTAS CON ANIMACIÓN === */}
      <main className="flex-1">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/portafolio" element={<PortfolioGaleria />} />
            <Route path="/cotizador" element={<Cotizador />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/faqs" element={<FAQs />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/construccion" element={<Construccion />} />
            <Route path="/legal" element={<Page title="Legal" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </main>

      {/* === PIE DE PÁGINA === */}
      <footer className="border-t bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-[#2C3E50]">
          © {new Date().getFullYear()} TCT Services — Servicios de Sistemas Especiales, Panamá.
        </div>
      </footer>
    </div>
  );
}

/* === Página genérica temporal === */
function Page({ title }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-[#1A1A1A]">{title}</h1>
      <p className="mt-3 text-[#2C3E50]">Contenido próximamente.</p>
    </div>
  );
}
