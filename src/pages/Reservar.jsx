import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Reservar() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
  });

  const [codigo, setCodigo] = useState("");
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [fechasBloqueadas, setFechasBloqueadas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  // === Detectar fechas llenas (10 reservas por día) ===
  useEffect(() => {
    fetch("/functions/reservas")
      .then((r) => r.json())
      .then((reservas) => {
        const contador = {};
        reservas.forEach((r) => {
          contador[r.fecha] = (contador[r.fecha] || 0) + 1;
        });
        const llenas = Object.entries(contador)
          .filter(([_, cantidad]) => cantidad >= 10)
          .map(([fecha]) => fecha);
        setFechasBloqueadas(llenas);
      });
  }, []);

  // === Cargar horas disponibles al seleccionar fecha ===
  useEffect(() => {
    if (!form.fecha) return;
    if (fechasBloqueadas.includes(form.fecha)) {
      setHorasDisponibles([]);
      return;
    }

    setCargando(true);
    fetch(`/functions/reservas?fecha=${form.fecha}`)
      .then((res) => res.json())
      .then((data) => {
        setHorasDisponibles(data.disponibles || []);
        setCargando(false);
      })
      .catch(() => setCargando(false));
  }, [form.fecha, fechasBloqueadas]);

  // === Generar código aleatorio ===
  const generarCodigo = () => Math.random().toString(36).substring(2, 8).toUpperCase();

  // === Enviar reserva ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.fecha || !form.hora) {
      setMensaje("Completa todos los campos obligatorios.");
      return;
    }

    const nuevoCodigo = generarCodigo();
    setEnviando(true);
    try {
      const res = await fetch("/functions/reservas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, codigo: nuevoCodigo }),
      });
      const data = await res.json();

      if (data.ok) {
        setCodigo(data.codigo);
        setMensaje("Reserva confirmada.");
        setForm({ nombre: "", email: "", telefono: "", fecha: "", hora: "" });
      } else {
        setMensaje(data.error || "Error al guardar la reserva.");
      }
    } catch {
      setMensaje("Error al conectar con el servidor.");
    } finally {
      setEnviando(false);
    }
  };

  // === Convertir fechas bloqueadas a formato Date ===
  const fechasBloqueadasObj = fechasBloqueadas.map((f) => new Date(f));

  // === Deshabilitar domingos ===
  const deshabilitarDias = (date) => {
    const day = date.getDay();
    return day === 0; // 0 = domingo
  };

  return (
    <motion.div
      className="max-w-md mx-auto mt-8 bg-white shadow-lg rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold text-center mb-4 flex items-center justify-center gap-2">
        <FaCalendarAlt /> Reservar cita
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre completo"
          className="w-full border p-2 rounded"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="tel"
          placeholder="Teléfono"
          className="w-full border p-2 rounded"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        />

        <div>
          <p className="font-semibold mb-1">Selecciona una fecha:</p>
          <div className="border rounded-lg p-2 bg-gray-50">
            <DatePicker
              selected={form.fecha ? new Date(form.fecha) : null}
              onChange={(date) => {
                const fechaISO = date.toISOString().split("T")[0];
                setForm({ ...form, fecha: fechaISO });
                setMensaje("");
              }}
              minDate={new Date()}
              excludeDates={fechasBloqueadasObj}
              filterDate={(date) => !deshabilitarDias(date)}
              inline
              disabled={enviando}
            />
          </div>
        </div>

        {form.fecha && !fechasBloqueadas.includes(form.fecha) && (
          <div>
            <p className="font-semibold mb-2">Selecciona una hora:</p>
            {cargando ? (
              <p>Cargando horas...</p>
            ) : horasDisponibles.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {horasDisponibles.map((hora) => (
                  <button
                    key={hora}
                    type="button"
                    className={`p-2 rounded border ${
                      form.hora === hora
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                    onClick={() => setForm({ ...form, hora })}
                  >
                    {hora}
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-red-500">No hay horas disponibles.</p>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={enviando || fechasBloqueadas.includes(form.fecha)}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {enviando ? "Enviando..." : "Confirmar reserva"}
        </button>
      </form>

      <AnimatePresence>
        {mensaje && (
          <motion.p
            key="msg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-4 text-center text-sm text-gray-700"
          >
            {mensaje}
          </motion.p>
        )}
      </AnimatePresence>

      {codigo && (
        <div className="mt-4 text-center">
          <FaCheckCircle className="text-green-500 text-3xl mx-auto mb-2" />
          <p className="font-semibold">Tu código de reserva:</p>
          <p className="text-blue-600 text-lg font-bold">{codigo}</p>
        </div>
      )}
    </motion.div>
  );
}
