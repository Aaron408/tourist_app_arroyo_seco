const TransfersSection = () => (
  <section className="mb-8">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      4. TRANSFERENCIAS DE DATOS PERSONALES
    </h2>

    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mb-4">
      <h3 className="text-xl font-semibold text-red-900 mb-2">
        4.1 Política de No Transferencia Comercial
      </h3>
      <p className="text-red-800 font-semibold">
        Victics NO vende, renta, comercializa ni transfiere sus datos personales
        a terceros con fines comerciales, publicitarios o mercadotécnicos.
      </p>
    </div>

    <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">
      4.2 Transferencia a Proveedores de Servicios
    </h3>
    <p className="text-gray-700 leading-relaxed mb-3">
      Victics utiliza proveedores de infraestructura tecnológica para la
      operación de la Plataforma:
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
);

export default TransfersSection;
