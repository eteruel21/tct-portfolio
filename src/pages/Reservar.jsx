import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCalendarAlt,
  FaCheckCircle,
  FaTrashAlt,
  FaTimesCircle,
  FaTools,
} from "react-icons/fa";
import confetti from "canvas-confetti";
import { useNavigate } from "react-router-dom";

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
      const res = await fetch(
        `/api/reservas?codigo=${codigoBusqueda.toUpperCase()}`
      );
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
      const libres = todasLasHoras.filter(
        (h) => !data.ocupadas?.includes(h)
      );
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

  // === Enviar o actualizar reserva ===
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

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0D3B66] to-[#1B4F72] flex flex-col items-center justify-center text-white px-6 py-12">
      {/* Botón discreto para Admin */}
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

        {/* --- resto igual --- */}
        <AnimatePresence mode="wait">
          {modo === "nuevo" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6"
            >
              <button
                onClick={() => setModo("buscar")}
                className="px-4 py-2 bg-[#FFD700] text-[#0D3B66] rounded-xl font-semibold hover:bg-[#e5c100]"
              >
                Gestionar una cita existente
              </button>
            </motion.div>
          )}

          {/* Todo el resto del formulario, revisión y confirmación permanece exactamente igual */}
          {/* ... */}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
