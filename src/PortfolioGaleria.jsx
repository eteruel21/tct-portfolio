import React, { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const BASE = import.meta.env.BASE_URL;
const srcPath = (name) => `${BASE}images/${name}`;

// Categorías principales
const CATEGORIAS = [
  { id: "todas", label: "Todas" },
  { id: "parking", label: "Sistema de Estacionamiento" },
  { id: "acceso", label: "Control de Acceso" },
  { id: "marcacion", label: "Sistema de Marcación" },
  { id: "cctv", label: "CCTV" },
  { id: "incendio", label: "Alarma de Incendio" },
  { id: "robo", label: "Alarma de Robo" },
  { id: "domotica", label: "Automatización / Casa Inteligente" },
];

// Reseña llamativa por categoría + subcategorías
const CATEGORIA_INFO = {
  parking: {
    titulo: "Parking que cobra solo, fluye solo y reporta todo",
    texto:
      "Optimiza entradas y salidas, elimina filas y controla la caja al centavo. Barreras, tiqueteras y software en una sola plataforma.",
    subcats: ["Software", "Barreras", "Tiqueteras", "Cobro"],
  },
  acceso: {
    titulo: "Acceso inteligente: rápido, seguro y auditable",
    texto:
      "Biometría, credenciales y móvil en una misma solución. Perfiles por horario, visitantes y trazabilidad total.",
    subcats: ["Lectoras", "Controladoras", "Integraciones"],
  },
  marcacion: {
    titulo: "Marcación exacta, nómina sin dolores",
    texto:
      "Biométrico, QR y app con ubicación. Turnos, retardos y reportes listos para exportar a nómina.",
    subcats: ["Biométrico", "QR", "Reportes"],
  },
  cctv: {
    titulo: "CCTV 4K con analítica que ve y entiende",
    texto:
      "Vigilancia IP 4K, acceso móvil y analítica de video para detectar lo importante y actuar a tiempo.",
    subcats: ["IP 4K", "App Móvil", "Perimetral", "Integración"],
  },
  incendio: {
    titulo: "Incendio direccionable con cumplimiento NFPA",
    texto:
      "Diseño, memoria de cálculo y pruebas. Detectores, estrobos y sirenas con respaldo documental.",
    subcats: ["Direccionable", "Dispositivos", "Pruebas"],
  },
  robo: {
    titulo: "Alarma de robo que disuade y notifica",
    texto:
      "Zonas y particiones con sensores perimetrales e interiores. App, automatizaciones y reporte a central.",
    subcats: ["Sensores", "Perímetro", "Particiones"],
  },
  domotica: {
    titulo: "Casa inteligente: escenas, confort y ahorro",
    texto:
      "Controla luces, clima y cerraduras desde app o voz. Escenas que elevan la experiencia y reducen consumo.",
    subcats: ["Escenas", "Cerraduras", "Control Total"],
  },
};

// Datos (agrega subcat)
const items = [
  // PARKING
  { id:"parking-sw-01", titulo:"Software de manejo de parking", categorias:["parking"], subcat:"Software", fecha:"2024-06-10", ubicacion:"Panamá", src: srcPath("Sistema_de_parking.jpg") },
  { id:"parking-bar-01", titulo:"Barreras de control vehicular", categorias:["parking"], subcat:"Barreras", fecha:"2024-06-10", ubicacion:"Panamá", src: srcPath("Barreras.png") },
  { id:"parking-tiq-01", titulo:"Tiqueteras y receptoras", categorias:["parking"], subcat:"Tiqueteras", fecha:"2024-06-10", ubicacion:"Panamá", src: srcPath("Tiquetera.png") },
  { id:"parking-cob-01", titulo:"Estación de cobro", categorias:["parking"], subcat:"Cobro", fecha:"2024-06-10", ubicacion:"Panamá", src: srcPath("Estacion_de_cobro.png") },

  // ACCESO
  { id:"acceso-lect-03", titulo:"Tipos de lectoras", categorias:["acceso"], subcat:"Lectoras", fecha:"2024-03-02", ubicacion:"Panamá", src: srcPath("Control_de_acceso.png") },
  { id:"acceso-con-04", titulo:"Control con controladora y software", categorias:["acceso"], subcat:"Controladoras", fecha:"2024-03-02", ubicacion:"Panamá", src: srcPath("Integracion_de_control_de_acceso.png") },

  // MARCACIÓN
  { id:"marc-01", titulo:"Reloj biométrico con app", categorias:["marcacion"], subcat:"Biométrico", fecha:"2024-05-20", ubicacion:"Panamá", src: srcPath("marcacion_biometrico_app.png") },
  { id:"marc-02", titulo:"Marcación QR para visitantes", categorias:["marcacion"], subcat:"QR", fecha:"2024-06-02", ubicacion:"Costa del Este", src: srcPath("marcacion_qr.png") },
  { id:"marc-03", titulo:"Integración nómina y reportes", categorias:["marcacion"], subcat:"Reportes", fecha:"2024-03-28", ubicacion:"Clayton", src: srcPath("marcacion_reportes.png") },

  // CCTV
  { id:"cctv-01", titulo:"Sistema CCTV IP 4K con NVR", categorias:["cctv"], subcat:"IP 4K", fecha:"2024-04-20", ubicacion:"Ciudad de Panamá", src: srcPath("cctv_ip_4k.png") },
  { id:"cctv-02", titulo:"Monitoreo remoto con aplicación móvil", categorias:["cctv"], subcat:"App Móvil", fecha:"2024-05-10", ubicacion:"Costa del Este", src: srcPath("cctv_app_movil.png") },
  { id:"cctv-04", titulo:"Videovigilancia perimetral con analítica", categorias:["cctv"], subcat:"Perimetral", fecha:"2024-07-08", ubicacion:"Clayton", src: srcPath("cctv_perimetral_analitica.png") },
  { id:"cctv-06", titulo:"Integración CCTV con control de acceso", categorias:["cctv"], subcat:"Integración", fecha:"2024-08-15", ubicacion:"San Francisco", src: srcPath("cctv_integracion_acceso.png") },

  // INCENDIO
  { id:"fire-01", titulo:"Alarma de incendio direccionable", categorias:["incendio"], subcat:"Direccionable", fecha:"2024-04-05", ubicacion:"Ciudad de Panamá", src: srcPath("incendio_direccionable.png") },
  { id:"fire-02", titulo:"Detectores, estrobos y sirenas", categorias:["incendio"], subcat:"Dispositivos", fecha:"2024-04-18", ubicacion:"Costa del Este", src: srcPath("incendio_detectores_sirenas.png") },

  // ROBO
  { id:"robo-01", titulo:"Alarma con sensores perimetrales", categorias:["robo"], subcat:"Perímetro", fecha:"2024-03-15", ubicacion:"Ciudad de Panamá", src: srcPath("robo_sensores_perimetrales.png") },
  { id:"robo-02", titulo:"Instalación de cerco eléctrico", categorias:["robo"], subcat:"Sensores", fecha:"2024-04-04", ubicacion:"Costa del Este", src: srcPath("robo_zonas_particiones.png") },

  // DOMÓTICA
  { id:"smarthome-01", titulo:"Escenas de iluminación y clima", categorias:["domotica"], subcat:"Escenas", fecha:"2024-07-11", ubicacion:"San Francisco", src: srcPath("domotica_escenas.jpeg") },
  { id:"smarthome-02", titulo:"Cerraduras inteligentes y voz", categorias:["domotica"], subcat:"Cerraduras", fecha:"2024-08-05", ubicacion:"Brisas del Golf", src: srcPath("domotica_cerraduras.jpg") },
  { id:"smarthome-03", titulo:"Control total desde el teléfono", categorias:["domotica"], subcat:"Control Total", fecha:"2024-08-05", ubicacion:"Brisas del Golf", src: srcPath("casa_inteligente.png") },
];

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

export default function PortfolioGaleria() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("cat") || "todas";

  const [cat, setCat] = useState(initialCat);
  const [sub, setSub] = useState("todas");
  const [q, setQ] = useState("");
  const [orden, setOrden] = useState("recientes");

  // reset sub al cambiar cat
  useEffect(() => setSub("todas"), [cat]);

  // sync querystring con cat y sub
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    cat === "todas" ? sp.delete("cat") : sp.set("cat", cat);
    sub === "todas" ? sp.delete("sub") : sp.set("sub", sub);
    const qs = sp.toString();
    window.history.replaceState({}, "", qs ? `?${qs}` : window.location.pathname);
  }, [cat, sub]);

  const data = useMemo(() => {
    let arr = [...items];
    if (cat !== "todas") arr = arr.filter((i) => i.categorias.includes(cat));
    if (sub !== "todas") arr = arr.filter((i) => (i.subcat || "").toLowerCase() === sub.toLowerCase());
    if (q.trim()) {
      const s = q.toLowerCase();
      arr = arr.filter((i) => i.titulo.toLowerCase().includes(s) || i.ubicacion.toLowerCase().includes(s));
    }
    arr.sort((a, b) => (orden === "recientes" ? b.fecha.localeCompare(a.fecha) : a.fecha.localeCompare(b.fecha)));
    return arr;
  }, [cat, sub, q, orden]);

  const info = CATEGORIA_INFO[cat];

  return (
    <div className="min-h-screen bg-white">
      {/* Header con selector de categoría */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#1A1A1A]">
              {cat === "todas" ? "Elige un servicio" : CATEGORIAS.find((c) => c.id === cat)?.label}
            </h1>
            <p className="text-sm md:text-base text-[#2C3E50]">
              Tecnología que protege, controla y automatiza tu mundo.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[...CATEGORIAS]
              .sort((a, b) => a.label.localeCompare(b.label))
              .map((c) => (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={classNames(
                  "px-3 py-1.5 rounded-full text-sm border",
                  cat === c.id ? "bg-[#C1121F] text-white border-[#C1121F]" : "bg-white text-[#2C3E50] hover:bg-[#F4F4F4] border-[#BDC3C7]"
                )}
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
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="px-3 py-2 rounded-xl border border-[#BDC3C7] text-sm"
              aria-label="Orden"
            >
              <option value="recientes">Más recientes</option>
              <option value="antiguos">Más antiguos</option>
            </select>
          </div>
        </div>
      </header>

      {/* Reseña llamativa + subcategorías */}
      {cat !== "todas" && info && (
        <section className="bg-[#0D3B66] text-white">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <h2 className="text-2xl md:text-3xl font-extrabold">{info.titulo}</h2>
            <p className="mt-2 text-white/90">{info.texto}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                onClick={() => setSub("todas")}
                className={classNames(
                  "px-3 py-1.5 rounded-full text-sm border",
                  sub === "todas" ? "bg-white text-[#0D3B66] border-white" : "bg-[#0D3B66] text-white border-white/40 hover:bg-[#0B3259]"
                )}
              >
                Todas
              </button>
              {info.subcats.map((s) => (
                <button
                  key={s}
                  onClick={() => setSub(s)}
                  className={classNames(
                    "px-3 py-1.5 rounded-full text-sm border",
                    sub === s ? "bg-white text-[#0D3B66] border-white" : "bg-[#0D3B66] text-white border-white/40 hover:bg-[#0B3259]"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Grid de items */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {data.length === 0 ? (
          <p className="text-center text-[#2C3E50]">Sin resultados.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-2" aria-label="Galería de proyectos">
            {data.map((it) => (
              <li key={it.id} className="rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white hover:shadow-lg transition-all">
                <figure className="flex flex-col h-full">
                  <img
                    src={it.src}
                    alt={it.titulo}
                    className="w-full h-56 object-cover"
                    loading="lazy"
                  />
                  <figcaption className="p-4 flex flex-col gap-2 flex-grow">
                    <h3 className="font-semibold text-[#1A1A1A] text-base md:text-lg">{it.titulo}</h3>
                    <p className="text-xs text-[#2C3E50] opacity-80">
                      {it.subcat ? `${it.subcat} • ` : ""}{it.ubicacion} • {new Date(it.fecha).toLocaleDateString()}
                    </p>
                    <div className="mt-auto">
                      <Link
                        to={`/cotizador?mensaje=${encodeURIComponent(`Hola, estoy interesado en: ${it.titulo} (${it.subcat || "General"})`)}`}
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

      <footer className="max-w-7xl mx-auto px-4 pb-12 text-center">
        <Link to="/cotizador" className="inline-block mt-6 px-6 py-3 rounded-2xl bg-[#0D3B66] text-white font-semibold hover:bg-[#1B4F72]">
          ¿Proyecto similar? Hablemos
        </Link>
      </footer>
    </div>
  );
}
