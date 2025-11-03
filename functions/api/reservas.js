/**
 * === POST ===
 * Crea una nueva reserva en la base de datos.
 */
export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();

    // Validación mínima
    if (!data.nombre || !data.email || !data.fecha || !data.hora || !data.codigo) {
      return new Response(JSON.stringify({ error: "Faltan datos obligatorios" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

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

/**
 * === GET ===
 * Si viene ?codigo=XYZ devuelve una reserva.
 * Si no viene código, devuelve todas las reservas.
 */
export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const codigo = url.searchParams.get("codigo");

    if (codigo) {
      const result = await env.DB.prepare(
        "SELECT * FROM reservas WHERE codigo = ?"
      )
        .bind(codigo)
        .first();
      return new Response(JSON.stringify(result || {}), {
        headers: { "Content-Type": "application/json" },
      });
    }

    // Obtener todas las reservas (modo panel admin)
    const result = await env.DB.prepare(
      "SELECT * FROM reservas ORDER BY fecha DESC, hora ASC"
    ).all();

    return new Response(JSON.stringify(result.results || []), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

/**
 * === DELETE ===
 * Elimina una reserva por su código.
 */
export async function onRequestDelete({ request, env }) {
  try {
    const data = await request.json();

    if (!data.codigo) {
      return new Response(JSON.stringify({ error: "Falta el código" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

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
