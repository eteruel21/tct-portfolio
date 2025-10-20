import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio.jsx";
import Cotizador from "./pages/Cotizador.jsx";
import PortfolioGaleria from "./PortfolioGaleria.jsx";
import Nosotros from "./pages/Nosotros.jsx";

const linkBase = "px-3 py-2 rounded-xl text-sm font-semibold transition-colors";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* MENÚ SUPERIOR */}
        <header className="sticky top-0 z-35 bg-white/95 backdrop-blur border-b">
          <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
            {/* Logo principal permanece igual */}
            <NavLink
              to="/"
              className="text-xl font-bold tracking-tight text-[#1A1A1A]"
            >
              TCT <span className="text-[#0D3B66]">Services</span>
            </NavLink>

            {/* Menú de navegación con estilo igual al botón Cotizador */}
            <nav className="flex gap-2 flex-wrap">
              {[
                { path: "/", label: "Inicio" },
                { path: "/portafolio", label: "Portafolio" },
                { path: "/cotizador", label: "Cotizador" },
                { path: "/nosotros", label: "Nosotros" },
                { path: "/faqs", label: "FAQs" },
                { path: "/contacto", label: "Contacto" },
                { path: "/legal", label: "Legal" },
              ].map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `${linkBase} ${
                      isActive
                        ? "bg-[#C1121F] text-white"
                        : "bg-[#0D3B66] text-white hover:bg-[#1B4F72]"
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </header>
      {/* RUTAS */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/portafolio" element={<PortfolioGaleria />} />
          <Route path="/cotizador" element={<Cotizador />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/faqs" element={<Page title="Preguntas Frecuentes" />} />
          <Route path="/contacto" element={<Page title="Contacto" />} />
          <Route path="/legal" element={<Page title="Legal" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* PIE */}
      <footer className="border-t bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-[#2C3E50]">
          © {new Date().getFullYear()} TCT Services - Servicios de Sistemas Especiales. Panamá.
        </div>
      </footer>
    </div>
  );
}

// Página genérica temporal
function Page({ title }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-[#1A1A1A]">{title}</h1>
      <p className="mt-3 text-[#2C3E50]">Contenido próximamente.</p>
    </div>
  );
}
