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
    return <div className="p-10 text-center text-red-600 font-semibold">Falta el código de cotización.</div>;
  if (err)
    return <div className="p-10 text-center text-red-600 font-semibold">{err}</div>;
  if (!data)
    return <div className="p-10 text-center text-slate-600">Cargando resumen…</div>;

  const { cliente, resumen } = data;

  return (
    <section
      className="min-h-screen bg-gradient-to-b from-[#0D3B66] to-[#1B4F72] flex items-center justify-center py-10 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* ENCABEZADO */}
        <header className="bg-[#0D3B66] text-white px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-md">
          <h1 className="text-2xl font-bold tracking-tight">
            Resumen de cotización <span className="text-[#FFD700]">{data.codigo}</span>
          </h1>
          <p className="text-sm opacity-90 mt-2 sm:mt-0">
            Generada para: <b>{cliente.nombre}</b>
          </p>
        </header>

        {/* DATOS CLIENTE + RESUMEN */}
        <div className="grid md:grid-cols-2 gap-6 p-6 bg-white">
          <div className="border border-slate-200 rounded-2xl p-4 shadow-sm bg-white">
            <h2 className="font-semibold text-slate-800 mb-2">Datos del cliente</h2>
            <ul className="text-sm text-slate-700 space-y-1">
              <li><b>Nombre:</b> {cliente.nombre}</li>
              <li><b>Correo:</b> {cliente.email}</li>
              <li><b>Teléfono:</b> {cliente.telefono || "N/D"}</li>
              <li><b>Ubicación:</b> {cliente.ubicacion || "N/D"}</li>
              <li><b>Tipo:</b> {cliente.tipo || "N/D"}</li>
            </ul>
          </div>

          <div className="border border-slate-200 rounded-2xl p-4 shadow-sm bg-white">
            <h2 className="font-semibold text-slate-800 mb-2">Resumen económico</h2>
            <ul className="text-sm text-slate-700 space-y-1">
              <li><b>Subtotal:</b> B/. {resumen.subtotal.toFixed(2)}</li>
              <li><b>ITBMS (7%):</b> B/. {resumen.itbms.toFixed(2)}</li>
              <li className="text-lg font-bold text-slate-900 mt-2">
                Total: B/. {resumen.total.toFixed(2)}
              </li>
            </ul>
          </div>
        </div>

        {/* TABLA DETALLE */}
        <div className="overflow-x-auto px-6 pb-6 bg-white">
          <table className="w-full text-sm border-collapse rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-slate-100 text-slate-800 font-semibold">
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
                  className={`${i % 2 === 0 ? "bg-white" : "bg-[#f5f5f5]"} border-b border-slate-200`}
                >
                  <td className="p-3 capitalize text-slate-700">
                    {d.categoria === "servicios_especiales" ? "Servicios Especiales" : "Construcción"}
                  </td>
                  <td className="p-3 text-slate-900">{d.nombre}</td>
                  <td className="p-3 text-right text-slate-800">{d.cantidad}</td>
                  <td className="p-3 text-right text-slate-800">B/. {d.precio_unit.toFixed(2)}</td>
                  <td className="p-3 text-right text-slate-900 font-semibold">B/. {d.subtotal.toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* NOTA FINAL */}
        <div className="px-6 pb-6 bg-white">
          <p className="text-xs text-black leading-snug">
            Este monto representa una estimación basada en precios promedio.
            Puede variar según materiales, tiempos y condiciones del sitio.
            Para una evaluación precisa, se recomienda agendar una cita técnica.
          </p>
        </div>

        {/* BOTONES FINALES */}
        <div className="border-t border-slate-200 bg-white px-6 py-5 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <Link
            to="/cotizador"
            className="w-full sm:w-auto text-center px-6 py-3 rounded-2xl font-semibold bg-[#FFD700] text-[#0D3B66] hover:bg-[#e5c100] shadow-md transition"
          >
            Volver al cotizador
          </Link>

          <Link
            to={`/reservar?nombre=${encodeURIComponent(cliente.nombre)}&email=${encodeURIComponent(cliente.email)}&telefono=${encodeURIComponent(cliente.telefono)}&motivo=${encodeURIComponent("Cotización " + data.codigo)}&codigo=${encodeURIComponent(data.codigo)}`}
            className="w-full sm:w-auto text-center px-6 py-3 rounded-2xl font-semibold bg-[#C1121F] text-white hover:bg-[#A10E1A] shadow-md transition"
          >
            Agendar cita técnica
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
