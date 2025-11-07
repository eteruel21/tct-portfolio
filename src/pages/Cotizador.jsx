// === src/pages/Cotizador.jsx ===
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cotizador() {
  const navigate = useNavigate();
  const [catalogo, setCatalogo] = useState([]);
  const [filtro, setFiltro] = useState("especiales"); // 'especiales' | 'construccion'
  const [cargando, setCargando] = useState(true);

  // Datos del cliente
  const [cliente, setCliente] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ubicacion: "",
    tipo: "",
    mensaje: "",
  });

  // Selección del usuario: { [itemId]: cantidad }
  const [cantidades, setCantidades] = useState({});

  useEffect(() => {
    let cancel = false;
    (async () => {
      setCargando(true);
      try {
        const res = await fetch("/api/cotizaciones?catalogo=public");
        const data = await res.json();
        if (!cancel) setCatalogo(data.items || []);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancel) setCargando(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  const porCategoria = useMemo(() => {
    return {
      especiales: catalogo.filter(i => i.categoria === "especiales"),
      construccion: catalogo.filter(i => i.categoria === "construccion"),
    };
  }, [catalogo]);

  function setCantidad(id, val) {
    const n = Math.max(0, Number(val));
    setCantidades(prev => ({ ...prev, [id]: n }));
  }

  function toggleAgregar(id) {
    setCantidades(prev => {
      const cur = prev[id] || 0;
      return { ...prev, [id]: cur > 0 ? 0 : 1 };
    });
  }

  const seleccion = useMemo(() => {
    // Solo ítems con cantidad > 0
    return Object.entries(cantidades)
      .filter(([, q]) => Number(q) > 0)
      .map(([id, cantidad]) => ({ id, cantidad: Number(cantidad) }));
  }, [cantidades]);

  async function cotizarAhora(e) {
    e.preventDefault();
    if (seleccion.length === 0) {
      alert("Selecciona al menos un servicio y cantidad.");
      return;
    }
    if (!cliente.nombre || !cliente.email) {
      alert("Completa al menos Nombre y Correo.");
      return;
    }
    try {
      const res = await fetch("/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente, items: seleccion }),
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data);
        alert(data.error || "No se pudo generar la cotización");
        return;
      }
      navigate(`/cotizador/resumen?codigo=${encodeURIComponent(data.codigo)}`);
    } catch (e) {
      console.error(e);
      alert("Error al enviar la cotización");
    }
  }

  const lista = filtro === "especiales" ? porCategoria.especiales : porCategoria.construccion;

  return (
    <section className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Columna izquierda: datos cliente */}
        <div className="md:col-span-1 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-3">Tus datos</h2>
          <div className="space-y-3">
            {[
              { name: "nombre", label: "Nombre completo", type: "text", required: true },
              { name: "email", label: "Correo", type: "email", required: true },
              { name: "telefono", label: "Teléfono", type: "text" },
              { name: "ubicacion", label: "Ubicación / Ciudad", type: "text" },
            ].map(c => (
              <div key={c.name}>
                <label className="block text-sm font-semibold mb-1">{c.label}</label>
                <input
                  type={c.type}
                  required={c.required}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600"
                  value={cliente[c.name] || ""}
                  onChange={e => setCliente(prev => ({ ...prev, [c.name]: e.target.value }))}
                />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold mb-1">Tipo de instalación</label>
              <select
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600"
                value={cliente.tipo}
                onChange={e => setCliente(prev => ({ ...prev, tipo: e.target.value }))}
              >
                <option value="">Seleccione</option>
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
                <option value="Industrial">Industrial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Mensaje</label>
              <textarea
                className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 h-28"
                value={cliente.mensaje}
                onChange={e => setCliente(prev => ({ ...prev, mensaje: e.target.value }))}
              />
            </div>

            <button
              onClick={cotizarAhora}
              className="w-full mt-2 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold py-3 rounded-xl"
            >
              Cotizar ahora
            </button>
          </div>
        </div>

        {/* Columna derecha: catálogo sin precios */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded-xl border ${filtro === "especiales" ? "bg-indigo-700 text-white border-indigo-700" : "bg-white border-slate-300"}`}
              onClick={() => setFiltro("especiales")}
              type="button"
            >
              Servicios Especiales
            </button>
            <button
              className={`px-4 py-2 rounded-xl border ${filtro === "construccion" ? "bg-indigo-700 text-white border-indigo-700" : "bg-white border-slate-300"}`}
              onClick={() => setFiltro("construccion")}
              type="button"
            >
              Construcción
            </button>
          </div>

          {cargando ? (
            <div className="text-slate-600">Cargando servicios…</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {lista.map(item => {
                const qty = cantidades[item.id] || 0;
                return (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold text-slate-800">{item.nombre}</h3>
                        <p className="text-xs text-slate-500">Unidad: {item.unidad}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleAgregar(item.id)}
                        className={`px-3 py-1 rounded-lg text-sm font-semibold ${qty > 0 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-800"}`}
                        title={qty > 0 ? "Quitar" : "Agregar"}
                      >
                        {qty > 0 ? "✓" : "+"}
                      </button>
                    </div>
                    <div className="mt-3">
                      <label className="block text-sm text-slate-700 mb-1">Cantidad</label>
                      <input
                        type="number"
                        min="0"
                        step="1"
                        value={qty}
                        onChange={(e) => setCantidad(item.id, e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-2">
                      El precio no se muestra aquí. Se calculará al generar la cotización.
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
