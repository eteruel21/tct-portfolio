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
      const { results } = await env.DB
        .prepare("SELECT * FROM reservas WHERE codigo = ?")
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

    const { results } = await env.DB
      .prepare("SELECT * FROM reservas ORDER BY fecha DESC, hora ASC")
      .all();

    return new Response(JSON.stringify(results), { headers });

  } catch (err) {
    console.error("Error leyendo reservas:", err);
    return new Response(
      JSON.stringify({ error: "Error al cargar las reservas" }),
      { status: 500, headers }
    );
  }
}

// ==================================================
// POST: CREAR RESERVA
// ==================================================

export async function onRequestPost({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  let data;
  try {
    data = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "JSON inválido" }),
      { status: 400, headers }
    );
  }

  const nombre = (data.nombre || "").trim();
  const email = (data.email || "").trim();
  const telefono = (data.telefono || "").trim();
  const fecha = (data.fecha || "").trim();
  const hora = (data.hora || "").trim();
  const direccion = (data.direccion || "").trim();
  const motivo = (data.motivo || "").trim();

  const codigo = (
    data.codigo ||
    Math.random().toString(36).substring(2, 8).toUpperCase()
  ).trim();

  if (!nombre || !email || !fecha || !hora) {
    return new Response(
      JSON.stringify({ error: "Faltan campos obligatorios" }),
      { status: 400, headers }
    );
  }

  try {
    await env.DB.prepare(
      `INSERT INTO reservas 
       (codigo, nombre, email, telefono, fecha, hora, direccion, motivo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
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

  // DOMAIN automático
  const DOMAIN =
    env.DOMAIN ||
    (request.url.includes("localhost")
      ? "http://127.0.0.1:8788"
      : "https://tctservices-pty.com");

  // ✅ GOOGLE CALENDAR
  const toYMD = (d) => {
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    return `${y}${m}${day}`;
  };

  const start = new Date(fecha + "T" + hora + ":00");
  const end = new Date(start.getTime() + 3600000);

  const gStart = `${toYMD(start)}T${hora.replace(":", "")}00Z`;
  const gEnd = `${toYMD(end)}T${hora.replace(":", "")}00Z`;

  const googleCalendarUrl =
    `https://calendar.google.com/calendar/render?action=TEMPLATE` +
    `&text=${encodeURIComponent("Cita TCT Services")}` +
    `&dates=${gStart}/${gEnd}` +
    `&details=${encodeURIComponent("Cliente: " + nombre)}` +
    `&location=${encodeURIComponent("TCT Services")}`;

  // ✅ ARCHIVO ICS PARA IPHONE
  const ics = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TCT Services//ES
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

  function toBase64(str) {
    const utf8 = new TextEncoder().encode(str);
    let binary = "";
    for (let b of utf8) binary += String.fromCharCode(b);
    return btoa(binary);
  }

  const icsBase64 = toBase64(ics);
  const icsUrl = `data:text/calendar;base64,${icsBase64}`;

  // ✅ EMAIL HTML (Cliente)
  const correoCliente = `
    <div style="font-family: Arial; padding:0; margin:0;
      background:url('${DOMAIN}/images/fondo_inicio.jpg') center/cover;">
      <div style="background:#ffffffdd; border-radius:16px; max-width:600px; margin:auto;">
        <h2 style="background:#0D3B66; color:white; padding:20px; text-align:center;">
          Confirmación de Cita
        </h2>

        <div style="padding:20px;">
          <p>Hola <strong>${nombre}</strong>, tu cita fue registrada.</p>

          <p><strong>Fecha:</strong> ${fecha}</p>
          <p><strong>Hora:</strong> ${hora}</p>
          <p><strong>Código:</strong> ${codigo}</p>

          <div style="text-align:center; margin:25px 0;">
            <a href="${DOMAIN}/#/reservar?codigo=${codigo}&modo=buscar"
              style="background:#C1121F;color:white;padding:12px 20px;border-radius:10px;text-decoration:none;">
              Gestionar mi cita
            </a>
          </div>

          <div style="text-align:center; margin:25px 0;">
            <a href="${icsUrl}" download="cita-${codigo}.ics"
              style="background:#FFD700;color:#0D3B66;padding:12px 20px;border-radius:10px;text-decoration:none;">
              Agregar al calendario (iPhone/Outlook)
            </a>
          </div>

        </div>

        <footer style="background:#FFD700; color:#0D3B66; text-align:center; padding:10px;">
          © ${new Date().getFullYear()} TCT Services
        </footer>
      </div>
    </div>
  `;

  // ✅ EMAIL ADMIN
  const correoAdmin = `
    Nueva cita:
    <br/><br/>
    <strong>Cliente:</strong> ${nombre}<br/>
    <strong>Fecha:</strong> ${fecha}<br/>
    <strong>Hora:</strong> ${hora}<br/>
    <strong>Teléfono:</strong> ${telefono}<br/>
    <strong>Código:</strong> ${codigo}<br/>
    <br/>
    <a href="${googleCalendarUrl}">Agregar al Google Calendar</a>
    <br/>
    <a href="${icsUrl}" download="cita-${codigo}.ics">Descargar ICS</a>
  `;

  // ✅ Enviar correos con RESEND
  try {
    const headersEmail = {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    };

    const sendClient = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: headersEmail,
      body: JSON.stringify({
        from: "TCT Services <no-reply@tctservices-pty.com>",
        to: email,
        subject: "Confirmación de cita",
        html: correoCliente,
      }),
    });

    const sendAdmin = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: headersEmail,
      body: JSON.stringify({
        from: "TCT Services <no-reply@tctservices-pty.com>",
        to: env.ADMIN_EMAIL,
        subject: "Nueva cita registrada",
        html: correoAdmin,
      }),
    });

    await Promise.allSettled([sendClient, sendAdmin]);

  } catch (err) {
    console.error("Error enviando correo:", err);
  }

  return new Response(JSON.stringify({ ok: true, codigo }), {
    status: 201,
    headers,
  });
}

// ==================================================
// PUT: EDITAR RESERVA
// ==================================================

export async function onRequestPut({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const data = await request.json();
    if (!data.codigo)
      return new Response(
        JSON.stringify({ error: "Falta código" }),
        { status: 400, headers }
      );

    await env.DB.prepare(
      `UPDATE reservas SET nombre=?, email=?, telefono=?, fecha=?, hora=?, direccion=?, motivo=? 
       WHERE codigo=?`
    )
      .bind(
        data.nombre,
        data.email,
        data.telefono,
        data.fecha,
        data.hora,
        data.direccion,
        data.motivo,
        data.codigo
      )
      .run();

    return new Response(JSON.stringify({ ok: true }), { headers });

  } catch (err) {
    console.error("Error actualizando reserva:", err);
    return new Response(
      JSON.stringify({ error: "Error interno" }),
      { status: 500, headers }
    );
  }
}

// ==================================================
// DELETE: ELIMINAR RESERVA
// ==================================================

export async function onRequestDelete({ request, env }) {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };

  try {
    const { codigo } = await request.json();
    if (!codigo)
      return new Response(
        JSON.stringify({ error: "Falta código" }),
        { status: 400, headers }
      );

    await env.DB
      .prepare("DELETE FROM reservas WHERE codigo = ?")
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
