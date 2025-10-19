import { Routes, Route, NavLink, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio.jsx";
import Cotizador from "./pages/Cotizador.jsx";
import PortfolioGaleria from "./PortfolioGaleria.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import ProyectoDetalle from "./pages/ProyectoDetalle.jsx";

const linkBase =
  "px-3 py-2 rounded-xl text-sm font-semibold transition-colors";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* ======= MENÚ SUPERIOR ======= */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <NavLink
            to="/"
            className="text-xl font-bold tracking-tight text-[#1A1A1A]"
          >
            TCT <span className="text-[#0D3B66]">Services</span>
          </NavLink>
          <nav className="flex gap-2 flex-wrap">
            <NavLink to="/" className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-[#F4F4F4]" : "hover:bg-[#F4F4F4]"}`
            }>Inicio</NavLink>
            <NavLink to="/portafolio" className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-[#F4F4F4]" : "hover:bg-[#F4F4F4]"}`
            }>Portafolio</NavLink>
            <NavLink to="/cotizador" className={({ isActive }) =>
              `${linkBase} ${isActive
                ? "bg-[#C1121F] text-white"
                : "bg-[#0D3B66] text-white hover:bg-[#1B4F72]"
              }`
            }>Cotizador</NavLink>
            <NavLink to="/nosotros" className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-[#F4F4F4]" : "hover:bg-[#F4F4F4]"}`
            }>Nosotros</NavLink>
            <NavLink to="/faqs" className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-[#F4F4F4]" : "hover:bg-[#F4F4F4]"}`
            }>FAQs</NavLink>
            <NavLink to="/contacto" className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-[#F4F4F4]" : "hover:bg-[#F4F4F4]"}`
            }>Contacto</NavLink>
            <NavLink to="/legal" className={({ isActive }) =>
              `${linkBase} ${isActive ? "bg-[#F4F4F4]" : "hover:bg-[#F4F4F4]"}`
            }>Legal</NavLink>
          </nav>
        </div>
      </header>

      {/* ======= RUTAS ======= */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/portafolio" element={<PortfolioGaleria />} />
          <Route path="/proyecto/:id" element={<ProyectoDetalle />} /> {/* nueva */}
          <Route path="/cotizador" element={<Cotizador />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/" element={<Inicio />} />
          <Route path="/portafolio" element={<PortfolioGaleria />} />
          <Route path="/cotizador" element={<Cotizador />} />
          <Route path="/nosotros" element={<Page title="Nosotros" />} />
          <Route path="/faqs" element={<Page title="Preguntas Frecuentes" />} />
          <Route path="/contacto" element={<Page title="Contacto" />} />
          <Route path="/legal" element={<Page title="Legal" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {/* ======= PIE DE PÁGINA ======= */}
      <footer className="border-t bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-sm text-[#2C3E50]">
          © {new Date().getFullYear()} TCT Services - Servicios de Sistemas Especiales. Panamá.
        </div>
      </footer>
    </div>
  );
}

// === Página genérica temporal ===
function Page({ title }) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-[#1A1A1A]">{title}</h1>
      <p className="mt-3 text-[#2C3E50]">Contenido próximamente.</p>
    </div>
  );
}
