import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

// Cambia este número por el tuyo (sin símbolos ni espacios)
const WHATSAPP_NUMBER = "50768608608";

export default function Cotizador() {
  const [searchParams] = useSearchParams();
  const mensajeInicial = searchParams.get("mensaje") || "";
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const texto = `
*Solicitud de cotización* 🧾

*Nombre:* ${formData.nombre}
*Correo:* ${formData.email}
*Teléfono:* ${formData.telefono || "No indicado"}

*Mensaje:*
${formData.mensaje}
    `;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-6">Cotización</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white shadow-md rounded-xl p-6 border border-gray-200"
      >
        <div>
          <label className="block text-sm font-semibold mb-1">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Correo electrónico</label>
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
          <label className="block text-sm font-semibold mb-1">Teléfono</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2"
            placeholder="+507 6xx-xxxx"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Mensaje</label>
          <textarea
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 h-32"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Este campo se llena automáticamente si vienes desde un proyecto.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#25D366] text-white py-3 rounded-xl font-semibold hover:bg-[#1EBE59]"
        >
          Enviar por WhatsApp
        </button>
      </form>
    </section>
  );
}
