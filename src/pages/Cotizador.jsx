import { useState } from "react";

export default function Cotizador() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  function enviar(e) {
    e.preventDefault();
    console.log({ nombre, email, telefono, mensaje });
    alert("Solicitud enviada correctamente (simulación).");
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#1A1A1A] mb-4">Cotizador</h1>
      <p className="text-[#2C3E50] mb-6">
        Envía tu solicitud de cotización para sistemas especiales:
        parking, acceso, CCTV, incendio, robo o automatización.
      </p>

      <form onSubmit={enviar} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold">Nombre</label>
          <input
            className="w-full border border-[#BDC3C7] rounded-xl px-3 py-2"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Email</label>
          <input
            type="email"
            className="w-full border border-[#BDC3C7] rounded-xl px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Teléfono</label>
          <input
            className="w-full border border-[#BDC3C7] rounded-xl px-3 py-2"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold">Mensaje</label>
          <textarea
            className="w-full border border-[#BDC3C7] rounded-xl px-3 py-2"
            rows="4"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-6 py-3 bg-[#0D3B66] text-white font-semibold rounded-2xl hover:bg-[#1B4F72]"
        >
          Enviar cotización
        </button>
      </form>
    </section>
  );
}
