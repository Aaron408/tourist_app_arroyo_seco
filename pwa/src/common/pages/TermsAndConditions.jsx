import { useEffect } from 'react';

const TermsAndConditions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8 border-b pb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Términos y Condiciones de Uso
          </h1>
          <p className="text-lg text-gray-600">Proyecto "Xi'oi Gourmet"</p>
          <p className="text-md text-gray-500">Plataforma Digital "Ruta del Sabor"</p>
          <p className="text-sm text-gray-400 mt-2">
            Última actualización: 17 de octubre de 2025
          </p>
        </div>

        {/* Contenido */}
        <div className="prose prose-lg max-w-none space-y-8">
          
          {/* 1. INFORMACIÓN GENERAL */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. INFORMACIÓN GENERAL</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">1.1 Identificación del Responsable</h3>
            <p className="text-gray-700 leading-relaxed">
              La plataforma digital "Ruta del Sabor" (en adelante, "la Plataforma") es desarrollada y operada por <strong>Victics</strong> (en adelante, "Victics", "nosotros" o "la Empresa"), un proyecto de desarrollo tecnológico orientado a promover el patrimonio cultural y gastronómico de Arroyo Seco, Querétaro, México.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mt-3">
              <p className="text-sm"><strong>Correo electrónico:</strong> example@victics.com</p>
              <p className="text-sm"><strong>Domicilio:</strong> Arroyo Seco, Querétaro, México</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1.2 Aceptación de los Términos</h3>
            <p className="text-gray-700 leading-relaxed">
              Al acceder, registrarse o utilizar la Plataforma (ya sea a través de la aplicación móvil para Android o el sitio web), usted (en adelante, "el Usuario" o "usted") acepta expresamente quedar vinculado por estos Términos y Condiciones, así como por nuestro Aviso de Privacidad.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Si no está de acuerdo con alguna de las disposiciones contenidas en el presente documento, deberá abstenerse de utilizar la Plataforma de forma inmediata.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1.3 Capacidad Legal</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Para utilizar la Plataforma, el Usuario declara y garantiza que:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Es mayor de 18 años de edad</li>
              <li>Posee capacidad legal para celebrar contratos vinculantes</li>
              <li>No le está prohibido legalmente el uso de servicios digitales en su jurisdicción</li>
              <li>Toda la información proporcionada durante el registro es veraz, precisa y completa</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1.4 Modificaciones a los Términos</h3>
            <p className="text-gray-700 leading-relaxed">
              Victics se reserva el derecho de modificar, actualizar o reemplazar estos Términos y Condiciones en cualquier momento, a su entera discreción. Las modificaciones entrarán en vigor inmediatamente después de su publicación en la Plataforma.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold">
              Es responsabilidad exclusiva del Usuario revisar periódicamente estos términos. El uso continuado de la Plataforma después de la publicación de cualquier modificación constituye la aceptación plena e incondicional de los nuevos términos.
            </p>
            <p className="text-gray-700 leading-relaxed">
              En caso de modificaciones sustanciales, Victics hará esfuerzos razonables para notificar a los Usuarios registrados mediante correo electrónico o notificación dentro de la aplicación.
            </p>
          </section>

          {/* 2. DESCRIPCIÓN DE LA PLATAFORMA */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. DESCRIPCIÓN DE LA PLATAFORMA</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Naturaleza del Servicio</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              "Ruta del Sabor" es una plataforma digital de carácter informativo y educativo cuyo propósito fundamental es:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Promover y preservar el patrimonio culinario tradicional e indígena de Arroyo Seco, Querétaro</li>
              <li>Proporcionar acceso a un catálogo documentado de recetas tradicionales, ingredientes autóctonos y técnicas culinarias ancestrales</li>
              <li>Ofrecer un directorio actualizado de restaurantes, comedores y establecimientos gastronómicos tradicionales de la región</li>
              <li>Brindar información sobre talleres culturales, eventos gastronómicos y experiencias culinarias disponibles en la localidad</li>
              <li>Facilitar contenido educativo sobre la historia, significado cultural y prácticas sostenibles relacionadas con la gastronomía local</li>
              <li>Promover el turismo cultural responsable en Arroyo Seco, Querétaro</li>
            </ol>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4 rounded">
              <h3 className="text-xl font-semibold text-amber-900 mb-2">2.2 Carácter Exclusivamente Informativo</h3>
              <p className="text-amber-800 font-semibold mb-2">IMPORTANTE: La Plataforma tiene un carácter exclusivamente informativo y educativo.</p>
              <p className="text-amber-800"><strong>Victics NO:</strong></p>
              <ul className="list-disc pl-6 space-y-1 text-amber-800 mt-2">
                <li>Realiza transacciones comerciales de ningún tipo</li>
                <li>Procesa pagos, reservaciones con cargo o donaciones monetarias</li>
                <li>Actúa como intermediario en la contratación de servicios turísticos</li>
                <li>Vende productos, ingredientes, artículos o servicios gastronómicos</li>
                <li>Garantiza la disponibilidad, calidad o características de los establecimientos listados</li>
                <li>Asume responsabilidad por los servicios prestados por terceros mencionados en la Plataforma</li>
              </ul>
              <p className="text-amber-800 mt-3">
                Cualquier transacción, reservación o contratación de servicios que el Usuario desee realizar deberá gestionarse <strong>directamente con los establecimientos o proveedores correspondientes</strong>, sin intervención de Victics.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2.3 Componentes de la Plataforma</h3>
            <p className="text-gray-700 leading-relaxed mb-3">La Plataforma está compuesta por:</p>
            
            <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">2.3.1 Aplicación Móvil (Android)</h4>
            <p className="text-gray-700 leading-relaxed mb-2">Aplicación nativa desarrollada con Expo y React Native, disponible para dispositivos Android, que ofrece:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Acceso completo al catálogo de recetas tradicionales</li>
              <li>Funcionalidad offline mediante almacenamiento local (SQLite)</li>
              <li>Sincronización automática de contenido cuando hay conectividad</li>
              <li>Interfaz optimizada para dispositivos móviles</li>
              <li>Sistema de comentarios moderados</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2 font-semibold">Nota: El acceso al contenido completo de la aplicación móvil requiere registro y autenticación del Usuario.</p>

            <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-2">2.3.2 Sitio Web</h4>
            <p className="text-gray-700 leading-relaxed mb-2">Portal web desarrollado con Vite y React, que incluye:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Landing Page:</strong> Página de presentación accesible sin registro, con información general sobre el proyecto y la región</li>
              <li><strong>Panel Administrativo:</strong> Sección restringida para administradores autorizados por el municipio de Arroyo Seco, destinada a la gestión de contenido</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">2.4 Soporte Multilingüe</h3>
            <p className="text-gray-700 leading-relaxed mb-2">La Plataforma ofrece contenido en los siguientes idiomas:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Español (idioma principal)</li>
              <li>Inglés</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">El Usuario puede seleccionar su idioma de preferencia desde la configuración de la aplicación o sitio web.</p>
          </section>

          {/* 3. REGISTRO Y CUENTAS DE USUARIO */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. REGISTRO Y CUENTAS DE USUARIO</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.1 Requisitos para el Registro</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Para acceder al contenido completo de la aplicación móvil, el Usuario debe crear una cuenta proporcionando:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Nombre de usuario (puede ser un alias o nombre real, a elección del Usuario)</li>
              <li>Dirección de correo electrónico válida</li>
              <li>Contraseña segura</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3.2 Responsabilidad sobre las Credenciales</h3>
            <p className="text-gray-700 leading-relaxed mb-2">El Usuario es el único responsable de:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Mantener la confidencialidad de su nombre de usuario y contraseña</li>
              <li>Todas las actividades que ocurran bajo su cuenta</li>
              <li>Notificar inmediatamente a Victics sobre cualquier uso no autorizado de su cuenta o cualquier otra violación de seguridad</li>
            </ol>
            <p className="text-gray-700 leading-relaxed">
              Victics no será responsable por pérdidas o daños derivados del incumplimiento de estas obligaciones de seguridad por parte del Usuario.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3.3 Veracidad de la Información</h3>
            <p className="text-gray-700 leading-relaxed">
              El Usuario garantiza que toda la información proporcionada durante el registro es veraz, exacta, actualizada y completa. Victics se reserva el derecho de suspender o cancelar cuentas que proporcionen información falsa, inexacta o fraudulenta.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3.4 Eliminación de Cuenta</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              El Usuario tiene derecho a solicitar la eliminación de su cuenta y todos sus datos personales en cualquier momento, conforme a lo establecido en nuestro Aviso de Privacidad y en cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              Para ejercer este derecho, el Usuario debe enviar una solicitud por correo electrónico a: <strong>example@victics.com</strong>
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              Victics procesará la solicitud en un plazo máximo de 20 días hábiles, eliminando permanentemente:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Los datos personales del Usuario</li>
              <li>El historial de comentarios asociados a la cuenta</li>
              <li>Cualquier otra información identificable almacenada</li>
            </ul>
          </section>

          {/* 4. USO ACEPTABLE */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. USO ACEPTABLE DE LA PLATAFORMA</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.1 Compromisos del Usuario</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Al utilizar la Plataforma, el Usuario se compromete a:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Utilizar la Plataforma únicamente con fines lícitos, informativos y educativos</li>
              <li>Respetar los derechos de propiedad intelectual de Victics y de terceros</li>
              <li>No interferir con el correcto funcionamiento de la Plataforma</li>
              <li>No intentar acceder a áreas restringidas o sistemas de backend</li>
              <li>Mantener un comportamiento respetuoso hacia otros usuarios y hacia las comunidades culturales representadas</li>
              <li>No utilizar la Plataforma para fines comerciales no autorizados</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4.2 Conductas Prohibidas</h3>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-900 font-semibold mb-2">Está expresamente prohibido:</p>
              <ol className="list-decimal pl-6 space-y-2 text-red-800">
                <li>Publicar comentarios que contengan:
                  <ul className="list-disc pl-6 mt-1 space-y-1">
                    <li>Contenido ofensivo, discriminatorio, racista, xenófobo o que incite al odio</li>
                    <li>Lenguaje obsceno, vulgar o sexualmente explícito</li>
                    <li>Amenazas, acoso o intimidación hacia cualquier persona</li>
                    <li>Información falsa, engañosa o difamatoria</li>
                    <li>Spam, publicidad no autorizada o contenido promocional</li>
                    <li>Contenido que viole derechos de terceros (privacidad, propiedad intelectual, etc.)</li>
                  </ul>
                </li>
                <li>Intentar realizar ingeniería inversa, descompilar o desensamblar cualquier componente de la Plataforma</li>
                <li>Utilizar bots, scripts automatizados o cualquier medio no autorizado para acceder a la Plataforma</li>
                <li>Recolectar información de otros usuarios sin su consentimiento</li>
                <li>Cargar o transmitir virus, malware o cualquier código malicioso</li>
                <li>Hacerse pasar por otra persona o entidad</li>
                <li>Utilizar la Plataforma para actividades ilegales o fraudulentas</li>
                <li>Interferir con las medidas de seguridad de la Plataforma</li>
              </ol>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4.3 Moderación de Comentarios</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Todos los comentarios publicados por los Usuarios están sujetos a moderación automática mediante un sistema de filtrado de contenido inapropiado.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold mb-2">Proceso de moderación:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Filtro automático:</strong> Un diccionario de palabras prohibidas detecta y bloquea automáticamente comentarios con contenido inapropiado</li>
              <li><strong>Notificación al usuario:</strong> Si un comentario es bloqueado, el Usuario recibirá una notificación indicando que no puede publicar dicho contenido</li>
              <li><strong>Revisión administrativa:</strong> Los administradores pueden revisar y eliminar manualmente comentarios que, aun pasando el filtro automático, violen estos términos</li>
              <li><strong>Eliminación lógica:</strong> Los comentarios eliminados no se borran completamente del sistema, sino que se marcan como inactivos para fines de auditoría y cumplimiento legal</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4.4 Consecuencias por Incumplimiento</h3>
            <p className="text-gray-700 leading-relaxed">Victics se reserva el derecho, a su entera discreción y sin previo aviso, de:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Eliminar cualquier contenido que viole estos términos</li>
              <li>Suspender temporalmente el acceso a la cuenta del Usuario infractor</li>
              <li>Cancelar permanentemente la cuenta del Usuario reincidente</li>
              <li>Tomar acciones legales cuando corresponda</li>
              <li>Reportar actividades ilegales a las autoridades competentes</li>
            </ul>
          </section>

          {/* 5. PROPIEDAD INTELECTUAL Y CONTENIDO */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. PROPIEDAD INTELECTUAL Y CONTENIDO</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">5.1 Derechos de Propiedad Intelectual de la Plataforma</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Todo el contenido presente en la Plataforma, incluyendo pero no limitado a:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-2">
              <li>Diseño, estructura y disposición de la interfaz</li>
              <li>Código fuente, software y arquitectura técnica</li>
              <li>Textos, gráficos, logotipos, iconos y fotografías</li>
              <li>Base de datos y compilaciones de información</li>
              <li>Marcas, nombres comerciales y signos distintivos</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Es propiedad exclusiva de Victics o de sus licenciantes, y está protegido por las leyes mexicanas e internacionales de propiedad intelectual, incluyendo la Ley Federal del Derecho de Autor.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.2 Contenido Cultural y Tradicional</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              El contenido relacionado con recetas tradicionales, conocimientos culinarios ancestrales, información sobre ingredientes nativos y prácticas culturales indígenas forma parte del patrimonio cultural de las comunidades de Arroyo Seco, Querétaro.
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">
              Victics reconoce y respeta los derechos colectivos de las comunidades indígenas sobre sus conocimientos tradicionales. La publicación de este contenido tiene únicamente fines educativos, de preservación cultural y promoción turística responsable.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold mb-2">El Usuario se compromete a:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>No utilizar este conocimiento tradicional con fines comerciales sin autorización</li>
              <li>Respetar el valor cultural y el contexto de las tradiciones compartidas</li>
              <li>No apropiarse indebidamente de conocimientos tradicionales</li>
              <li>Reconocer el origen comunitario de las prácticas culinarias tradicionales</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.3 Licencia de Uso</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Victics otorga al Usuario una licencia limitada, no exclusiva, no transferible y revocable para:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>Acceder y visualizar el contenido de la Plataforma</li>
              <li>Descargar la aplicación móvil para uso personal</li>
              <li>Almacenar contenido en caché localmente para funcionalidad offline</li>
              <li>Utilizar la información con fines educativos, informativos y de planificación turística personal</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold mb-2">Esta licencia NO autoriza al Usuario a:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Copiar, reproducir o distribuir el contenido con fines comerciales</li>
              <li>Modificar, adaptar o crear obras derivadas</li>
              <li>Realizar ingeniería inversa del software</li>
              <li>Eliminar avisos de propiedad intelectual</li>
              <li>Utilizar el contenido en otras aplicaciones o sitios web sin autorización expresa</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.4 Contenido Generado por el Usuario (Comentarios)</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Al publicar comentarios en la Plataforma, el Usuario:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Otorga a Victics una licencia mundial, gratuita, perpetua y no exclusiva para usar, reproducir, modificar, adaptar, publicar y mostrar dichos comentarios en la Plataforma</li>
              <li>Declara y garantiza que:
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>Es el autor original del comentario o cuenta con los derechos necesarios</li>
                  <li>El comentario no viola derechos de terceros</li>
                  <li>El contenido es veraz y no difamatorio</li>
                </ul>
              </li>
              <li>Acepta que Victics puede:
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>Revisar y moderar los comentarios</li>
                  <li>Eliminar comentarios que violen estos términos</li>
                  <li>No asumir responsabilidad por el contenido de los comentarios</li>
                </ul>
              </li>
              <li>Conserva todos sus derechos de autor sobre sus propios comentarios</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">5.5 Reportes de Infracción de Derechos de Autor</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Si considera que algún contenido en la Plataforma infringe sus derechos de autor u otros derechos de propiedad intelectual, puede notificar a Victics enviando un correo electrónico a: <strong>example@victics.com</strong>
            </p>
            <p className="text-gray-700 leading-relaxed mb-2">La notificación debe incluir:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Identificación clara de la obra protegida supuestamente infringida</li>
              <li>Identificación del contenido que alega ser infractor</li>
              <li>Información de contacto (nombre, dirección, teléfono, correo electrónico)</li>
              <li>Declaración de buena fe de que el uso no está autorizado</li>
              <li>Declaración bajo protesta de decir verdad sobre la exactitud de la información</li>
            </ul>
          </section>

          {/* 6. FUNCIONALIDAD OFFLINE Y SINCRONIZACIÓN */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. FUNCIONALIDAD OFFLINE Y SINCRONIZACIÓN</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">6.1 Almacenamiento Local</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              La aplicación móvil utiliza tecnología de almacenamiento local (SQLite) para permitir el acceso al contenido sin conexión a internet.
            </p>
            <p className="text-gray-700 leading-relaxed font-semibold mb-2">Contenido almacenado localmente:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-3">
              <li>Catálogo de recetas tradicionales</li>
              <li>Información sobre ingredientes y técnicas culinarias</li>
              <li>Directorio de establecimientos gastronómicos</li>
              <li>Contenido educativo y cultural</li>
              <li>Preferencias de idioma del Usuario</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold mb-2">Contenido NO almacenado localmente:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Datos personales del Usuario (más allá de las credenciales de sesión)</li>
              <li>Comentarios de otros usuarios</li>
              <li>Actualizaciones en tiempo real del contenido</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6.2 Sincronización de Datos</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Cuando la aplicación móvil detecta conectividad a internet, realiza automáticamente:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>Descarga de nuevo contenido publicado por los administradores</li>
              <li>Actualización de información modificada (recetas, restaurantes, eventos)</li>
              <li>Sincronización de comentarios publicados por el Usuario mientras estaba offline</li>
              <li>Validación de autenticación del Usuario</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold mb-2">Importante: La sincronización NO envía al servidor:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Datos de navegación o uso de la aplicación offline</li>
              <li>Ubicación geográfica del Usuario</li>
              <li>Información personal adicional</li>
              <li>Contenido no generado explícitamente por el Usuario</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">6.3 Gestión del Almacenamiento</h3>
            <p className="text-gray-700 leading-relaxed mb-2">El Usuario puede:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-2">
              <li>Liberar espacio de almacenamiento eliminando contenido en caché</li>
              <li>Actualizar manualmente el contenido mediante la función de sincronización</li>
              <li>Gestionar qué categorías de contenido descargar para uso offline</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Victics no garantiza la disponibilidad perpetua del contenido offline y se reserva el derecho de modificar o eliminar contenido desactualizado durante las sincronizaciones.
            </p>
          </section>

          {/* 7. PRIVACIDAD Y PROTECCIÓN DE DATOS */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. PRIVACIDAD Y PROTECCIÓN DE DATOS</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">7.1 Aviso de Privacidad</h3>
            <p className="text-gray-700 leading-relaxed">
              La recopilación, uso, almacenamiento y protección de los datos personales del Usuario se rige por nuestro <strong>Aviso de Privacidad</strong>, el cual forma parte integral de estos Términos y Condiciones.
            </p>
            <p className="text-gray-700 leading-relaxed">
              El Usuario declara haber leído, entendido y aceptado el Aviso de Privacidad al momento de registrarse en la Plataforma.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">7.2 Datos Recopilados</h3>
            <p className="text-gray-700 leading-relaxed font-semibold mb-2">Victics recopila únicamente los siguientes datos personales:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-3">
              <li>Nombre de usuario</li>
              <li>Dirección de correo electrónico</li>
              <li>Contraseña (almacenada de forma encriptada)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold mb-2">NO se recopilan:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Datos de menores de edad</li>
              <li>Información financiera o de pago</li>
              <li>Ubicación geográfica en tiempo real</li>
              <li>Datos biométricos</li>
              <li>Fotografías personales</li>
              <li>Números telefónicos</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">7.3 Finalidad del Tratamiento de Datos</h3>
            <p className="text-gray-700 leading-relaxed">Los datos personales se utilizan exclusivamente para:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Crear y administrar la cuenta del Usuario</li>
              <li>Autenticar el acceso a la Plataforma</li>
              <li>Asociar comentarios al Usuario correspondiente</li>
              <li>Comunicaciones relacionadas con el servicio (cambios en términos, actualizaciones importantes)</li>
              <li>Cumplir con obligaciones legales</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">7.4 Derechos ARCO</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              En cumplimiento con la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), el Usuario tiene derecho a:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-2">
              <li><strong>Acceder</strong> a sus datos personales</li>
              <li><strong>Rectificar</strong> datos inexactos o incompletos</li>
              <li><strong>Cancelar</strong> su registro y datos personales</li>
              <li><strong>Oponerse</strong> al tratamiento de sus datos para fines específicos</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mb-2">
              Para ejercer estos derechos, el Usuario debe enviar una solicitud a: <strong>example@victics.com</strong>
            </p>
            <p className="text-gray-700 leading-relaxed">
              Victics responderá en un plazo máximo de 20 días hábiles conforme a la legislación aplicable.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">7.5 Ubicación de Servidores</h3>
            <p className="text-gray-700 leading-relaxed">
              Los datos personales son almacenados en servidores de infraestructura en la nube ubicados en Estados Unidos de América. Victics implementa medidas de seguridad técnicas, físicas y administrativas para proteger la información conforme a estándares internacionales.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">7.6 Compartición de Datos</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Victics NO vende, renta ni comparte datos personales con terceros con fines comerciales. Los datos pueden ser compartidos únicamente en los siguientes casos:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Con el gobierno municipal de Arroyo Seco, Querétaro, únicamente para fines estadísticos agregados y anónimos</li>
              <li>Cuando sea requerido por autoridades competentes conforme a la ley</li>
              <li>Para proteger los derechos, propiedad o seguridad de Victics, usuarios o el público</li>
            </ul>
          </section>

          {/* 8. LIMITACIÓN DE RESPONSABILIDAD */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. LIMITACIÓN DE RESPONSABILIDAD</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">8.1 Naturaleza del Servicio</h3>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
              <p className="text-blue-900 font-semibold">
                El Usuario reconoce y acepta expresamente que la Plataforma es un servicio de información proporcionado "TAL CUAL" y "SEGÚN DISPONIBILIDAD", sin garantías de ningún tipo, ya sean expresas o implícitas.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">8.2 Exclusión de Garantías</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Victics NO garantiza:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Que la Plataforma estará disponible de forma ininterrumpida, oportuna, segura o libre de errores</li>
              <li>Que los defectos serán corregidos</li>
              <li>Que la Plataforma o los servidores que la alojan están libres de virus u otros componentes dañinos</li>
              <li>La exactitud, confiabilidad o completitud del contenido, incluyendo recetas, información sobre ingredientes o datos de establecimientos</li>
              <li>Resultados específicos del uso de la información proporcionada</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">8.3 Limitación de Responsabilidad por Contenido de Terceros</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Victics actúa únicamente como plataforma de información sobre:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700 mb-3">
              <li>Restaurantes, comedores y establecimientos gastronómicos</li>
              <li>Talleres culturales y eventos</li>
              <li>Recetas y técnicas culinarias tradicionales</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold mb-2">Victics NO es responsable por:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 mb-2">
              <li>La calidad, seguridad, disponibilidad o características de los servicios ofrecidos por establecimientos terceros</li>
              <li>Experiencias negativas, insatisfacción o daños derivados de visitar establecimientos listados en la Plataforma</li>
              <li>Cambios en horarios, precios, menús o disponibilidad de los establecimientos</li>
              <li>Problemas de salud derivados del consumo de alimentos en establecimientos terceros</li>
              <li>La exactitud de la información proporcionada por terceros</li>
              <li>Cancelaciones, cambios o problemas con talleres o eventos organizados por terceros</li>
              <li>Accidentes, lesiones o daños ocurridos en establecimientos o eventos de terceros</li>
            </ol>
            <p className="text-gray-700 leading-relaxed">
              El Usuario reconoce que cualquier interacción, contratación o transacción con terceros mencionados en la Plataforma es exclusivamente entre el Usuario y dichos terceros.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">8.4 Limitación de Responsabilidad por Recetas y Técnicas Culinarias</h3>
            <p className="text-gray-700 leading-relaxed font-semibold mb-2">Victics NO asume responsabilidad por:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>Alergias, intolerancias o reacciones adversas a ingredientes mencionados en recetas</li>
              <li>Lesiones, accidentes o daños derivados de la preparación de recetas</li>
              <li>Resultados culinarios insatisfactorios</li>
              <li>Errores u omisiones en las instrucciones de preparación</li>
              <li>Seguridad alimentaria en la preparación casera de recetas</li>
            </ul>
            <p className="text-gray-700 leading-relaxed font-semibold mb-2">Es responsabilidad exclusiva del Usuario:</p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Verificar posibles alergias o restricciones dietéticas antes de preparar o consumir cualquier receta</li>
              <li>Seguir prácticas seguras de manipulación y cocción de alimentos</li>
              <li>Consultar con profesionales de la salud sobre dietas especiales o restricciones alimentarias</li>
              <li>Usar herramientas y equipos de cocina de manera segura y responsable</li>
            </ol>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">8.5 Alcance de la Limitación de Responsabilidad</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              En la máxima medida permitida por la ley aplicable, Victics, sus directores, empleados, colaboradores, afiliados, agentes, contratistas, proveedores o licenciantes NO serán responsables por:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-3">
              <li>Daños directos, indirectos, incidentales, especiales, consecuentes o punitivos</li>
              <li>Pérdida de beneficios, ingresos, datos, uso, o cualquier otra pérdida intangible</li>
              <li>Daños resultantes de:
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li>Uso o incapacidad de usar la Plataforma</li>
                  <li>Acceso no autorizado a las transmisiones o datos del Usuario</li>
                  <li>Declaraciones o conductas de terceros en la Plataforma</li>
                  <li>Cualquier otro asunto relacionado con la Plataforma</li>
                </ul>
              </li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Esta limitación aplica independientemente de que Victics haya sido advertido o no de la posibilidad de tales daños.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">8.6 Indemnización</h3>
            <p className="text-gray-700 leading-relaxed">
              El Usuario acuerda indemnizar, defender y mantener indemne a Victics, sus afiliados, directores, empleados, agentes, proveedores y licenciantes de y contra cualquier reclamo, responsabilidad, daño, pérdida y gasto, incluyendo honorarios legales razonables, que surjan de o estén relacionados con:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>El uso de la Plataforma por parte del Usuario</li>
              <li>Violación de estos Términos y Condiciones</li>
              <li>Violación de cualquier derecho de terceros</li>
              <li>Contenido publicado por el Usuario (comentarios)</li>
            </ol>
          </section>

          {/* 9. DISPONIBILIDAD Y MANTENIMIENTO */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. DISPONIBILIDAD Y MANTENIMIENTO</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">9.1 Esfuerzos de Disponibilidad</h3>
            <p className="text-gray-700 leading-relaxed">
              Victics hará esfuerzos comercialmente razonables para mantener una disponibilidad del servicio del <strong>99.9%</strong>. Sin embargo, esta métrica no constituye una garantía contractual vinculante.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">9.2 Mantenimiento Programado</h3>
            <p className="text-gray-700 leading-relaxed">
              Victics se reserva el derecho de realizar mantenimiento programado de la Plataforma, lo cual puede resultar en interrupciones temporales del servicio. Siempre que sea posible, se notificará a los Usuarios con anticipación razonable sobre el mantenimiento programado.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">9.3 Suspensión del Servicio</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Victics puede suspender temporal o permanentemente la Plataforma, total o parcialmente, sin previo aviso, en los siguientes casos:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-2">
              <li>Mantenimiento de emergencia o reparaciones urgentes</li>
              <li>Amenazas a la seguridad o integridad del sistema</li>
              <li>Actualización de infraestructura o migración de servidores</li>
              <li>Cumplimiento de órdenes legales o judiciales</li>
              <li>Circunstancias fuera del control razonable de Victics (fuerza mayor)</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              Victics no será responsable por daños, pérdidas o inconvenientes derivados de la suspensión del servicio.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">9.4 Modificación o Terminación del Servicio</h3>
            <p className="text-gray-700 leading-relaxed">
              Victics se reserva el derecho de modificar, suspender o discontinuar la Plataforma (o cualquier parte de ella) en cualquier momento, con o sin previo aviso, sin incurrir en responsabilidad hacia el Usuario o terceros.
            </p>
          </section>

          {/* 10. LEGISLACIÓN APLICABLE */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. LEGISLACIÓN APLICABLE Y JURISDICCIÓN</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">10.1 Legislación Aplicable</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Estos Términos y Condiciones se rigen e interpretan de conformidad con las leyes de los Estados Unidos Mexicanos, específicamente:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Código Civil Federal</li>
              <li>Código de Comercio</li>
              <li>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</li>
              <li>Ley Federal del Derecho de Autor</li>
              <li>Ley Federal de Protección al Consumidor</li>
              <li>Legislación civil y mercantil del Estado de Querétaro</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">10.2 Jurisdicción y Competencia</h3>
            <p className="text-gray-700 leading-relaxed">
              Para la interpretación, cumplimiento y ejecución de estos Términos y Condiciones, las partes se someten expresamente a la jurisdicción de los tribunales competentes con sede en <strong>Querétaro, Querétaro, México</strong>, renunciando expresamente a cualquier otro fuero que pudiera corresponderles por razón de sus domicilios presentes o futuros.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">10.3 Resolución de Controversias</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              En caso de controversia derivada de la interpretación o aplicación de estos Términos y Condiciones, las partes acuerdan primero intentar resolver la disputa de buena fe mediante negociación directa.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Si la controversia no puede resolverse mediante negociación en un plazo de 30 días naturales, cualquiera de las partes podrá acudir a los tribunales competentes conforme a lo establecido en la cláusula anterior.
            </p>
          </section>

          {/* 11. DISPOSICIONES GENERALES */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. DISPOSICIONES GENERALES</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">11.1 Acuerdo Completo</h3>
            <p className="text-gray-700 leading-relaxed">
              Estos Términos y Condiciones, junto con el Aviso de Privacidad, constituyen el acuerdo completo entre el Usuario y Victics respecto al uso de la Plataforma, y reemplazan cualquier acuerdo, negociación o entendimiento previo, ya sea oral o escrito.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">11.2 Divisibilidad</h3>
            <p className="text-gray-700 leading-relaxed">
              Si cualquier disposición de estos Términos y Condiciones es declarada inválida, ilegal o inaplicable por una autoridad competente, dicha disposición será modificada e interpretada para lograr los objetivos de la disposición original en la mayor medida posible bajo la ley aplicable, y las disposiciones restantes continuarán en pleno vigor y efecto.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">11.3 Renuncia</h3>
            <p className="text-gray-700 leading-relaxed">
              La falta o demora de Victics en ejercer cualquier derecho, poder o privilegio bajo estos Términos y Condiciones no constituirá una renuncia a dicho derecho. Ninguna renuncia será efectiva a menos que se haga por escrito y esté firmada por un representante autorizado de Victics.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">11.4 Cesión</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              El Usuario no podrá ceder, transferir o sublicenciar estos Términos y Condiciones o cualquier derecho u obligación bajo los mismos sin el consentimiento previo por escrito de Victics.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Victics podrá ceder estos Términos y Condiciones, total o parcialmente, a cualquier afiliado, sucesor o cesionario de su negocio sin consentimiento del Usuario.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">11.5 Supervivencia</h3>
            <p className="text-gray-700 leading-relaxed">
              Las disposiciones que por su naturaleza deban sobrevivir a la terminación de estos Términos y Condiciones (incluyendo, sin limitación, las cláusulas sobre propiedad intelectual, limitación de responsabilidad, indemnización y legislación aplicable) continuarán en vigor después de la terminación.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">11.6 Relación entre las Partes</h3>
            <p className="text-gray-700 leading-relaxed">
              Nada en estos Términos y Condiciones se interpretará como la creación de una relación laboral, de sociedad, asociación, agencia o empresa conjunta entre el Usuario y Victics. El Usuario actúa como un usuario independiente de la Plataforma.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">11.7 Notificaciones</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Todas las notificaciones, solicitudes y otras comunicaciones bajo estos Términos y Condiciones deben realizarse por escrito y se considerarán debidamente entregadas cuando:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Sean enviadas por correo electrónico a: <strong>example@victics.com</strong> (para Victics)</li>
              <li>Sean enviadas al correo electrónico registrado por el Usuario en su cuenta (para el Usuario)</li>
              <li>Sean publicadas en la Plataforma (para notificaciones generales)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">11.8 Idioma</h3>
            <p className="text-gray-700 leading-relaxed">
              Estos Términos y Condiciones están redactados en idioma español. En caso de traducción a otros idiomas, prevalecerá la versión en español en caso de conflicto o discrepancia.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">11.9 Encabezados</h3>
            <p className="text-gray-700 leading-relaxed">
              Los encabezados de las secciones en estos Términos y Condiciones se incluyen únicamente para conveniencia y no afectarán la interpretación o construcción de ninguna disposición.
            </p>
          </section>

          {/* 12. INFORMACIÓN DE CONTACTO */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. INFORMACIÓN DE CONTACTO</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Correo electrónico:</strong> example@victics.com</p>
              <p className="text-gray-700 mb-2"><strong>Domicilio:</strong> Arroyo Seco, Querétaro, México</p>
              <p className="text-gray-700"><strong>Plataforma:</strong> Ruta del Sabor</p>
            </div>
          </section>

          {/* 13. ACEPTACIÓN */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">13. ACEPTACIÓN</h2>
            <p className="text-gray-700 leading-relaxed">
              Al registrarse y utilizar la Plataforma "Ruta del Sabor", el Usuario declara expresamente que:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700 mt-3">
              <li>Ha leído íntegramente estos Términos y Condiciones</li>
              <li>Comprende y acepta todos sus términos sin reserva alguna</li>
              <li>Se obliga a cumplir con todas las disposiciones establecidas</li>
              <li>Acepta el Aviso de Privacidad de Victics</li>
              <li>Tiene capacidad legal para contratar conforme a las leyes mexicanas</li>
            </ol>
          </section>

        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t text-center">
          <p className="text-sm text-gray-500">
            ÚLTIMA ACTUALIZACIÓN: 17 DE OCTUBRE DE 2025
          </p>
          <p className="text-sm text-gray-600 mt-2 font-semibold">
            VICTICS - Desarrollo y Operación de la Plataforma "Ruta del Sabor"
          </p>
          <p className="text-sm text-gray-500">Arroyo Seco, Querétaro, México</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;