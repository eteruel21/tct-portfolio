import { useState, useCallback, useEffect } from "react";
import { useSpring, useTransition, animated } from "@react-spring/web";
import { Link } from "react-router-dom";

const BASE = import.meta.env.BASE_URL;

const proyectos = [
  { id: 1, titulo: "Remodelación de local para restaurante", tipo: "imagen", src: `${BASE}images/obra1.jpg`, ubicacion: "P.H. Kamelia, Vía España, Panamá" },
  { id: 2, titulo: "Adecuación de baño", tipo: "imagen", src: `${BASE}images/obra2.jpg`, ubicacion: "P.H. Kamelia, Vía España, Panamá" },
  { id: 3, titulo: "Acondicionamiento para restaurante", tipo: "imagen", src: `${BASE}images/obra3.jpg`, ubicacion: "P.H. Kamelia, Vía España, Panamá" },
  { id: 4, titulo: "Portón corredizo", tipo: "imagen", src: `${BASE}images/obra4.jpeg`, ubicacion: "Cuatro Altos, Colón" },
  { id: 5, titulo: "Portón y verjas en residencia", tipo: "imagen", src: `${BASE}images/obra5.jpg`, ubicacion: "Villa Lucre, Panamá" },
  { id: 6, titulo: "Construcción de piscina", tipo: "imagen", src: `${BASE}images/obra6.jpg`, ubicacion: "Capira, Panamá Oeste" },
  { id: 7, titulo: "Verjas con diseño", tipo: "imagen", src: `${BASE}images/obra7.jpg`, ubicacion: "Burunga, Panamá Oeste" },
  { id: 8, titulo: "La mejor experiencia en estructura", tipo: "video", src: `${BASE}videos/obra8.mp4`, ubicacion: "Villa Las Fuentes, Panamá" },
  { id: 9, titulo: "Siempre con la mejor eficiencia", tipo: "imagen", src: `${BASE}images/obra9.jpg`, ubicacion: "San Miguelito, Panamá" },
  { id: 10, titulo: "Diseño en interior de sala", tipo: "video", src: `${BASE}videos/obra10.mp4`, ubicacion: "Urbanización El Bosque, Panamá" },
];

export default function Construccion() {
  const [openIndex, setOpenIndex] = useState(-1);

  const close = useCallback(() => setOpenIndex(-1), []);
  const next = useCallback(() => setOpenIndex((i) => (i + 1) % proyectos.length), []);
  const prev = useCallback(() => setOpenIndex((i) => (i - 1 + proyectos.length) % proyectos.length), []);

  // Control de teclado
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close, next, prev]);

  // Animaciones
  const fadeUp = useSpring({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } });

  const transitions = useTransition(openIndex >= 0 ? proyectos[openIndex] : null, {
    from: { opacity: 0, transform: "scale(0.9)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.9)" },
    config: { tension: 200, friction: 18 },
  });

  return (
    <section className="min-h-screen text-white relative">
      {/* === Encabezado === */}
      <div
        className="relative flex flex-col items-center justify-center min-h-[70vh] text-center"
        style={{
          backgroundImage: `url(${BASE}images/fondo_construccion.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 max-w-4xl px-6">
          <h1 className="text-5xl font-extrabold text-[#FFD700] mb-6">
            División de Construcción
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
            TCT Services ofrece soluciones completas en construcción: desde obra gris y remodelaciones
            hasta sistemas eléctricos, acabados y proyectos llave en mano.
            <br />
            <br />
            Nuestro compromiso es la excelencia, seguridad y puntualidad en cada obra.
          </p>

          <Link
            to="/cotizador?mensaje=Estoy interesado en los servicios de construcción de TCT Services"
            className="inline-block px-8 py-3 bg-[#C1121F] hover:bg-[#A10E1A] rounded-2xl font-semibold shadow-lg"
          >
            Solicitar Cotización
          </Link>
        </div>
      </div>

      {/* === Galería === */}
      <animated.div style={fadeUp} className="bg-white text-[#1A1A1A] py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#0D3B66]">
          Proyectos Realizados
        </h2>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proyectos.map((obra, idx) => (
            <div
              key={obra.id}
              className="group relative overflow-hidden rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition cursor-pointer"
              onClick={() => setOpenIndex(idx)}
            >
              {obra.tipo === "video" ? (
                <video
                  src={obra.src}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <img
                  src={obra.src}
                  alt={obra.titulo}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-center items-center text-white p-4 text-center">
                <h3 className="text-lg font-semibold">{obra.titulo}</h3>
                <p className="text-sm text-gray-200 mt-1">{obra.ubicacion}</p>
              </div>
            </div>
          ))}
        </div>
      </animated.div>

      {/* === Lightbox === */}
      {transitions(
        (style, obra) =>
          obra && (
            <animated.div
              style={{ ...style }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={close}
            >
              <div
                className="relative max-w-5xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {obra.tipo === "video" ? (
                  <video
                    src={obra.src}
                    controls
                    autoPlay
                    className="w-full h-auto rounded-xl"
                  />
                ) : (
                  <img
                    src={obra.src}
                    alt={obra.titulo}
                    className="w-full h-auto rounded-xl"
                  />
                )}

                <div className="text-white mt-3 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-semibold">{obra.titulo}</h3>
                    <p className="text-sm text-gray-300">{obra.ubicacion}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={prev} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded">←</button>
                    <button onClick={next} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded">→</button>
                    <button onClick={close} className="px-3 py-2 bg-white/10 hover:bg-white/20 rounded">✕</button>
                  </div>
                </div>
              </div>
            </animated.div>
          )
      )}
    </section>
  );
}
