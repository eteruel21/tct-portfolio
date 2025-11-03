import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const preguntas = [
  {
    pregunta: "¿Qué son los sistemas especiales?",
    respuesta:
      "Son soluciones tecnológicas que integran seguridad, automatización y control en hogares o empresas. Incluyen sistemas de alarma, CCTV, control de acceso, detección de incendios y automatización inteligente.",
  },
  {
    pregunta: "¿Ofrecen instalación en todo Panamá?",
    respuesta:
      "Sí. Brindamos servicios en la Ciudad de Panamá y áreas del interior, dependiendo del proyecto. También ofrecemos soporte remoto y mantenimiento preventivo.",
  },
  {
    pregunta: "¿Puedo solicitar una visita técnica antes de cotizar?",
    respuesta:
      "Por supuesto. Una visita técnica permite analizar las condiciones reales del sitio y ofrecer una solución adaptada a tus necesidades específicas.",
  },
  {
    pregunta: "¿Trabajan con marcas reconocidas?",
    respuesta:
      "Sí. Utilizamos equipos de marcas líderes en seguridad y automatización, garantizando calidad, compatibilidad y respaldo técnico.",
  },
  {
    pregunta: "¿Puedo integrar varios sistemas en una sola plataforma?",
    respuesta:
      "Claro. Nuestros proyectos están pensados para integración total: puedes controlar cámaras, accesos, alarmas y luces desde una sola aplicación o panel central.",
  },
];

export default function FAQs() {
  const [active, setActive] = useState(null);

  const toggle = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center text-[#0D3B66] mb-4">
        Preguntas Frecuentes
      </h1>
      <p className="text-center text-[#2C3E50] mb-12">
        Encuentra respuestas a las dudas más comunes sobre nuestros servicios y soluciones.
      </p>

      <div className="space-y-4">
        {preguntas.map((item, idx) => (
          <div
            key={idx}
            className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-[#1A1A1A] hover:bg-gray-50 transition"
            >
              {item.pregunta}
              <span className="text-[#0D3B66] text-lg">
                {active === idx ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence>
              {active === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-4 text-[#2C3E50] text-sm leading-relaxed bg-gray-50"
                >
                  {item.respuesta}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
