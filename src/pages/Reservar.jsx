// ...existing code...
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaCheckCircle, FaTrashAlt } from "react-icons/fa";

export default function Reservar() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
  });

  const [codigo, setCodigo] = useState("");
  const [modo, setModo] = useState("nuevo"); // nuevo | buscar | revisar | confirmada | editar
  const [reservaActiva, setReservaActiva] = useState(null);
  const [codigoBusqueda, setCodigoBusqueda] = useState("");
  const [enviando, setEnviando] = useState(false);

  const horasDisponibles = Array.from({ length: 9 }, (_, i) =>
    `${(8 + i).toString().padStart(2, "0")}:00`
  );
  const generarCodigo = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const buscarReserva = () => {
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const encontrada = reservas.find((r) => r.codigo === codigoBusqueda.toUpperCase());
    if (encontrada) {
      setReservaActiva(encontrada);
      setForm(encontrada);
      setModo("editar");
    } else {
      alert("Código no encontrado.");
    }
  };

  const cancelarReserva = () => {
    if (!reservaActiva) return;
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const nuevas = reservas.filter((r) => r.codigo !== reservaActiva.codigo);
    localStorage.setItem("reservas", JSON.stringify(nuevas));
    setReservaActiva(null);
    setCodigoBusqueda("");
    setModo("nuevo");
    alert("Reserva cancelada correctamente.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModo("revisar");
  };

  const enviarReserva = async () => {
    setEnviando(true);
    const nuevoCodigo = reservaActiva?.codigo || generarCodigo();
    const reservas = JSON.parse(localStorage.getItem("reservas") || "[]");
    const nueva = { ...form, codigo: nuevoCodigo };
    const actualizadas = reservaActiva
      ? reservas.map((r) => (r.codigo === nuevoCodigo ? nueva : r))
      : [...reservas, nueva];
    localStorage.setItem("reservas", JSON.stringify(actualizadas));

    try {
      const res = await fetch("/api/reservar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          fecha: form.fecha,
          hora: form.hora,
          codigo: nuevoCodigo,
        }),
      });

      if (!res.ok) {
        const errText = await res.text().catch(() => null);
        console.error("Error respuesta servidor:", res.status, errText);
        throw new Error("Error en el envío al servidor");
      }

      setCodigo(nuevoCodigo);
      setModo("confirmada");
      setReservaActiva(null);
      setForm({ nombre: "", email: "", telefono: "", fecha: "", hora: "" });
    } catch (err) {
      console.error(err);
      alert("Error al enviar la reserva. Intenta nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0D3B66] to-[#1B4F72] flex flex-col items-center justify-center text-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-md text-center"
      >
        <h1 className="text-3xl font-bold mb-6 flex justify-center items-center gap-2">
          <FaCalendarAlt className="text-[#FFD700]" /> Reservar cita
        </h1>

        {modo === "nuevo" && (
          <div className="mb-6">
            <button
              onClick={() => setModo("buscar")}
              className="px-4 py-2 bg-[#FFD700] text-[#0D3B66] rounded-xl font-semibold hover:bg-[#e5c100]"
            >
              Gestionar una cita existente
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {modo === "buscar" && (
            <motion.div key="buscar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <input
                type="text"
                placeholder="Ingresa tu código"
                value={codigoBusqueda}
                onChange={(e) => setCodigoBusqueda(e.target.value.toUpperCase())}
                className="w-full px-3 py-2 rounded-xl text-black text-center font-mono"
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={buscarReserva}
                  className="flex-1 bg-[#FFD700] text-[#0D3B66] py-2 rounded-xl font-semibold hover:bg-[#e5c100]"
                >
                  Buscar
                </button>
                <button
                  onClick={() => setModo("nuevo")}
                  className="flex-1 bg-gray-300 text-black py-2 rounded-xl font-semibold hover:bg-gray-400"
                >
                  Volver
                </button>
              </div>
            </motion.div>
          )}

          {(modo === "nuevo" || modo === "editar") && (
            <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4 text-left">
              {["nombre", "email", "telefono"].map((c) => (
                <div key={c}>
                  <label className="block text-sm font-semibold mb-1 capitalize">{c}</label>
                  <input
                    type={c === "email" ? "email" : "text"}
                    name={c}
                    value={form[c]}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-xl text-black"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-semibold mb-1">Fecha</label>
                <input
                  type="date"
                  name="fecha"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.fecha}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-xl text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Hora</label>
                <select name="hora" value={form.hora} onChange={handleChange} required className="w-full px-3 py-2 rounded-xl text-black">
                  <option value="">Seleccionar hora</option>
                  {horasDisponibles.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                {modo === "editar" && (
                  <button type="button" onClick={cancelarReserva} className="flex-1 py-3 bg-red-500 rounded-xl font-semibold hover:bg-red-600">
                    <FaTrashAlt className="inline mr-1" /> Cancelar
                  </button>
                )}
                <button type="submit" className="flex-1 py-3 bg-[#FFD700] text-[#0D3B66] rounded-xl font-semibold hover:bg-[#e5c100]">
                  Continuar
                </button>
              </div>
            </motion.form>
          )}

          {modo === "revisar" && (
            <motion.div key="revisar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 text-left">
              <h3 className="text-xl font-semibold text-center mb-2">Confirmar datos de cita</h3>
              {Object.entries(form).map(([k, v]) => (
                <p key={k} className="text-gray-100">
                  <span className="font-bold capitalize">{k}:</span> {v}
                </p>
              ))}
              <div className="flex gap-3 mt-4">
                <button onClick={() => setModo(reservaActiva ? "editar" : "nuevo")} className="flex-1 py-3 bg-gray-300 text-black rounded-xl font-semibold hover:bg-gray-400">
                  Editar
                </button>
                <button onClick={enviarReserva} disabled={enviando} className={`flex-1 py-3 rounded-xl font-semibold ${enviando ? "bg-gray-400 cursor-not-allowed" : "bg-[#C1121F] hover:bg-[#A10E1A]"}`}>
                  {enviando ? "Enviando..." : "Confirmar"}
                </button>
              </div>
            </motion.div>
          )}

          {modo === "confirmada" && (
            <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
              <FaCheckCircle className="text-green-400 text-6xl mx-auto" />
              <h2 className="text-xl font-semibold">¡Cita confirmada!</h2>
              <p className="text-gray-100">
                Tu código de reserva: <span className="font-mono text-[#FFD700] text-xl">{codigo}</span>
              </p>
              <p className="text-sm text-gray-300">Guarda este código para modificar o cancelar más adelante.</p>
              <button onClick={() => setModo("nuevo")} className="w-full py-3 bg-[#C1121F] rounded-xl hover:bg-[#A10E1A] font-semibold">
                Nueva reserva
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
// ...existing code...