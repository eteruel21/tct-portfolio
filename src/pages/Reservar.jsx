import { useState, useEffect } from "react";
import { useSpring, useTransition, animated } from "@react-spring/web";
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaTools, FaSolarPanel, FaShieldAlt, FaHome } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

export default function Reservar() {
  const navigate = useNavigate();

  // --- Selector de servicio (anexado) ---
  const [servicio, setServicio] = useState("");
  const servicios = [
    { id: "construccion", nombre: "Construcción", icono: <FaHome /> },
    { id: "sistemas", nombre: "Sistemas Especiales", icono: <FaShieldAlt /> },
    { id: "solar", nombre: "Energía Solar", icono: <FaSolarPanel /> },
    { id: "mantenimiento", nombre: "Mantenimiento", icono: <FaTools /> },
  ];
  // --- fin selector ---

  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
    direccion: "",
    motivo: "",
  });

  const [codigo, setCodigo] = useState("");
  const [modo, setModo] = useState("nuevo");

  const [reservaActiva, setReservaActiva] = useState(null);
  const [codigoBusqueda, setCodigoBusqueda] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [horasDisponibles, setHorasDisponibles] = useState([]);
  const [ocupadas, setOcupadas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [esActualizacion, setEsActualizacion] = useState(false);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const codigoUrl = searchParams.get("codigo");
    const modoUrl = searchParams.get("modo");
    if (codigoUrl && modoUrl === "buscar") {
      setModo("buscar");
      setCodigoBusqueda(codigoUrl.toUpperCase());
    }
  }, []);

  const todasLasHoras = Array.from({ length: 10 }, (_, i) =>
    `${(8 + i).toString().padStart(2, "0")}:00`
  );

  const generarCodigo = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase();

  const esDiaPermitido = (fecha) => {
    const dia = new Date(fecha).getDay();
    return dia >= 1 && dia <= 6;
  };

  const cargarDisponibilidad = async (fecha) => {
    if (!fecha) return;
    setCargando(true);
    try {
      const res = await fetch(`/api/disponibilidad?fecha=${fecha}`);
      const data = await res.json();
      setOcupadas(data.ocupadas || []);
      setHorasDisponibles(todasLasHoras.filter((h) => !data.ocupadas?.includes(h)));
    } catch {
      alert("No se pudo obtener la disponibilidad.");
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    if (name === "fecha") {
      const dia = new Date(value).getDay();
      if (dia === 0 || !esDiaPermitido(value)) {
        alert("Solo se permiten reservas de lunes a sábado.");
        setForm((f) => ({ ...f, fecha: "" }));
        setHorasDisponibles([]);
        return;
      }
      cargarDisponibilidad(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModo("revisar");
  };

  // ✅ FUNCIÓN ELIMINAR RESERVA
  async function eliminarReserva() {
    if (!reservaActiva?.codigo)
      return alert("No hay una reserva activa.");

    if (!window.confirm(`¿Seguro que deseas eliminar la cita ${reservaActiva.codigo}?`))
      return;

    try {
      const res = await fetch("/api/reservas", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo: reservaActiva.codigo }),
      });

      if (!res.ok) throw new Error("Error al eliminar la cita.");

      alert("Cita eliminada correctamente.");
      setModo("cancelada");
      setReservaActiva(null);
      setForm({
        nombre: "",
        email: "",
        telefono: "",
        fecha: "",
        hora: "",
        direccion: "",
        motivo: "",
      });

    } catch (err) {
      console.error(err);
      alert("No se pudo eliminar la cita.");
    }
  }

  // ✅ FUNCIÓN ENVIAR RESERVA (ARREGLADA)
  const enviarReserva = async () => {
    setEnviando(true);

    const nuevoCodigo = reservaActiva?.codigo || generarCodigo();

    try {
      const res = await fetch("/api/reservas", {
        method: reservaActiva ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, codigo: nuevoCodigo }),
      });

      if (!res.ok) throw new Error();

      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });

      setCodigo(nuevoCodigo);
      setModo("confirmada");

      setForm({
        nombre: "",
        email: "",
        telefono: "",
        fecha: "",
        hora: "",
        direccion: "",
        motivo: "",
      });

    } catch {
      alert("Error al procesar la reserva.");
    } finally {
      setEnviando(false);
    }
  };

  const fadeIn = useSpring({ from: { opacity: 0, y: 30 }, to: { opacity: 1, y: 0 } });

  const transitions = useTransition(modo, {
    from: { opacity: 0, transform: "scale(0.97)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.97)" },
    config: { tension: 200, friction: 18 },
  });

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#0D3B66] to-[#1B4F72] flex flex-col items-center justify-center text-white px-6 py-12">
      <button
        onClick={() => navigate("/admin-reservas")}
        title="Acceso técnico"
        className="absolute bottom-2 right-3 text-xs text-gray-400 hover:text-[#FFD700] flex items-center gap-1 opacity-60 hover:opacity-100 transition-all"
      >
        <FaTools className="text-[10px]" /> Panel técnico
      </button>

      <animated.div
        style={fadeIn}
        className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-md text-center"
      >
        <h1 className="text-3xl font-bold mb-6 flex justify-center items-center gap-2">
          <FaCalendarAlt className="text-[#FFD700]" /> Reservar cita
        </h1>

        {/* --- UI selector de servicio anexado --- */}
        <div className="mb-4 text-left">
          <label className="block text-sm font-semibold mb-2 text-white/90">Selecciona un servicio</label>
          <div className="grid grid-cols-2 gap-3">
            {servicios.map((s) => (
              <motion.button
                key={s.id}
                whileTap={{ scale: 0.97 }}
                onClick={() => setServicio(s.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  servicio === s.id
                    ? "bg-[#C1121F] text-white border-[#C1121F]"
                    : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                }`}
              >
                <div className="text-2xl mb-1">{s.icono}</div>
                <span className="text-sm font-medium">{s.nombre}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {servicio && (
              <motion.div
                key="servicio-info"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-3 p-3 rounded-lg bg-white/5 text-sm text-white/90"
              >
                Has seleccionado: <span className="font-semibold">{servicios.find(s => s.id === servicio)?.nombre}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* --- fin selector --- */}

        {modo === "nuevo" && (
          <button
            onClick={() => setModo("buscar")}
            className="px-4 py-2 bg-[#FFD700] text-[#0D3B66] rounded-xl font-semibold hover:bg-[#e5c100]"
          >
            Gestionar una cita existente
          </button>
        )}

        {transitions((style, item) => (
          <animated.div style={style} className="mt-6">
            {item === "buscar" && (
              <div>
                <input
                  type="text"
                  placeholder="Ingresa tu código"
                  value={codigoBusqueda}
                  onChange={(e) => setCodigoBusqueda(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 rounded-xl text-black text-center font-mono"
                />
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={async () => {
                      if (!codigoBusqueda) return alert("Ingresa un código");
                      try {
                        const res = await fetch(`/api/reservas?codigo=${codigoBusqueda}`);
                        if (!res.ok) throw new Error("No encontrada");
                        const data = await res.json();
                        setReservaActiva(data);
                        setForm({
                          nombre: data.nombre || "",
                          email: data.email || "",
                          telefono: data.telefono || "",
                          fecha: data.fecha || "",
                          hora: data.hora || "",
                          direccion: data.direccion || "",
                          motivo: data.motivo || "",
                        });
                        setModo("editar");
                        setEsActualizacion(true);
                      } catch {
                        alert("No se encontró una reserva con ese código.");
                      }
                    }}
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
              </div>
            )}

            {(item === "nuevo" || item === "editar") && (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
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
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Dirección exacta</label>
                  <input
                    type="text"
                    name="direccion"
                    required
                    value={form.direccion}
                    onChange={handleChange}
                    className="w-full px-3 py-2 rounded-xl text-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Motivo</label>
                  <textarea
                    name="motivo"
                    rows="3"
                    value={form.motivo}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 rounded-xl text-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#FFD700] text-[#0D3B66] rounded-xl font-semibold hover:bg-[#e5c100]"
                >
                  Continuar
                </button>

                {esActualizacion && (
                  <button
                    type="button"
                    onClick={eliminarReserva}
                    className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700"
                  >
                    Eliminar cita
                  </button>
                )}
              </form>
            )}

            {item === "revisar" && (
              <div className="space-y-4 text-left">
                <h3 className="text-xl font-semibold text-center mb-2">Confirmar datos de cita</h3>

                {Object.entries(form).map(([k, v]) => (
                  <p key={k}>
                    <span className="font-bold capitalize">{k}:</span> {v}
                  </p>
                ))}

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setModo("nuevo")}
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
                    {enviando ? "Enviando..." : "Confirmar"}
                  </button>
                </div>
              </div>
            )}

            {item === "confirmada" && (
              <div className="space-y-6 text-center">
                <FaCheckCircle className="text-green-400 text-6xl mx-auto" />
                <h2 className="text-xl font-semibold">¡Cita confirmada!</h2>

                <p className="text-gray-100">
                  Tu código:{" "}
                  <span className="font-mono text-[#FFD700] text-xl">{codigo}</span>
                </p>

                <button
                  onClick={() => setModo("nuevo")}
                  className="w-full py-3 bg-[#C1121F] rounded-xl hover:bg-[#A10E1A] font-semibold"
                >
                  Nueva reserva
                </button>
              </div>
            )}

            {item === "cancelada" && (
              <div className="space-y-6 text-center">
                <FaTimesCircle className="text-red-400 text-6xl mx-auto" />

                <h2 className="text-xl font-semibold">¡Reserva cancelada!</h2>

                <p className="text-gray-100">
                  Código:{" "}
                  <span className="font-mono text-[#FFD700] text-xl">{codigo}</span>
                </p>

                <button
                  onClick={() => setModo("nuevo")}
                  className="w-full py-3 bg-[#C1121F] rounded-xl hover:bg-[#A10E1A] font-semibold"
                >
                  Volver al inicio
                </button>
              </div>
            )}

          </animated.div>
        ))}
      </animated.div>
    </section>
  );
}
