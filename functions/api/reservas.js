// === /functions/api/reservas.js ===

export async function onRequestGet({ request, env }) {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  const url = new URL(request.url);
  const codigo = url.searchParams.get("codigo");

  try {
    if (codigo) {
      const { results } = await env.DB.prepare("SELECT * FROM reservas WHERE codigo = ?").bind(codigo).all();
      if (results.length === 0)
        return new Response(JSON.stringify({ error: "No encontrada" }), { status: 404, headers });
      return new Response(JSON.stringify(results[0]), { headers });
    }

    // listado general
    const { results } = await env.DB.prepare(
      "SELECT * FROM reservas ORDER BY fecha DESC, hora ASC"
    ).all();
    return new Response(JSON.stringify(results), { headers });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers });
  }
}

export async function onRequestPost({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  let data;
  try {
    data = await request.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: "JSON inválido" }), {
      status: 400,
      headers,
    });
  }

  // --- Sanitizar datos ---
  const nombre = String(data.nombre || "").trim();
  const email = String(data.email || "").trim();
  const telefono = String(data.telefono || "").trim();
  const fecha = String(data.fecha || "").trim(); // YYYY-MM-DD
  const hora = String(data.hora || "").trim(); // HH:MM
  const direccion = String(data.direccion || "").trim();
  const motivo = String(data.motivo || "").trim();
  const codigo = String(
    data.codigo || Math.random().toString(36).substring(2, 8).toUpperCase()
  ).trim();

  // --- Validaciones ---
  if (!nombre || !email || !fecha || !hora) {
    return new Response(
      JSON.stringify({ error: "Faltan campos obligatorios" }),
      { status: 400, headers }
    );
  }

  // --- Guardar en DB ---
  try {
    await env.DB.prepare(
      `
      INSERT INTO reservas (codigo, nombre, email, telefono, fecha, hora, direccion, motivo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `
    )
      .bind(codigo, nombre, email, telefono, fecha, hora, direccion, motivo)
      .run();
  } catch (err) {
    console.error("DB error:", err);
    return new Response(
      JSON.stringify({ error: "Error al guardar la reserva" }),
      { status: 500, headers }
    );
  }

  const DOMAIN = env.DOMAIN || "https://tctservices-pty.com";
  const ADMIN_EMAIL = env.ADMIN_EMAIL || "contacto@tctservices-pty.com";

  // --- Funciones utilitarias para fechas / base64 compatibles con Workers ---
  const pad = (n) => String(n).padStart(2, "0");
  const formatYMD = (d) => `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}`;
  const formatDateTimeZ = (d) =>
    `${formatYMD(d)}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`;

  // Construir start / end usando UTC (end = +1h)
  const startDate = new Date(`${fecha}T${hora}:00Z`); // fecha + hora en UTC
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  const googleDates = `${formatDateTimeZ(startDate)}/${formatDateTimeZ(endDate)}`;
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Cita TCT Services"
  )}&dates=${googleDates}&details=${encodeURIComponent("Cliente: " + nombre)}&location=${encodeURIComponent(
    "TCT Services"
  )}`;

  // Base64 compatible con Cloudflare Workers / browsers
  const base64Encode = (str) => {
    // btoa requiere una cadena en latin1; preservamos unicode con encodeURIComponent+unescape
    return btoa(unescape(encodeURIComponent(str)));
  };

  // --- Crear archivo ICS (para iPhone / Outlook) ---
  const eventoICS = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TCT Services//Reservas//ES
BEGIN:VEVENT
UID:${codigo}@tctservices-pty.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART;TZID=America/Panama:${fecha.replace(/-/g, "")}T${hora.replace(":", "")}00
DTEND;TZID=America/Panama:${new Date(endDate).toLocaleString("sv").slice(0,10).replace(/-/g,"") }T${hora.replace(":", "")}00
SUMMARY:Cita TCT Services
DESCRIPTION:Cliente: ${escapeHtml(nombre)}\\nTel: ${escapeHtml(telefono)}\\nEmail: ${escapeHtml(email)}
LOCATION:TCT Services
END:VEVENT
END:VCALENDAR`;
  const icsData = "data:text/calendar;base64," + base64Encode(eventoICS);
  const redirectHref = `${DOMAIN}/calendar-redirect.html?g=${encodeURIComponent(calendarUrl)}&i=${encodeURIComponent(
    icsData
  )}`;

  // --- Email al cliente ---
  const correoCliente = `
     <div style="font-family:Arial,sans-serif;color:#0D3B66;
     background:url('${DOMAIN}/images/fondo_inicio.jpg') no-repeat center/cover;
     max-width:600px;margin:auto;">
      <div style="background-color:#ffffffdd;border-radius:16px;overflow:hidden;">
        <div style="background-color:#0D3B66;color:white;text-align:center;padding:20px;">
          <img src="${DOMAIN}/images/logo_tct.png" alt="TCT Services" style="max-width:120px;margin-bottom:10px;"/>
          <h2 style="margin:0;">Confirmación de Cita</h2>
        </div>
        <div style="padding:20px;">
          <p>Hola <strong>${escapeHtml(nombre)}</strong>, tu cita fue registrada correctamente:</p>
          <table style="width:100%;border-collapse:collapse;margin-top:10px;">
            <tr><td><strong>Fecha:</strong></td><td>${escapeHtml(fecha)}</td></tr>
            <tr><td><strong>Hora:</strong></td><td>${escapeHtml(hora)}</td></tr>
            <tr><td><strong>Código:</strong></td><td style="color:#C1121F;">${escapeHtml(codigo)}</td></tr>
          </table>

          <div style="text-align:center;margin:25px 0;">
            <a href="${DOMAIN}/#/reservar?codigo=${encodeURIComponent(escapeHtml(codigo))}&modo=buscar"
              style="background:#C1121F;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">
              Gestionar mi cita</a>
          </div>

          <div style="text-align:center;margin:25px 0;">
            <a href="${redirectHref}" style="background:#FFD700;color:#0D3B66;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">
           Agregar al calendario</a>
          </div>

          <p>Gracias por elegir <strong>TCT Services</strong>.</p>
        </div>
        <div style="background-color:#FFD700;color:#0D3B66;text-align:center;padding:10px;font-size:13px;">
          © ${new Date().getFullYear()} TCT Services — Sistemas que Protegen y Automatizan
        </div>
      </div>
    </div>
  `;

  // --- Email al administrador ---
  const correoAdmin = `
   <div style="font-family:Arial,sans-serif;color:#0D3B66;
   background:url('${DOMAIN}/images/fondo_inicio.jpg') no-repeat center/cover;
   max-width:600px;margin:auto;">
      <div style="background-color:#ffffffdd;border-radius:16px;overflow:hidden;padding:20px;">
        <h3>Nueva cita registrada</h3>
        <p><strong>Cliente:</strong> ${escapeHtml(nombre)}</p>
        <p><strong>Fecha:</strong> ${escapeHtml(fecha)} - ${escapeHtml(hora)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Dirección:</strong> ${escapeHtml(direccion)}</p>
        <p><strong>Motivo:</strong> ${escapeHtml(motivo)}</p>
        <p><strong>Código:</strong> ${escapeHtml(codigo)}</p>
      </div></div>`;

  // --- Envío con Resend ---
  try {
    const headersResend = {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    };

    const sendClient = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: headersResend,
      body: JSON.stringify({
        from: "TCT Services <no-reply@tctservices-pty.com>",
        to: email,
        subject: "Confirmación de cita - TCT Services",
        html: correoCliente,
      }),
    });

    const sendAdmin = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: headersResend,
      body: JSON.stringify({
        from: "TCT Services <no-reply@tctservices-pty.com>",
        to: ADMIN_EMAIL,
        subject: "Nueva cita registrada",
        html: correoAdmin,
      }),
    });

    await Promise.allSettled([sendClient, sendAdmin]);
  } catch (err) {
    console.error("Error enviando correo Resend:", err);
  }

  return new Response(JSON.stringify({ ok: true, codigo }), {
    status: 201,
    headers,
  });
}

// --- Protección HTML ---
function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
