export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const codigo = url.searchParams.get("codigo");

    if (codigo) {
      // === Cliente busca su reserva por código ===
      const result = await env.DB.prepare(
        "SELECT * FROM reservas WHERE codigo = ?"
      )
        .bind(codigo)
        .first();

      if (!result)
        return new Response(JSON.stringify({ error: "No encontrada" }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });

      return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
      });
    } else {
      // === Admin obtiene todas las reservas ===
      const { results } = await env.DB.prepare(
        "SELECT * FROM reservas ORDER BY fecha, hora"
      ).all();

      return new Response(JSON.stringify(results), {
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function onRequestPost({ request, env }) {
  try {
    const data = await request.json();
    await env.DB.prepare(
      "INSERT INTO reservas (codigo, nombre, email, telefono, fecha, hora) VALUES (?, ?, ?, ?, ?, ?)"
    )
      .bind(data.codigo, data.nombre, data.email, data.telefono, data.fecha, data.hora)
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

export async function onRequestPut({ request, env }) {
  try {
    const data = await request.json();
    await env.DB.prepare(
      "UPDATE reservas SET nombre=?, email=?, telefono=?, fecha=?, hora=? WHERE codigo=?"
    )
      .bind(data.nombre, data.email, data.telefono, data.fecha, data.hora, data.codigo)
      .run();

    return new Response(JSON.stringify({ updated: true }), {
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
