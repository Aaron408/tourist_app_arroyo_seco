import { useEffect } from 'react';
import IdentitySection from './sections/IdentitySection';
import DataCollectionSection from './sections/DataCollectionSection';
import PurposesSection from './sections/PurposesSection';
import TransfersSection from './sections/TransfersSection';
import ArcoRightsSection from './sections/ArcoRightsSection';
import SecuritySection from './sections/SecuritySection';
import MinorsSection from './sections/MinorsSection';
import AuthoritySection from './sections/AuthoritySection';
import ContactSection from './sections/ContactSection';

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
          <p className="text-md text-gray-500">Plataforma Digital "Ruta del Sabor"</p>
          <p className="text-sm text-gray-400 mt-3">
            Última actualización: 17 de octubre de 2025
          </p>
        </div>

        {/* Contenido */}
        <div className="prose prose-lg max-w-none">
          <IdentitySection />
          <DataCollectionSection />
          <PurposesSection />
          <TransfersSection />
          <ArcoRightsSection />
          <SecuritySection />
          <MinorsSection />
          <AuthoritySection />
          <ContactSection />
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              ÚLTIMA ACTUALIZACIÓN: 17 DE OCTUBRE DE 2025
            </p>
            <p className="text-sm text-gray-600 font-semibold">VICTICS</p>
            <p className="text-sm text-gray-600">
              Responsable del Tratamiento de Datos Personales
            </p>
            <p className="text-sm text-gray-600">Plataforma "Ruta del Sabor"</p>
            <p className="text-sm text-gray-500 mt-2">
              Querétaro, Querétaro, México
            </p>
            <p className="text-xs text-gray-400 mt-4">
              Este Aviso de Privacidad se emite en cumplimiento de la Ley Federal de
              Protección de Datos Personales en Posesión de los Particulares, publicada en
              el Diario Oficial de la Federación el 5 de julio de 2010, y su Reglamento
              publicado el 21 de diciembre de 2011.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;