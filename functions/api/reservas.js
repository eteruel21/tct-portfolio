// === /functions/api/reservas.js ===
export async function onRequestGet({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const url = new URL(request.url);
    const codigo = url.searchParams.get("codigo");

    if (codigo) {
      const { results } = await env.DB.prepare(
        "SELECT * FROM reservas WHERE codigo = ?"
      )
        .bind(codigo)
        .all();

      if (results.length === 0) {
        return new Response(JSON.stringify({ error: "No encontrada" }), {
          status: 404,
          headers,
        });
      }

      return new Response(JSON.stringify(results[0]), { headers });
    }

    // Si no se pasa código, devuelve todas
    const { results } = await env.DB.prepare(
      "SELECT * FROM reservas ORDER BY fecha DESC, hora ASC"
    ).all();

    return new Response(JSON.stringify(results), { headers });
  } catch (err) {
    console.error("Error leyendo reservas:", err);
    return new Response(
      JSON.stringify({ error: "Error al cargar las reservas" }),
      { status: 500, headers }
    );
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

  // --- URL base dinámica ---
  const DOMAIN =
    env.DOMAIN ||
    (request.url.includes("localhost")
      ? "http://127.0.0.1:8788"
      : "https://tctservices-pty.com");

  // --- Calendario Google ---
  const makeYMD = (d) => {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${y}${m}${day}`;
  };
  const startDt = new Date(fecha + "T00:00:00Z");
  const endDt = new Date(startDt.getTime() + 60 * 60 * 1000); // +1 hora
  const calendarDates = `${makeYMD(startDt)}T${hora.replace(
    ":",
    ""
  )}00Z/${makeYMD(endDt)}T${hora.replace(":", "")}00Z`;
  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "Cita TCT Services"
  )}&dates=${calendarDates}&details=${encodeURIComponent(
    "Cliente: " + nombre
  )}&location=${encodeURIComponent("TCT Services")}`;

  // --- Crear archivo ICS (para iPhone / Outlook) ---
  const eventoICS = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TCT Services//Reservas//ES
BEGIN:VEVENT
UID:${codigo}@tctservices-pty.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART;TZID=America/Panama:${fecha.replace(/-/g, "")}T${hora.replace(":", "")}00
DTEND;TZID=America/Panama:${fecha.replace(/-/g, "")}T${hora.replace(":", "")}00
SUMMARY:Cita TCT Services
DESCRIPTION:Cliente: ${nombre}\\nTel: ${telefono}\\nEmail: ${email}
LOCATION:TCT Services
END:VEVENT
END:VCALENDAR
  `;
  const eventoBase64 = Buffer.from(eventoICS).toString("base64");
  const icsUrl = `data:text/calendar;base64,${eventoBase64}`;

  // --- Email al cliente ---
  const correoCliente = `
    <div style="font-family: Arial, sans-serif; color: #0D3B66;
      background:url('${DOMAIN}/images/fondo_inicio.jpg') no-repeat center center / cover;
      padding:0;margin:0;max-width:600px;margin:auto;">
      <div style="background-color:#ffffffdd;border-radius:16px;overflow:hidden;">
        <div style="background-color:#0D3B66;color:white;text-align:center;padding:20px;">
          <img src="${DOMAIN}/images/logo_tct.png" alt="TCT Services" style="max-width:120px;margin-bottom:10px;"/>
          <h2 style="margin:0;">Confirmación de Cita</h2>
        </div>
        <div style="padding:20px;">
          <p>Hola <strong>${escapeHtml(nombre)}</strong>,</p>
          <p>Tu cita ha sido registrada exitosamente:</p>
          <table style="width:100%;border-collapse:collapse;margin-top:10px;">
            <tr><td><strong>Fecha:</strong></td><td>${escapeHtml(fecha)}</td></tr>
            <tr><td><strong>Hora:</strong></td><td>${escapeHtml(hora)}</td></tr>
            <tr><td><strong>Código:</strong></td><td style="font-family:monospace;color:#C1121F;">${escapeHtml(codigo)}</td></tr>
          </table>

          <div style="text-align:center;margin:25px 0;">
            <a href="${DOMAIN}/#/reservar?codigo=${encodeURIComponent(codigo)}&modo=buscar"
              style="background:#C1121F;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">
              Gestionar mi cita
            </a>
          </div>

          <div style="text-align:center;margin:25px 0;">
            <a href="${DOMAIN}/calendar-redirect.html?fecha=${encodeURIComponent(fecha)}&hora=${encodeURIComponent(hora)}&codigo=${encodeURIComponent(codigo)}&nombre=${encodeURIComponent("Cita TCT Services")}&detalle=${encodeURIComponent("Confirmada con TCT Services, duración 1 hora")}"
              style="background:#FFD700;color:#0D3B66;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">
              Agregar al calendario
            </a>
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
      background:url('${DOMAIN}/images/fondo_inicio.jpg') no-repeat center center / cover;
      padding:0;margin:0;max-width:600px;margin:auto;">
      <div style="background-color:#ffffffdd;border-radius:16px;overflow:hidden;padding:20px;">
        <h3>Nueva cita registrada</h3>
        <p><strong>Cliente:</strong> ${escapeHtml(nombre)}</p>
        <p><strong>Fecha:</strong> ${escapeHtml(fecha)} — <strong>Hora:</strong> ${escapeHtml(
    hora
  )}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(telefono)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Dirección:</strong> ${escapeHtml(direccion)}</p>
        <p><strong>Motivo:</strong> ${escapeHtml(motivo)}</p>
        <p><strong>Código:</strong> ${escapeHtml(codigo)}</p>
        <div style="margin-top:20px;text-align:center;">
          <a href="${calendarUrl}" style="background:#0D3B66;color:white;padding:10px 18px;text-decoration:none;border-radius:6px;">Agregar al Google Calendar</a>
        </div>
        <div style="margin-top:10px;text-align:center;">
          <a href="${icsUrl}" download="cita-${codigo}.ics"
            style="background:#FFD700;color:#0D3B66;padding:10px 18px;text-decoration:none;border-radius:6px;">
            Agregar al calendario (iPhone / Outlook)
          </a>
        </div>
      </div>
    </div>
  `;

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

// --- Eliminar reserva ---
export async function onRequestDelete({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const { codigo } = await request.json();
    if (!codigo)
      return new Response(JSON.stringify({ error: "Falta código" }), {
        status: 400,
        headers,
      });

    await env.DB.prepare("DELETE FROM reservas WHERE codigo = ?")
      .bind(codigo)
      .run();

    return new Response(JSON.stringify({ ok: true }), { headers });
  } catch (err) {
    console.error("Error eliminando reserva:", err);
    return new Response(
      JSON.stringify({ error: "Error interno" }),
      { status: 500, headers }
    );
  }
}
