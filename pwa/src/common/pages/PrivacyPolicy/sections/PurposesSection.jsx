const PurposesSection = () => (
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
);

export default PurposesSection;