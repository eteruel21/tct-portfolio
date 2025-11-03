export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    const { codigo, fecha, hora } = data;

    if (!codigo || !fecha || !hora) {
      return new Response(JSON.stringify({ ok: false, error: "Faltan datos requeridos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await env.DB.prepare(
      "UPDATE reservas SET fecha = ?, hora = ? WHERE codigo = ?"
    )
      .bind(fecha, hora, codigo)
      .run();

    if (result.success) {
      return new Response(JSON.stringify({ ok: true, mensaje: "Reserva actualizada" }), {
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
