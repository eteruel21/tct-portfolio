const BASE = import.meta.env.BASE_URL; // compatible con GitHub Pages

export default function Nosotros() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-white text-center"
      style={{
        backgroundImage: `url(${BASE}images/fondo_inicio.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Capa oscura para legibilidad */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Contenido principal */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        {/* Logo */}
        <img
          src={`${BASE}images/logo_tct.png`}
          alt="Logo TCT Sistemas"
          className="mx-auto w-40 md:w-52 mb-8"
        />

        {/* Título principal */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
          TCT Services
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-12">
          Tecnología que protege, controla y automatiza tu mundo.
        </p>

        {/* Contenido con fondo blanco translúcido */}
        <div className="bg-white/90 text-[#1A1A1A] rounded-3xl shadow-xl p-8 md:p-10 space-y-6 text-justify leading-relaxed">
          <p>
            En <strong>TCT Sistemas</strong> somos una empresa dedicada a la integración de{" "}
            <strong>sistemas especiales</strong> para proyectos residenciales, comerciales e industriales.  
            Nos especializamos en el diseño, suministro e instalación de soluciones que brindan{" "}
            <strong>seguridad, control y eficiencia</strong> en cada espacio.
          </p>

          <p>
            Nuestra misión es ofrecer <strong>tecnología confiable</strong> y adaptada a las necesidades
            reales de nuestros clientes, con un enfoque en <strong>calidad, soporte técnico y cumplimiento</strong> 
            en cada proyecto que realizamos.
          </p>

          <div>
            <h2 className="text-2xl font-bold text-[#0D3B66] mb-3">Áreas de especialización</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside text-gray-700">
              <li>Sistemas de estacionamiento (Parking)</li>
              <li>Control de acceso y marcación</li>
              <li>CCTV y videovigilancia inteligente</li>
              <li>Alarmas de incendio y robo</li>
              <li>Automatización y domótica</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0D3B66] mt-8 mb-3">Visión</h2>
            <p>
              Ser una empresa referente en Panamá en la implementación de{" "}
              <strong>sistemas integrados</strong> que aporten valor, seguridad y modernidad a cada proyecto.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0D3B66] mt-8 mb-3">Valores</h2>
            <ul className="flex flex-wrap justify-center gap-3">
              {["Compromiso", "Innovación", "Confianza", "Responsabilidad", "Excelencia"].map((v) => (
                <li
                  key={v}
                  className="px-4 py-2 bg-[#0D3B66]/10 text-[#0D3B66] rounded-full text-sm font-semibold"
                >
                  {v}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pie */}
        <p className="mt-10 text-gray-300 text-sm">
          © {new Date().getFullYear()} TCT Sistemas · Panamá
        </p>
      </div>
    </section>
  );
}
