export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { codigo } = data;

    if (!codigo) {
      return new Response(JSON.stringify({ ok: false, error: "Debe proporcionar el código" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await env.DB.prepare("DELETE FROM reservas WHERE codigo = ?")
      .bind(codigo)
      .run();

    if (result.success) {
      return new Response(JSON.stringify({ ok: true, mensaje: "Reserva cancelada" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new Response(JSON.stringify({ ok: false, error: "Código no encontrado" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
