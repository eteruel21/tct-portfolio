// === src/pages/CotizadorResumen.jsx ===
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

export default function CotizadorResumen() {
  const [sp] = useSearchParams();
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

  if (!codigo) {
    return <div className="p-8 text-red-700">Falta el código de cotización.</div>;
  }
  if (err) {
    return <div className="p-8 text-red-700">{err}</div>;
  }
  if (!data) {
    return <div className="p-8 text-slate-700">Cargando resumen…</div>;
  }

  const { cliente, resumen } = data;

  return (
    <section className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-slate-800">
            Resumen de cotización <span className="text-indigo-700">{data.codigo}</span>
          </h1>
          <Link to="/cotizador" className="text-sm text-indigo-700 hover:underline">Nueva cotización</Link>
        </header>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h2 className="font-semibold text-slate-700 mb-2">Cliente</h2>
            <p><b>Nombre:</b> {cliente.nombre}</p>
            <p><b>Correo:</b> {cliente.email}</p>
            <p><b>Teléfono:</b> {cliente.telefono || "N/D"}</p>
            <p><b>Ubicación:</b> {cliente.ubicacion || "N/D"}</p>
            <p><b>Tipo:</b> {cliente.tipo || "N/D"}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <h2 className="font-semibold text-slate-700 mb-2">Totales</h2>
            <p><b>Subtotal:</b> ${resumen.subtotal.toFixed(2)}</p>
            <p><b>ITBMS 7%:</b> ${resumen.itbms.toFixed(2)}</p>
            <p className="text-lg"><b>Total:</b> ${resumen.total.toFixed(2)}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-100">
                <th className="text-left p-3 border-b border-slate-200">Categoría</th>
                <th className="text-left p-3 border-b border-slate-200">Servicio</th>
                <th className="text-right p-3 border-b border-slate-200">Cant.</th>
                <th className="text-right p-3 border-b border-slate-200">Precio</th>
                <th className="text-right p-3 border-b border-slate-200">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {resumen.detalle.map((d, i) => (
                <tr key={i} className="odd:bg-white even:bg-slate-50">
                  <td className="p-3 border-b border-slate-100 capitalize">
                    {d.categoria === "especiales" ? "Servicios Especiales" : "Construcción"}
                  </td>
                  <td className="p-3 border-b border-slate-100">{d.nombre} ({d.unidad})</td>
                  <td className="p-3 border-b border-slate-100 text-right">{d.cantidad}</td>
                  <td className="p-3 border-b border-slate-100 text-right">${d.precio_unit.toFixed(2)}</td>
                  <td className="p-3 border-b border-slate-100 text-right">${d.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-slate-500">
          Este resultado es un aproximado basado en precios promedio del mercado en Panamá. 
          Puede variar según condiciones reales de obra, accesos, materiales, tiempos y cambios de alcance.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href="#/reservar" // ajusta a tu ruta de agenda/estudio
            className="flex-1 text-center bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl"
          >
            Agendar cita para estudio en sitio
          </a>
          <a
            href={`mailto:${cliente.email}?subject=Cotización ${data.codigo}`}
            className="flex-1 text-center bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-3 rounded-xl"
          >
            Enviar a mi correo
          </a>
        </div>
      </div>
    </section>
  );
}
