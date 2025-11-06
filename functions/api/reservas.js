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

  const DOMAIN =
    env.DOMAIN ||
    (request.url.includes("localhost")
      ? "http://127.0.0.1:8788"
      : "https://tctservices-pty.com");

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
            <a href="${DOMAIN}/#/reservar?codigo=${encodeURIComponent(codigo)}&modo=buscar"
              style="background:#C1121F;color:white;padding:12px 20px;border-radius:10px;text-decoration:none;">
              Gestionar mi cita
            </a>
          </div>

          <div style="text-align:center; margin:25px 0;">
            <a href="${DOMAIN}/calendar-redirect.html?fecha=${encodeURIComponent(fecha)}&hora=${encodeURIComponent(hora)}&nombre=${encodeURIComponent(nombre)}"
              style="background:#FFD700;color:#0D3B66;padding:12px 20px;border-radius:10px;text-decoration:none;">
              Agregar al calendario (iPhone / Android)
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
  <div style="font-family:Arial, sans-serif; padding:0; margin:0;
      background:#f5f6f8;">
    <div style="background:#ffffff; border-radius:16px; max-width:620px; margin:auto; overflow:hidden; box-shadow:0 4px 15px rgba(0,0,0,0.1);">
      
      <!-- Encabezado con logo -->
      <div style="background-color:#1E3A5F; text-align:center; padding:25px;">
        <img src="https://tctservices-pty.com/images/logo_tct.png" alt="TCT Services" style="height:65px; margin-bottom:10px;" />
        <h2 style="color:#D4AF37; font-size:22px; margin:0;">
          Nueva cita registrada — TCT Services
        </h2>
      </div>

      <!-- Contenido principal -->
      <div style="padding:25px; color:#333;">
        <p>Se ha registrado una nueva cita con los siguientes datos:</p>

        <table style="width:100%; border-collapse:collapse; margin:15px 0;">
          <tr><td style="padding:6px 0;"><strong>Cliente:</strong></td><td>${nombre}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Correo:</strong></td><td>${email}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Teléfono:</strong></td><td>${telefono || "—"}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Dirección:</strong></td><td>${direccion || "—"}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Motivo:</strong></td><td>${motivo || "—"}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Fecha:</strong></td><td>${fecha}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Hora:</strong></td><td>${hora}</td></tr>
          <tr><td style="padding:6px 0;"><strong>Código:</strong></td><td><b>${codigo}</b></td></tr>
        </table>

        <div style="text-align:center; margin:25px 0;">
          <a href="${DOMAIN}/calendar-redirect.html?fecha=${encodeURIComponent(fecha)}&hora=${encodeURIComponent(hora)}&nombre=${encodeURIComponent(nombre)}"
            style="background-color:#D4AF37;color:#1E3A5F;padding:12px 25px;border-radius:10px;text-decoration:none;display:inline-block;font-weight:bold;">
            Agregar al calendario
          </a>
        </div>

        <p style="font-size:13px; color:#777; text-align:center;">
          Este correo se envió automáticamente desde el sistema de reservas.
        </p>
      </div>

      <!-- Pie de página -->
      <footer style="background-color:#1E3A5F; color:#D4AF37; text-align:center; padding:12px; font-size:13px;">
        © ${new Date().getFullYear()} TCT Services · Panamá
      </footer>
    </div>
  </div>
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
// PUT y DELETE no cambian
// ==================================================

export async function onRequestPut({ request, env }) {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const data = await request.json();
    if (!data.codigo)
      return new Response(JSON.stringify({ error: "Falta código" }), { status: 400, headers });

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
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500, headers });
  }
}

export async function onRequestDelete({ request, env }) {
  const headers = { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" };
  try {
    const { codigo } = await request.json();
    if (!codigo)
      return new Response(JSON.stringify({ error: "Falta código" }), { status: 400, headers });

    await env.DB.prepare("DELETE FROM reservas WHERE codigo = ?").bind(codigo).run();
    return new Response(JSON.stringify({ ok: true }), { headers });

  } catch (err) {
    console.error("Error eliminando reserva:", err);
    return new Response(JSON.stringify({ error: "Error interno" }), { status: 500, headers });
  }
}
