export async function onRequestPost({ request, env }) {
  const DB = env.DB;

  try {
    // === 1️⃣ Leer datos del cuerpo JSON ===
    const data = await request.json();
    const { nombre, email, telefono, fecha, hora } = data;

    // === 2️⃣ Validar campos requeridos ===
    if (!nombre || !email || !fecha || !hora) {
      return new Response(
        JSON.stringify({ ok: false, error: "Faltan datos requeridos." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // === 3️⃣ Generar código único ===
    const codigo = "TCT-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    // === 4️⃣ Guardar en base de datos D1 ===
    await DB.prepare(
      `INSERT INTO reservas (nombre, email, telefono, fecha, hora, codigo)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
      .bind(nombre, email, telefono || "", fecha, hora, codigo)
      .run();

    // === 5️⃣ Respuesta al cliente ===
    return new Response(
      JSON.stringify({
        ok: true,
        mensaje: "Reserva creada con éxito.",
        codigo,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    // === 6️⃣ Manejo de errores ===
    return new Response(
      JSON.stringify({
        ok: false,
        error: "Error en el servidor: " + error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
