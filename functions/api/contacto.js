export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { nombre, email, telefono, mensaje } = data;

    if (!nombre || !email || !mensaje)
      return new Response(JSON.stringify({ error: "Campos obligatorios faltantes" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });

    const dominio = "https://tctservices-pty.com";
    const ADMIN_EMAIL = "contacto@tctservices-pty.com";

    // === HTML para el administrador (tú)
    const correoAdmin = `
      <div style="font-family:Arial,sans-serif;color:#0D3B66;max-width:600px;margin:auto;">
        <h2>Nuevo mensaje desde la web</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono || "No especificado"}</p>
        <p><strong>Mensaje:</strong></p>
        <div style="background:#f9f9f9;padding:12px;border-radius:8px;">${mensaje}</div>
      </div>
    `;

    // === HTML de confirmación para el cliente
    const correoCliente = `
      <div style="font-family:Arial,sans-serif;color:#0D3B66;max-width:600px;margin:auto;">
        <div style="background-color:#0D3B66;color:white;text-align:center;padding:20px;">
          <img src="${dominio}/images/logo_tct.png" alt="TCT Services" style="max-width:120px;margin-bottom:10px;" />
          <h2 style="margin:0;">Mensaje recibido</h2>
        </div>
        <div style="padding:20px;background:#f9f9f9;">
          <p>Hola <strong>${nombre}</strong>,</p>
          <p>Tu mensaje fue recibido correctamente. Nuestro equipo te responderá lo antes posible.</p>
          <p><strong>Resumen:</strong></p>
          <div style="background:white;border:1px solid #ddd;padding:10px;border-radius:8px;">
            ${mensaje}
          </div>
          <p style="margin-top:15px;">Gracias por contactarnos.<br/>Atentamente,<br/><strong>TCT Services</strong></p>
        </div>
        <div style="background-color:#FFD700;color:#0D3B66;text-align:center;padding:10px;font-size:12px;">
          © ${new Date().getFullYear()} TCT Services — Sistemas que Protegen y Automatizan
        </div>
      </div>
    `;

    // === Envío de correos usando Resend ===
    const headersResend = {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    };

    // Enviar a admin
    const sendAdmin = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: headersResend,
      body: JSON.stringify({
        from: "TCT Services <no-reply@tctservices-pty.com>",
        to: ADMIN_EMAIL,
        subject: "Nuevo mensaje desde contacto - TCT Services",
        html: correoAdmin,
      }),
    });

    // Enviar confirmación al cliente
    const sendCliente = fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: headersResend,
      body: JSON.stringify({
        from: "TCT Services <no-reply@tctservices-pty.com>",
        to: email,
        subject: "Confirmación de contacto - TCT Services",
        html: correoCliente,
      }),
    });

    await Promise.allSettled([sendAdmin, sendCliente]);

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error en /api/contacto:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
