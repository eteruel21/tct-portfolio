import React, { useMemo, useState, useEffect, useCallback } from "react";
import { Link, useSearchParams } from "react-router-dom";

const BASE = import.meta.env.BASE_URL;
const srcPath = (name) => `${BASE}images/${name}`;

const CATEGORIAS = [
  { id: "todas", label: "Todas" },
  { id: "parking", label: "Sistema De Estacionamiento" },
  { id: "acceso", label: "Control De Acceso" },
  { id: "marcacion", label: "Sistema De Marcación" },
  { id: "cctv", label: "CCTV" },
  { id: "incendio", label: "Alarma De Incendio" },
  { id: "robo", label: "Alarma De Robo" },
  { id: "domotica", label: "Automatización / Casa Inteligente" },
];

// Ítems del portafolio (imágenes en /public/images/)
const items = [
  // PARKING
  { id:"parking-sw-01", titulo:"Software de manejo de parking", categorias:["parking"], fecha:"2024-06-10", ubicacion:"Panamá", src: srcPath("Sistema_de_parking.jpg") },
  { id:"parking-bar-01", titulo:"Barreras de control vehicular", categorias:["parking"], fecha:"2024-06-10", ubicacion:"Panamá", src: srcPath("Barreras.png") },
  { id:"parking-tiq-01", titulo:"Tiqueteras y receptoras", categorias:["parking"], fecha:"2024-06-10", ubicacion:"Panamá", src: srcPath("Tiquetera.png") },
  { id:"parking-cob-01", titulo:"Estación de cobro", categorias:["parking"], fecha:"2024-06-10", ubicacion:"Panamá", src: srcPath("Estacion_de_cobro.png") },

  // ACCESO
  { id:"acceso-lect-03", titulo:"Tipos de lectoras", categorias:["acceso"], fecha:"2024-03-02", ubicacion:"Panamá", src: srcPath("Control_de_acceso.png") },
  { id:"acceso-con-04", titulo:"Control de acceso con controladora y software", categorias:["acceso"], fecha:"2024-03-02", ubicacion:"Panamá", src: srcPath("Integracion_de_control_de_acceso.png") },

  // MARCACIÓN
  { id:"marc-01", titulo:"Reloj biométrico con app", categorias:["marcacion"], fecha:"2024-05-20", ubicacion:"Panamá", src: srcPath("marcacion_biometrico_app.png") },
  { id:"marc-02", titulo:"Marcación QR para visitantes", categorias:["marcacion"], fecha:"2024-06-02", ubicacion:"Costa del Este", src: srcPath("marcacion_qr.png") },
  { id:"marc-03", titulo:"Integración nómina y reportes", categorias:["marcacion"], fecha:"2024-03-28", ubicacion:"Clayton", src: srcPath("marcacion_reportes.png") },

  // CCTV
  { id:"cctv-01", titulo:"Sistema CCTV IP 4K con NVR", categorias:["cctv"], fecha:"2024-04-20", ubicacion:"Ciudad de Panamá", src: srcPath("cctv_ip_4k.png") },
  { id:"cctv-02", titulo:"Monitoreo remoto con aplicación móvil", categorias:["cctv"], fecha:"2024-05-10", ubicacion:"Costa del Este", src: srcPath("cctv_app_movil.png") },
  { id:"cctv-04", titulo:"Videovigilancia perimetral con analítica", categorias:["cctv"], fecha:"2024-07-08", ubicacion:"Clayton", src: srcPath("cctv_perimetral_analitica.png") },
  { id:"cctv-06", titulo:"Integración CCTV con control de acceso", categorias:["cctv"], fecha:"2024-08-15", ubicacion:"San Francisco", src: srcPath("cctv_integracion_acceso.png") },

  // INCENDIO
  { id:"fire-01", titulo:"Sistema de alarma de incendio direccionable", categorias:["incendio"], fecha:"2024-04-05", ubicacion:"Ciudad de Panamá", src: srcPath("incendio_direccionable.png") },
  { id:"fire-02", titulo:"Detectores, estrobos y sirenas", categorias:["incendio"], fecha:"2024-04-18", ubicacion:"Costa del Este", src: srcPath("incendio_detectores_sirenas.png") },

  // ROBO
  { id:"robo-01", titulo:"Alarma de robo con sensores perimetrales", categorias:["robo"], fecha:"2024-03-15", ubicacion:"Ciudad de Panamá", src: srcPath("robo_sensores_perimetrales.png") },
  { id:"robo-02", titulo:"Instalación de cerco eléctrico", categorias:["robo"], fecha:"2024-04-04", ubicacion:"Costa del Este", src: srcPath("robo_zonas_particiones.png") },

  // DOMÓTICA
  { id:"smarthome-01", titulo:"Escenas de iluminación y clima", categorias:["domotica"], fecha:"2024-07-11", ubicacion:"San Francisco", src: srcPath("domotica_escenas.jpeg") },
  { id:"smarthome-02", titulo:"Cerraduras inteligentes y voz", categorias:["domotica"], fecha:"2024-08-05", ubicacion:"Brisas del Golf", src: srcPath("domotica_cerraduras.jpg") },
  { id:"smarthome-03", titulo:"Control total desde el teléfono", categorias:["domotica"], fecha:"2024-08-05", ubicacion:"Brisas del Golf", src: srcPath("casa_inteligente.png") },
];

