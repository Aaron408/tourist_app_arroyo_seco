import { useParams } from 'react-router-dom';
import { useLanguageStore } from '../../stores/languageStore';

const AttractionDetail = () => {
  const { attractionId } = useParams();
  const { currentLanguage } = useLanguageStore();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {currentLanguage === 'es-MX' ? 'Detalles de la Atracción' : 'Attraction Details'}
      </h1>
      
      <p className="text-lg mb-4">
        {currentLanguage === 'es-MX' 
          ? `Viendo la atracción con ID: ${attractionId}` 
          : `Viewing attraction with ID: ${attractionId}`}
      </p>
      
      <p className="text-lg mb-8">
        {currentLanguage === 'es-MX' 
          ? 'Página de detalles de la atracción (contenido provisional)' 
          : 'Attraction details page (placeholder content)'}
      </p>
    </div>
  );
};

export default AttractionDetail;