import React, { useMemo, useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BASE = import.meta.env.BASE_URL;
const srcPath = (name) => `${BASE}images/${name}`;

// Categorías principales
const CATEGORIAS = [
  { id: "todas", label: "Todas" },
  { id: "parking", label: "Sistema de Estacionamiento" },
  { id: "acceso", label: "Control de Acceso" },
  { id: "marcacion", label: "Sistema de Marcación" },
  { id: "cctv", label: "CCTV" },
  { id: "incendio", label: "Alarma de Incendio" },
  { id: "robo", label: "Alarma de Robo" },
  { id: "domotica", label: "Automatización / Casa Inteligente" },
];

// Información por categoría
const CATEGORIA_INFO = {
  parking: {
    titulo: "Parking que cobra solo, fluye solo y reporta todo",
    texto:
      "Optimiza entradas y salidas, elimina filas y controla la caja al centavo. Barreras, tiqueteras y software en una sola plataforma.",
    subcats: ["Software", "Barreras", "Tiqueteras", "Cobro"],
  },
  acceso: {
    titulo: "Acceso inteligente: rápido, seguro y auditable",
    texto:
      "Biometría, credenciales y móvil en una misma solución. Perfiles por horario, visitantes y trazabilidad total.",
    subcats: ["Lectoras", "Controladoras", "Integraciones"],
  },
  marcacion: {
    titulo: "Marcación exacta, nómina sin dolores",
    texto:
      "Biométrico, QR y app con ubicación. Turnos, retardos y reportes listos para exportar a nómina.",
    subcats: ["Biométrico", "QR", "Reportes"],
  },
  cctv: {
    titulo: "CCTV 4K con analítica que ve y entiende",
    texto:
      "Vigilancia IP 4K, acceso móvil y analítica de video para detectar lo importante y actuar a tiempo.",
    subcats: ["IP 4K", "App Móvil", "Perimetral", "Integración"],
  },
  incendio: {
    titulo: "Incendio direccionable con cumplimiento NFPA",
    texto:
      "Diseño, memoria de cálculo y pruebas. Detectores, estrobos y sirenas con respaldo documental.",
    subcats: ["Direccionable", "Dispositivos", "Pruebas"],
  },
  robo: {
    titulo: "Alarma de robo que disuade y notifica",
    texto:
      "Zonas y particiones con sensores perimetrales e interiores. App, automatizaciones y reporte a central.",
    subcats: ["Sensores", "Perímetro", "Particiones"],
  },
  domotica: {
    titulo: "Casa inteligente: escenas, confort y ahorro",
    texto:
      "Controla luces, clima y cerraduras desde app o voz. Escenas que elevan la experiencia y reducen consumo.",
    subcats: ["Escenas", "Cerraduras", "Control Total"],
  },
};

// Datos
const items = [
  { id:"parking-sw-01", titulo:"Software de manejo de parking", categorias:["parking"], subcat:"Software", fecha:"2024-06-10", ubicacion:"Panamá", src: srcPath("Sistema_de_parking.jpg") },
  { id:"parking-bar-01", titulo:"Barreras de control vehicular", categorias:["parking"], subcat:"Barreras", fecha:"2024-06-10", ubicacion:"Panamá", src: srcPath("Barreras.png") },
  { id:"parking-tiq-01", titulo:"Tiqueteras y receptoras", categorias:["parking"], subcat:"Tiqueteras", fecha:"2024-06-10", ubicacion:"Panamá", src: srcPath("Tiquetera.png") },
  { id:"parking-cob-01", titulo:"Estación de cobro", categorias:["parking"], subcat:"Cobro", fecha:"2024-06-10", ubicacion:"Panamá", src: srcPath("Estacion_de_cobro.png") },
  { id:"acceso-lect-03", titulo:"Tipos de lectoras", categorias:["acceso"], subcat:"Lectoras", fecha:"2024-03-02", ubicacion:"Panamá", src: srcPath("Control_de_acceso.png") },
  { id:"acceso-con-04", titulo:"Control con controladora y software", categorias:["acceso"], subcat:"Controladoras", fecha:"2024-03-02", ubicacion:"Panamá", src: srcPath("Integracion_de_control_de_acceso.png") },
  { id:"marc-01", titulo:"Reloj biométrico con app", categorias:["marcacion"], subcat:"Biométrico", fecha:"2024-05-20", ubicacion:"Panamá", src: srcPath("marcacion_biometrico_app.png") },
  { id:"marc-02", titulo:"Marcación QR para visitantes", categorias:["marcacion"], subcat:"QR", fecha:"2024-06-02", ubicacion:"Costa del Este", src: srcPath("marcacion_qr.png") },
  { id:"marc-03", titulo:"Integración nómina y reportes", categorias:["marcacion"], subcat:"Reportes", fecha:"2024-03-28", ubicacion:"Clayton", src: srcPath("marcacion_reportes.png") },
  { id:"cctv-01", titulo:"Sistema CCTV IP 4K con NVR", categorias:["cctv"], subcat:"IP 4K", fecha:"2024-04-20", ubicacion:"Ciudad de Panamá", src: srcPath("cctv_ip_4k.png") },
  { id:"cctv-02", titulo:"Monitoreo remoto con aplicación móvil", categorias:["cctv"], subcat:"App Móvil", fecha:"2024-05-10", ubicacion:"Costa del Este", src: srcPath("cctv_app_movil.png") },
  { id:"cctv-04", titulo:"Videovigilancia perimetral con analítica", categorias:["cctv"], subcat:"Perimetral", fecha:"2024-07-08", ubicacion:"Clayton", src: srcPath("cctv_perimetral_analitica.png") },
  { id:"cctv-06", titulo:"Integración CCTV con control de acceso", categorias:["cctv"], subcat:"Integración", fecha:"2024-08-15", ubicacion:"San Francisco", src: srcPath("cctv_integracion_acceso.png") },
];

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

export default function PortfolioGaleria() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cat, setCat] = useState(searchParams.get("cat") || "todas");
  const [sub, setSub] = useState(searchParams.get("sub") || "todas");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStart, setDragStart] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => setSub("todas"), [cat]);

  useEffect(() => {
    const params = {};
    if (cat !== "todas") params.cat = cat;
    if (sub !== "todas") params.sub = sub;
    setSearchParams(params, { replace: true });
  }, [cat, sub, setSearchParams]);

  const data = useMemo(() => {
    let arr = [...items];
    if (cat !== "todas") arr = arr.filter((i) => i.categorias.includes(cat));
    if (sub !== "todas") arr = arr.filter((i) => (i.subcat || "").toLowerCase() === sub.toLowerCase());
    return arr;
  }, [cat, sub]);

  // autoplay
  useEffect(() => {
    if (!data.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [data.length]);

  // drag handlers (mouse & touch)
  const handleDragStart = (e) => {
    setDragStart(e.touches ? e.touches[0].clientX : e.clientX);
  };
  const handleDragEnd = (e) => {
    if (dragStart == null) return;
    const endX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const diff = endX - dragStart;
    if (Math.abs(diff) > 50) {
      setCurrentIndex((prev) => (diff > 0 ? (prev - 1 + data.length) % data.length : (prev + 1) % data.length));
    }
    setDragStart(null);
  };

  const next = () => setCurrentIndex((prev) => (prev + 1) % data.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + data.length) % data.length);

  const info = CATEGORIA_INFO[cat];

  return (
    <div className="min-h-screen bg-white">
      {/* Cabecera categorías */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#1A1A1A]">
            {cat === "todas" ? "Elige un servicio" : CATEGORIAS.find((c) => c.id === cat)?.label}
          </h1>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {CATEGORIAS.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={classNames(
                  "px-3 py-1.5 rounded-full text-sm whitespace-nowrap",
                  cat === c.id ? "bg-[#C1121F] text-white" : "bg-white text-[#2C3E50] border border-gray-200 hover:bg-gray-50"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Info + subcategorías */}
      {cat !== "todas" && info && (
        <section className="bg-[#0D3B66] text-white">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-2xl md:text-3xl font-extrabold">{info.titulo}</h2>
            <p className="mt-2 text-white/90">{info.texto}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["todas", ...info.subcats].map((s) => (
                <button
                  key={s}
                  onClick={() => setSub(s)}
                  className={classNames(
                    "px-3 py-1.5 rounded-full text-sm border",
                    sub === s ? "bg-white text-[#0D3B66]" : "bg-transparent text-white border-white/50 hover:bg-[#0B3259]"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Carousel fullscreen (desktop) / fallback grid (mobile) */}
      <main
        ref={containerRef}
        className="relative"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {data.length === 0 ? (
          <p className="text-center py-12 text-[#2C3E50]">Sin resultados.</p>
        ) : (
          <>
            <AnimatePresence mode="wait">
              <motion.section
                key={data[currentIndex].id}
                className="relative w-full h-[calc(100vh-220px)] md:h-[calc(100vh-200px)] flex items-center justify-center"
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <img
                  src={data[currentIndex].src}
                  alt={data[currentIndex].titulo}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/55"></div>

                <div className="relative z-10 text-center text-white px-6 py-12 max-w-3xl">
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-4 drop-shadow-lg">
                    {data[currentIndex].titulo}
                  </h3>
                  <p className="text-white/90 mb-6">
                    {data[currentIndex].subcat} • {data[currentIndex].ubicacion}
                  </p>

                  <Link
                    to={`/cotizador?mensaje=${encodeURIComponent(`Hola, estoy interesado en: ${data[currentIndex].titulo}`)}`}
                    className="px-6 py-3 rounded-full bg-[#C1121F] text-white font-semibold text-lg shadow-lg hover:bg-[#A10E1A] transition"
                  >
                    Cotizar ahora
                  </Link>
                </div>

                <button
                  onClick={prev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition hidden md:inline-flex"
                  aria-label="Anterior"
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={next}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-3 rounded-full transition hidden md:inline-flex"
                  aria-label="Siguiente"
                >
                  <FaChevronRight size={20} />
                </button>
              </motion.section>
            </AnimatePresence>

            {/* Mobile: horizontal scroll list */}
            <div className="md:hidden px-4 py-6">
              <ul className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {data.map((it, i) => (
                  <li key={it.id} className="min-w-[260px] snap-center rounded-xl overflow-hidden border border-gray-200">
                    <img src={it.src} alt={it.titulo} className="w-full h-40 object-cover" />
                    <div className="p-3 bg-white">
                      <h4 className="font-semibold text-sm">{it.titulo}</h4>
                      <p className="text-xs text-gray-500">{it.subcat} • {it.ubicacion}</p>
                      <Link to={`/cotizador?mensaje=${encodeURIComponent(`Hola, estoy interesado en: ${it.titulo}`)}`}
                        className="inline-block mt-3 px-3 py-1.5 text-xs font-semibold rounded-full bg-[#C1121F] text-white">
                        Cotizar
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>

              {/* indicadores móviles */}
              <div className="flex justify-center gap-2 mt-4">
                {data.map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === currentIndex ? "bg-[#C1121F]" : "bg-gray-300"}`} />
                ))}
              </div>
            </div>

            {/* Indicadores desktop */}
            <div className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 gap-2 z-20">
              {data.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Ir a ${i + 1}`}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-3 h-3 rounded-full transition ${i === currentIndex ? "bg-[#C1121F]" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
