import { useLanguageStore } from '../../stores/languageStore';

const Attractions = () => {
  const { currentLanguage } = useLanguageStore();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        {currentLanguage === 'es-MX' ? 'Atracciones' : 'Attractions'}
      </h1>
      
      <p className="text-lg mb-8">
        {currentLanguage === 'es-MX' 
          ? 'Página de atracciones (contenido provisional)' 
          : 'Attractions page (placeholder content)'}
      </p>
    </div>
  );
};

export default Attractions;