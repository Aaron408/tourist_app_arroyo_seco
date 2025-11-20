import { useEffect } from 'react';

const PrivacyNotice = () => {
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
          <p className="text-lg text-gray-600">Conforme a la Ley General de Protección de Datos Personales</p>
          <p className="text-lg text-gray-600">Proyecto "Xi'oi Gourmet"</p>
          <p className="text-md text-gray-500">Plataforma Digital "Ruta del Sabor"</p>
          <p className="text-sm text-gray-400 mt-2">
            Última actualización: 17 de octubre de 2025
          </p>
        </div>

        {/* Contenido */}
        <div className="prose prose-lg max-w-none space-y-8">

          {/* 1. IDENTIDAD Y DOMICILIO DEL RESPONSABLE */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. IDENTIDAD Y DOMICILIO DEL RESPONSABLE</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">1.1 Responsable del Tratamiento de Datos Personales</h3>
            <p className="text-gray-700 leading-relaxed">
              <strong>Victics</strong> (en adelante, "el Responsable", "nosotros" o "Victics") con domicilio en Arroyo Seco, Querétaro, México, es el responsable del tratamiento de los datos personales que usted (en adelante, "el Titular", "usted" o "el Usuario") nos proporcione a través de la plataforma digital "Ruta del Sabor" (en adelante, "la Plataforma").
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1.2 Datos de Contacto</h3>
            <p className="text-gray-700 leading-relaxed">Para cualquier comunicación relacionada con el tratamiento de sus datos personales, puede contactarnos en:</p>
            <div className="bg-gray-100 p-4 rounded-lg mt-3">
              <p className="text-sm"><strong>Correo electrónico:</strong> example@victics.com</p>
              <p className="text-sm"><strong>Domicilio:</strong> Arroyo Seco, Querétaro, México</p>
              <p className="text-sm"><strong>Plataforma:</strong> Ruta del Sabor</p>
            </div>
          </section>

          {/* 2. DATOS PERSONALES QUE RECABAMOS */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. DATOS PERSONALES QUE RECABAMOS</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Datos Personales de Identificación</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Para el uso de la Plataforma, Victics recaba únicamente los siguientes datos personales:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li><strong>Nombre de usuario:</strong> Puede ser un alias o seudónimo elegido libremente por el Usuario, o su nombre real si así lo prefiere.</li>
              <li><strong>Correo electrónico:</strong> Dirección de correo electrónico válida y activa.</li>
              <li><strong>Contraseña:</strong> Clave de acceso personal elegida por el Usuario, almacenada mediante algoritmos de encriptación seguros.</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2.2 Datos que NO Recabamos</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Victics NO solicita, recaba, almacena ni procesa:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Datos personales sensibles (origen étnico o racial, estado de salud, información genética, creencias religiosas, filosóficas o morales, afiliación sindical, opiniones políticas, preferencia sexual)</li>
              <li>Datos financieros o información bancaria</li>
              <li>Números de identificación oficial (INE/IFE, pasaporte, RFC, CURP)</li>
              <li>Números telefónicos</li>
              <li>Direcciones físicas completas</li>
              <li>Datos de geolocalización en tiempo real</li>
              <li>Fotografías personales</li>
              <li>Datos biométricos</li>
              <li>Información sobre menores de edad</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2.3 Medios de Obtención de Datos</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Los datos personales son obtenidos directamente del Titular a través de:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>Formulario de registro en la aplicación móvil</li>
              <li>Sistema de autenticación proporcionado por Supabase o servicios similares</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold">Victics NO obtiene datos personales de:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Fuentes públicas</li>
              <li>Redes sociales</li>
              <li>Proveedores de bases de datos comerciales</li>
              <li>Terceros no autorizados por el Titular</li>
            </ul>
          </section>

          {/* 3. FINALIDADES DEL TRATAMIENTO */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. FINALIDADES DEL TRATAMIENTO</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.1 Finalidades Primarias (Necesarias para el Servicio)</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Los datos personales recabados serán utilizados para las siguientes finalidades primarias, necesarias para la prestación del servicio:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li><strong>Identificación y autenticación:</strong> Crear y administrar la cuenta del Usuario en la Plataforma</li>
              <li><strong>Gestión de acceso:</strong> Permitir el inicio de sesión y acceso al contenido de la aplicación móvil</li>
              <li><strong>Atribución de contenido:</strong> Asociar los comentarios publicados con el Usuario correspondiente</li>
              <li><strong>Comunicaciones esenciales:</strong> Notificar cambios importantes en los Términos y Condiciones, Aviso de Privacidad o funcionamiento de la Plataforma</li>
              <li><strong>Seguridad:</strong> Proteger la integridad y seguridad de la Plataforma, prevenir fraudes y uso indebido</li>
              <li><strong>Cumplimiento legal:</strong> Dar cumplimiento a obligaciones derivadas de la normativa aplicable</li>
            </ol>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4 rounded">
              <p className="text-amber-800 font-semibold">Nota importante:</p>
              <p className="text-amber-800">El consentimiento para el tratamiento de datos con estas finalidades primarias es una condición necesaria para el uso de la Plataforma. La negativa a proporcionar estos datos impedirá el registro y uso del servicio.</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3.2 Finalidades Secundarias (Opcionales)</h3>
            <p className="text-gray-700 leading-relaxed">Victics NO utiliza los datos personales para finalidades secundarias tales como:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Mercadotecnia, publicidad o prospección comercial</li>
              <li>Análisis de perfiles de consumo o comportamiento</li>
              <li>Compartición con socios comerciales</li>
              <li>Cualquier otro propósito no relacionado con la operación de la Plataforma</li>
            </ul>
          </section>

          {/* 4. TRANSFERENCIAS DE DATOS PERSONALES */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. TRANSFERENCIAS DE DATOS PERSONALES</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.1 Política de No Transferencia Comercial</h3>
            <p className="text-gray-700 leading-relaxed">
              Victics NO vende, renta, comercializa ni transfiere sus datos personales a terceros con fines comerciales, publicitarios o mercadotécnicos.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4.2 Transferencias Permitidas sin Consentimiento</h3>
            <p className="text-gray-700 leading-relaxed mb-2">De conformidad con la Ley General de Protección de Datos Personales, Victics puede realizar transferencias de datos personales sin consentimiento en los siguientes casos:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Cuando la transferencia esté prevista en una ley o tratado internacional</li>
              <li>Cuando sea necesaria para la prevención o el diagnóstico médico del Titular (no aplicable en este caso)</li>
              <li>Cuando se realice a sociedades controladoras, subsidiarias o afiliadas bajo el control común del Responsable</li>
              <li>Cuando sea necesaria por virtud de un contrato celebrado en interés del Titular</li>
              <li>Cuando sea necesaria o legalmente exigida para la salvaguarda de un interés público</li>
              <li>Cuando sea precisa para el reconocimiento, ejercicio o defensa de un derecho en un proceso judicial</li>
              <li>Cuando sea necesaria para el mantenimiento o cumplimiento de una relación jurídica entre el Responsable y el Titular</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4.3 Transferencia a Proveedores de Servicios</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Victics utiliza proveedores de infraestructura tecnológica para la operación de la Plataforma. Estos proveedores actúan como encargados del tratamiento y tienen acceso técnico a los datos personales almacenados en sus servidores:</p>
            <div className="overflow-x-auto mt-3">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left"><strong>Proveedor</strong></th>
                    <th className="border border-gray-300 p-2 text-left"><strong>Servicio</strong></th>
                    <th className="border border-gray-300 p-2 text-left"><strong>Ubicación</strong></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Servicios de nube</td>
                    <td className="border border-gray-300 p-2">Almacenamiento y hosting de base de datos (PostgreSQL, Redis)</td>
                    <td className="border border-gray-300 p-2">Estados Unidos</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">Supabase (o similar)</td>
                    <td className="border border-gray-300 p-2">Autenticación y gestión de usuarios</td>
                    <td className="border border-gray-300 p-2">Estados Unidos</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed mt-3">Estos proveedores están obligados contractualmente a:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Mantener la confidencialidad de los datos</li>
              <li>Implementar medidas de seguridad adecuadas</li>
              <li>No utilizar los datos para fines propios</li>
              <li>Cumplir con la legislación aplicable en materia de protección de datos</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4.4 Transferencia a Autoridades</h3>
            <p className="text-gray-700 leading-relaxed">Victics podrá compartir datos personales con autoridades competentes cuando:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Sea requerido mediante orden judicial o mandamiento legal</li>
              <li>Sea necesario para investigaciones penales o administrativas</li>
              <li>Se requiera para proteger los derechos, seguridad o propiedad de Victics, usuarios o el público</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4.5 Transferencia Estadística al Gobierno Municipal</h3>
            <p className="text-gray-700 leading-relaxed">
              Los datos agregados y anonimizados (sin información personal identificable) pueden ser compartidos con el Gobierno Municipal de Arroyo Seco, Querétaro únicamente para fines estadísticos de promoción turística y cultural.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">Estos datos NO incluyen información que permita identificar individualmente a los Usuarios.</p>
          </section>

          {/* 5. DERECHOS ARCO */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. MEDIOS Y PROCEDIMIENTO PARA EJERCER DERECHOS ARCO</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.1 Derechos del Titular</h3>
            <p className="text-gray-700 leading-relaxed mb-2">En cumplimiento de la Ley General de Protección de Datos Personales, usted tiene derecho a:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Acceso:</strong> Conocer qué datos personales tenemos sobre usted, para qué los utilizamos y las condiciones de uso</li>
              <li><strong>Rectificación:</strong> Solicitar la corrección de su información personal en caso de que esté desactualizada, sea inexacta o esté incompleta</li>
              <li><strong>Cancelación:</strong> Solicitar que eliminemos su información personal de nuestros registros o bases de datos</li>
              <li><strong>Oposición:</strong> Oponerse al uso de sus datos personales para fines específicos</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold mt-3">Estos derechos se conocen como <strong>Derechos ARCO</strong>.</p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.2 Procedimiento para Ejercer Derechos ARCO</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Para ejercer cualquiera de los Derechos ARCO, usted deberá presentar una solicitud por escrito ("Solicitud ARCO") a través del siguiente medio:</p>
            <div className="bg-gray-100 p-4 rounded-lg mt-3">
              <p className="text-sm"><strong>Correo electrónico:</strong> example@victics.com</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.3 Requisitos de la Solicitud ARCO</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Su Solicitud ARCO deberá contener:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Nombre completo del Titular y domicilio u otro medio para comunicarle la respuesta</li>
              <li>Documentos que acrediten su identidad (copia de identificación oficial vigente)</li>
              <li>Descripción clara y precisa de los datos personales respecto de los cuales busca ejercer alguno de los Derechos ARCO</li>
              <li>Cualquier elemento o documento que facilite la localización de sus datos personales</li>
              <li>En caso de solicitar rectificación, deberá indicar las modificaciones a realizarse y aportar documentación que sustente su petición</li>
              <li>La indicación del lugar donde el Titular puede recibir la información solicitada o consultar su expediente</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.4 Plazo de Respuesta</h3>
            <p className="text-gray-700 leading-relaxed">
              Victics dará respuesta a su Solicitud ARCO en un plazo máximo de <strong>20 (veinte) días hábiles</strong>, contados a partir de la fecha en que se recibió la solicitud.
            </p>
            <p className="text-gray-700 leading-relaxed">
              La respuesta se comunicará al correo electrónico o medio de contacto proporcionado en la solicitud.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.5 Plazos de Efectividad</h3>
            <p className="text-gray-700 leading-relaxed">Una vez aprobada la solicitud:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Acceso:</strong> La información solicitada se proporcionará en un plazo de 15 días hábiles</li>
              <li><strong>Rectificación:</strong> Las correcciones se realizarán en un plazo de 15 días hábiles</li>
              <li><strong>Cancelación:</strong> Los datos serán eliminados en un plazo de 15 días hábiles</li>
              <li><strong>Oposición:</strong> El cese del uso de datos se efectuará en un plazo de 15 días hábiles</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.6 Medios de Reproducción</h3>
            <p className="text-gray-700 leading-relaxed">La información solicitada en ejercicio del derecho de acceso podrá entregarse en:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Documento electrónico (PDF)</li>
              <li>Correo electrónico</li>
              <li>Cualquier otro medio que el Titular y Victics acuerden</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.7 Causales de Negativa</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Victics podrá negar el ejercicio de los Derechos ARCO en los siguientes casos:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Cuando el solicitante no sea el Titular de los datos personales, o no acredite la representación legal del Titular</li>
              <li>Cuando los datos personales no obren en la base de datos del Responsable</li>
              <li>Cuando se lesionen los derechos de un tercero</li>
              <li>Cuando exista un impedimento legal o una resolución de autoridad competente que restrinja el acceso o no permita la rectificación, cancelación u oposición</li>
              <li>Cuando la rectificación, cancelación u oposición haya sido previamente realizada</li>
            </ol>
            <p className="text-gray-700 leading-relaxed">
              La negativa se notificará por escrito o por medios electrónicos, expresando las razones fundamentadas y legales.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.8 Procedimiento Simplificado de Cancelación</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Para facilitar el ejercicio del derecho de cancelación, Victics ofrece un procedimiento simplificado:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>El Usuario puede solicitar la eliminación de su cuenta enviando un correo electrónico a: <strong>example@victics.com</strong> con el asunto "Solicitud de Cancelación de Cuenta"</li>
              <li>Deberá incluir su nombre de usuario registrado y correo electrónico asociado</li>
              <li>Victics confirmará la solicitud en un plazo máximo de 5 días hábiles</li>
              <li>La eliminación definitiva se realizará en un plazo de 15 días hábiles</li>
            </ol>
          </section>

          {/* 6. REVOCACIÓN DEL CONSENTIMIENTO */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. REVOCACIÓN DEL CONSENTIMIENTO</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.1 Derecho a Revocar el Consentimiento</h3>
            <p className="text-gray-700 leading-relaxed">
              Usted puede revocar el consentimiento que nos ha otorgado para el tratamiento de sus datos personales en cualquier momento.
            </p>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-3 rounded">
              <p className="text-amber-800 font-semibold">Importante:</p>
              <p className="text-amber-800">La revocación del consentimiento para finalidades primarias implica que no podremos continuar prestándole el servicio que nos solicitó, lo que resultará en la cancelación de su cuenta en la Plataforma.</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6.2 Procedimiento para Revocar el Consentimiento</h3>
            <p className="text-gray-700 leading-relaxed">
              Para revocar su consentimiento, deberá seguir el mismo procedimiento establecido para el ejercicio de los Derechos ARCO (Sección 5.2), indicando claramente su deseo de revocar el consentimiento.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6.3 Consecuencias de la Revocación</h3>
            <p className="text-gray-700 leading-relaxed">Al revocar el consentimiento:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Su cuenta será desactivada inmediatamente</li>
              <li>Sus datos personales serán eliminados conforme a los plazos establecidos</li>
              <li>No podrá acceder a la Plataforma ni a sus funcionalidades</li>
              <li>Los comentarios publicados previamente podrán permanecer visibles de forma anónima (sin asociación a su cuenta)</li>
            </ul>
          </section>

          {/* 7. LIMITACIÓN DE USO Y DIVULGACIÓN */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. LIMITACIÓN DE USO Y DIVULGACIÓN DE DATOS</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">7.1 Derecho a Limitar el Uso</h3>
            <p className="text-gray-700 leading-relaxed">
              Usted tiene derecho a limitar el uso y divulgación de sus datos personales. Sin embargo, dado que Victics únicamente utiliza los datos para finalidades primarias necesarias para la prestación del servicio, cualquier limitación resultará en la imposibilidad de continuar proporcionando acceso a la Plataforma.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">7.2 Solicitud de Limitación</h3>
            <p className="text-gray-700 leading-relaxed">
              Para ejercer este derecho, deberá seguir el procedimiento de Derechos ARCO especificando claramente las limitaciones que desea imponer.
            </p>
          </section>

          {/* 8. MEDIDAS DE SEGURIDAD */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. MEDIDAS DE SEGURIDAD</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">8.1 Compromiso con la Seguridad</h3>
            <p className="text-gray-700 leading-relaxed">
              Victics implementa medidas de seguridad técnicas, administrativas y físicas para proteger sus datos personales contra daño, pérdida, alteración, destrucción, uso, acceso o divulgación no autorizados.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">8.2 Medidas Técnicas Implementadas</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Encriptación de contraseñas:</strong> Las contraseñas se almacenan mediante algoritmos de hash seguros (bcrypt, Argon2 o similares)</li>
              <li><strong>Conexiones seguras:</strong> Uso de protocolo HTTPS/TLS para todas las comunicaciones entre la aplicación y los servidores</li>
              <li><strong>Control de acceso:</strong> Sistema de autenticación basado en tokens (JWT o similar) con expiración automática</li>
              <li><strong>Almacenamiento seguro:</strong> Base de datos protegida con controles de acceso restrictivos</li>
              <li><strong>Infraestructura en la nube:</strong> Uso de proveedores certificados con estándares internacionales de seguridad</li>
              <li><strong>Respaldos:</strong> Copias de seguridad periódicas de la base de datos</li>
              <li><strong>Monitoreo:</strong> Registro de actividades sospechosas e intentos de acceso no autorizado</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">8.3 Medidas Administrativas</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Políticas internas de manejo de datos personales</li>
              <li>Limitación de acceso a datos personales al personal estrictamente necesario</li>
              <li>Acuerdos de confidencialidad con colaboradores y proveedores</li>
              <li>Capacitación en protección de datos personales</li>
              <li>Procedimientos de respuesta ante incidentes de seguridad</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">8.4 Limitaciones de Seguridad</h3>
            <p className="text-gray-700 leading-relaxed">Victics reconoce que ningún sistema de transmisión o almacenamiento electrónico es 100% seguro. Por ello:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>No podemos garantizar la seguridad absoluta de sus datos</li>
              <li>No seremos responsables por vulneraciones de seguridad causadas por eventos fuera de nuestro control razonable</li>
              <li>Recomendamos al Usuario mantener la confidencialidad de sus credenciales de acceso</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">8.5 Notificación de Brechas de Seguridad</h3>
            <p className="text-gray-700 leading-relaxed">En caso de una brecha de seguridad que pueda afectar significativamente los derechos patrimoniales o morales de los Titulares, Victics notificará de inmediato:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Al Titular afectado mediante correo electrónico registrado</li>
              <li>A las autoridades competentes, si así lo requiere la ley</li>
            </ol>
          </section>

          {/* 9. USO DE COOKIES */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. USO DE COOKIES Y TECNOLOGÍAS DE RASTREO</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">9.1 Política de No Uso de Cookies Invasivas</h3>
            <p className="text-gray-700 leading-relaxed">La Plataforma "Ruta del Sabor" NO utiliza:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Cookies de terceros para publicidad</li>
              <li>Tecnologías de rastreo con fines comerciales</li>
              <li>Google Analytics o herramientas similares de analítica web</li>
              <li>Píxeles de seguimiento</li>
              <li>Identificadores publicitarios</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">9.2 Cookies Estrictamente Necesarias</h3>
            <p className="text-gray-700 leading-relaxed mb-2">La Plataforma puede utilizar únicamente cookies o almacenamiento local (LocalStorage/SessionStorage) estrictamente necesarias para:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-2">
              <li>Mantener la sesión de Usuario autenticado</li>
              <li>Recordar preferencias de idioma</li>
              <li>Funcionalidades básicas de la aplicación</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Estas cookies no recopilan información personal identificable más allá de la sesión activa.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">9.3 Almacenamiento Offline en Aplicación Móvil</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              La aplicación móvil utiliza almacenamiento local (SQLite) para permitir el acceso offline al contenido. Este almacenamiento NO incluye datos personales del Usuario, únicamente:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-2">
              <li>Contenido público (recetas, información de restaurantes, técnicas culinarias)</li>
              <li>Preferencias de idioma</li>
              <li>Token de sesión encriptado</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              El Usuario puede eliminar este contenido en caché en cualquier momento desde la configuración de la aplicación.
            </p>
          </section>

          {/* 10. DATOS DE MENORES DE EDAD */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. DATOS DE MENORES DE EDAD</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">10.1 Prohibición Expresa</h3>
            <p className="text-gray-700 leading-relaxed">
              La Plataforma "Ruta del Sabor" <strong>NO está dirigida a menores de 18 años de edad</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Victics <strong>NO recaba, almacena ni procesa intencionalmente</strong> datos personales de menores de edad.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">10.2 Verificación de Edad</h3>
            <p className="text-gray-700 leading-relaxed">
              Al registrarse en la Plataforma, el Usuario declara bajo protesta de decir verdad que es mayor de 18 años de edad y tiene capacidad legal para contratar.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">10.3 Procedimiento en Caso de Detección</h3>
            <p className="text-gray-700 leading-relaxed">Si Victics tiene conocimiento de que ha recabado inadvertidamente datos personales de un menor de edad:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Eliminará inmediatamente dicha información de sus bases de datos</li>
              <li>Cancelará la cuenta correspondiente</li>
              <li>Tomará medidas adicionales para prevenir futuros registros de menores</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">10.4 Responsabilidad de Padres y Tutores</h3>
            <p className="text-gray-700 leading-relaxed">
              Si usted es padre, madre o tutor legal y descubre que su hijo menor de edad ha proporcionado datos personales sin su consentimiento, le solicitamos contactar inmediatamente a: <strong>example@victics.com</strong>
            </p>
          </section>

          {/* 11. MODIFICACIONES AL AVISO */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. MODIFICACIONES AL AVISO DE PRIVACIDAD</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">11.1 Derecho a Modificar</h3>
            <p className="text-gray-700 leading-relaxed">Victics se reserva el derecho de modificar, actualizar o complementar este Aviso de Privacidad en cualquier momento para:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Cumplir con cambios en la legislación aplicable</li>
              <li>Reflejar cambios en nuestras prácticas de tratamiento de datos</li>
              <li>Incorporar nuevas funcionalidades en la Plataforma</li>
              <li>Mejorar la protección de datos personales</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">11.2 Notificación de Cambios</h3>
            <p className="text-gray-700 leading-relaxed">Cualquier modificación a este Aviso de Privacidad será comunicada a los Usuarios a través de:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Publicación del aviso actualizado en la Plataforma</li>
              <li>Notificación por correo electrónico a la dirección registrada</li>
              <li>Aviso destacado al iniciar sesión en la aplicación móvil</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">11.3 Fecha de Vigencia</h3>
            <p className="text-gray-700 leading-relaxed">
              Las modificaciones entrarán en vigor a partir de la fecha de su publicación. La "Última actualización" indicada al inicio de este documento refleja la versión vigente.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">11.4 Aceptación de Cambios</h3>
            <p className="text-gray-700 leading-relaxed">
              El uso continuado de la Plataforma después de la publicación de cambios al Aviso de Privacidad constituye la aceptación de dichos cambios.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Si no está de acuerdo con las modificaciones, deberá dejar de utilizar la Plataforma y puede ejercer su derecho de cancelación de datos conforme a lo establecido en este Aviso.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. CONSENTIMIENTO</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">12.1 Otorgamiento del Consentimiento</h3>
            <p className="text-gray-700 leading-relaxed">
              Al proporcionar sus datos personales a través del proceso de registro en la Plataforma "Ruta del Sabor", usted:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Declara haber leído y comprendido el contenido de este Aviso de Privacidad.</li>
              <li>Acepta y consiente expresamente el tratamiento de sus datos personales conforme a lo aquí establecido.</li>
              <li>Reconoce que su consentimiento es libre, específico e informado.</li>
              <li>Comprende las finalidades del tratamiento descritas en este Aviso.</li>
              <li>Acepta las transferencias de datos señaladas.</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">12.2 Manifestación del Consentimiento</h3>
            <p className="text-gray-700 leading-relaxed">El consentimiento se manifiesta mediante:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>La marcación de la casilla de aceptación en el registro.</li>
              <li>El envío del formulario con sus datos personales.</li>
              <li>El uso continuado de la Plataforma.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">12.3 Carácter Voluntario</h3>
            <p className="text-gray-700 leading-relaxed">
              El otorgamiento de datos personales es voluntario, pero necesario para utilizar los servicios de la Plataforma.
            </p>
            <p className="text-gray-700 leading-relaxed">
              La negativa o revocación del consentimiento puede impedir el uso de los servicios.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. AUTORIDAD COMPETENTE</h2>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">13.1 Autoridades Competentes en Materia de Protección de Datos</h3>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
              <p className="text-blue-900 font-semibold mb-2">Nota importante - Actualización 2025:</p>
              <p className="text-blue-900">
                El Instituto Nacional de Transparencia, Acceso a la Información y Protección de Datos Personales (INAI)
                fue extinguido el 20 de marzo de 2025. Actualmente, las funciones vinculadas a transparencia y buen
                gobierno están coordinadas por la Secretaría de la Auditoría y Buen Gobierno (SABG), mientras que temas
                relacionados con derechos del consumidor son atendidos por la PROFECO.
              </p>
            </div>

            <p className="text-gray-700 leading-relaxed mb-3">
              En caso de considerarlo necesario, el Titular podrá acudir a las siguientes instancias:
            </p>

            <div className="bg-gray-100 p-4 rounded-lg mt-3 space-y-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">Secretaría de la Auditoría y Buen Gobierno (SABG)</p>
                <p className="text-sm text-gray-700">
                  Para temas relacionados con cumplimiento, transparencia y buen gobierno digital.
                </p>
                <p className="text-sm text-gray-700">
                  Portal: <a href="https://www.gob.mx/buengobierno" className="text-blue-600 hover:underline">gob.mx/buengobierno</a>
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-800">Procuraduría Federal del Consumidor (PROFECO)</p>
                <p className="text-sm text-gray-700">
                  Para reclamaciones relacionadas con derechos del consumidor vinculados al tratamiento de datos.
                </p>
                <p className="text-sm text-gray-700">
                  <a href="https://www.gob.mx/profeco" className="text-blue-600 hover:underline">gob.mx/profeco</a>
                </p>
                <p className="text-sm text-gray-700"><strong>Teléfono:</strong> 55 5568 8722</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">13.3 Procedimiento para Reclamaciones</h3>
            <p className="text-gray-700 leading-relaxed">
              Si considera que sus derechos han sido vulnerados, el Titular puede:
            </p>

            <ol className="list-decimal pl-6 space-y-2 text-gray-700 mt-3">
              <li>Contactar directamente a Victics mediante los medios descritos en la Sección 16.</li>
              <li>Presentar una reclamación ante la SABG o PROFECO, según corresponda.</li>
              <li>Ejercer las acciones legales pertinentes ante los tribunales competentes conforme a la Ley General de Protección de Datos Personales.</li>
            </ol>
          </section>

          {/* 14. LEGISLACIÓN APLICABLE */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">14. LEGISLACIÓN APLICABLE</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">14.1 Marco Normativo</h3>
            <p className="text-gray-700 leading-relaxed">Este Aviso de Privacidad se rige por la legislación mexicana vigente, particularmente:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Ley General de Protección de Datos Personales (LGPDP)</li>
              <li>Reglamento de la Ley General de Protección de Datos Personales</li>
              <li>Código Civil Federal</li>
              <li>Código Federal de Procedimientos Civiles</li>
              <li>Ley Federal de Protección al Consumidor</li>
              <li>Legislación estatal aplicable en Querétaro</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">14.2 Jurisdicción</h3>
            <p className="text-gray-700 leading-relaxed">
              Para la interpretación, cumplimiento y ejecución de este Aviso de Privacidad, Victics y el Titular se someten expresamente a la jurisdicción de las autoridades competentes en <strong>Querétaro, Querétaro, México</strong>, renunciando a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios presentes o futuros.
            </p>
          </section>

          {/* 15. DEFINICIONES */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">15. DEFINICIONES</h2>
            
            <p className="text-gray-700 leading-relaxed mb-3">Para efectos de este Aviso de Privacidad, se entenderá por:</p>
            
            <div className="space-y-3">
              <div>
                <p className="text-gray-800 font-semibold">Datos Personales:</p>
                <p className="text-gray-700">Cualquier información concerniente a una persona física identificada o identificable.</p>
              </div>
              
              <div>
                <p className="text-gray-800 font-semibold">Datos Personales Sensibles:</p>
                <p className="text-gray-700">Aquellos datos personales que afecten a la esfera más íntima del Titular, o cuya utilización indebida pueda dar origen a discriminación o conlleve un riesgo grave para este.</p>
              </div>
              
              <div>
                <p className="text-gray-800 font-semibold">Titular:</p>
                <p className="text-gray-700">La persona física a quien corresponden los datos personales.</p>
              </div>
              
              <div>
                <p className="text-gray-800 font-semibold">Responsable:</p>
                <p className="text-gray-700">Persona física o moral de carácter privado que decide sobre el tratamiento de datos personales.</p>
              </div>
              
              <div>
                <p className="text-gray-800 font-semibold">Encargado:</p>
                <p className="text-gray-700">La persona física o jurídica que sola o conjuntamente con otras trate datos personales por cuenta del Responsable.</p>
              </div>
              
              <div>
                <p className="text-gray-800 font-semibold">Tratamiento:</p>
                <p className="text-gray-700">La obtención, uso, divulgación o almacenamiento de datos personales, por cualquier medio.</p>
              </div>
              
              <div>
                <p className="text-gray-800 font-semibold">Consentimiento:</p>
                <p className="text-gray-700">Manifestación de la voluntad del Titular mediante la cual se efectúa el tratamiento de sus datos personales.</p>
              </div>
              
              <div>
                <p className="text-gray-800 font-semibold">Transferencia:</p>
                <p className="text-gray-700">Toda comunicación de datos personales realizada a persona distinta del Responsable o Encargado del tratamiento.</p>
              </div>
              
              <div>
                <p className="text-gray-800 font-semibold">Derechos ARCO:</p>
                <p className="text-gray-700">Los derechos de Acceso, Rectificación, Cancelación y Oposición que tiene todo Titular sobre sus datos personales.</p>
              </div>
              
              <div>
                <p className="text-gray-800 font-semibold">Remisión:</p>
                <p className="text-gray-700">La comunicación de datos personales entre el Responsable y el Encargado, dentro o fuera del territorio mexicano.</p>
              </div>
              
              <div>
                <p className="text-gray-800 font-semibold">Aviso de Privacidad:</p>
                <p className="text-gray-700">Documento físico, electrónico o en cualquier formato generado por el Responsable que es puesto a disposición del Titular, previo al tratamiento de sus datos personales.</p>
              </div>
              
              <div>
                <p className="text-gray-800 font-semibold">LGPDP:</p>
                <p className="text-gray-700">Ley General de Protección de Datos Personales.</p>
              </div>
            </div>
          </section>

          {/* 16. INFORMACIÓN DE CONTACTO */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">16. INFORMACIÓN DE CONTACTO PARA ASUNTOS DE PRIVACIDAD</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">16.1 Departamento de Protección de Datos</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Para cualquier duda, comentario, queja o solicitud relacionada con el tratamiento de sus datos personales o este Aviso de Privacidad, puede contactar a Victics a través de:</p>
            <div className="bg-gray-100 p-4 rounded-lg mt-3">
              <p className="text-sm mb-2"><strong>Correo electrónico:</strong> example@victics.com</p>
              <p className="text-sm mb-2"><strong>Asunto:</strong> "Privacidad - Datos Personales"</p>
              <p className="text-sm"><strong>Domicilio:</strong> Arroyo Seco, Querétaro, México</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">16.2 Tiempo de Respuesta</h3>
            <p className="text-gray-700 leading-relaxed">
              Victics se compromete a responder cualquier consulta relacionada con privacidad en un plazo máximo de <strong>10 días hábiles</strong> a partir de la recepción de su comunicación.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">16.3 Canales Oficiales</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Los únicos canales oficiales para comunicaciones sobre protección de datos son:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>Correo electrónico: example@victics.com</li>
              <li>Sección de contacto en la Plataforma</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold mb-2">Victics NO solicitará datos personales adicionales a través de:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-2">
              <li>Llamadas telefónicas no solicitadas</li>
              <li>Mensajes de texto (SMS)</li>
              <li>Redes sociales</li>
              <li>Correos electrónicos de dominios no oficiales</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Si recibe una solicitud sospechosa, repórtela inmediatamente a: <strong>example@victics.com</strong>
            </p>
          </section>

          {/* 17. DECLARACIONES FINALES */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">17. DECLARACIONES FINALES</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">17.1 Veracidad de la Información</h3>
            <p className="text-gray-700 leading-relaxed">
              Victics declara que la información contenida en este Aviso de Privacidad es veraz, completa y actual, y se compromete a mantenerla actualizada conforme a las modificaciones que pudieran presentarse.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">17.2 Cumplimiento Legal</h3>
            <p className="text-gray-700 leading-relaxed">
              Victics se compromete a dar cumplimiento cabal a las disposiciones establecidas en la Ley General de Protección de Datos Personales, su Reglamento, y demás normatividad aplicable.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">17.3 Buena Fe</h3>
            <p className="text-gray-700 leading-relaxed">
              El tratamiento de datos personales por parte de Victics se realiza de buena fe, con respeto absoluto a la dignidad humana, privacidad y derechos fundamentales de los Titulares.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">17.4 Principios Rectores</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Victics se rige por los siguientes principios en el tratamiento de datos personales:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Licitud:</strong> El tratamiento se realiza conforme a las disposiciones legales aplicables</li>
              <li><strong>Consentimiento:</strong> El tratamiento requiere el consentimiento expreso del Titular</li>
              <li><strong>Información:</strong> El Titular es informado clara y completamente sobre el tratamiento</li>
              <li><strong>Calidad:</strong> Los datos son exactos, completos, pertinentes y actualizados</li>
              <li><strong>Finalidad:</strong> Los datos se utilizan únicamente para las finalidades informadas</li>
              <li><strong>Lealtad:</strong> El tratamiento no busca sorprender la buena fe del Titular</li>
              <li><strong>Proporcionalidad:</strong> Solo se recaban los datos estrictamente necesarios</li>
              <li><strong>Responsabilidad:</strong> Victics es responsable del tratamiento y protección de los datos</li>
            </ul>
          </section>

          {/* 18. RECONOCIMIENTO Y ACEPTACIÓN */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">18. RECONOCIMIENTO Y ACEPTACIÓN</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">18.1 Reconocimiento del Titular</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Al proporcionar sus datos personales a través de la Plataforma "Ruta del Sabor", el Titular reconoce que:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Ha tenido la oportunidad de leer íntegramente este Aviso de Privacidad</li>
              <li>Comprende el contenido y alcance del mismo</li>
              <li>Ha tenido la oportunidad de realizar preguntas y aclarar dudas</li>
              <li>Acepta voluntariamente los términos aquí establecidos</li>
              <li>Conoce sus derechos y los medios para ejercerlos</li>
              <li>Comprende las finalidades del tratamiento de sus datos</li>
              <li>Acepta las medidas de seguridad implementadas</li>
              <li>Conoce la ubicación de los servidores donde se almacenan sus datos</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">18.2 Fecha de Última Actualización</h3>
            <p className="text-gray-700 leading-relaxed">
              Este Aviso de Privacidad fue actualizado por última vez el <strong>17 de octubre de 2025</strong>.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Se recomienda al Titular revisar periódicamente este Aviso para estar informado sobre cualquier actualización.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">18.3 Versiones Anteriores</h3>
            <p className="text-gray-700 leading-relaxed">
              Las versiones anteriores de este Aviso de Privacidad están disponibles para consulta enviando una solicitud a: <strong>example@victics.com</strong>
            </p>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t text-center">
          <p className="text-sm text-gray-500">
            ÚLTIMA ACTUALIZACIÓN: 17 DE OCTUBRE DE 2025
          </p>
          <p className="text-sm text-gray-600 mt-2 font-semibold">
            VICTICS - Responsable del Tratamiento de Datos Personales
          </p>
          <p className="text-sm text-gray-500">Plataforma "Ruta del Sabor"</p>
          <p className="text-sm text-gray-500">Arroyo Seco, Querétaro, México</p>
          <p className="text-sm text-gray-400 mt-4">
            Contacto de Privacidad: example@victics.com
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Este Aviso de Privacidad se emite en cumplimiento de la<br />
            Ley General de Protección de Datos Personales<br />
            y demás normatividad aplicable en materia de protección de datos personales.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;