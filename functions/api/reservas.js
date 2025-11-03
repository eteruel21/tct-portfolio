export async function onRequestPost({ request, env }) {
  const data = await request.json();
  const stmt = env.DB.prepare(
    "INSERT INTO reservas (nombre, email, telefono, fecha, hora, codigo) VALUES (?, ?, ?, ?, ?, ?)"
  );
  stmt.run(data.nombre, data.email, data.telefono, data.fecha, data.hora, data.codigo);
  return new Response(JSON.stringify({ ok: true, codigo: data.codigo }), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const codigo = url.searchParams.get("codigo");
  const result = env.DB.prepare("SELECT * FROM reservas WHERE codigo = ?").get(codigo);
  return new Response(JSON.stringify(result || {}), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestDelete({ request, env }) {
  const data = await request.json();
  env.DB.prepare("DELETE FROM reservas WHERE codigo = ?").run(data.codigo);
  return new Response(JSON.stringify({ deleted: true }), {
    headers: { "Content-Type": "application/json" },
  });
}
