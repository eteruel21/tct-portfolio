import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function CotizadorResumen() {
  const [sp] = useSearchParams();
  const navigate = useNavigate();
  const codigo = sp.get("codigo") || "";
  const [data, setData] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch(`/api/cotizaciones?codigo=${encodeURIComponent(codigo)}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "No se pudo cargar");
        if (!cancel) setData(json);
      } catch (e) {
        if (!cancel) setErr(e.message);
      }
    })();
    return () => { cancel = true; };
  }, [codigo]);

  if (!codigo)
    return <div className="p-10 text-center text-red-600 font-semibold">Falta el código de cotización.</div>;
  if (err)
    return <div className="p-10 text-center text-red-600 font-semibold">{err}</div>;
  if (!data)
    return <div className="p-10 text-center text-slate-600">Cargando resumen…</div>;

  const { cliente, resumen } = data;

  // === Manejar redirección a Reservar ===
  function agendarCita() {
    const params = new URLSearchParams({
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono || "",
      motivo: `Cotización ${data.codigo}`,
      codigo: data.codigo,
    });
    navigate(`/reservar?${params.toString()}`);
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-100 to-slate-200 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-5xl mx-auto bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl shadow-xl overflow-hidden"
      >
        {/* Encabezado */}
        <header className="bg-indigo-700 text-white px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl sm:text-2xl font-bold">
            Cotización <span className="text-yellow-300">{data.codigo}</span>
          </h1>
          <p className="text-sm opacity-90 mt-2 sm:mt-0">
            Generada para: <b>{cliente.nombre}</b>
          </p>
        </header>

        {/* Datos cliente */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <h2 className="font-semibold text-slate-700 mb-2">Datos del cliente</h2>
            <ul className="text-sm text-slate-600 space-y-1">
              <li><b>Nombre:</b> {cliente.nombre}</li>
              <li><b>Correo:</b> {cliente.email}</li>
              <li><b>Teléfono:</b> {cliente.telefono || "N/D"}</li>
              <li><b>Ubicación:</b> {cliente.ubicacion || "N/D"}</li>
              <li><b>Tipo:</b> {cliente.tipo || "N/D"}</li>
            </ul>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <h2 className="font-semibold text-slate-700 mb-2">Resumen económico</h2>
            <ul className="text-sm text-slate-600 space-y-1">
              <li><b>Subtotal:</b> ${resumen.subtotal.toFixed(2)}</li>
              <li><b>ITBMS (7%):</b> ${resumen.itbms.toFixed(2)}</li>
              <li className="text-lg font-bold text-slate-800 mt-2">
                Total: ${resumen.total.toFixed(2)}
              </li>
            </ul>
          </div>
        </div>

        {/* Detalle */}
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
                  className="odd:bg-white even:bg-slate-50 border-b border-slate-100"
                >
                  <td className="p-3 capitalize text-slate-600">
                    {d.categoria === "especiales" ? "Servicios Especiales" : "Construcción"}
                  </td>
                  <td className="p-3 text-slate-800">{d.nombre}</td>
                  <td className="p-3 text-right">{d.cantidad}</td>
                  <td className="p-3 text-right">${d.precio_unit.toFixed(2)}</td>
                  <td className="p-3 text-right">${d.subtotal.toFixed(2)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Nota final */}
        <div className="px-6 pb-5">
          <p className="text-xs text-slate-500 leading-snug">
            Este monto representa una estimación basada en precios promedio del mercado en Panamá. 
            Puede variar según materiales, tiempos y condiciones del sitio. 
            Para una evaluación precisa, se recomienda agendar una cita técnica.
          </p>
        </div>

        {/* Botones inferiores */}
        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <Link
            to="/cotizador"
            className="w-full sm:w-auto text-center px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl transition"
          >
            Nueva cotización
          </Link>

          <button
            onClick={agendarCita}
            className="w-full sm:w-auto text-center px-6 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-xl shadow-md transition"
          >
            Agendar cita técnica
          </button>
        </div>
      </motion.div>
    </section>
  );
}
