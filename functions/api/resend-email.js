import { Resend } from "resend";

export async function onRequestPost({ request, env }) {
  const resend = new Resend(env.RESEND_API_KEY);
  const data = await request.json();

  const fecha = new Date().toLocaleString("es-PA", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const numeroWhatsApp = "50761163672";
  const logoUrl = "https://tctservices-pty.com/images/logo_tct.png";

  const baseStyle = `
    font-family: 'Segoe UI', Arial, sans-serif;
    background: #f2f6fa;
    padding: 40px 0;
    color: #333;
  `;

  const cardStyle = `
    background: white;
    max-width: 650px;
    margin: auto;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  `;

  const headerStyle = `
    background: linear-gradient(135deg, #0D3B66, #144E88);
    text-align: center;
    padding: 24px 16px;
  `;

  const logoStyle = `
    width: 120px;
    height: auto;
    margin-bottom: 8px;
  `;

  const titleStyle = `
    color: white;
    font-size: 22px;
    margin: 6px 0 0;
  `;

  const bodyStyle = `
    padding: 24px;
    font-size: 15px;
    line-height: 1.6;
    color: #333;
  `;

  const boxStyle = `
    background: #f8fafc;
    padding: 14px 18px;
    border-radius: 10px;
    border: 1px solid #e5e9f0;
    margin: 12px 0;
  `;

  const footerStyle = `
    text-align: center;
    font-size: 13px;
    color: #777;
    padding: 20px 0 10px;
    background: #f2f6fa;
  `;

  const botonStyle = `
    display: inline-block;
    background: #0D3B66;
    color: white;
    padding: 10px 25px;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    margin: 8px;
  `;

  const botonWhatsApp = `
    display: inline-block;
    background: #25D366;
    color: white;
    padding: 10px 25px;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    margin: 8px;
  `;

  // === Correo al cliente ===
  const htmlCliente = `
  <div style="${baseStyle}">
    <div style="${cardStyle}">
      <div style="${headerStyle}">
        <img src="${logoUrl}" alt="TCT Services" style="${logoStyle}" />
        <h2 style="${titleStyle}">Confirmación de tu solicitud</h2>
      </div>
      <div style="${bodyStyle}">
        <p>Hola <b>${data.nombre}</b>,</p>
        <p>Gracias por contactarnos. Hemos recibido tu solicitud de cotización correctamente.</p>

        <div style="${boxStyle}">
          <p><b>Servicio:</b> ${data.servicio}</p>
          <p><b>Tipo de instalación:</b> ${data.tipo || "No especificado"}</p>
          <p><b>Ubicación:</b> ${data.ubicacion}</p>
          <p><b>Mensaje:</b> ${data.mensaje}</p>
        </div>

        <p>Un asesor de <b>TCT Services</b> se comunicará contigo pronto para brindarte más información.</p>
        
        <div style="text-align:center;margin-top:20px;">
          <a href="https://tctservices-pty.com" style="${botonStyle}">
            🌐 Visitar sitio web
          </a>
          <a href="https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
            "Hola, deseo más información sobre mi cotización en TCT Services."
          )}" style="${botonWhatsApp}">
            💬 Contactar por WhatsApp
          </a>
        </div>
      </div>
      <div style="${footerStyle}">
        <p>© ${new Date().getFullYear()} TCT Services — Innovación en Sistemas Especiales</p>
      </div>
    </div>
  </div>`;

  // === Correo al administrador ===
  const htmlAdmin = `
  <div style="${baseStyle}">
    <div style="${cardStyle}">
      <div style="${headerStyle}">
        <img src="${logoUrl}" alt="TCT Services" style="${logoStyle}" />
        <h2 style="${titleStyle}">Nueva solicitud de cotización</h2>
      </div>
      <div style="${bodyStyle}">
        <p><b>Fecha:</b> ${fecha}</p>
        <div style="${boxStyle}">
          <p><b>Nombre:</b> ${data.nombre}</p>
          <p><b>Correo:</b> ${data.email}</p>
          <p><b>Teléfono:</b> ${data.telefono}</p>
          <p><b>Servicio:</b> ${data.servicio}</p>
          <p><b>Ubicación:</b> ${data.ubicacion}</p>
          <p><b>Tipo:</b> ${data.tipo || "No especificado"}</p>
        </div>
        <p><b>Mensaje del cliente:</b></p>
        <blockquote style="border-left:3px solid #0D3B66;padding-left:12px;color:#555;">
          ${data.mensaje}
        </blockquote>

        <div style="text-align:center;margin-top:20px;">
          <a href="https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
            `Hola, este es un seguimiento de la cotización del cliente ${data.nombre} (${data.servicio}).`
          )}" style="${botonWhatsApp}">
            📞 Contactar cliente por WhatsApp
          </a>
        </div>
      </div>
      <div style="${footerStyle}">
        <p>Correo generado automáticamente por el sistema web de TCT Services.</p>
      </div>
    </div>
  </div>`;

  try {
    await resend.emails.send({
      from: "TCT Services <notificaciones@tctservices-pty.com>",
      to: "contacto@tctservices-pty.com",
      subject: `Nueva cotización — ${data.servicio || "Sin servicio"}`,
      html: htmlAdmin,
    });

    await resend.emails.send({
      from: "TCT Services <notificaciones@tctservices-pty.com>",
      to: data.email,
      subject: "Confirmación de tu solicitud — TCT Services",
      html: htmlCliente,
    });

    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error al enviar correo:", err);
    return new Response(JSON.stringify({ error: "Fallo al enviar correo" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
