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
    return new Response(JSON.stringify({ error: "JSON inválido" }), { status: 400, headers });
  }

  // Sanitizar y defaults
  const nombre = String(data.nombre || "").trim();
  const email = String(data.email || "").trim();
  const telefono = String(data.telefono || "").trim();
  const fecha = String(data.fecha || "").trim(); // espera YYYY-MM-DD
  const hora = String(data.hora || "").trim(); // espera HH:MM
  const direccion = String(data.direccion || "").trim();
  const motivo = String(data.motivo || "").trim();
  const codigo = String(data.codigo || Math.random().toString(36).substring(2, 8).toUpperCase()).trim();

  // Validaciones mínimas
  if (!nombre || !email || !fecha || !hora) {
    return new Response(JSON.stringify({ error: "Faltan campos obligatorios" }), { status: 400, headers });
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(fecha)) {
    return new Response(JSON.stringify({ error: "Formato de fecha inválido (YYYY-MM-DD)" }), { status: 400, headers });
  }
  if (!/^\d{2}:\d{2}$/.test(hora)) {
    return new Response(JSON.stringify({ error: "Formato de hora inválido (HH:MM)" }), { status: 400, headers });
  }
  if (email.length > 254 || nombre.length > 200) {
    return new Response(JSON.stringify({ error: "Campos demasiado largos" }), { status: 400, headers });
  }

  // Persistir en DB (env.DB)
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
    return new Response(JSON.stringify({ error: "Error al guardar la reserva" }), { status: 500, headers });
  }

  // Config desde env con fallback
  const DOMAIN = env.DOMAIN || "https://tctservices-pty.com";
  const ADMIN_EMAIL = env.ADMIN_EMAIL || "contacto@tctservices-pty.com";

  // Construir enlace Google Calendar (end date = fecha + 1 día para eventos all-day)
  const makeYMD = (d) => {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${y}${m}${day}`;
  };
  const startDt = new Date(fecha + "T00:00:00Z");
  const endDt = new Date(startDt.getTime() + 24 * 60 * 60 * 1000);
  const calendarDates = `${makeYMD(startDt)}/${makeYMD(endDt)}`;
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Cita TCT Services"
  )}&dates=${calendarDates}&details=${encodeURIComponent("Cliente: " + nombre)}&location=${encodeURIComponent("TCT Services")}`;

  // Emails HTML (escapando valores)
  const correoCliente = `
    <div style="font-family: Arial, sans-serif; color: #0D3B66; max-width: 600px; margin: auto;">
      <div style="background-color:#0D3B66;color:white;text-align:center;padding:20px;">
        <img src="${DOMAIN}/images/logo_tct.png" alt="TCT Services" style="max-width:120px;margin-bottom:10px;"/>
        <h2 style="margin:0;">Confirmación de Cita</h2>
      </div>
      <div style="padding:20px;background-color:#f9f9f9;">
        <p>Hola <strong>${escapeHtml(nombre)}</strong>,</p>
        <p>Tu cita ha sido registrada exitosamente:</p>
        <table style="width:100%;border-collapse:collapse;margin-top:10px;">
          <tr><td style="padding:8px;border-bottom:1px solid #ddd;"><strong>Fecha:</strong></td><td>${escapeHtml(fecha)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #ddd;"><strong>Hora:</strong></td><td>${escapeHtml(hora)}</td></tr>
          <tr><td style="padding:8px;border-bottom:1px solid #ddd;"><strong>Código:</strong></td><td style="font-family:monospace;color:#C1121F;">${escapeHtml(codigo)}</td></tr>
        </table>
        <p style="margin-top:20px;">Puedes modificar o cancelar tu cita desde aquí:</p>
        <div style="text-align:center;margin:20px 0;">
          <a href="${DOMAIN}/#/reservar?codigo=${encodeURIComponent(codigo)}" style="background:#C1121F;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">Gestionar mi cita</a>
        </div>
        <p>Gracias por elegir <strong>TCT Services</strong>.</p>
      </div>
      <div style="background-color:#FFD700;color:#0D3B66;text-align:center;padding:10px;font-size:13px;">
        © ${new Date().getFullYear()} TCT Services — Sistemas que Protegen y Automatizan
      </div>
    </div>
  `;

  const correoAdmin = `
    <div style="font-family:Arial,sans-serif;color:#0D3B66;max-width:600px;margin:auto;">
      <h3>Nueva cita registrada</h3>
      <p><strong>Cliente:</strong> ${escapeHtml(nombre)}</p>
      <p><strong>Fecha:</strong> ${escapeHtml(fecha)} — <strong>Hora:</strong> ${escapeHtml(hora)}</p>
      <p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Código:</strong> ${escapeHtml(codigo)}</p>
      <div style="margin-top:20px;text-align:center;">
        <a href="${calendarUrl}"
           style="background:#0D3B66;color:white;padding:10px 18px;text-decoration:none;border-radius:6px;">Agregar al calendario</a>
      </div>
    </div>
  `;

  // === Envío de correos con Resend ===
  try {
    const headersResend = {
      "Authorization": `Bearer ${env.RESEND_API_KEY}`,
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

  return new Response(JSON.stringify({ ok: true, codigo }), { status: 201, headers });
}

// pequeña función para evitar inyección HTML en los correos
function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
