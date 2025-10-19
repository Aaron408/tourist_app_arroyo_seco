import { useLanguageStore } from '../../stores/languageStore';

const Restaurants = () => {
  const { currentLanguage } = useLanguageStore();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {currentLanguage === 'es-MX' ? 'Restaurantes' : 'Restaurants'}
      </h1>
      
      <p className="text-lg mb-8">
        {currentLanguage === 'es-MX' 
          ? 'Página de restaurantes (contenido provisional)' 
          : 'Restaurants page (placeholder content)'}
      </p>
    </div>
  );
};

export default Restaurants;