import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CotizadorResumen() {
  const [sp] = useSearchParams();
  const codigo = sp.get("codigo") || "";
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/cotizaciones?codigo=${encodeURIComponent(codigo)}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "No se pudo cargar");
        setData(json);
      } catch (e) {
        setErr(e.message);
      }
    })();
  }, [codigo]);

  if (!codigo)
    return <div className="p-10 text-center text-red-500 font-semibold">Falta el código de cotización.</div>;
  if (err)
    return <div className="p-10 text-center text-red-500 font-semibold">{err}</div>;
  if (!data)
    return <div className="p-10 text-center text-slate-200">Cargando resumen…</div>;

  const { cliente, resumen } = data;

  return (
    <section
      className="min-h-screen bg-gradient-to-b from-[#0D3B66] to-[#1B4F72] flex items-center justify-center py-10 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-5xl w-full bg-[#0D3B66]/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden text-white"
      >
        {/* Encabezado */}
        <header className="bg-[#0D3B66]/80 px-6 py-5 border-b border-white/20 text-center sm:text-left">
          <h1 className="text-2xl font-bold">Cotización</h1>
          <p className="text-sm text-white/80 mt-1">
            Código: <span className="font-semibold text-[#FFD700]">{data.codigo}</span>
          </p>
        </header>

        {/* Cliente + Resumen */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-md">
            <h2 className="font-semibold text-white mb-2">Datos del cliente</h2>
            <ul className="text-sm text-white/90 space-y-1">
              <li><b>Nombre:</b> {cliente.nombre}</li>
              <li><b>Correo:</b> {cliente.email}</li>
              <li><b>Teléfono:</b> {cliente.telefono || "N/D"}</li>
              <li><b>Ubicación:</b> {cliente.ubicacion || "N/D"}</li>
              <li><b>Tipo:</b> {cliente.tipo || "N/D"}</li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 shadow-md">
            <h2 className="font-semibold text-white mb-2">Resumen económico</h2>
            <ul className="text-sm text-white/90 space-y-1">
              <li><b>Subtotal:</b> B/. {resumen.subtotal.toFixed(2)}</li>
              <li><b>ITBMS (7%):</b> B/. {resumen.itbms.toFixed(2)}</li>
              <li className="text-lg font-bold text-[#FFD700] mt-2">
                Total: B/. {resumen.total.toFixed(2)}
              </li>
            </ul>
          </div>
        </div>

        {/* Tabla de detalle */}
        <div className="overflow-x-auto px-6 pb-6">
          <table className="w-full text-sm border-collapse rounded-xl overflow-hidden shadow-sm text-black bg-white/90">
            <thead className="bg-[#FFD700]/80 text-[#0D3B66] font-semibold">
              <tr>
                <th className="p-3 text-left">Categoría</th>
                <th className="p-3 text-left">Servicio</th>
                <th className="p-3 text-right">Cantidad</th>
                <th className="p-3 text-right">Precio</th>
                <th className="p-3 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {resumen.detalle.map((d, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="odd:bg-white even:bg-slate-50 border-b border-slate-200"
                >
                  <td className="p-3 text-slate-700 capitalize">
                    {d.categoria === "servicios_especiales"
                      ? "Servicios Especiales"
                      : "Construcción"}
                  </td>
                  <td className="p-3 text-slate-800">{d.nombre}</td>
                  <td className="p-3 text-right text-slate-800">{d.cantidad}</td>
                  <td className="p-3 text-right text-slate-800">
                    B/. {d.precio_unit.toFixed(2)}
                  </td>
                  <td className="p-3 text-right text-slate-800">
                    B/. {d.subtotal.toFixed(2)}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Nota inferior */}
        <div className="px-6 pb-6 text-black bg-white/90 border-t border-white/20 rounded-b-3xl">
          <p className="text-xs sm:text-sm leading-snug">
            Este monto representa una estimación basada en precios promedio.
            Puede variar según materiales, tiempos y condiciones del sitio.
            Para una evaluación precisa, se recomienda agendar una cita técnica.
          </p>
        </div>

        {/* Botones finales */}
        <div className="border-t border-white/20 bg-[#0D3B66]/70 px-6 py-5 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <Link
            to="/cotizador"
            className="w-full sm:w-auto text-center px-6 py-3 bg-[#FFD700] text-[#0D3B66] font-semibold rounded-2xl hover:bg-[#e5c100] transition shadow-md"
          >
            Volver al cotizador
          </Link>

          <Link
            to={`/reservar?nombre=${encodeURIComponent(cliente.nombre)}&email=${encodeURIComponent(cliente.email)}&telefono=${encodeURIComponent(cliente.telefono)}&motivo=${encodeURIComponent("Cotización " + data.codigo)}&codigo=${encodeURIComponent(data.codigo)}`}
            className="w-full sm:w-auto text-center px-6 py-3 bg-[#C1121F] hover:bg-[#A10E1A] text-white font-semibold rounded-2xl shadow-md transition"
          >
            Agendar cita técnica
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
