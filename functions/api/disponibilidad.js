// functions/api/disponibilidad.js
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const fecha = url.searchParams.get("fecha");
  if (!fecha) return new Response("Fecha requerida", { status: 400 });

  // Consulta las horas ocupadas para esa fecha
  const { results } = await env.DB.prepare(
    "SELECT hora FROM reservas WHERE fecha = ?"
  ).bind(fecha).all();

  const ocupadas = results.map((r) => r.hora);
  return Response.json({ ocupadas });
}
