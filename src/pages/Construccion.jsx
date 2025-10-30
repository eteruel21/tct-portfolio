import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE = import.meta.env.BASE_URL;

const proyectos = [
  { id: 1, titulo: "Remodelación de Oficina", img: `${BASE}images/obra1.jpg`, ubicacion: "Ciudad de Panamá" },
  { id: 2, titulo: "Construcción de Vivienda Unifamiliar", img: `${BASE}images/obra2.jpg`, ubicacion: "La Chorrera" },
  { id: 3, titulo: "Ampliación de Bodega Industrial", img: `${BASE}images/obra3.jpg`, ubicacion: "Pacora" },
  { id: 4, titulo: "Diseño y Construcción de Fachada", img: `${BASE}images/obra4.jpg`, ubicacion: "Costa del Este" },
  { id: 5, titulo: "Instalación de Cubierta Metálica", img: `${BASE}images/obra5.jpg`, ubicacion: "Vista Alegre" },
  { id: 6, titulo: "Acabados Interiores Modernos", img: `${BASE}images/obra6.jpg`, ubicacion: "San Miguelito" },
];

export default function Construccion() {
  const [openIndex, setOpenIndex] = useState(-1);

  const close = useCallback(() => setOpenIndex(-1), []);
  const next = useCallback(() => setOpenIndex((i) => (i + 1) % proyectos.length), []);
  const prev = useCallback(() => setOpenIndex((i) => (i - 1 + proyectos.length) % proyectos.length), []);

  // Control por teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, next, prev]);

  return (
    <section className="min-h-screen text-white relative">
      {/* === Encabezado === */}
      <div
        className="relative flex flex-col items-center justify-center min-h-[80vh] text-center"
        style={{
          backgroundImage: `url(${BASE}images/fondo_construccion.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl font-extrabold text-[#FFD700] mb-6 animate-fadeInUp">
            División de Construcción
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
            TCT Services ofrece soluciones completas en construcción: desde obra gris y remodelaciones
            hasta sistemas eléctricos, acabados y proyectos llave en mano.
            <br />
            <br />
            Nuestro compromiso es la excelencia, seguridad y puntualidad en cada obra.
          </p>

          <a
            href="/cotizador?mensaje=Estoy interesado en los servicios de construcción de TCT Services"
            className="inline-block px-8 py-3 bg-[#C1121F] hover:bg-[#A10E1A] rounded-2xl font-semibold shadow-lg"
          >
            Solicitar Cotización
          </a>
        </div>
      </div>

      {/* === Galería === */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white text-[#1A1A1A] py-16 px-6"
      >
        <h2 className="text-3xl font-bold text-center mb-10 text-[#0D3B66]">
          Proyectos Realizados
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map((obra, idx) => (
            <div
              key={obra.id}
              className="group relative overflow-hidden rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition"
              onClick={() => setOpenIndex(idx)}
            >
              <img
                src={obra.img}
                alt={obra.titulo}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white p-4 text-center">
                <h3 className="text-lg font-semibold">{obra.titulo}</h3>
                <p className="text-sm text-gray-200 mt-1">{obra.ubicacion}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* === Visor (Lightbox) === */}
      <AnimatePresence>
        {openIndex >= 0 && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={proyectos[openIndex].img}
                alt={proyectos[openIndex].titulo}
                className="w-full h-auto rounded-xl"
              />
              <div className="text-white mt-3 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold">{proyectos[openIndex].titulo}</h3>
                  <p className="text-sm text-gray-300">{proyectos[openIndex].ubicacion}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prev}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded"
                    aria-label="Anterior"
                  >
                    ←
                  </button>
                  <button
                    onClick={next}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded"
                    aria-label="Siguiente"
                  >
                    →
                  </button>
                  <button
                    onClick={close}
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded"
                    aria-label="Cerrar"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
