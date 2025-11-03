import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

export default function Reservar() {
  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    fecha: "",
    hora: "",
  });

  const [codigo, setCodigo] = useState("");
  const [reservas, setReservas] = useState(() =>
    JSON.parse(localStorage.getItem("reservas") || "[]")
  );
  const [confirmada, setConfirmada] = useState(false);

  const horasDisponibles = Array.from({ length: 9 }, (_, i) => {
    const hora = 8 + i;
    return `${hora.toString().padStart(2, "0")}:00`;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const generarCodigo = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevoCodigo = generarCodigo();
    const nuevaReserva = { ...form, codigo: nuevoCodigo };
    const nuevas = [...reservas, nuevaReserva];
    setReservas(nuevas);
    localStorage.setItem("reservas", JSON.stringify(nuevas));
    setCodigo(nuevoCodigo);
    setConfirmada(true);
    setForm({ nombre: "", telefono: "", fecha: "", hora: "" });
  };

  const handleModificar = (code) => {
    const reserva = reservas.find((r) => r.codigo === code);
    if (!reserva) return alert("Código no encontrado.");
    setForm(reserva);
    setCodigo(code);
    setConfirmada(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0D3B66] to-[#1B4F72] flex flex-col items-center justify-center text-white px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-md text-center"
      >
        <h1 className="text-3xl font-bold mb-6 flex justify-center items-center gap-2">
          <FaCalendarAlt className="text-[#FFD700]" /> Reservar cita
        </h1>

        <AnimatePresence>
          {confirmada ? (
            <motion.div
              key="confirmada"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <FaCheckCircle className="text-green-400 text-6xl mx-auto" />
              <h2 className="text-xl font-semibold">
                ¡Cita agendada con éxito!
              </h2>
              <p className="text-gray-100">
                Tu código de reserva es:{" "}
                <span className="font-mono text-[#FFD700] text-xl">{codigo}</span>
              </p>
              <p className="text-sm text-gray-300">
                Guárdalo para modificar o cancelar tu cita.
              </p>
              <button
                onClick={() => setConfirmada(false)}
                className="w-full py-3 bg-[#C1121F] rounded-xl hover:bg-[#A10E1A] font-semibold"
              >
                Agendar otra cita
              </button>

              <div className="pt-4 border-t border-white/20">
                <h3 className="font-semibold mb-2">¿Modificar cita?</h3>
                <CodigoBuscar onBuscar={handleModificar} />
              </div>
            </motion.div>
          ) : (
            <motion.form
              key="formulario"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-4 text-left"
            >
              <div>
                <label className="block text-sm font-semibold mb-1">Nombre</label>
                <input
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-xl text-black"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Teléfono</label>
                <input
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-xl text-black"
                />
              </div>

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
                <select
                  name="hora"
                  value={form.hora}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 rounded-xl text-black"
                >
                  <option value="">Seleccionar hora</option>
                  {horasDisponibles.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#FFD700] text-[#0D3B66] rounded-xl font-semibold hover:bg-[#e5c100]"
              >
                Confirmar cita
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

function CodigoBuscar({ onBuscar }) {
  const [code, setCode] = useState("");
  return (
    <div className="space-y-2">
      <input
        type="text"
        placeholder="Ingresa tu código"
        value={code}
        onChange={(e) => setCode(e.target.value.toUpperCase())}
        className="w-full px-3 py-2 rounded-xl text-black text-center font-mono"
      />
      <button
        onClick={() => onBuscar(code)}
        className="w-full py-2 bg-[#FFD700] text-[#0D3B66] rounded-xl font-semibold hover:bg-[#e5c100]"
      >
        Modificar cita
      </button>
    </div>
  );
}
