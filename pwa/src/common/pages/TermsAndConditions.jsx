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
        <div className="prose prose-lg max-w-none">
          
          {/* 1. INFORMACIÓN GENERAL */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. INFORMACIÓN GENERAL</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">1.1 Identificación del Responsable</h3>
            <p className="text-gray-700 leading-relaxed">
              La plataforma digital "Ruta del Sabor" es desarrollada y operada por <strong>Victics</strong>, 
              un proyecto de desarrollo tecnológico orientado a promover el patrimonio cultural y gastronómico 
              de Querétaro, Querétaro, México.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg mt-3">
              <p className="text-sm"><strong>Correo electrónico:</strong> ratonrangelmejia+2@gmail.com</p>
              <p className="text-sm"><strong>Domicilio:</strong> Querétaro, Querétaro, México</p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1.2 Aceptación de los Términos</h3>
            <p className="text-gray-700 leading-relaxed">
              Al acceder, registrarse o utilizar la Plataforma, usted acepta expresamente quedar vinculado 
              por estos Términos y Condiciones, así como por nuestro Aviso de Privacidad.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">1.3 Capacidad Legal</h3>
            <p className="text-gray-700 leading-relaxed mb-2">Para utilizar la Plataforma, el Usuario declara y garantiza que:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Es mayor de 18 años de edad</li>
              <li>Posee capacidad legal para celebrar contratos vinculantes</li>
              <li>No le está prohibido legalmente el uso de servicios digitales</li>
              <li>Toda la información proporcionada durante el registro es veraz, precisa y completa</li>
            </ul>
          </section>

          {/* 2. DESCRIPCIÓN DE LA PLATAFORMA */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. DESCRIPCIÓN DE LA PLATAFORMA</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">2.1 Naturaleza del Servicio</h3>
            <p className="text-gray-700 leading-relaxed mb-3">
              "Ruta del Sabor" es una plataforma digital de carácter informativo y educativo cuyo propósito fundamental es:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Promover y preservar el patrimonio culinario tradicional e indígena de Arroyo Seco, Querétaro</li>
              <li>Proporcionar acceso a un catálogo documentado de recetas tradicionales</li>
              <li>Ofrecer un directorio de restaurantes y establecimientos gastronómicos tradicionales</li>
              <li>Brindar información sobre talleres culturales y eventos gastronómicos</li>
              <li>Facilitar contenido educativo sobre la historia y prácticas sostenibles</li>
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
                <li>Vende productos, ingredientes o servicios gastronómicos</li>
                <li>Garantiza la disponibilidad o calidad de los establecimientos listados</li>
              </ul>
            </div>
          </section>

          {/* 3. REGISTRO Y CUENTAS DE USUARIO */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. REGISTRO Y CUENTAS DE USUARIO</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">3.1 Requisitos para el Registro</h3>
            <p className="text-gray-700 leading-relaxed mb-2">
              Para acceder al contenido completo de la aplicación móvil, el Usuario debe crear una cuenta proporcionando:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Nombre de usuario (puede ser un alias o nombre real)</li>
              <li>Dirección de correo electrónico válida</li>
              <li>Contraseña segura</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">3.2 Responsabilidad sobre las Credenciales</h3>
            <p className="text-gray-700 leading-relaxed">
              El Usuario es el único responsable de mantener la confidencialidad de su nombre de usuario y contraseña, 
              así como de todas las actividades que ocurran bajo su cuenta.
            </p>
          </section>

          {/* 4. USO ACEPTABLE */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. USO ACEPTABLE DE LA PLATAFORMA</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">4.1 Compromisos del Usuario</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Utilizar la Plataforma únicamente con fines lícitos, informativos y educativos</li>
              <li>Respetar los derechos de propiedad intelectual de Victics y de terceros</li>
              <li>No interferir con el correcto funcionamiento de la Plataforma</li>
              <li>Mantener un comportamiento respetuoso hacia otros usuarios</li>
              <li>No utilizar la Plataforma para fines comerciales no autorizados</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">4.2 Conductas Prohibidas</h3>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-900 font-semibold mb-2">Está expresamente prohibido:</p>
              <ul className="list-disc pl-6 space-y-1 text-red-800">
                <li>Publicar comentarios ofensivos, discriminatorios o que inciten al odio</li>
                <li>Utilizar lenguaje obsceno, vulgar o sexualmente explícito</li>
                <li>Realizar amenazas o acoso hacia cualquier persona</li>
                <li>Compartir información falsa, engañosa o difamatoria</li>
                <li>Publicar spam o publicidad no autorizada</li>
                <li>Intentar realizar ingeniería inversa del software</li>
                <li>Cargar o transmitir virus o código malicioso</li>
              </ul>
            </div>
          </section>

          {/* 8. LIMITACIÓN DE RESPONSABILIDAD */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. LIMITACIÓN DE RESPONSABILIDAD</h2>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-4">
              <p className="text-blue-900 font-semibold">
                El Usuario reconoce y acepta expresamente que la Plataforma es un servicio de información 
                proporcionado "TAL CUAL" y "SEGÚN DISPONIBILIDAD", sin garantías de ningún tipo.
              </p>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">8.1 Victics NO es responsable por:</h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>La calidad, seguridad o características de los servicios ofrecidos por establecimientos terceros</li>
              <li>Experiencias negativas o daños derivados de visitar establecimientos listados</li>
              <li>Cambios en horarios, precios o disponibilidad de los establecimientos</li>
              <li>Problemas de salud derivados del consumo de alimentos en establecimientos terceros</li>
              <li>Alergias, intolerancias o reacciones adversas a ingredientes mencionados en recetas</li>
              <li>Lesiones o accidentes derivados de la preparación de recetas</li>
            </ul>
          </section>

          {/* 10. LEGISLACIÓN APLICABLE */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. LEGISLACIÓN APLICABLE Y JURISDICCIÓN</h2>
            
            <p className="text-gray-700 leading-relaxed mb-3">
              Estos Términos y Condiciones se rigen e interpretan de conformidad con las leyes de los 
              Estados Unidos Mexicanos, específicamente:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Código Civil Federal</li>
              <li>Código de Comercio</li>
              <li>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</li>
              <li>Ley Federal del Derecho de Autor</li>
              <li>Ley Federal de Protección al Consumidor</li>
            </ul>

            <p className="text-gray-700 leading-relaxed mt-4">
              Para cualquier controversia, las partes se someten expresamente a la jurisdicción de los 
              tribunales competentes con sede en <strong>Querétaro, Querétaro, México</strong>.
            </p>
          </section>

          {/* 12. INFORMACIÓN DE CONTACTO */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. INFORMACIÓN DE CONTACTO</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
              <p className="text-gray-700 mb-2"><strong>Correo electrónico:</strong> ratonrangelmejia+2@gmail.com</p>
              <p className="text-gray-700 mb-2"><strong>Domicilio:</strong> Querétaro, Querétaro, México</p>
              <p className="text-gray-700"><strong>Plataforma:</strong> Ruta del Sabor</p>
            </div>
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
          <p className="text-sm text-gray-500">Querétaro, Querétaro, México</p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;