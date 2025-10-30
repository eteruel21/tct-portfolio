import { Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome, FaTools, FaFileContract, FaInfoCircle,
  FaQuestionCircle, FaEnvelope, FaHammer, FaBars, FaTimes, FaStar
} from "react-icons/fa";

import Inicio from "./pages/Inicio.jsx";
import Cotizador from "./pages/Cotizador.jsx";
import PortfolioGaleria from "./PortfolioGaleria.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import FAQs from "./pages/FAQs.jsx";
import Construccion from "./pages/Construccion.jsx";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const allLinks = [
    { to: "/", label: "Inicio", icon: <FaHome /> },
    { to: "/portafolio", label: "Portafolio", icon: <FaTools /> },
    { to: "/cotizador", label: "Cotizador", icon: <FaFileContract /> },
    { to: "/nosotros", label: "Nosotros", icon: <FaInfoCircle /> },
    { to: "/faqs", label: "FAQs", icon: <FaQuestionCircle /> },
    { to: "/contacto", label: "Contacto", icon: <FaEnvelope /> },
    { to: "/legal", label: "Legal", icon: <FaHammer /> },
    { to: "/construccion", label: "Construcción", icon: <FaHammer /> },
    { to: "/novedades", label: "Novedades", icon: <FaStar /> },
  ];

  // En la página de construcción ocultar el botón Portafolio
  const visibleLinks =
    location.pathname === "/construccion"
      ? allLinks.filter((l) => l.to !== "/portafolio")
      : allLinks;

  const renderLink = (link, isMobile = false) => (
    <NavLink
      key={link.to}
      to={link.to}
      onClick={() => isMobile && setMenuOpen(false)}
      className={({ isActive }) =>
        `${isMobile ? "flex items-center gap-3 py-2 px-6 text-sm font-semibold rounded-xl" : "px-3 py-2 rounded-xl text-sm font-semibold"} 
         ${isActive ? "bg-[#C1121F] text-white" : "bg-[#0D3B66] text-white hover:bg-[#1B4F72]"}`
      }
    >
      {isMobile && link.icon}
      {link.label}
    </NavLink>
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ==== BARRA SUPERIOR (DESKTOP) ==== */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* === LOGO Y BOTÓN CONSTRUCCIÓN === */}
          <div className="flex items-center gap-3">
            <NavLink
              to="/"
              className="text-xl font-bold tracking-tight text-[#1A1A1A]"
            >
              TCT <span className="text-[#0D3B66]">Services</span>
            </NavLink>

            {/* BOTÓN CONSTRUCCIÓN (desktop) */}
            <NavLink
              to="/construccion"
              className="hidden md:inline-flex items-center px-4 py-1.5 rounded-full 
                        bg-[#C1121F] text-white text-sm font-semibold shadow-md 
                        hover:bg-[#A10E1A] transition animate-pulseLight"
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
            {menuOpen ? "✕" : "☰"}
          </button>

          {/* MENÚ DESKTOP */}
          <nav className="hidden md:flex gap-2 flex-wrap">
            {visibleLinks
              .filter((l) => l.to !== "/construccion" && l.to !== "/novedades")
              .map((link) => renderLink(link))}
            {/* NOVEDADES visible en desktop también */}
            <NavLink
              to="/novedades"
              className="px-3 py-2 rounded-xl text-sm font-semibold bg-[#FFD700] text-[#1A1A1A] hover:bg-yellow-400 transition"
            >
              🆕 Novedades
            </NavLink>
          </nav>
        </div>

        {/* ==== MENÚ MÓVIL ==== */}
        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t flex flex-col text-center py-2 shadow-lg"
            >
              {/* BOTÓN CONSTRUCCIÓN visible en móvil */}
              <NavLink
                to="/construccion"
                onClick={() => setMenuOpen(false)}
                className="py-2 text-sm font-semibold rounded-xl mx-6 my-1 bg-[#C1121F] text-white hover:bg-[#A10E1A]"
              >
                🚧 Construcción
              </NavLink>

              {/* NUEVO: BOTÓN NOVEDADES visible en móvil */}
              <NavLink
                to="/novedades"
                onClick={() => setMenuOpen(false)}
                className="py-2 text-sm font-semibold rounded-xl mx-6 my-1 bg-[#FFD700] text-[#1A1A1A] hover:bg-yellow-400"
              >
                🆕 Novedades
              </NavLink>

              {visibleLinks
                .filter((l) => l.to !== "/construccion" && l.to !== "/novedades")
                .map((link) => renderLink(link, true))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ==== RUTAS CON ANIMACIÓN ==== */}
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
            <Route path="/novedades" element={<Page title="Novedades" />} />
            <Route path="/legal" element={<Page title="Legal" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </main>

      {/* ==== PIE DE PÁGINA ==== */}
      <footer className="border-t bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-[#2C3E50]">
          © {new Date().getFullYear()} TCT Services — Servicios de Sistemas Especiales, Panamá.
        </div>
      </footer>
    </div>
  );
}

/* Página genérica temporal */
function Page({ title }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-[#1A1A1A]">{title}</h1>
      <p className="mt-3 text-[#2C3E50]">Contenido próximamente.</p>
    </div>
  );
}
