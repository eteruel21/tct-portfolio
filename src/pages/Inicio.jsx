import { Link } from "react-router-dom";
import { useSpring, animated, useInView } from "@react-spring/web";
import { useRef } from "react";

const BASE = import.meta.env.BASE_URL;

export default function Inicio() {
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const [inView1, inViewBind1] = useInView({ rootMargin: "-20% 0px" });
  const [inView2, inViewBind2] = useInView({ rootMargin: "-20% 0px" });

  const fadeText = useSpring({
    from: { opacity: 0, y: 60 },
    to: { opacity: inView1 ? 1 : 0, y: inView1 ? 0 : 60 },
    config: { tension: 200, friction: 20 },
  });

  const fadeImage = useSpring({
    from: { opacity: 0, x: 50 },
    to: { opacity: inView2 ? 1 : 0, x: inView2 ? 0 : 50 },
    config: { tension: 200, friction: 22 },
  });

  return (
    <section
      className="relative min-h-[90vh] flex flex-col items-center justify-center text-center text-white"
      style={{
        backgroundImage: `url(${BASE}images/fondo_inicio.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/55"></div>

      {/* Contenido principal */}
      <div className="relative z-10 px-4 max-w-3xl">
        <img
          src={`${BASE}images/logo_tct.png`}
          alt="Logo TCT Services"
          className="mx-auto w-48 md:w-60 mb-6"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Sistemas Especiales que Protegen, Controlan y Automatizan tu Hogar o Empresa
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Parking · Control de Acceso · CCTV · Alarmas · Automatización · Construcción
        </p>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            to="/cotizador"
            className="px-6 py-3 bg-[#C1121F] hover:bg-[#A10E1A] rounded-2xl font-semibold"
          >
            Cotizar ahora
          </Link>
          <Link
            to="/portafolio"
            className="px-6 py-3 bg-[#0D3B66] hover:bg-[#1B4F72] rounded-2xl font-semibold"
          >
            Explorar soluciones
          </Link>
          <Link
            to="/construccion"
            className="px-6 py-3 bg-[#2E8B57] hover:bg-[#256B44] rounded-2xl font-semibold"
          >
            🚧 CONSTRUCCIÓN
          </Link>
        </div>
      </div>

      {/* Sección Construcción animada */}
      <div
        ref={ref1}
        {...inViewBind1}
        className="relative z-10 mt-16 mb-10 max-w-6xl w-full px-4"
      >
        <animated.div
          style={fadeText}
          className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg border border-white/20 flex flex-col md:flex-row items-stretch"
        >
          {/* Texto */}
          <div className="flex-1 p-8 flex flex-col justify-center text-left">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#FFD700] text-center md:text-left">
              ¡Novedad! Servicios de Construcción Profesional
            </h2>
            <p className="text-gray-100 text-base md:text-lg leading-relaxed mb-6">
              En <span className="text-[#FFD700] font-semibold">TCT Services </span>
              realizamos obras civiles, remodelaciones, estructuras metálicas y mantenimiento integral,
              con calidad, cumplimiento y precisión.
            </p>
            <div className="text-center md:text-left">
              <Link
                to="/construccion"
                className="inline-block px-6 py-3 bg-[#C1121F] hover:bg-[#A10E1A] rounded-2xl text-white font-semibold transition"
              >
                Ver detalles de construcción
              </Link>
            </div>
          </div>

          {/* Imagen */}
          <div ref={ref2} {...inViewBind2} className="flex-1 relative group overflow-hidden">
            <animated.img
              style={fadeImage}
              src={`${BASE}images/construccion_destacada.png`}
              alt="Construcción TCT Services"
              className="w-full h-72 md:h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-500">
              <p className="text-white text-lg font-semibold">
                Soluciones Integrales de Construcción
              </p>
            </div>
          </div>
        </animated.div>
      </div>
    </section>
  );
}
