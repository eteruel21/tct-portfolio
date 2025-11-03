import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaInstagram, FaEnvelope, FaCheckCircle } from "react-icons/fa";

export default function Contacto() {
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        data.append("_captcha", "false"); // sin verificación
        data.append("_template", "box"); // diseño más bonito del correo

        await fetch("https://formsubmit.co/ajax/contacto@tctservices-pty.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData),
        });

        setEnviado(true);
        setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
    } catch (err) {
        alert("Error al enviar. Verifica tu conexión o intenta más tarde.");
    }
};

  return (
    <section className="max-w-5xl mx-auto px-6 py-16">
      {/* ENCABEZADO */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-[#0D3B66] mb-4">Contáctanos</h1>
        <p className="text-[#2C3E50] text-lg">
          Escríbenos o utiliza cualquiera de los siguientes medios.
        </p>
      </motion.div>

      {/* CONTACTOS */}
      <div className="grid md:grid-cols-3 gap-8 text-center mb-16">
        <a
          href="https://wa.me/50761163672"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 text-[#2C3E50] hover:text-[#25D366] transition"
        >
          <FaWhatsapp className="text-4xl" />
          <p className="font-semibold">+507 6116-3672</p>
          <span className="text-sm opacity-70">WhatsApp</span>
        </a>

        <a
          href="mailto:contacto@tctservices-pty.com"
          className="flex flex-col items-center gap-3 text-[#2C3E50] hover:text-[#C1121F] transition"
        >
          <FaEnvelope className="text-4xl" />
          <p className="font-semibold">contacto@tctservices-pty.com</p>
          <span className="text-sm opacity-70">Correo electrónico</span>
        </a>

        <a
          href="https://instagram.com/tctservices"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-3 text-[#2C3E50] hover:text-[#E4405F] transition"
        >
          <FaInstagram className="text-4xl" />
          <p className="font-semibold">@tctservices</p>
          <span className="text-sm opacity-70">Instagram</span>
        </a>
      </div>

      {/* FORMULARIO */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white shadow-md rounded-2xl p-8 border border-gray-200 max-w-3xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-center text-[#0D3B66] mb-6">
          Envíanos un mensaje
        </h2>

        <AnimatePresence>
          {enviado ? (
            <motion.div
              key="confirmacion"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-2">
                ¡Mensaje enviado con éxito!
              </h3>
              <p className="text-[#2C3E50]">
                Gracias por contactarnos. Te responderemos pronto.
              </p>
              <button
                onClick={() => setEnviado(false)}
                className="mt-6 px-6 py-2 bg-[#0D3B66] text-white rounded-xl hover:bg-[#1B4F72]"
              >
                Enviar otro mensaje
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="formulario"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D3B66]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Correo</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D3B66]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D3B66]"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Mensaje</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows="5"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0D3B66]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-[#C1121F] text-white py-3 rounded-xl font-semibold hover:bg-[#A10E1A] transition"
              >
                Enviar mensaje
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
