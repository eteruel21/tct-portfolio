export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { nombre, email, telefono, fecha, hora } = data;

    // Validación básica
    if (!nombre || !email || !fecha || !hora) {
      return new Response(
        JSON.stringify({ ok: false, error: "Faltan datos requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Generar código aleatorio
    const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();

    // Guardar en la base D1
    await env.DB.prepare(
      "INSERT INTO reservas (nombre, email, telefono, fecha, hora, codigo) VALUES (?, ?, ?, ?, ?, ?)"
    ).bind(nombre, email, telefono, fecha, hora, codigo).run();

    return new Response(
      JSON.stringify({ ok: true, codigo }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
