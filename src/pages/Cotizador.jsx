import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Cotizador() {
  const navigate = useNavigate();
  const [catalogo, setCatalogo] = useState([]);
  const [filtro, setFiltro] = useState("servicios_especiales");
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
    servicios_especiales: catalogo.filter(i => i.categoria === "servicios_especiales"),
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
      style={{ backgroundImage: "url('/images/fondo_inicio.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      <div className="relative z-10">
        {/* Barra superior */}
        <div className="sticky top-0 z-20 backdrop-blur-md bg-white/80 border-b border-slate-200 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight">
              Cotizador <span className="text-indigo-700">TCT Services</span>
            </h1>
            <div className="hidden sm:flex gap-2">
              {["servicios_especiales", "construccion"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFiltro(cat)}
                  className={`px-4 py-2 rounded-2xl font-semibold transition ${
                    filtro === cat
                      ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white shadow-lg"
                      : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                  }`}
                >
                  {cat === "servicios_especiales" ? "Servicios Especiales" : "Construcción"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cuerpo principal */}
        <div className="max-w-6xl mx-auto px-5 py-6 grid md:grid-cols-3 gap-6">
          {/* Panel del cliente */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-6 text-white"
          >
            <h2 className="text-lg sm:text-xl font-semibold mb-4 text-white drop-shadow-sm">
              Información del cliente
            </h2>
            <div className="space-y-4">
              {[
                { name: "nombre", label: "Nombre completo", type: "text", required: true },
                { name: "email", label: "Correo electrónico", type: "email", required: true },
                { name: "telefono", label: "Teléfono", type: "text" },
                { name: "ubicacion", label: "Ubicación / Ciudad", type: "text" },
              ].map((c) => (
                <div key={c.name}>
                  <label className="block text-sm font-medium mb-1 text-white/90">
                    {c.label}
                  </label>
                  <input
                    type={c.type}
                    required={c.required}
                    className="w-full px-4 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-indigo-400 outline-none"
                    value={cliente[c.name] || ""}
                    placeholder={c.label}
                    onChange={(e) =>
                      setCliente((prev) => ({ ...prev, [c.name]: e.target.value }))
                    }
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium mb-1 text-white/90">
                  Tipo de instalación
                </label>
                <select
                  className="w-full px-4 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white focus:ring-2 focus:ring-indigo-400 outline-none"
                  value={cliente.tipo}
                  onChange={(e) => setCliente((prev) => ({ ...prev, tipo: e.target.value }))}
                >
                  <option value="">Seleccione</option>
                  <option value="Residencial">Residencial</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Industrial">Industrial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-white/90">
                  Mensaje adicional
                </label>
                <textarea
                  className="w-full px-4 py-2.5 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-indigo-400 outline-none h-24 resize-none"
                  value={cliente.mensaje}
                  placeholder="Escriba algún detalle adicional…"
                  onChange={(e) =>
                    setCliente((prev) => ({ ...prev, mensaje: e.target.value }))
                  }
                />
              </div>
            </div>
          </motion.div>

          {/* Catálogo */}
          <div className="md:col-span-2">
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
                  {porCategoria[filtro].map((item) => {
                    const qty = cantidades[item.id] || 0;
                    const activo = qty > 0;

                    return (
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        key={item.id}
                        className={`rounded-2xl p-4 border transition-all duration-300 ${
                          activo
                            ? "border-indigo-400 bg-indigo-200/20 shadow-2xl"
                            : "border-white/20 bg-white/10 shadow-lg hover:shadow-xl"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <h3 className="font-semibold text-white leading-snug text-sm sm:text-base drop-shadow-sm">
                            {item.nombre}
                          </h3>
                          <button
                            onClick={() =>
                              setCantidades((prev) => ({
                                ...prev,
                                [item.id]: activo ? 0 : 1,
                              }))
                            }
                            className={`px-2 py-1 text-xs rounded-lg font-semibold transition ${
                              activo
                                ? "bg-emerald-500 text-white shadow-md"
                                : "bg-white/30 text-white hover:bg-white/50"
                            }`}
                          >
                            {activo ? "✓" : "Agregar"}
                          </button>
                        </div>

                        <label className="block text-xs text-white/80 mt-3">
                          Cantidad ({item.unidad})
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={qty}
                          onChange={(e) => setCantidad(item.id, e.target.value)}
                          className="w-full px-3 py-2 mt-1 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:ring-2 focus:ring-indigo-400 outline-none"
                          placeholder="0"
                        />
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
              className="w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 text-white hover:from-indigo-700 hover:to-blue-600 shadow-lg transition"
            >
              Cotizar ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
