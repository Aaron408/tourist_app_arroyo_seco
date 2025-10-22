import { useParams } from 'react-router-dom';
import { useLanguageStore } from '../../stores/languageStore';

const RestaurantDetail = () => {
  const { restaurantId } = useParams();
  const { currentLanguage } = useLanguageStore();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {currentLanguage === 'es-MX' ? 'Detalles del Restaurante' : 'Restaurant Details'}
      </h1>
      
      <p className="text-lg mb-4">
        {currentLanguage === 'es-MX' 
          ? `Viendo el restaurante con ID: ${restaurantId}` 
          : `Viewing restaurant with ID: ${restaurantId}`}
      </p>
      
      <p className="text-lg mb-8">
        {currentLanguage === 'es-MX' 
          ? 'Página de detalles del restaurante (contenido provisional)' 
          : 'Restaurant details page (placeholder content)'}
      </p>
    </div>
  );
};

export default RestaurantDetail;