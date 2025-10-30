import { Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome, FaTools, FaFileContract, FaInfoCircle,
  FaQuestionCircle, FaEnvelope, FaHammer, FaBars, FaTimes
} from "react-icons/fa";

import Inicio from "./pages/Inicio.jsx";
import Cotizador from "./pages/Cotizador.jsx";
import PortfolioGaleria from "./PortfolioGaleria.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import FAQs from "./pages/FAQs.jsx";
import Construccion from "./pages/Construccion.jsx";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const links = [
    { to: "/", label: "Inicio", icon: <FaHome /> },
    { to: "/portafolio", label: "Portafolio", icon: <FaTools /> },
    { to: "/cotizador", label: "Cotizador", icon: <FaFileContract /> },
    { to: "/nosotros", label: "Nosotros", icon: <FaInfoCircle /> },
    { to: "/faqs", label: "FAQs", icon: <FaQuestionCircle /> },
    { to: "/contacto", label: "Contacto", icon: <FaEnvelope /> },
    { to: "/legal", label: "Legal", icon: <FaHammer /> },
  ];

  // Ocultar Portafolio en la vista de Construcción
  const visibleLinks =
    location.pathname === "/construccion"
      ? links.filter((l) => l.to !== "/portafolio")
      : links;

  // Cerrar sidebar al cambiar ruta
  useEffect(() => setSidebarOpen(false), [location.pathname]);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      {/* === SIDEBAR === */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 w-64 bg-[#0D3B66] text-white flex flex-col justify-between z-50 shadow-2xl"
          >
            {/* Encabezado del Sidebar */}
            <div>
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/20">
                <h1 className="text-2xl font-bold tracking-tight">
                  TCT <span className="text-[#FFD700]">Services</span>
                </h1>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white text-2xl focus:outline-none"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Botón construcción destacado */}
              <NavLink
                to="/construccion"
                className="flex items-center justify-center gap-2 mx-4 mt-5 mb-3 py-2.5 rounded-xl bg-[#C1121F] text-sm font-semibold shadow-md hover:bg-[#A10E1A] transition animate-pulseLight"
              >
                🚧 Construcción
              </NavLink>

              {/* Enlaces del menú */}
              <nav className="flex flex-col gap-1 px-2">
                {visibleLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                        isActive
                          ? "bg-[#C1121F] text-white"
                          : "text-gray-200 hover:bg-white/10"
                      }`
                    }
                  >
                    {link.icon}
                    {link.label}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="text-center py-3 text-xs text-gray-300 border-t border-white/10">
              © {new Date().getFullYear()} TCT Services
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* === CONTENIDO PRINCIPAL === */}
      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <header className="sticky top-0 z-30 bg-white shadow-md flex items-center justify-between px-4 py-3">
          {/* Botón menú solo visible en móvil */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-[#0D3B66] text-2xl focus:outline-none lg:hidden"
          >
            ☰
          </button>

          {/* Logo */}
          <h2 className="text-xl font-bold tracking-tight text-[#0D3B66]">
            TCT <span className="text-[#C1121F]">Services</span>
          </h2>

          {/* Botones solo visibles en desktop */}
          <nav className="hidden lg:flex gap-2 flex-wrap items-center">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-[#C1121F] text-white"
                      : "bg-[#0D3B66] text-white hover:bg-[#1B4F72]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </header>

        {/* Contenido principal animado */}
        <main className="flex-1 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/portafolio" element={<PortfolioGaleria />} />
              <Route path="/cotizador" element={<Cotizador />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/construccion" element={<Construccion />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </motion.div>
        </main>

        {/* Pie de página */}
        <footer className="border-t bg-[#F9FAFB] text-center text-sm text-[#2C3E50] py-4">
          © {new Date().getFullYear()} TCT Services — Panamá.
        </footer>
      </div>
    </div>
  );
}
