import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Cotizador() {
  const [searchParams] = useSearchParams();
  const mensajeInicial = searchParams.get("mensaje") || "";
  const BASE = import.meta.env.BASE_URL || "/"; // agrega esto
  
  // Detectar si es móvil
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    servicio: "",
    ubicacion: "",
    tipo: "",
    mensaje: mensajeInicial,
  });

  useEffect(() => {
    if (mensajeInicial) {
      setFormData((prev) => ({ ...prev, mensaje: mensajeInicial }));
    }
  }, [mensajeInicial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const numero = "50761163672";

  const generarMensaje = () => {
    const base = formData.servicio || "uno de los servicios de TCT Services";
    return `
      Hola, soy ${formData.nombre || "un cliente interesado"}.
      Quisiera cotizar el servicio de ${base}.
      Ubicación: ${formData.ubicacion || "No especificada"}.
      Tipo de instalación: ${formData.tipo || "No especificado"}.
      Mensaje adicional: ${formData.mensaje || "N/A"}.
      Correo: ${formData.email || "No indicado"}.
      Teléfono: ${formData.telefono || "No indicado"}.
    `;
  };

  const handleWhatsApp = () => {
    const texto = generarMensaje();
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank");
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center px-4 py-12"
      style={{
        backgroundImage: `url(${BASE}images/fondo_inicio.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Capa oscura para contraste */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Contenedor principal */}
      <div
        className={`
          relative z-10 max-w-3xl w-full 
          bg-white/75 backdrop-blur-lg 
          p-10 rounded-2xl 
          border border-white/40 
          shadow-[0_10px_30px_rgba(255,255,255,0.2)] 
          transform translate-y-10 opacity-0
          ${isMobile ? "animate-fadeInUpSlow" : "animate-fadeInUp"}
          md:hover:translate-y-2 
          md:hover:shadow-[0_20px_60px_rgba(13,59,102,0.45)] 
          transition-all duration-500 ease-out 
          hover:border-[#0D3B66]/60
        `}
      >
      {/* Encabezado */}
        <h1 className="text-3xl font-bold mb-3 text-[#0D3B66] text-center">
          Solicitud de Cotización
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Completa el formulario o contáctanos directamente por WhatsApp.
        </p>
        <div className="flex justify-center mb-6">
          <a
            href={`https://wa.me/${numero}?text=${encodeURIComponent(
              "Hola, deseo información sobre los servicios de TCT Services."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-[#1DA851] transition"
          >
            💬 Atención inmediata por WhatsApp
          </a>
        </div>

        {/* Formulario */}
        <form
          action="https://formsubmit.co/tctservice19@gmail.com"
          method="POST"
          className="space-y-4 bg-white shadow-md rounded-xl p-6 border border-gray-200"
        >
          <input type="hidden" name="_next" value="https://eteruel21.github.io/tct-portfolio/gracias.html" />
          <input type="hidden" name="_captcha" value="false" />

          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Nombre completo
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Email y Teléfono */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Teléfono
              </label>
              <input
                type="text"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
          </div>

          {/* Servicio */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Tipo de servicio
            </label>
            <select
              name="servicio"
              value={formData.servicio}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            >
              <option value="">Seleccione una opción</option>
              <option value="Sistema de Parking">Sistema de Parking</option>
              <option value="Control de Acceso">Control de Acceso</option>
              <option value="CCTV">CCTV</option>
              <option value="Alarma de Incendio">Alarma de Incendio</option>
              <option value="Alarma de Robo">Alarma de Robo</option>
              <option value="Automatización / Casa Inteligente">
                Automatización / Casa Inteligente
              </option>
            </select>
          </div>

          {/* Ubicación y Tipo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Ubicación / Ciudad
              </label>
              <input
                type="text"
                name="ubicacion"
                value={formData.ubicacion}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                Tipo de instalación
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option value="">Seleccione</option>
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>
          </div>

          {/* Mensaje */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Mensaje adicional
            </label>
            <textarea
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 h-32"
            />
          </div>

          {/* Botones */}
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="flex-1 bg-[#0D3B66] text-white py-3 rounded-xl font-semibold hover:bg-[#1B4F72]"
            >
              Enviar por correo
            </button>

            <button
              type="button"
              onClick={handleWhatsApp}
              className="flex-1 bg-[#25D366] text-white py-3 rounded-xl font-semibold hover:bg-[#1DA851]"
            >
              {formData.servicio
                ? `Enviar cotización de ${formData.servicio} por WhatsApp`
                : "Enviar por WhatsApp"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}