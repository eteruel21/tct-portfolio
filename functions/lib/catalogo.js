// === /functions/lib/catalogo.js ===
// Catálogo con precios del mercado en Panamá (2025 aprox).
// Mantén este archivo privado en el backend. El frontend NUNCA ve los precios.

export const ITBMS = 0.07;

export const catalogo = [
  // ================================
  // SERVICIOS ESPECIALES
  // ================================
  {
    id: "sys_cam_unidad", categoria: "servicios_especiales",
    nombre: "Cámara de seguridad (por unidad)", unidad: "unidad",
    precio_unit: 95.00,
  },
  {
    id: "sys_cam_kit4", categoria: "servicios_especiales",
    nombre: "Kit residencial 4 cámaras + DVR de 4 canales + accesorios básicos + instalación", unidad: "sistema",
    precio_unit: 650.00,
  },
  {
    id: "sys_cam_kit8", categoria: "servicios_especiales",
    nombre: "Kit residencial 8 cámaras + DVR de 8 canales + accesorios básicos + instalación", unidad: "sistema",
    precio_unit: 1160.00,
  },
  {
    id: "sys_cam_equipo", categoria: "servicios_especiales",
    nombre: "Revision tecnica o formateo de equipo o configuracion de equipos CCTV", unidad: "sistema",
    precio_unit: 75.00,
  },
  {
    id: "sys_alarma_basic", categoria: "servicios_especiales",
    nombre: "Kit residencial de alarma básico central inalambrica de 48 zonas + 4 sensores + instalación", unidad: "sistema",
    precio_unit: 320.0,
  },
  {
    id: "sys_sensor_movimiento", categoria: "servicios_especiales",
    nombre: "Sensores de movimiento para sistema de alarma de robo", unidad: "unidad",
    precio_unit: 35.0, observacion: "Si requiere mas de 2 unidades, el precio es menor, favor hacerlo saber en Obcervación",
  },
  {
    id: "sys_sensor_magnetico", categoria: "servicios_especiales",
    nombre: "Sensores magnético de apertura de puerta o ventana", unidad: "unidad",
    precio_unit: 35.0, observacion: "Si requiere mas de 2 unidades, el precio es menor, favor hacerlo saber en Obcervación",
  },
  {
    id: "sys_automacion_ligera", categoria: "servicios_especiales",
    nombre: "Automatización de luces y tomacorrientes (iluminación + acceso inteligente) por unidad", unidad: "sistema",
    precio_unit: 55.0, observacion: "Si requiere mas de 2 unidades, el precio es menor, cotizar como sistema completo",
  },
  {
    id: "sys_cctv_comercial", categoria: "servicios_especiales",
    nombre: "Kit comercial 32 cámaras + DVR de 32 canales + accesorios básicos + disco duro de 4TB + instalación", unidad: "proyecto",
    precio_unit: 3650.0,
  },
  {
    id: "sys_control_acceso", categoria: "servicios_especiales",
    nombre: "Kit control de acceso con 1 lectores + 5 token + cerradura electromagnetica + boton de salida + instalación", unidad: "punto",
    precio_unit: 250.0,
  },
  {
    id: "sys_videoportero", categoria: "servicios_especiales",
    nombre: "Videoportero con control remoto y cámara integrada", unidad: "unidad",
    precio_unit: 450.0,
  },
  {
    id: "sys_red_wifi_piso", categoria: "servicios_especiales",
    nombre: "Red Wi-Fi en casa por piso, (cableado, equipos y accesorios incluidos)", unidad: "piso",
    precio_unit: 600.0,
  },
  {
    id: "sys_punto_red", categoria: "servicios_especiales",
    nombre: "Punto de red estructurada (cableado, conectorización, prueba)", unidad: "unidad",
    precio_unit: 95.0,
  },
  {
    id: "sys_redes_cableado", categoria: "servicios_especiales",
    nombre: "Cableado de red estructural", unidad: "metro lineal",
    precio_unit: 4.5,
  },
  {
    id: "sys_alarma_incendio",
    categoria: "servicios_especiales",
    nombre: "Sistema de alarma contra incendio",
    unidad: "sistema",
    precio_unit: 1200.0,
  },
  {
    id: "sys_respaldo", categoria: "servicios_especiales",
    nombre: "Instalación o reemplazo de UPS o respaldo de energia", unidad: "unidad",
    precio_unit: 45.0, observacion: "El costo del equipo es según el requerimiento donde se va a instalar",
  },
  {
    id: "sys_fuentes", categoria: "servicios_especiales",
    nombre: "Instalación o reemplazo de fuente de poder", unidad: "unidad",
    precio_unit: 55.0,
  },
  {
    id: "sys_mantenimiento_seguridad", categoria: "servicios_especiales",
    nombre: "Mantenimiento anual de sistema de seguridad: Alarma Robo - Alarma Incendio - CCTV", unidad: "año",
    precio_unit: 350.0, observacion: "El mantenimiento se realiza trimestralmente",
  },
  {
    id: "sys_motor_corredizo_400kg", categoria: "servicios_especiales",
    nombre: "Motor electrico para portón corredizo de menos de 400kg.", unidad: "servicio",
    precio_unit: 450.0, observacion: "Debe contar con el punto electrico, de no tenerlo cotizar aparte y las condiciones necesarias"
  },
  {
    id: "sys_motor_corredizo_800kg", categoria: "servicios_especiales",
    nombre: "Motor electrico para portón corredizo entre 800kg. a 400kg.", unidad: "servicio",
    precio_unit: 750.0, observacion: "Debe contar con el punto electrico, de no tenerlo cotizar aparte y las condiciones necesarias"
  },
  {
    id: "sys_motor_batiente_400kg", categoria: "servicios_especiales",
    nombre: "Motor electrico para portón batiente de menos de 400kg.", unidad: "servicio",
    precio_unit: 750.0, observacion: "Debe contar con el punto electrico, de no tenerlo cotizar aparte y las condiciones necesarias"
  },
  {
    id: "sys_motor_batiente_800kg", categoria: "servicios_especiales",
    nombre: "Motor electrico para portón batiente de menos de 800kg.", unidad: "servicio",
    precio_unit: 1150.0, observacion: "Debe contar con el punto electrico, de no tenerlo cotizar aparte y las condiciones necesarias"
  },
  {
    id: "sys_motor_seccional", categoria: "servicios_especiales",
    nombre: "Puerta seccional de maximo 6m de ancho por 2.40m de alto", unidad: "servicio",
    precio_unit: 3800.0, observacion: "De ser el vano de mayor tamaño, hacer la obcervación",
  },

  // ================================
  // CONSTRUCCIÓN
  // ================================
  {
    id: "con_obra_gris",
    categoria: "construccion",
    nombre: "Obra gris básica",
    unidad: "m²",
    precio_unit: 550.0,
  },
  {
    id: "con_acabados_medios",
    categoria: "construccion",
    nombre: "Construcción con acabados medios",
    unidad: "m²",
    precio_unit: 800.0,
  },
  {
    id: "con_acabados_altos",
    categoria: "construccion",
    nombre: "Construcción con acabados de lujo",
    unidad: "m²",
    precio_unit: 1300.0,
  },
  {
    id: "con_pintura_monocapa",
    categoria: "construccion",
    nombre: "Pintura monocapa exterior",
    unidad: "m²",
    precio_unit: 4.0,
  },
  {
    id: "con_repello_muro",
    categoria: "construccion",
    nombre: "Repello de muro interior/exterior",
    unidad: "m²",
    precio_unit: 6.0,
  },
  {
    id: "con_demolicion",
    categoria: "construccion",
    nombre: "Demolición controlada",
    unidad: "m²",
    precio_unit: 15.0,
  },
  {
    id: "con_baldosa_estandar",
    categoria: "construccion",
    nombre: "Colocación de baldosas estándar",
    unidad: "m²",
    precio_unit: 10.0,
  },
  {
    id: "con_hormigon_piso",
    categoria: "construccion",
    nombre: "Sustrato de hormigón para piso",
    unidad: "m²",
    precio_unit: 30.0,
  },
  {
    id: "con_vidrio_ventana",
    categoria: "construccion",
    nombre: "Instalación de vidrio templado o ventana",
    unidad: "unidad",
    precio_unit: 120.0,
  },
  {
    id: "con_carpinteria_madera",
    categoria: "construccion",
    nombre: "Carpintería en madera (puertas, closets, molduras)",
    unidad: "metro lineal",
    precio_unit: 50.0,
  },
  {
    id: "con_techo_metalico",
    categoria: "construccion",
    nombre: "Techo metálico o de lámina con estructura",
    unidad: "m²",
    precio_unit: 45.0,
  },
  {
    id: "con_plomeria_basica",
    categoria: "construccion",
    nombre: "Instalación de plomería básica",
    unidad: "lote",
    precio_unit: 500.0,
  },
  {
    id: "con_electricidad_basica",
    categoria: "construccion",
    nombre: "Instalación eléctrica básica",
    unidad: "m²",
    precio_unit: 20.0,
  },
  {
    id: "con_electricidad_avanzada",
    categoria: "construccion",
    nombre: "Instalación eléctrica avanzada",
    unidad: "m²",
    precio_unit: 35.0,
  },
  {
    id: "con_impermeabilizacion",
    categoria: "construccion",
    nombre: "Impermeabilización de techo o terraza",
    unidad: "m²",
    precio_unit: 8.0,
  },
  {
    id: "con_aire_acondicionado",
    categoria: "construccion",
    nombre: "Instalación de aire acondicionado tipo split",
    unidad: "unidad",
    precio_unit: 450.0,
  },
  {
    id: "con_fachada_pintura",
    categoria: "construccion",
    nombre: "Pintura de fachada premium",
    unidad: "m²",
    precio_unit: 6.5,
  },
  {
    id: "con_bano_completo",
    categoria: "construccion",
    nombre: "Renovación de baño completo estándar",
    unidad: "proyecto",
    precio_unit: 2500.0,
  },
  {
    id: "con_cocina_completa",
    categoria: "construccion",
    nombre: "Renovación de cocina completa estándar",
    unidad: "proyecto",
    precio_unit: 4000.0,
  },
  {
    id: "con_piso_lujo",
    categoria: "construccion",
    nombre: "Acabado de lujo en piso (mármol o granito)",
    unidad: "m²",
    precio_unit: 120.0,
  },
  {
    id: "con_tuberia_galvanizada",
    categoria: "construccion",
    nombre: "Instalación de tubería galvanizada",
    unidad: "metro lineal",
    precio_unit: 18.0,
  },
  {
    id: "con_ventanas_doblevidrio",
    categoria: "construccion",
    nombre: "Instalación de ventanas doble vidrio",
    unidad: "unidad",
    precio_unit: 300.0,
  },
  {
    id: "con_rejas_seguridad",
    categoria: "construccion",
    nombre: "Instalación de rejas de seguridad estándar",
    unidad: "metro lineal",
    precio_unit: 75.0,
  },
  {
    id: "con_paisajismo_basico",
    categoria: "construccion",
    nombre: "Paisajismo básico y jardinería",
    unidad: "lote",
    precio_unit: 1200.0,
  },
  {
    id: "con_drenaje_pluvial",
    categoria: "construccion",
    nombre: "Sistema de drenaje pluvial",
    unidad: "metro lineal",
    precio_unit: 40.0,
  },
  {
    id: "con_puerta_seguridad",
    categoria: "construccion",
    nombre: "Instalación de puerta de seguridad metálica",
    unidad: "unidad",
    precio_unit: 550.0,
  },
  {
    id: "con_tablaroca_division",
    categoria: "construccion",
    nombre: "Construcción de muro divisorio de tablaroca",
    unidad: "m²",
    precio_unit: 25.0,
  },
  {
    id: "con_escaleras_metalicas", 
    categoria: "construccion",
    nombre: "Instalación de escaleras metálicas decorativas",
    unidad: "proyecto",
    precio_unit: 3500.0,
  },
  {
    id: "con_galeria_cristal",
    categoria: "construccion",
    nombre: "Galería de cristal o aluminio",
    unidad: "m²",
    precio_unit: 180.0,
  }
];

export function publicoSinPrecios() {
  return catalogo.map(i => ({
    id: i.id,
    categoria: i.categoria,
    nombre: i.nombre,
    unidad: i.unidad,
    observacion: i.observacion || "",
  }));
}

export function calcular(items) {
  // items: [{id, cantidad}]
  const index = new Map(catalogo.map(i => [i.id, i]));
  const detalle = [];
  let subtotal = 0;

  for (const it of items) {
    const ref = index.get(it.id);
    if (!ref) continue;
    const cantidad = Number(it.cantidad) || 0;
    if (cantidad <= 0) continue;
    const precio_unit = ref.precio_unit;
    const linea = precio_unit * cantidad;
    subtotal += linea;
    detalle.push({
      item_id: ref.id,
      nombre: ref.nombre,
      unidad: ref.unidad,
      observacion: ref.observacion || "",
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
