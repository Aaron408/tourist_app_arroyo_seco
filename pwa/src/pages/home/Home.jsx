import { useLanguageStore } from '../../stores/languageStore';

const Home = () => {
  const { t } = useLanguageStore();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {t('welcomeMessage')}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {t('welcomeMessage')}
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md">
          {t('explore')}
        </button>
      </section>
      
      {/* Aquí irá el contenido de la página de inicio */}
      <div className="text-center py-12">
        <p className="text-xl">Contenido provisional de la página de inicio</p>
      </div>
    </div>
  );
};

export default Home;