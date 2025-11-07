// === /functions/lib/catalogo.js ===
// Catálogo con precios del mercado en Panamá (2025 aprox).
// Mantén este archivo privado en el backend. El frontend NUNCA ve los precios.

export const ITBMS = 0.07;

export const CATALOGO = [
  // -------- SERVICIOS ESPECIALES --------
  { id: "cctv_cam", categoria: "especiales", nombre: "Cámara CCTV instalada", unidad: "unidad", precio: 45 },
  { id: "cat6_mt", categoria: "especiales", nombre: "Cableado estructurado Cat6", unidad: "metro", precio: 2.8 },
  { id: "alarma_inc", categoria: "especiales", nombre: "Sistema de alarma contra incendios", unidad: "sistema", precio: 1500 },
  { id: "panel550", categoria: "especiales", nombre: "Panel solar 550W + instalación", unidad: "panel", precio: 310 },
  { id: "mto_electrico_m2", categoria: "especiales", nombre: "Mantenimiento eléctrico residencial", unidad: "m²", precio: 1.5 },
  { id: "porton_auto", categoria: "especiales", nombre: "Automatización de portón eléctrico", unidad: "unidad", precio: 850 },

  // -------- CONSTRUCCIÓN --------
  { id: "repello_m2", categoria: "construccion", nombre: "Repello de pared", unidad: "m²", precio: 7.5 },
  { id: "porcelanato_m2", categoria: "construccion", nombre: "Piso de porcelanato", unidad: "m²", precio: 12 },
  { id: "gypsum_m2", categoria: "construccion", nombre: "Cielo raso de gypsum", unidad: "m²", precio: 9.8 },
  { id: "pint_monocapa_m2", categoria: "construccion", nombre: "Pintura monocapa", unidad: "m²", precio: 3.2 },
  { id: "block_colocado", categoria: "construccion", nombre: "Block de concreto colocado", unidad: "unidad", precio: 2.4 },
  { id: "losa_m3", categoria: "construccion", nombre: "Fundida de losa acabado liso", unidad: "m³", precio: 68 },
];

export function publicoSinPrecios() {
  return CATALOGO.map(({ id, categoria, nombre, unidad }) => ({ id, categoria, nombre, unidad }));
}

export function calcular(items) {
  // items: [{id, cantidad}]
  const index = new Map(CATALOGO.map(i => [i.id, i]));
  const detalle = [];
  let subtotal = 0;

  for (const it of items) {
    const ref = index.get(it.id);
    if (!ref) continue;
    const cantidad = Number(it.cantidad) || 0;
    if (cantidad <= 0) continue;
    const precio_unit = ref.precio;
    const linea = precio_unit * cantidad;
    subtotal += linea;
    detalle.push({
      item_id: ref.id,
      nombre: ref.nombre,
      unidad: ref.unidad,
      cantidad,
      precio_unit,
      subtotal: Number(linea.toFixed(2)),
      categoria: ref.categoria,
    });
  }

  const itbms = Number((subtotal * ITBMS).toFixed(2));
  const total = Number((subtotal + itbms).toFixed(2));

  return {
    detalle,
    subtotal: Number(subtotal.toFixed(2)),
    itbms,
    total,
  };
}
