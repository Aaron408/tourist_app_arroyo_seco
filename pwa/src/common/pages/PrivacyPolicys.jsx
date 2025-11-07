import { useEffect } from 'react';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8 border-b pb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Aviso de Privacidad
          </h1>
          <p className="text-lg text-gray-600">Conforme a la LFPDPPP</p>
          <p className="text-md text-gray-500 mt-2">Proyecto "Xi'oi Gourmet"</p>
          <p className="text-md text-gray-500">Plataforma Digital "Xi'oi Gourmet"</p>
          <p className="text-sm text-gray-400 mt-3">
            Última actualización: 17 de octubre de 2025
          </p>
        </div>

        {/* Contenido */}
        <div className="prose prose-lg max-w-none">
          
          {/* 1. IDENTIDAD Y DOMICILIO DEL RESPONSABLE */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. IDENTIDAD Y DOMICILIO DEL RESPONSABLE</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Victics</strong> (en adelante, "el Responsable" o "Victics") con domicilio en Querétaro, 
              Querétaro, México, es el responsable del tratamiento de los datos personales que usted nos proporcione 
              a través de la plataforma digital "Xi'oi Gourmet".
            </p>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Datos de Contacto</h3>
              <p className="text-blue-800"><strong>Correo electrónico:</strong> ratonrangelmejia+2@gmail.com</p>
              <p className="text-blue-800"><strong>Domicilio:</strong> Querétaro, Querétaro, México</p>
              <p className="text-blue-800"><strong>Plataforma:</strong> Xi'oi Gourmet</p>
            </div>
          </section>

          {/* 2. DATOS PERSONALES QUE RECABAMOS */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. DATOS PERSONALES QUE RECABAMOS</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Datos Personales de Identificación</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Para el uso de la Plataforma, Victics recaba únicamente los siguientes datos personales:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Nombre de usuario:</strong> Puede ser un alias o seudónimo elegido libremente, o su nombre real si así lo prefiere</li>
              <li><strong>Correo electrónico:</strong> Dirección de correo electrónico válida y activa</li>
              <li><strong>Contraseña:</strong> Clave de acceso personal elegida por el Usuario, almacenada mediante algoritmos de encriptación seguros</li>
            </ul>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-6 rounded">
              <h3 className="text-xl font-semibold text-green-900 mb-2">2.2 Datos que NO Recabamos</h3>
              <p className="text-green-800 mb-2"><strong>Victics NO solicita, recaba, almacena ni procesa:</strong></p>
              <ul className="list-disc pl-6 space-y-1 text-green-800">
                <li>Datos personales sensibles (origen étnico, estado de salud, creencias religiosas, preferencia sexual)</li>
                <li>Datos financieros o información bancaria</li>
                <li>Números de identificación oficial (INE/IFE, pasaporte, RFC, CURP)</li>
                <li>Números telefónicos</li>
                <li>Direcciones físicas completas</li>
                <li>Datos de geolocalización en tiempo real</li>
                <li>Fotografías personales</li>
                <li>Datos biométricos</li>
                <li>Información sobre menores de edad</li>
              </ul>
            </div>
          </section>

          {/* 3. FINALIDADES DEL TRATAMIENTO */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. FINALIDADES DEL TRATAMIENTO</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.1 Finalidades Primarias (Necesarias para el Servicio)</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Los datos personales recabados serán utilizados para las siguientes finalidades primarias, necesarias para la prestación del servicio:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li><strong>Identificación y autenticación:</strong> Crear y administrar la cuenta del Usuario en la Plataforma</li>
              <li><strong>Gestión de acceso:</strong> Permitir el inicio de sesión y acceso al contenido de la aplicación móvil</li>
              <li><strong>Atribución de contenido:</strong> Asociar los comentarios publicados con el Usuario correspondiente</li>
              <li><strong>Comunicaciones esenciales:</strong> Notificar cambios importantes en los Términos y Condiciones o Aviso de Privacidad</li>
              <li><strong>Seguridad:</strong> Proteger la integridad y seguridad de la Plataforma, prevenir fraudes y uso indebido</li>
              <li><strong>Cumplimiento legal:</strong> Dar cumplimiento a obligaciones derivadas de la normativa aplicable</li>
            </ol>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4 rounded">
              <p className="text-amber-900 font-semibold">
                <strong>Nota importante:</strong> El consentimiento para el tratamiento de datos con estas finalidades primarias 
                es una condición necesaria para el uso de la Plataforma. La negativa a proporcionar estos datos impedirá el registro y uso del servicio.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3.2 Finalidades Secundarias (Opcionales)</h3>
            <p className="text-gray-700 leading-relaxed">
              Victics <strong>NO</strong> utiliza los datos personales para finalidades secundarias tales como:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 mt-2">
              <li>Mercadotecnia, publicidad o prospección comercial</li>
              <li>Análisis de perfiles de consumo o comportamiento</li>
              <li>Compartición con socios comerciales</li>
              <li>Cualquier otro propósito no relacionado con la operación de la Plataforma</li>
            </ul>
          </section>

          {/* 4. TRANSFERENCIAS DE DATOS PERSONALES */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. TRANSFERENCIAS DE DATOS PERSONALES</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
              <h3 className="text-xl font-semibold text-red-900 mb-2">4.1 Política de No Transferencia Comercial</h3>
              <p className="text-red-800 font-semibold">
                Victics NO vende, renta, comercializa ni transfiere sus datos personales a terceros con fines comerciales, publicitarios o mercadotécnicos.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4.2 Transferencia a Proveedores de Servicios</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Victics utiliza proveedores de infraestructura tecnológica para la operación de la Plataforma:
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Proveedor</th>
                    <th className="text-left py-2">Servicio</th>
                    <th className="text-left py-2">Ubicación</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2">Servicios de nube</td>
                    <td className="py-2">Almacenamiento y hosting de base de datos</td>
                    <td className="py-2">Estados Unidos</td>
                  </tr>
                  <tr>
                    <td className="py-2">Supabase (o similar)</td>
                    <td className="py-2">Autenticación y gestión de usuarios</td>
                    <td className="py-2">Estados Unidos</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 5. MEDIOS Y PROCEDIMIENTO PARA EJERCER DERECHOS ARCO */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. MEDIOS Y PROCEDIMIENTO PARA EJERCER DERECHOS ARCO</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.1 Derechos del Titular</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              En cumplimiento de la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), usted tiene derecho a:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Acceso:</strong> Conocer qué datos personales tenemos sobre usted y para qué los utilizamos</li>
              <li><strong>Rectificación:</strong> Solicitar la corrección de su información personal en caso de que esté desactualizada o inexacta</li>
              <li><strong>Cancelación:</strong> Solicitar que eliminemos su información personal de nuestros registros</li>
              <li><strong>Oposición:</strong> Oponerse al uso de sus datos personales para fines específicos</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.2 Procedimiento para Ejercer Derechos ARCO</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              Para ejercer cualquiera de los Derechos ARCO, usted deberá presentar una solicitud por escrito a través del siguiente medio:
            </p>
            <div className="bg-blue-100 p-4 rounded-lg">
              <p className="text-blue-900 font-semibold">Correo electrónico: ratonrangelmejia+2@gmail.com</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.3 Plazo de Respuesta</h3>
            <p className="text-gray-700 leading-relaxed">
              Victics dará respuesta a su Solicitud ARCO en un plazo máximo de <strong>20 (veinte) días hábiles</strong>, 
              contados a partir de la fecha en que se recibió la solicitud.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.4 Procedimiento Simplificado de Cancelación</h3>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-900 mb-2">Para facilitar el ejercicio del derecho de cancelación, Victics ofrece un procedimiento simplificado:</p>
              <ol className="list-decimal pl-6 space-y-1 text-green-800">
                <li>Envíe un correo electrónico a: ratonrangelmejia+2@gmail.com con el asunto "Solicitud de Cancelación de Cuenta"</li>
                <li>Incluya su nombre de usuario registrado y correo electrónico asociado</li>
                <li>Victics confirmará la solicitud en un plazo máximo de 5 días hábiles</li>
                <li>La eliminación definitiva se realizará en un plazo de 15 días hábiles</li>
              </ol>
            </div>
          </section>

          {/* 8. MEDIDAS DE SEGURIDAD */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. MEDIDAS DE SEGURIDAD</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Victics implementa medidas de seguridad técnicas, administrativas y físicas para proteger sus datos personales contra 
              daño, pérdida, alteración, destrucción, uso, acceso o divulgación no autorizados.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">8.1 Medidas Técnicas Implementadas</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Encriptación de contraseñas:</strong> Las contraseñas se almacenan mediante algoritmos de hash seguros (bcrypt, Argon2 o similares)</li>
              <li><strong>Conexiones seguras:</strong> Uso de protocolo HTTPS/TLS para todas las comunicaciones</li>
              <li><strong>Control de acceso:</strong> Sistema de autenticación basado en tokens (JWT o similar) con expiración automática</li>
              <li><strong>Almacenamiento seguro:</strong> Base de datos protegida con controles de acceso restrictivos</li>
              <li><strong>Infraestructura en la nube:</strong> Uso de proveedores certificados con estándares internacionales de seguridad</li>
              <li><strong>Respaldos:</strong> Copias de seguridad periódicas de la base de datos</li>
              <li><strong>Monitoreo:</strong> Registro de actividades sospechosas y intentos de acceso no autorizado</li>
            </ul>
          </section>

          {/* 10. DATOS DE MENORES DE EDAD */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. DATOS DE MENORES DE EDAD</h2>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <h3 className="text-xl font-semibold text-red-900 mb-2">10.1 Prohibición Expresa</h3>
              <p className="text-red-800 font-semibold">
                La Plataforma "Xi'oi Gourmet" NO está dirigida a menores de 18 años de edad.
              </p>
              <p className="text-red-800 mt-2">
                Victics NO recaba, almacena ni procesa intencionalmente datos personales de menores de edad.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mt-4">
              Si usted es padre, madre o tutor legal y descubre que su hijo menor de edad ha proporcionado datos personales 
              sin su consentimiento, le solicitamos contactar inmediatamente a: <strong>ratonrangelmejia+2@gmail.com</strong>
            </p>
          </section>

          {/* 13. AUTORIDAD COMPETENTE */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. AUTORIDAD COMPETENTE</h2>
            
            <p className="text-gray-700 leading-relaxed mb-3">
              Para cualquier procedimiento de protección de derechos relacionados con datos personales, la autoridad competente es 
              el <strong>Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI)</strong>.
            </p>

            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Datos de Contacto del INAI</h3>
              <p className="text-blue-800"><strong>Sitio web:</strong> http://www.inai.org.mx</p>
              <p className="text-blue-800"><strong>Teléfono:</strong> 800 835 43 24 (lada sin costo)</p>
              <p className="text-blue-800"><strong>Teléfono:</strong> 55 5004 2400 (Ciudad de México)</p>
              <p className="text-blue-800"><strong>Dirección:</strong> Insurgentes Sur 3211, Col. Insurgentes Cuicuilco, Alcaldía Coyoacán, C.P. 04530, Ciudad de México</p>
            </div>
          </section>

          {/* 16. INFORMACIÓN DE CONTACTO PARA ASUNTOS DE PRIVACIDAD */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. INFORMACIÓN DE CONTACTO PARA ASUNTOS DE PRIVACIDAD</h2>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              Para cualquier duda, comentario, queja o solicitud relacionada con el tratamiento de sus datos personales 
              o este Aviso de Privacidad, puede contactar a Victics a través de:
            </p>

            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-800 mb-2"><strong>Correo electrónico:</strong> ratonrangelmejia+2@gmail.com</p>
              <p className="text-gray-800 mb-2"><strong>Asunto:</strong> "Privacidad - Datos Personales"</p>
              <p className="text-gray-800"><strong>Domicilio:</strong> Querétaro, Querétaro, México</p>
            </div>

            <p className="text-gray-700 leading-relaxed mt-4">
              Victics se compromete a responder cualquier consulta relacionada con privacidad en un plazo máximo de 
              <strong> 10 días hábiles</strong> a partir de la recepción de su comunicación.
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              ÚLTIMA ACTUALIZACIÓN: 17 DE OCTUBRE DE 2025
            </p>
            <p className="text-sm text-gray-600 font-semibold">
              VICTICS
            </p>
            <p className="text-sm text-gray-600">
              Responsable del Tratamiento de Datos Personales
            </p>
            <p className="text-sm text-gray-600">
              Plataforma "Xi'oi Gourmet"
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Querétaro, Querétaro, México
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Este Aviso de Privacidad se emite en cumplimiento de la Ley Federal de Protección de Datos Personales 
              en Posesión de los Particulares, publicada en el Diario Oficial de la Federación el 5 de julio de 2010, 
              y su Reglamento publicado el 21 de diciembre de 2011.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;