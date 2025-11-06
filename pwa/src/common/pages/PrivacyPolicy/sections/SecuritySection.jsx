const SecuritySection = () => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      8. MEDIDAS DE SEGURIDAD
    </h2>

    <p className="text-gray-700 leading-relaxed mb-4">
      Victics implementa medidas de seguridad técnicas, administrativas y
      físicas para proteger sus datos personales contra daño, pérdida,
      alteración, destrucción, uso, acceso o divulgación no autorizados.
    </p>

    <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
      8.1 Medidas Técnicas Implementadas
    </h3>
    <ul className="list-disc pl-6 space-y-2 text-gray-700">
      <li>
        <strong>Encriptación de contraseñas:</strong> Las contraseñas se
        almacenan mediante algoritmos de hash seguros (bcrypt, Argon2 o
        similares)
      </li>
      <li>
        <strong>Conexiones seguras:</strong> Uso de protocolo HTTPS/TLS para
        todas las comunicaciones
      </li>
      <li>
        <strong>Control de acceso:</strong> Sistema de autenticación basado en
        tokens (JWT o similar) con expiración automática
      </li>
      <li>
        <strong>Almacenamiento seguro:</strong> Base de datos protegida con
        controles de acceso restrictivos
      </li>
      <li>
        <strong>Infraestructura en la nube:</strong> Uso de proveedores
        certificados con estándares internacionales de seguridad
      </li>
      <li>
        <strong>Respaldos:</strong> Copias de seguridad periódicas de la base de
        datos
      </li>
      <li>
        <strong>Monitoreo:</strong> Registro de actividades sospechosas y
        intentos de acceso no autorizado
      </li>
    </ul>
  </section>
);

export default SecuritySection;
