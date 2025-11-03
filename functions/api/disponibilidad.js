export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const fecha = url.searchParams.get("fecha");
    if (!fecha)
      return new Response(JSON.stringify({ error: "Falta parámetro 'fecha'" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });

    const rows = await env.DB.prepare(
      "SELECT hora FROM reservas WHERE fecha = ?"
    )
      .bind(fecha)
      .all();

    const ocupadas = rows.results.map((r) => r.hora);
    return new Response(JSON.stringify({ ocupadas }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
