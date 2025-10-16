export default function Inicio() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center text-center text-white"
      style={{
        backgroundImage: "url('./images/fondo_inicio.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Capa semitransparente para legibilidad */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Contenido central */}
      <div className="relative z-10 px-4 max-w-3xl">
        {/* Logo */}
        <img
          src="/images/logo_tct.png"
          alt="Logo TCT Sistemas"
          className="mx-auto w-48 md:w-60 mb-6"
        />

        {/* Texto principal */}
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
          Sistemas Especiales que Protegen, Controlan y Automatizan, tu Hogar o tu Empresa
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Sistema de Parking · Control de Acceso · CCTV · Alarma de Incendio · Alarma de Robo · Automatización
        </p>

        {/* Botones */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <a
            href="/cotizador"
            className="px-6 py-3 bg-[#C1121F] hover:bg-[#A10E1A] rounded-2xl font-semibold"
          >
            Cotizar ahora
          </a>
          <a
            href="/portafolio"
            className="px-6 py-3 bg-[#0D3B66] hover:bg-[#1B4F72] rounded-2xl font-semibold"
          >
            Ver proyectos
          </a>
        </div>
      </div>
    </section>
  );
}
