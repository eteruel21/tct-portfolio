import { Routes, Route, NavLink, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSpring, useTransition, animated } from "@react-spring/web";
import {
  FaBars, FaTimes,
  FaHome, FaTools, FaFileContract, FaInfoCircle,
  FaQuestionCircle, FaEnvelope, FaGavel
} from "react-icons/fa";

import Inicio from "./pages/Inicio.jsx";
import Cotizador from "./pages/Cotizador.jsx";
import PortfolioGaleria from "./PortfolioGaleria.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Contacto from "./pages/Contacto.jsx";
import FAQs from "./pages/FAQs.jsx";
import Construccion from "./pages/Construccion.jsx";
import Reservar from "./pages/Reservar.jsx";
import AdminReservas from "./pages/AdminReservas.jsx";

const links = [
  { to: "/", label: "Inicio", icon: <FaHome /> },
  { to: "/reservar", label: "Reservar Cita", icon: <FaFileContract /> },
  { to: "/portafolio", label: "Portafolio", icon: <FaTools /> },
  { to: "/cotizador", label: "Cotizador", icon: <FaFileContract /> },
  { to: "/nosotros", label: "Nosotros", icon: <FaInfoCircle /> },
  { to: "/faqs", label: "FAQs", icon: <FaQuestionCircle /> },
  { to: "/contacto", label: "Contacto", icon: <FaEnvelope /> },
  { to: "/legal", label: "Legal", icon: <FaGavel /> },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const visibleLinks =
    location.pathname === "/construccion"
      ? links.filter((link) => link.to !== "/portafolio")
      : links;

  useEffect(() => setMenuOpen(false), [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* === NAV DESKTOP === */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <NavLink
              to="/"
              className="text-xl font-bold tracking-tight text-[#1A1A1A]"
            >
              TCT <span className="text-[#0D3B66]">Services</span>
            </NavLink>

            {/* BOTÓN CONSTRUCCIÓN */}
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
            className="md:hidden text-[#0D3B66] text-2xl focus:outline-none"
            aria-label="Abrir menú"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* MENÚ DESKTOP */}
          <nav className="hidden md:flex gap-2 flex-wrap">
            {visibleLinks.map((link) => (
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
        </div>
      </header>

      {/* === SIDEBAR MÓVIL === */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* FONDO CON BLUR ELEGANTE */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-md"
            />

            {/* PANEL LATERAL */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-64 bg-[#0D3B66]/95 text-white z-50 
                         flex flex-col justify-between shadow-2xl backdrop-blur-lg border-r border-white/10"
            >
              <div>
                {/* CABECERA */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <h1 className="text-2xl font-bold">
                    TCT <span className="text-[#FFD700]">Services</span>
                  </h1>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="text-white text-xl"
                  >
                    <FaTimes />
                  </button>
                </div>

                {/* BOTÓN CONSTRUCCIÓN */}
                <NavLink
                  to="/construccion"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 mx-4 mt-5 mb-3 py-2.5 
                             rounded-xl bg-[#C1121F] text-sm font-semibold shadow-md 
                             hover:bg-[#A10E1A] transition animate-pulseLight"
                >
                  🚧 Construcción
                </NavLink>

                {/* ENLACES */}
                <nav className="flex flex-col gap-1 mt-2">
                  {visibleLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-5 py-2 rounded-lg transition ${
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

              {/* PIE */}
              <div className="text-center py-3 text-xs text-gray-300 border-t border-white/10">
                © {new Date().getFullYear()} TCT Services
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* === CONTENIDO PRINCIPAL === */}
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
            <Route path="/reservar" element={<Reservar />} />
            <Route path="/admin-reservas" element={<AdminReservas />} />
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

/* Página temporal */
function Page({ title }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-[#1A1A1A]">{title}</h1>
      <p className="mt-3 text-[#2C3E50]">Contenido próximamente.</p>
    </div>
  );
}
