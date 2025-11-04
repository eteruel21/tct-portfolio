import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaCheckCircle, FaTrashAlt, FaTimesCircle, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

export default function Reservar() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
  });

  const [codigo, setCodigo] = useState("");
  const [modo, setModo] = useState("nuevo"); // nuevo | buscar | revisar | confirmada | editar | cancelada
  const [reservaActiva, setReservaActiva] = useState(null);
  const [codigoBusqueda, setCodigoBusqueda] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [ocupadas, setOcupadas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [esActualizacion, setEsActualizacion] = useState(false);

  // === Generar rango 8:00–17:00 ===
  const todasLasHoras = Array.from({ length: 10 }, (_, i) =>
    `${(8 + i).toString().padStart(2, "0")}:00`
  );

  const generarCodigo = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase();

  // === Solo lunes–sábado ===
  const esDiaPermitido = (fecha) => {
    const dia = new Date(fecha).getDay(); // 0=domingo, 6=sábado
    return dia >= 1 && dia <= 6;
  };

  // === Buscar reserva existente ===
  const buscarReserva = async () => {
    try {
      const res = await fetch(`/api/reservas?codigo=${codigoBusqueda.toUpperCase()}`);
      const data = await res.json();

      if (data && data.codigo) {
        setReservaActiva(data);
        setForm(data);
        setModo("editar");
        setEsActualizacion(true);
        cargarDisponibilidad(data.fecha);
      } else {
        alert("Código no encontrado.");
      }
    } catch (err) {
      console.error("Error al buscar reserva:", err);
      alert("Error al buscar la reserva.");
    }
  };

  // === Cancelar reserva ===
  const cancelarReserva = async () => {
    if (!reservaActiva) return;
    if (!window.confirm("¿Deseas cancelar tu reserva?")) return;

    try {
      await fetch("/api/reservas", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo: reservaActiva.codigo }),
      });
      setCodigo(reservaActiva.codigo);
      setReservaActiva(null);
      setModo("cancelada");
    } catch (err) {
      console.error("Error al cancelar reserva:", err);
      alert("No se pudo cancelar la reserva.");
    }
  };

  // === Cargar disponibilidad según fecha ===
  const cargarDisponibilidad = async (fecha) => {
    if (!fecha) return;
    setCargando(true);
    try {
      const res = await fetch(`/api/disponibilidad?fecha=${fecha}`);
      const data = await res.json(); // { ocupadas: ["09:00","13:00"] }
      setOcupadas(data.ocupadas || []);
      const libres = todasLasHoras.filter((h) => !data.ocupadas?.includes(h));
      setHorasDisponibles(libres);
    } catch (err) {
      console.error("Error al cargar disponibilidad:", err);
      alert("No se pudo obtener la disponibilidad.");
    } finally {
      setCargando(false);
    }
  };

  // === Control de cambios ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    if (name === "fecha") {
      const dia = new Date(value).getDay();
      if (dia === 0) {
        alert("No se permiten reservas los domingos.");
        setForm((f) => ({ ...f, fecha: "" }));
        setHorasDisponibles([]);
        return;
      }
      if (!esDiaPermitido(value)) {
        alert("Solo se permiten reservas de lunes a sábado.");
        setForm((f) => ({ ...f, fecha: "" }));
        setHorasDisponibles([]);
        return;
      }
      cargarDisponibilidad(value);
    }
  };

  // === Confirmar datos antes de enviar ===
  const handleSubmit = (e) => {
    e.preventDefault();
    setModo("revisar");
  };

  // === Enviar o actualizar reserva en Cloudflare D1 ===
  const enviarReserva = async () => {
    setEnviando(true);
    const nuevoCodigo = reservaActiva?.codigo || generarCodigo();

    const datosReserva = {
      nombre: form.nombre,
      email: form.email,
      telefono: form.telefono,
      fecha: form.fecha,
      hora: form.hora,
      codigo: nuevoCodigo,
    };

    try {
      const method = reservaActiva ? "PUT" : "POST";
      const res = await fetch("/api/reservas", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datosReserva),
      });

      if (!res.ok) throw new Error("Error en el envío al servidor");

      // 2️⃣ Crear HTML profesional con botón de gestión
      const dominio = "https://tctservices-pty.com";
      const htmlCorreo = `
        <div style="font-family: Arial, sans-serif; color: #0D3B66; max-width: 600px; margin: auto; border-radius: 12px; overflow: hidden; border: 1px solid #ddd;">
          <div style="background-color: #0D3B66; color: white; text-align: center; padding: 20px;">
            <img src="${dominio}/images/logo_tct.png" alt="TCT Services" style="max-width: 140px; margin-bottom: 10px;" />
            <h2 style="margin: 0;">Confirmación de Cita</h2>
          </div>
          <div style="padding: 20px; background-color: #f9f9f9;">
            <p>Estimado/a <strong>${form.nombre}</strong>,</p>
            <p>Tu cita ha sido registrada exitosamente con los siguientes datos:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Fecha:</strong></td><td>${form.fecha}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Hora:</strong></td><td>${form.hora}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Teléfono:</strong></td><td>${form.telefono}</td></tr>
              <tr><td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Código de reserva:</strong></td>
                <td style="font-family: monospace; color: #C1121F; font-size: 16px;">${nuevoCodigo}</td></tr>
            </table>

            <p style="margin-top: 20px;">Guarda este código para modificar o cancelar tu cita más adelante.</p>

            <div style="text-align: center; margin: 25px 0;">
              <a href="${dominio}/#/reservar" 
                style="background-color: #C1121F; color: white; padding: 12px 20px; border-radius: 8px; text-decoration: none; font-weight: bold;">
                Modificar o cancelar cita
              </a>
            </div>

            <p>Gracias por confiar en <strong>TCT Services</strong>.</p>
          </div>
          <div style="background-color: #FFD700; color: #0D3B66; text-align: center; padding: 10px; font-size: 13px;">
            © ${new Date().getFullYear()} TCT Services — Sistemas Especiales que Protegen y Automatizan
          </div>
        </div>
      `;

      await fetch("https://formsubmit.co/ajax/contacto@tctservices-pty.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: "Confirmación de cita - TCT Services",
          _cc: form.email,
          _template: "box",
          _replyto: form.email,
          _html: htmlCorreo, // <== este es el campo que renderiza HTML
        }),
      });

      setCodigo(nuevoCodigo);
      setModo("confirmada");
      setReservaActiva(null);
      setForm({ nombre: "", email: "", telefono: "", fecha: "", hora: "" });

      // 🎉 Lanza confeti al confirmar
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#FFD700", "#C1121F", "#0D3B66"],
      });
    } catch (err) {
      console.error("Error al enviar reserva:", err);
      alert("Error al procesar la reserva. Intenta nuevamente.");
    } finally {
      setEnviando(false);
    }
  };

  // === INTERFAZ ===
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0D3B66] to-[#1B4F72] flex flex-col items-center justify-center text-white px-6 py-12">
      {/* Botón discreto para panel técnico */}
      <button
      onClick={() => navigate("/admin-reservas")}
      title="Acceso técnico"
      className="absolute bottom-2 right-3 text-xs text-gray-400 hover:text-[#FFD700] flex items-center gap-1 opacity-60 hover:opacity-100 transition-all"
    >
      <FaTools className="text-[10px]" /> Panel técnico
    </button>

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
            <motion.div
              key="buscar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
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
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4 text-left"
            >
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
                <select
                  name="hora"
                  value={form.hora}
                  onChange={handleChange}
                  required
                  disabled={cargando || !form.fecha}
                  className="w-full px-3 py-2 rounded-xl text-black"
                >
                  <option value="">{cargando ? "Cargando..." : "Seleccionar hora"}</option>
                  {horasDisponibles.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </select>
                {ocupadas.length > 0 && (
                  <p className="text-xs text-gray-300 mt-1">
                    Horas no disponibles: {ocupadas.join(", ")}
                  </p>
                )}
              </div>

              <div className="flex gap-2">
                {modo === "editar" && (
                  <button
                    type="button"
                    onClick={cancelarReserva}
                    className="flex-1 py-3 bg-red-500 rounded-xl font-semibold hover:bg-red-600"
                  >
                    <FaTrashAlt className="inline mr-1" /> Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#FFD700] text-[#0D3B66] rounded-xl font-semibold hover:bg-[#e5c100]"
                >
                  Continuar
                </button>
              </div>
            </motion.form>
          )}

          {modo === "revisar" && (
            <motion.div key="revisar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5 text-left">
              <h3 className="text-xl font-semibold text-center mb-2">
                Confirmar datos de cita
              </h3>
              {Object.entries(form).map(([k, v]) => (
                <p key={k} className="text-gray-100">
                  <span className="font-bold capitalize">{k}:</span> {v}
                </p>
              ))}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setModo(reservaActiva ? "editar" : "nuevo")}
                  className="flex-1 py-3 bg-gray-300 text-black rounded-xl font-semibold hover:bg-gray-400"
                >
                  Editar
                </button>
                <button
                  onClick={enviarReserva}
                  disabled={enviando}
                  className={`flex-1 py-3 rounded-xl font-semibold ${
                    enviando
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#C1121F] hover:bg-[#A10E1A]"
                  }`}
                >
                  {enviando
                    ? "Enviando..."
                    : reservaActiva
                    ? "Guardar cambios"
                    : "Confirmar"}
                </button>
              </div>
            </motion.div>
          )}

          {modo === "confirmada" && (
            <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
              <FaCheckCircle className="text-green-400 text-6xl mx-auto" />
              <h2 className="text-xl font-semibold">
                {esActualizacion ? "¡Reserva actualizada!" : "¡Cita confirmada!"}
              </h2>
              <p className="text-gray-100">
                Tu código de reserva:{" "}
                <span className="font-mono text-[#FFD700] text-xl">{codigo}</span>
              </p>
              <p className="text-sm text-gray-300">
                Guarda este código para modificar o cancelar más adelante.
              </p>
              <button
                onClick={() => {
                  setModo("nuevo");
                  setEsActualizacion(false);
                }}
                className="w-full py-3 bg-[#C1121F] rounded-xl hover:bg-[#A10E1A] font-semibold"
              >
                Nueva reserva
              </button>
            </motion.div>
          )}

          {modo === "cancelada" && (
            <motion.div key="cancelada" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center">
              <FaTimesCircle className="text-red-400 text-6xl mx-auto" />
              <h2 className="text-xl font-semibold">¡Reserva cancelada correctamente!</h2>
              <p className="text-gray-100">
                Código cancelado:{" "}
                <span className="font-mono text-[#FFD700] text-xl">{codigo}</span>
              </p>
              <button
                onClick={() => setModo("nuevo")}
                className="w-full py-3 bg-[#C1121F] rounded-xl hover:bg-[#A10E1A] font-semibold"
              >
                Volver al inicio
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
