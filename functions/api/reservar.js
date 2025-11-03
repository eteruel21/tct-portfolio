export async function onRequestPost({ context }) {
  const { DB } = context.env; 
  try {
    const data = await context.request.json();
    const { nombre, email, telefono, fecha, hora } = data;

    if (!nombre || !email || !fecha || !hora) {
      return new Response(JSON.stringify({ ok: false, error: "Faltan datos requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();

    await DB.prepare(
      "INSERT INTO reservas (nombre, email, telefono, fecha, hora, codigo) VALUES (?, ?, ?, ?, ?, ?)"
    )
      .bind(
        data.nombre, data.email, data.telefono, data.fecha, data.hora, codigo)
      .run();

    return new Response(JSON.stringify({ ok: true, codigo }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
