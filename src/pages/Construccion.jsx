const BASE = import.meta.env.BASE_URL;

export default function Construccion() {
  return (
    <section
      className="min-h-screen text-white relative flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${BASE}images/fondo_construccion.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-4xl text-center px-6">
        <h1 className="text-5xl font-extrabold text-[#FFD700] mb-6">
          División de Construcción
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-200 leading-relaxed">
          TCT Services ofrece soluciones completas en construcción: desde obra gris y remodelaciones
          hasta sistemas eléctricos, acabados y proyectos llave en mano.
          <br />
          <br />
          Nuestro compromiso es la excelencia, seguridad y puntualidad en cada obra.
        </p>

        <a
          href="/cotizador?mensaje=Estoy interesado en los servicios de construcción de TCT Services"
          className="inline-block px-8 py-3 bg-[#C1121F] hover:bg-[#A10E1A] rounded-2xl font-semibold"
        >
          Solicitar Cotización
        </a>
      </div>
    </section>
  );
}
