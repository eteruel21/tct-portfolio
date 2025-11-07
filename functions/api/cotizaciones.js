// === /functions/api/cotizaciones.js ===
import { calcular, publicoSinPrecios } from "../lib/catalogo";
import { Resend } from "resend";

function ok(json) {
  return new Response(JSON.stringify(json), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
function bad(status, msg) {
  return new Response(JSON.stringify({ error: msg }), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}

function codigoCotizacion() {
  // COT-XXXXX (4 últimos de UUID)
  const u = crypto.randomUUID().slice(-6).toUpperCase();
  return `COT-${u}`;
}

function emailHTML({ codigo, cliente, resumen, dominioBase }) {
  // dominioBase: incluyendo https://, por ejemplo https://tctservices-pty.com/
  const logo = `${dominioBase}images/logo_tct.png`;
  const filas = resumen.detalle.map(d => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #eee">${d.nombre} (${d.unidad})</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">${d.cantidad}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${d.precio_unit.toFixed(2)}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${d.subtotal.toFixed(2)}</td>
    </tr>
  `).join("");

  const urlResumen = `${dominioBase}#/cotizador/resumen?codigo=${encodeURIComponent(codigo)}`;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
    <div style="background:#0D3B66;padding:16px 20px;color:#fff;display:flex;align-items:center;gap:12px">
      <img src="${logo}" alt="TCT Services" height="36" style="display:block"/>
      <div style="font-weight:700;font-size:18px">Confirmación de cotización — ${codigo}</div>
    </div>
    <div style="padding:20px;background:#fff">
      <p style="margin:0 0 8px 0"><b>Cliente:</b> ${cliente.nombre}</p>
      <p style="margin:0 0 8px 0"><b>Contacto:</b> ${cliente.email} · ${cliente.telefono}</p>
      <p style="margin:0 0 16px 0"><b>Ubicación:</b> ${cliente.ubicacion || "N/D"} · <b>Tipo:</b> ${cliente.tipo || "N/D"}</p>

      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <thead>
          <tr>
            <th style="text-align:left;padding:8px;border-bottom:2px solid #0D3B66">Servicio</th>
            <th style="text-align:right;padding:8px;border-bottom:2px solid #0D3B66">Cant.</th>
            <th style="text-align:right;padding:8px;border-bottom:2px solid #0D3B66">Precio</th>
            <th style="text-align:right;padding:8px;border-bottom:2px solid #0D3B66">Subtotal</th>
          </tr>
        </thead>
        <tbody>${filas}</tbody>
        <tfoot>
          <tr>
            <td colspan="3" style="padding:8px;text-align:right"><b>Subtotal</b></td>
            <td style="padding:8px;text-align:right"><b>$${resumen.subtotal.toFixed(2)}</b></td>
          </tr>
          <tr>
            <td colspan="3" style="padding:8px;text-align:right">ITBMS 7%</td>
            <td style="padding:8px;text-align:right">$${resumen.itbms.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="3" style="padding:8px;text-align:right;font-size:16px"><b>Total</b></td>
            <td style="padding:8px;text-align:right;font-size:16px"><b>$${resumen.total.toFixed(2)}</b></td>
          </tr>
        </tfoot>
      </table>

      <p style="margin:16px 0 0 0;font-size:12px;color:#6b7280">
        Este monto es un aproximado sujeto a verificación en sitio. 
        Para una cifra precisa, agenda una visita técnica.
      </p>

      <div style="margin-top:16px">
        <a href="${urlResumen}" 
           style="display:inline-block;background:#0D3B66;color:#fff;text-decoration:none;padding:10px 14px;border-radius:10px;font-weight:600">
          Ver resumen y agendar
        </a>
      </div>
    </div>
  </div>
  `;
}

export async function onRequestOptions() {
  return ok({});
}

export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const codigo = url.searchParams.get("codigo");
    const catalogoPublic = url.searchParams.get("catalogo") === "public";

    if (catalogoPublic) {
      // Catálogo para el frontend, sin precios
      return ok({ items: publicoSinPrecios() });
    }

    if (!codigo) return bad(400, "Falta parámetro 'codigo'");

    const cab = await env.DB.prepare(
      "SELECT * FROM cotizaciones WHERE codigo = ?"
    ).bind(codigo).first();

    if (!cab) return bad(404, "No encontrada");

    const det = await env.DB.prepare(
      "SELECT item_id, nombre, unidad, cantidad, precio_unit, subtotal, categoria FROM cotizacion_items WHERE cotizacion_id = ? ORDER BY rowid ASC"
    ).bind(cab.id).all();

    return ok({
      codigo: cab.codigo,
      fecha: cab.created_at,
      cliente: {
        nombre: cab.cliente_nombre,
        email: cab.email,
        telefono: cab.telefono,
        ubicacion: cab.ubicacion,
        tipo: cab.tipo,
        mensaje: cab.mensaje,
      },
      resumen: {
        subtotal: cab.subtotal,
        itbms: cab.itbms,
        total: cab.total,
        detalle: det.results || [],
      },
    });
  } catch (e) {
    console.error(e);
    return bad(500, "Error al leer la cotización");
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const body = await request.json();
    // body: { cliente:{nombre,email,telefono,ubicacion,tipo,mensaje}, items:[{id,cantidad}] }
    const { cliente, items } = body || {};
    if (!cliente?.nombre || !cliente?.email || !Array.isArray(items) || items.length === 0) {
      return bad(400, "Datos incompletos");
    }

    const resumen = calcular(items);
    if (resumen.detalle.length === 0) return bad(400, "No hay ítems válidos");

    const codigo = codigoCotizacion();
    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    // Guarda cabecera
    await env.DB.prepare(
      `INSERT INTO cotizaciones
       (id, codigo, created_at, cliente_nombre, email, telefono, ubicacion, tipo, mensaje, subtotal, itbms, total)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id, codigo, now,
      cliente.nombre, cliente.email, cliente.telefono || "",
      cliente.ubicacion || "", cliente.tipo || "", cliente.mensaje || "",
      resumen.subtotal, resumen.itbms, resumen.total
    ).run();

    // Guarda detalle
    const stmt = await env.DB.prepare(
      `INSERT INTO cotizacion_items
       (cotizacion_id, item_id, nombre, unidad, cantidad, precio_unit, subtotal, categoria)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    );
    for (const d of resumen.detalle) {
      await stmt.bind(id, d.item_id, d.nombre, d.unidad, d.cantidad, d.precio_unit, d.subtotal, d.categoria).run();
    }

    // Enviar correos
    const resend = new Resend(env.RESEND_API_KEY);
    const dominioBase = env.PUBLIC_BASE_URL || "https://tctservices-pty.com/";
    const html = emailHTML({ codigo, cliente, resumen, dominioBase });

    const adminTo = env.COTIZACIONES_TO || "contacto@tctservices-pty.com";
    const from = env.RESEND_FROM || "TCT Services <no-reply@tctservices-pty.com>";

    await Promise.all([
      resend.emails.send({
        from,
        to: [cliente.email],
        subject: `Resumen de cotización ${codigo}`,
        html,
      }),
      resend.emails.send({
        from,
        to: [adminTo],
        subject: `Nueva cotización ${codigo} — ${cliente.nombre}`,
        html,
      }),
    ]);

    return ok({ codigo });
  } catch (e) {
    console.error(e);
    return bad(500, "Error al crear la cotización");
  }
}
