const BASE = import.meta.env.BASE_URL;
const src = (n) => `${BASE}images/${n}`;

export const ITEMS = [
  // ejemplo: completa tus campos según cada propuesta
  {
    id: "parking-sw-01",
    titulo: "Software de manejo de parking",
    categorias: ["parking"],
    fecha: "2024-06-10",
    ubicacion: "Panamá",
    cover: src("Sistema_de_parking.jpg"),
    descripcion:
      "Plataforma para control de entradas/salidas, cobros y reportes en tiempo real.",
    bullets: [
      "Integración con barreras, tiqueteras y POS",
      "Reportes de ocupación y turnos",
      "Usuarios y permisos por rol",
    ],
  },
  {
    id: "cctv-01",
    titulo: "Sistema CCTV IP 4K con NVR",
    categorias: ["cctv"],
    fecha: "2024-04-20",
    ubicacion: "Ciudad de Panamá",
    cover: src("cctv_ip_4k.png"),
    descripcion:
      "Videovigilancia 4K con grabación continua, acceso móvil y analítica.",
    bullets: [
      "Cámaras IP 4K H.265",
      "NVR con discos redundantes",
      "App móvil iOS/Android",
    ],
  },
  // …añade el resto de tus items aquí, uno por propuesta…
];

export const getItemById = (id) => ITEMS.find((i) => i.id === id);
