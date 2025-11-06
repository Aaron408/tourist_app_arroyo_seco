const DataCollectionSection = () => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      2. DATOS PERSONALES QUE RECABAMOS
    </h2>
    
    <h3 className="text-xl font-semibold text-gray-800 mt-4 mb-2">
      2.1 Datos Personales de Identificación
    </h3>
    <p className="text-gray-700 leading-relaxed mb-3">
      Para el uso de la Plataforma, Victics recaba únicamente los siguientes datos
      personales:
    </p>
    <ul className="list-disc pl-6 space-y-2 text-gray-700">
      <li>
        <strong>Nombre de usuario:</strong> Puede ser un alias o seudónimo elegido
        libremente, o su nombre real si así lo prefiere
      </li>
      <li>
        <strong>Correo electrónico:</strong> Dirección de correo electrónico válida y
        activa
      </li>
      <li>
        <strong>Contraseña:</strong> Clave de acceso personal elegida por el Usuario,
        almacenada mediante algoritmos de encriptación seguros
      </li>
    </ul>

    <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-6 rounded">
      <h3 className="text-xl font-semibold text-green-900 mb-2">
        2.2 Datos que NO Recabamos
      </h3>
      <p className="text-green-800 mb-2">
        <strong>Victics NO solicita, recaba, almacena ni procesa:</strong>
      </p>
      <ul className="list-disc pl-6 space-y-1 text-green-800">
        <li>
          Datos personales sensibles (origen étnico, estado de salud, creencias religiosas,
          preferencia sexual)
        </li>
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
);

export default DataCollectionSection;