export async function onRequestPost({ request, env }) {
  const data = await request.json();
  const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();

  await env.DB.prepare(
    `INSERT INTO reservas (nombre, email, telefono, fecha, hora, codigo)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(data.nombre, data.email, data.telefono, data.fecha, data.hora, codigo).run();

  return new Response(JSON.stringify({ ok: true, codigo }), {
    headers: { "Content-Type": "application/json" },
  });
}
