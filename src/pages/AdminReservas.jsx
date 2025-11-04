import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaTrashAlt, FaCalendarCheck, FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";

export default function AdminReservas() {
  const [reservas, setReservas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [filtroFecha, setFiltroFecha] = useState("");
  const [clave, setClave] = useState("");
  const [acceso, setAcceso] = useState(false);
  const [cargando, setCargando] = useState(false);

  const CLAVE_ADMIN = "tctadmin2025"; // 🔒 cambia esta clave según tu preferencia

  // --- Obtener reservas desde el backend ---
  const obtenerReservas = async () => {
    try {
      setCargando(true);
      const res = await fetch("/api/reservas");
      const data = await res.json();
      setReservas(data || []);
    } catch (err) {
      console.error("Error cargando reservas:", err);
      alert("Error al cargar reservas.");
    } finally {
      setCargando(false);
    }
  };

  // --- Eliminar una reserva ---
  const eliminarReserva = async (codigo) => {
    if (!window.confirm(`¿Eliminar reserva ${codigo}?`)) return;
    try {
      await fetch("/api/reservas", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo }),
      });
      setReservas((prev) => prev.filter((r) => r.codigo !== codigo));
    } catch (err) {
      console.error("Error al eliminar:", err);
      alert("No se pudo eliminar la reserva.");
    }
  };

  // --- Filtrar resultados ---
  const reservasFiltradas = reservas.filter((r) => {
    const coincideBusqueda =
      r.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.email?.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.codigo?.toLowerCase().includes(busqueda.toLowerCase());
    const coincideFecha = filtroFecha ? r.fecha === filtroFecha : true;
    return coincideBusqueda && coincideFecha;
  });

  // --- Exportar a Excel ---
  const exportarExcel = () => {
    if (reservasFiltradas.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    const hoja = XLSX.utils.json_to_sheet(reservasFiltradas);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, "Reservas");
    XLSX.writeFile(libro, "Reservas_TCT_Services.xlsx");
  };

  useEffect(() => {
    if (acceso) obtenerReservas();
  }, [acceso]);

  // --- Pantalla de autenticación ---
  if (!acceso) {
    return (
      <section className="min-h-screen bg-[#0D3B66] flex flex-col items-center justify-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8 w-full max-w-sm text-center"
        >
          <FaCalendarCheck className="text-[#FFD700] text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Panel de Administración</h2>
          <input
            type="password"
            placeholder="Ingresa la clave de acceso"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            className="w-full px-3 py-2 rounded-xl text-black mb-4 text-center"
          />
          <button
            onClick={() => {
              if (clave === CLAVE_ADMIN) setAcceso(true);
              else alert("Clave incorrecta.");
            }}
            className="w-full bg-[#FFD700] text-[#0D3B66] py-2 rounded-xl font-semibold hover:bg-[#e5c100]"
          >
            Entrar
          </button>
        </motion.div>
      </section>
    );
  }

  // --- Panel de reservas ---
  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0D3B66] to-[#1B4F72] text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-xl p-8"
      >
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold">Reservas registradas</h1>

          <div className="flex flex-wrap gap-3 justify-center md:justify-end">
            <div className="flex items-center gap-2 bg-white/20 rounded-xl px-3 py-2 w-64">
              <FaSearch className="text-white opacity-70" />
              <input
                type="text"
                placeholder="Buscar nombre o código"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="flex-1 bg-transparent outline-none text-white placeholder-gray-300"
              />
            </div>

            <input
              type="date"
              value={filtroFecha}
              onChange={(e) => setFiltroFecha(e.target.value)}
              className="px-3 py-2 rounded-xl text-black"
            />

            <button
              onClick={exportarExcel}
              className="flex items-center gap-2 bg-[#1D8348] hover:bg-[#239B56] px-4 py-2 rounded-xl font-semibold text-white"
            >
              <FaFileExcel /> Exportar
            </button>
          </div>
        </div>

        {/* Tabla de reservas */}
        {cargando ? (
          <p className="text-center text-gray-300">Cargando reservas...</p>
        ) : reservasFiltradas.length === 0 ? (
          <p className="text-center text-gray-400">No hay reservas registradas.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base border-collapse">
              <thead>
                <tr className="bg-[#C1121F]/80 text-white text-left">
                  <th className="py-3 px-4">Código</th>
                  <th className="py-3 px-4">Nombre</th>
                  <th className="py-3 px-4">Correo</th>
                  <th className="py-3 px-4">Teléfono</th>
                  <th className="py-3 px-4">Fecha</th>
                  <th className="py-3 px-4">Hora</th>
                  <th className="py-3 px-4 text-right">Acción</th>
                </tr>
              </thead>
              <tbody>
                {reservasFiltradas.map((r, idx) => (
                  <tr
                    key={r.codigo}
                    className={`hover:bg-white/10 transition ${
                      idx % 2 ? "bg-white/5" : "bg-transparent"
                    }`}
                  >
                    <td className="py-2 px-4 font-mono text-[#FFD700]">{r.codigo}</td>
                    <td className="py-2 px-4">{r.nombre}</td>
                    <td className="py-2 px-4">{r.email}</td>
                    <td className="py-2 px-4">{r.telefono}</td>
                    <td className="py-2 px-4">{r.fecha}</td>
                    <td className="py-2 px-4">{r.hora}</td>
                    <td className="py-2 px-4 text-right">
                      <button
                        onClick={() => eliminarReserva(r.codigo)}
                        className="text-red-400 hover:text-red-600"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </section>
  );
}
