import { useLanguageStore } from '../../stores/languageStore';

const Explore = () => {
  const { currentLanguage } = useLanguageStore();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {currentLanguage === 'es-MX' ? 'Explorar Arroyo Seco' : 'Explore Arroyo Seco'}
      </h1>
      
      <p className="text-lg mb-8">
        {currentLanguage === 'es-MX' 
          ? 'Página de exploración (contenido provisional)' 
          : 'Explore page (placeholder content)'}
      </p>
    </div>
  );
};

export default Explore;