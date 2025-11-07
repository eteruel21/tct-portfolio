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
      className="min-h-screen bg-cover bg-center bg-no-repeat relative py-10 px-4"
      style={{ backgroundImage: "url('/images/fondo_inicio.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative z-10 max-w-5xl mx-auto bg-white/80 backdrop-blur-2xl border border-slate-200 rounded-3xl shadow-2xl overflow-hidden"
      >
        <header className="bg-gradient-to-r from-indigo-700 to-blue-600 text-white px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow-md">
          <h1 className="text-2xl font-bold tracking-tight">
            Cotización <span className="text-yellow-300">{data.codigo}</span>
          </h1>
          <p className="text-sm opacity-90 mt-2 sm:mt-0">
            Generada para: <b>{cliente.nombre}</b>
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-slate-700 mb-2">Datos del cliente</h2>
            <ul className="text-sm text-slate-600 space-y-1">
              <li><b>Nombre:</b> {cliente.nombre}</li>
              <li><b>Correo:</b> {cliente.email}</li>
              <li><b>Teléfono:</b> {cliente.telefono || "N/D"}</li>
              <li><b>Ubicación:</b> {cliente.ubicacion || "N/D"}</li>
              <li><b>Tipo:</b> {cliente.tipo || "N/D"}</li>
            </ul>
          </div>
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
            <h2 className="font-semibold text-slate-700 mb-2">Resumen económico</h2>
            <ul className="text-sm text-slate-600 space-y-1">
              <li><b>Subtotal:</b> B/. {resumen.subtotal.toFixed(2)}</li>
              <li><b>ITBMS (7%):</b> B/. {resumen.itbms.toFixed(2)}</li>
              <li className="text-lg font-bold text-slate-800 mt-2">
                Total: B/. {resumen.total.toFixed(2)}
              </li>
            </ul>
          </div>
        </div>

        <div className="overflow-x-auto px-6 pb-6">
          <table className="w-full text-sm border-collapse rounded-xl overflow-hidden shadow-sm">
            <thead className="bg-slate-100 text-slate-700 font-semibold">
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
                  className="odd:bg-white even:bg-slate-50/80 border-b border-slate-100"
                >
                  <td className="p-3 capitalize text-slate-600">
                    {d.categoria === "servicios_especiales" ? "Servicios Especiales" : "Construcción"}
                  </td>
                  <td className="p-3 text-slate-800">{d.nombre}</td>
                  <td className="p-3 text-right">{d.cantidad}</td>
                  <td className="p-3 text-right">B/. {d.precio_unit.toFixed(2)}</td>
                  <td className="p-3 text-right">B/. {d.subtotal.toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 pb-5">
          <p className="text-xs text-slate-500 leading-snug">
            Este monto representa una estimación basada en precios promedio. 
            Puede variar según materiales, tiempos y condiciones del sitio. 
            Para una evaluación precisa, se recomienda agendar una cita técnica.
          </p>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <Link
            to="/cotizador"
            className="w-full sm:w-auto text-center px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-2xl transition"
          >
            Nueva cotización
          </Link>

          <Link
            to={`/reservar?nombre=${encodeURIComponent(cliente.nombre)}&email=${encodeURIComponent(cliente.email)}&telefono=${encodeURIComponent(cliente.telefono)}&motivo=${encodeURIComponent("Cotización " + data.codigo)}&codigo=${encodeURIComponent(data.codigo)}`}
            className="w-full sm:w-auto text-center px-6 py-3 rounded-2xl font-semibold text-white 
                      bg-gradient-to-r from-indigo-700 to-blue-600 
                      hover:from-indigo-800 hover:to-blue-700 
                      shadow-lg transition relative overflow-hidden"
            >
              <span className="relative z-10">Agendar cita técnica</span>
              <motion.span
                className="absolute inset-0 bg-white/20 blur-lg opacity-0"
                whileHover={{ opacity: 0.4, scale: 1.2 }}
                transition={{ duration: 0.4 }}
              />
            </Link>
        </div>
      </motion.div>
    </section>
  );
}
