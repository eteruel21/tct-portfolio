export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    await env.DB.prepare(
      "INSERT INTO reservas (nombre, email, telefono, fecha, hora, codigo) VALUES (?, ?, ?, ?, ?, ?)"
    )
      .bind(data.nombre, data.email, data.telefono, data.fecha, data.hora, data.codigo)
      .run();

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

export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const codigo = url.searchParams.get("codigo");
    const result = await env.DB.prepare(
      "SELECT * FROM reservas WHERE codigo = ?"
    )
      .bind(codigo)
      .first();

    return new Response(JSON.stringify(result || {}), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function onRequestDelete({ request, env }) {
  try {
    const data = await request.json();
    await env.DB.prepare("DELETE FROM reservas WHERE codigo = ?")
      .bind(data.codigo)
      .run();

    return new Response(JSON.stringify({ deleted: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
