import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Cotizador() {
  const navigate = useNavigate();
  const [catalogo, setCatalogo] = useState([]);
  const [filtro, setFiltro] = useState("especiales");
  const [cargando, setCargando] = useState(true);

  const [cliente, setCliente] = useState({
    nombre: "",
    email: "",
    telefono: "",
    ubicacion: "",
    tipo: "",
    mensaje: "",
  });

  const [cantidades, setCantidades] = useState({});

  useEffect(() => {
    (async () => {
      setCargando(true);
      try {
        const res = await fetch("/api/cotizaciones?catalogo=public");
        if (!res.ok) throw new Error("No disponible localmente");
        const data = await res.json();
        setCatalogo(data.items || []);
      } catch {
        // catálogo de prueba local
        setCatalogo([
          { id: "cam", categoria: "especiales", nombre: "Cámaras de seguridad", unidad: "unidad" },
          { id: "alarma", categoria: "especiales", nombre: "Sistema de alarma", unidad: "sistema" },
          { id: "repello", categoria: "construccion", nombre: "Repello de pared", unidad: "m²" },
          { id: "pintura", categoria: "construccion", nombre: "Pintura monocapa", unidad: "m²" },
        ]);
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  const porCategoria = useMemo(() => ({
    especiales: catalogo.filter(i => i.categoria === "especiales"),
    construccion: catalogo.filter(i => i.categoria === "construccion"),
  }), [catalogo]);

  const seleccion = useMemo(() => {
    return Object.entries(cantidades)
      .filter(([, q]) => Number(q) > 0)
      .map(([id, cantidad]) => ({ id, cantidad: Number(cantidad) }));
  }, [cantidades]);

  const totalSeleccionados = seleccion.length;

  async function cotizarAhora(e) {
    e.preventDefault();
    if (!cliente.nombre || !cliente.email) {
      alert("Por favor, completa Nombre y Correo.");
      return;
    }
    if (totalSeleccionados === 0) {
      alert("Selecciona al menos un servicio con cantidad.");
      return;
    }

    try {
      const res = await fetch("/api/cotizaciones", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente, items: seleccion }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "No se pudo enviar");
      navigate(`/cotizador/resumen?codigo=${encodeURIComponent(data.codigo)}`);
    } catch (e) {
      console.error(e);
      alert("Error al generar cotización.");
    }
  }

  function setCantidad(id, val) {
    const n = Math.max(0, Number(val));
    setCantidades(prev => ({ ...prev, [id]: n }));
  }

  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: "url('/images/fondo_inicio.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      <div className="relative z-10">
        <div className="sticky top-0 z-20 backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Cotizador TCT <span className="text-indigo-700">Services</span>
            </h1>
            <div className="hidden sm:flex gap-2">
              <button
                onClick={() => setFiltro("especiales")}
                className={`px-4 py-2 rounded-xl font-semibold transition ${
                  filtro === "especiales"
                    ? "bg-indigo-700 text-white"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }`}
              >
                Servicios Especiales
              </button>
              <button
                onClick={() => setFiltro("construccion")}
                className={`px-4 py-2 rounded-xl font-semibold transition ${
                  filtro === "construccion"
                    ? "bg-indigo-700 text-white"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }`}
              >
                Construcción
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-5 py-6 grid md:grid-cols-3 gap-6">
          {/* Panel cliente */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 rounded-2xl shadow-md border border-slate-200 p-6 backdrop-blur"
          >
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Información del cliente
            </h2>
            <div className="space-y-3">
              {[
                { name: "nombre", label: "Nombre completo", type: "text", required: true },
                { name: "email", label: "Correo electrónico", type: "email", required: true },
                { name: "telefono", label: "Teléfono", type: "text" },
                { name: "ubicacion", label: "Ubicación / Ciudad", type: "text" },
              ].map(c => (
                <div key={c.name}>
                  <label className="block text-sm font-semibold mb-1 text-slate-600">{c.label}</label>
                  <input
                    type={c.type}
                    required={c.required}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 outline-none"
                    value={cliente[c.name] || ""}
                    onChange={e => setCliente(prev => ({ ...prev, [c.name]: e.target.value }))}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-semibold mb-1 text-slate-600">Tipo de instalación</label>
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
                <label className="block text-sm font-semibold mb-1 text-slate-600">Mensaje adicional</label>
                <textarea
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 h-24 resize-none"
                  value={cliente.mensaje}
                  onChange={e => setCliente(prev => ({ ...prev, mensaje: e.target.value }))}
                />
              </div>
            </div>
          </motion.div>

          {/* Catálogo */}
          <div className="md:col-span-2">
            <div className="flex sm:hidden justify-center gap-2 mb-3">
              <button
                onClick={() => setFiltro("especiales")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  filtro === "especiales"
                    ? "bg-indigo-700 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                Especiales
              </button>
              <button
                onClick={() => setFiltro("construccion")}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                  filtro === "construccion"
                    ? "bg-indigo-700 text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                Construcción
              </button>
            </div>

            {cargando ? (
              <div className="text-slate-200 text-center py-10">Cargando servicios...</div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={filtro}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {porCategoria[filtro].map(item => {
                    const qty = cantidades[item.id] || 0;
                    const activo = qty > 0;
                    return (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        key={item.id}
                        className={`rounded-2xl p-4 border ${
                          activo
                            ? "border-emerald-500 bg-emerald-50 shadow-md"
                            : "border-slate-200 bg-white/90 shadow-sm"
                        } transition-all`}
                      >
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-slate-800 leading-snug text-sm sm:text-base">
                            {item.nombre}
                          </h3>
                          <button
                            onClick={() =>
                              setCantidades(prev => ({
                                ...prev,
                                [item.id]: activo ? 0 : 1,
                              }))
                            }
                            className={`px-2 py-1 text-xs rounded-lg font-semibold ${
                              activo
                                ? "bg-emerald-600 text-white"
                                : "bg-slate-200 text-slate-700"
                            }`}
                          >
                            {activo ? "✓" : "Agregar"}
                          </button>
                        </div>
                        <label className="block text-xs text-slate-500 mt-3">
                          Cantidad ({item.unidad})
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={qty}
                          onChange={e => setCantidad(item.id, e.target.value)}
                          className="w-full px-3 py-2 mt-1 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-600 outline-none"
                        />
                        <p className="text-[11px] text-slate-400 mt-2">
                          Los precios se mostrarán en el resumen final.
                        </p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* Botón fijo inferior */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 border-t border-slate-200 shadow-md backdrop-blur-md px-5 py-3">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-sm text-slate-700">
              {totalSeleccionados === 0
                ? "Selecciona los servicios que deseas cotizar."
                : `${totalSeleccionados} servicio${totalSeleccionados > 1 ? "s" : ""} seleccionado${totalSeleccionados > 1 ? "s" : ""}.`}
            </p>
            <button
              onClick={cotizarAhora}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-semibold bg-indigo-700 text-white hover:bg-indigo-800 transition"
            >
              Cotizar ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
