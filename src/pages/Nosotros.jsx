export default function Nosotros() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-16 text-[#1A1A1A]">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-[#0D3B66]">
        TCT Sistemas
      </h1>
      <p className="text-lg text-center text-gray-700 mb-12">
        <span className="font-semibold">Tecnología que protege, controla y automatiza tu mundo.</span>
      </p>

      <div className="space-y-6 text-justify leading-relaxed text-gray-800">
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

        <div className="bg-[#F9FAFB] p-6 rounded-2xl border border-gray-200">
          <h2 className="text-2xl font-bold mb-3 text-[#0D3B66]">Áreas de especialización</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700 list-disc list-inside">
            <li>Sistemas de estacionamiento (Parking)</li>
            <li>Control de acceso y marcación</li>
            <li>CCTV y videovigilancia inteligente</li>
            <li>Alarmas de incendio y robo</li>
            <li>Automatización y domótica</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold mt-10 mb-3 text-[#0D3B66]">Visión</h2>
          <p>
            Ser una empresa referente en Panamá en la implementación de{" "}
            <strong>sistemas integrados</strong> que aporten valor, seguridad y modernidad a cada proyecto.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mt-10 mb-3 text-[#0D3B66]">Valores</h2>
          <ul className="flex flex-wrap gap-3">
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

      <div className="text-center mt-12">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} TCT Sistemas · Panamá
        </p>
      </div>
    </section>
  );
}
