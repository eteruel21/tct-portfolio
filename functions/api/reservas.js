export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    // Guardar reserva en base de datos
    await env.DB.prepare(`
      INSERT INTO reservas (codigo, nombre, email, telefono, fecha, hora, direccion, motivo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `)
      .bind(
        data.codigo,
        data.nombre,
        data.email,
        data.telefono,
        data.fecha,
        data.hora,
        data.direccion,
        data.motivo
      )
      .run();

    // === Envío de correos ===
    const dominio = "https://tctservices-pty.com";

    // HTML para el cliente
    const correoCliente = `
      <div style="font-family: Arial, sans-serif; color: #0D3B66; max-width: 600px; margin: auto;">
        <div style="background-color:#0D3B66;color:white;text-align:center;padding:20px;">
          <img src="${dominio}/images/logo_tct.png" alt="TCT Services" style="max-width:120px;margin-bottom:10px;"/>
          <h2 style="margin:0;">Confirmación de Cita</h2>
        </div>
        <div style="padding:20px;background-color:#f9f9f9;">
          <p>Hola <strong>${data.nombre}</strong>,</p>
          <p>Tu cita ha sido registrada exitosamente:</p>
          <table style="width:100%;border-collapse:collapse;margin-top:10px;">
            <tr><td style="padding:8px;border-bottom:1px solid #ddd;"><strong>Fecha:</strong></td><td>${data.fecha}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #ddd;"><strong>Hora:</strong></td><td>${data.hora}</td></tr>
            <tr><td style="padding:8px;border-bottom:1px solid #ddd;"><strong>Código:</strong></td><td style="font-family:monospace;color:#C1121F;">${data.codigo}</td></tr>
          </table>
          <p style="margin-top:20px;">Puedes modificar o cancelar tu cita desde aquí:</p>
          <div style="text-align:center;margin:20px 0;">
            <a href="${dominio}/#/reservar?codigo=${data.codigo}" style="background:#C1121F;color:white;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold;">Gestionar mi cita</a>
          </div>
          <p>Gracias por elegir <strong>TCT Services</strong>.</p>
        </div>
        <div style="background-color:#FFD700;color:#0D3B66;text-align:center;padding:10px;font-size:13px;">
          © ${new Date().getFullYear()} TCT Services — Sistemas que Protegen y Automatizan
        </div>
      </div>
    `;

    // HTML para el administrador
    const correoAdmin = `
      <div style="font-family:Arial,sans-serif;color:#0D3B66;max-width:600px;margin:auto;">
        <h3>Nueva cita registrada</h3>
        <p><strong>Cliente:</strong> ${data.nombre}</p>
        <p><strong>Fecha:</strong> ${data.fecha} — <strong>Hora:</strong> ${data.hora}</p>
        <p><strong>Teléfono:</strong> ${data.telefono}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Código:</strong> ${data.codigo}</p>
        <div style="margin-top:20px;text-align:center;">
          <a href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Cita+TCT+Services&dates=${data.fecha.replace(/-/g,'')}/${data.fecha.replace(/-/g,'')}&details=Cliente:+${encodeURIComponent(data.nombre)}&location=TCT+Services"
          style="background:#0D3B66;color:white;padding:10px 18px;text-decoration:none;border-radius:6px;">Agregar al calendario</a>
        </div>
      </div>
    `;

    // Enviar correo al cliente
    await fetch("https://formsubmit.co/ajax/" + data.email, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _subject: "Confirmación de cita - TCT Services",
        _html: correoCliente,
        _template: "box",
      }),
    });

    // Enviar correo al administrador
    await fetch("https://formsubmit.co/ajax/contacto@tctservices-pty.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        _subject: "Nueva cita registrada",
        _html: correoAdmin,
        _template: "box",
      }),
    });

    // ✅ Respuesta final
    return new Response(JSON.stringify({ ok: true, codigo: data.codigo }), {
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