function classNames(...c) { return c.filter(Boolean).join(" "); }

function useKey(key, handler) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === key) handler(e); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [key, handler]);
}

export default function PortfolioGaleria() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "todas";

  const [cat, setCat] = useState(initialCat);
  const [q, setQ] = useState("");
  const [orden, setOrden] = useState("recientes");
  const [openIndex, setOpenIndex] = useState(-1);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    if (cat === "todas") sp.delete("cat"); else sp.set("cat", cat);
    const qs = sp.toString();
    window.history.replaceState({}, "", qs ? `?${qs}` : window.location.pathname);
  }, [cat]);

  const data = useMemo(() => {
    let arr = [...items];
    if (cat !== "todas") arr = arr.filter((i) => i.categorias.includes(cat));
    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter((i) => i.titulo.toLowerCase().includes(s) || i.ubicacion.toLowerCase().includes(s));
    }
    arr.sort((a, b) => (orden === "recientes" ? b.fecha.localeCompare(a.fecha) : a.fecha.localeCompare(b.fecha)));
    return arr;
  }, [cat, q, orden]);

  const hasData = data.length > 0;

  const open = useCallback((idx) => setOpenIndex(idx), []);
  const close = useCallback(() => setOpenIndex(-1), []);
  const next = useCallback(() => { if (hasData) setOpenIndex((i) => (i + 1) % data.length); }, [hasData, data.length]);
  const prev = useCallback(() => { if (hasData) setOpenIndex((i) => (i - 1 + data.length) % data.length); }, [hasData, data.length]);

  useKey("Escape", () => openIndex >= 0 && close());
  useKey("ArrowRight", () => openIndex >= 0 && next());
  useKey("ArrowLeft", () => openIndex >= 0 && prev());

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1A1A1A]">Que Deseas?</h1>
            <p className="text-sm md:text-base text-[#2C3E50]">Tecnología que protege, controla y automatiza tu mundo.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIAS.map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={classNames("px-3 py-1.5 rounded-full text-sm border",
                  cat === c.id ? "bg-[#C1121F] text-white border-[#C1121F]" : "bg-white text-[#2C3E50] hover:bg-[#F4F4F4] border-[#BDC3C7]")}
                aria-pressed={cat === c.id}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="search"
              placeholder="Buscar proyecto o ubicación"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-64 px-3 py-2 rounded-xl border border-[#BDC3C7] focus:outline-none focus:ring-2 focus:ring-[#0D3B66]"
            />
            <select value={orden} onChange={(e) => setOrden(e.target.value)} className="px-3 py-2 rounded-xl border border-[#BDC3C7] text-sm" aria-label="Orden">
              <option value="recientes">Más recientes</option>
              <option value="antiguos">Más antiguos</option>
            </select>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {!hasData ? (
          <p className="text-center text-[#2C3E50]">Sin resultados.</p>
        ) : (
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6"
            aria-label="Galería de proyectos"
          >
            {data.map((it, idx) => (
              <li
                key={it.id}
                className="rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white hover:shadow-lg transition-all"
              >
                <figure className="flex flex-col h-full">
                  <img
                    src={it.src}
                    alt={it.titulo}
                    className="w-full h-50 object-cover cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                    loading="lazy"
                    onClick={() => open(idx)}
                    role="button"
                    aria-label={`Abrir ${it.titulo}`}
                  />

                  <figcaption className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-semibold text-[#1A1A1A] text-base md:text-lg">
                        {it.titulo}
                      </h3>
                      <p className="text-xs text-[#2C3E50] opacity-80 mt-1">
                        {it.ubicacion} • {new Date(it.fecha).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="mt-3">
                      <Link
                        to={`/cotizador?mensaje=${encodeURIComponent(
                          `Hola, estoy interesado en el proyecto: ${it.titulo}`
                        )}`}
                        className="px-3 py-1.5 text-xs font-semibold rounded-full bg-[#C1121F] text-white hover:bg-[#A10E1A]"
                      >
                        Cotizar
                      </Link>
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        )}
      </main>

      {openIndex >= 0 && hasData && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={close} role="dialog" aria-modal="true">
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={data[openIndex].src} alt={data[openIndex].titulo} className="w-full h-auto rounded-xl" />
            <div className="mt-3 flex items-center justify-between text-white">
              <div>
                <h3 className="text-lg font-semibold">{data[openIndex].titulo}</h3>
                <p className="text-sm opacity-80">{data[openIndex].ubicacion} • {new Date(data[openIndex].fecha).toLocaleDateString()}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={prev} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20">←</button>
                <button onClick={next} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20">→</button>
                <button onClick={close} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20">Cerrar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer className="max-w-7xl mx-auto px-4 pb-12 text-center">
        <Link to="/cotizador" className="inline-block mt-6 px-6 py-3 rounded-2xl bg-[#0D3B66] text-white font-semibold hover:bg-[#1B4F72]">
          ¿Proyecto similar? Hablemos
        </Link>
      </footer>
    </div>
  );
}
