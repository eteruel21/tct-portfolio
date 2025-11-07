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
        // fallback local mínimo
        setCatalogo([
          { id: "cam", categoria: "servicios_especiales", nombre: "Cámaras de seguridad", unidad: "unidad" },
          { id: "alarma", categoria: "servicios_especiales", nombre: "Sistema de alarma", unidad: "sistema" },
          { id: "repello", categoria: "construccion", nombre: "Repello de pared", unidad: "m²" },
          { id: "pintura", categoria: "construccion", nombre: "Pintura monocapa", unidad: "m²" },
        ]);
      } finally {
        setCargando(false);
      }
    })();
  }, []);

  const porCategoria = useMemo(
    () => ({
      servicios_especiales: catalogo.filter((i) => i.categoria === "servicios_especiales"),
      construccion: catalogo.filter((i) => i.categoria === "construccion"),
    }),
    [catalogo]
  );

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
    setCantidades((prev) => ({ ...prev, [id]: n }));
  }

  return (
    <section
      className="min-h-screen relative flex"
      style={{
        backgroundImage:
          "linear-gradient(to bottom, #0D3B66 0%, #1B4F72 100%)",
      }}
    >
      {/* capa */}
      <div className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 w-full">
        {/* Encabezado vidrio */}
        <div className="sticky top-0 z-20 backdrop-blur-xl bg-[#0D3B66]/50 border-b border-white/20 shadow-lg">
          <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
            <h1 className="text-lg sm:text-xl font-semibold text-white tracking-tight">
              Cotizador
            </h1>

            {/* Tabs categoría */}
            <div className="hidden sm:flex gap-2">
              {[
                { key: "servicios_especiales", label: "Servicios Especiales" },
                { key: "construccion", label: "Construcción" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setFiltro(cat.key)}
                  className={`px-3 py-2 rounded-2xl text-sm font-semibold transition border ${
                    filtro === cat.key
                      ? "bg-[#FFD700] text-[#0D3B66] border-[#FFD700] shadow-md"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="max-w-6xl mx-auto px-5 py-6 grid md:grid-cols-3 gap-6"
        >
          {/* Panel cliente: vidrio azul */}
          <div className="md:col-span-1">
            <div className="bg-[#0D3B66]/40 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-5 text-white">
              <h2 className="text-base sm:text-lg font-semibold mb-4">Información del cliente</h2>

              <div className="space-y-4 text-sm">
                {[
                  { name: "nombre", label: "Nombre completo", type: "text", required: true },
                  { name: "email", label: "Correo electrónico", type: "email", required: true },
                  { name: "telefono", label: "Teléfono", type: "text" },
                  { name: "ubicacion", label: "Ubicación / Ciudad", type: "text" },
                ].map((c) => (
                  <div key={c.name}>
                    <label className="block text-[13px] font-medium mb-1 text-white/90">
                      {c.label}
                    </label>
                    <input
                      type={c.type}
                      required={c.required}
                      className="w-full px-3 py-2 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/70 focus:ring-2 focus:ring-[#FFD700] outline-none"
                      value={cliente[c.name] || ""}
                      placeholder={c.label}
                      onChange={(e) => setCliente((prev) => ({ ...prev, [c.name]: e.target.value }))}
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-[13px] font-medium mb-1 text-white/90">
                    Tipo de instalación
                  </label>
                  <select
                    className="w-full px-3 py-2 rounded-xl bg-white/15 border border-white/25 text-white focus:ring-2 focus:ring-[#FFD700] outline-none"
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
                  <label className="block text-[13px] font-medium mb-1 text-white/90">
                    Mensaje adicional
                  </label>
                  <textarea
                    className="w-full px-3 py-2 rounded-xl bg-white/15 border border-white/25 text-white placeholder-white/70 focus:ring-2 focus:ring-[#FFD700] outline-none h-24 resize-none"
                    value={cliente.mensaje}
                    placeholder="Detalle adicional…"
                    onChange={(e) => setCliente((prev) => ({ ...prev, mensaje: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Catálogo vidrio + selección verde */}
          <div className="md:col-span-2">
            {/* Tabs en móvil */}
            <div className="sm:hidden mb-3 flex justify-center gap-2">
              {[
                { key: "servicios_especiales", label: "Servicios Especiales" },
                { key: "construccion", label: "Construcción" },
              ].map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setFiltro(cat.key)}
                  className={`px-3 py-2 rounded-2xl text-xs font-semibold transition border ${
                    filtro === cat.key
                      ? "bg-[#FFD700] text-[#0D3B66] border-[#FFD700] shadow-md"
                      : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {cargando ? (
              <div className="text-white/80 text-center py-10">Cargando servicios…</div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={filtro}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
                >
                  {porCategoria[filtro].map((item) => {
                    const qty = cantidades[item.id] || 0;
                    const activo = qty > 0;

                    return (
                      <motion.div
                        key={item.id}
                        whileHover={{ scale: 1.02 }}
                        className={[
                          "rounded-2xl p-4 transition-all duration-300 border",
                          "bg-white/10 backdrop-blur-lg text-white",
                          "border-white/20 shadow-xl",
                          activo &&
                            "border-emerald-400 bg-emerald-500/20 shadow-[0_0_24px_rgba(16,185,129,0.55)]",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="font-semibold leading-snug text-[15px]">
                            {item.nombre}
                          </h3>

                          <button
                            onClick={() =>
                              setCantidades((prev) => ({
                                ...prev,
                                [item.id]: activo ? 0 : 1,
                              }))
                            }
                            className={`px-2 py-1 text-[12px] rounded-lg font-semibold transition border ${
                              activo
                                ? "bg-emerald-500 text-white border-emerald-500"
                                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
                            }`}
                            title={activo ? "Quitar" : "Agregar"}
                          >
                            {activo ? "✓" : "Agregar"}
                          </button>
                        </div>

                        <label className="block text-[12px] text-white/85 mt-3">
                          Cantidad ({item.unidad})
                        </label>
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={qty}
                          onChange={(e) => setCantidad(item.id, e.target.value)}
                          className={[
                            "w-full px-3 py-2 mt-1 rounded-xl outline-none",
                            "bg-white/15 border border-white/25 text-white placeholder-white/70",
                            "focus:ring-2 focus:ring-[#FFD700]",
                            activo && "border-emerald-400 bg-emerald-500/15",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          placeholder="0"
                        />

                        <p className="text-[11px] text-white/75 mt-2 italic">
                          Los precios se mostrarán en el resumen final.
                        </p>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>

        {/* Barra acción fija inferior vidrio */}
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-[#0D3B66]/70 border-t border-white/20 shadow-lg px-5 py-3">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[13px] sm:text-sm text-white/90">
              {totalSeleccionados === 0
                ? "Selecciona los servicios que deseas cotizar."
                : `${totalSeleccionados} servicio${totalSeleccionados > 1 ? "s" : ""} seleccionado${totalSeleccionados > 1 ? "s" : ""}.`}
            </p>
            <button
              onClick={cotizarAhora}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold bg-[#FFD700] text-[#0D3B66] hover:bg-[#e5c100] transition shadow-md"
            >
              Cotizar ahora
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
