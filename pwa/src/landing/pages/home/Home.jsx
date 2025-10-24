import { Link } from 'react-router-dom';
import { useLanguageStore } from '../../stores/languageStore';
import { ROUTES } from '../../utils/constants';
import FeatureCard from './FeatureCard';

const Home = () => {
  const { getTranslations } = useLanguageStore();
  const t = getTranslations();
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-amber-600 to-orange-700 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200')] bg-cover bg-center mix-blend-overlay"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              {t.homePage.welcomeMessage || 'Descubre los Sabores de Arroyo Seco'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-100">
              {t.homePage.heroSubtitle || 'Explora la riqueza gastronómica de la Sierra Gorda. Recetas tradicionales, ingredientes locales y experiencias únicas.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to={ROUTES.GASTRONOMY}
                className="bg-white text-amber-700 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                {t.homePage.exploreGastronomy || 'Explorar Gastronomía'}
              </Link>
              <Link 
                to={ROUTES.EVENTS}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-amber-700 transition-all"
              >
                {t.homePage.viewEvents || 'Ver Eventos'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.homePage.whatWeOffer || '¿Qué Ofrecemos?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.homePage.offerDescription || 'Todo lo que necesitas para explorar y disfrutar la cultura gastronómica de Arroyo Seco'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 - Gastronomía */}
            <FeatureCard 
              to={ROUTES.GASTRONOMY}
              bgGradient="from-orange-50 to-amber-50"
              iconGradient="from-amber-500 to-orange-600"
              icon="🍽️"
              title={t.gastronomyPage.main.title || 'Gastronomía'}
              description={t.gastronomyPage.main.description || 'Descubre recetas tradicionales, ingredientes locales y técnicas culinarias ancestrales de la región.'}
              linkText={t.common.learnMore || 'Conocer más →'}
              linkColor="text-amber-600"
            />

            {/* Feature 2 - Ubicaciones */}
            <FeatureCard 
              to={ROUTES.LOCATIONS}
              bgGradient="from-blue-50 to-cyan-50"
              iconGradient="from-blue-500 to-cyan-600"
              icon="📍"
              title={t.locationsPage.main.title || 'Lugares de Arroyo Seco'}
              description={t.locationsPage.main.description || 'Explora lugares emblemáticos, restaurantes y puntos de interés en un mapa interactivo.'}
              linkText={t.navigation.explore || 'Explorar →'}
              linkColor="text-blue-600"
            />

            {/* Feature 3 - Eventos */}
            <FeatureCard 
              to={ROUTES.EVENTS}
              bgGradient="from-purple-50 to-pink-50"
              iconGradient="from-purple-500 to-pink-600"
              icon="🎉"
              title={t.eventsPage.main.title || 'Eventos en Arroyo Seco'}
              description={t.eventsPage.main.description || 'Participa en talleres gastronómicos, rutas guiadas y eventos culturales especiales.'}
              linkText={t.homePage.viewEvents || 'Ver eventos →'}
              linkColor="text-purple-600"
            />
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {t.gastronomyPage.main.traditionalRecipes || 'Recetas Tradicionales'}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {t.gastronomyPage.main.recipesDescription || 'Aprende a preparar platillos auténticos de Arroyo Seco con ingredientes locales y técnicas transmitidas de generación en generación.'}
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span className="text-gray-700">{t.gastronomyPage.main.step1 || 'Recetas paso a paso con imágenes detalladas'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span className="text-gray-700">{t.gastronomyPage.main.step2 || 'Información sobre ingredientes de temporada'}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-2xl mr-3">✓</span>
                  <span className="text-gray-700">{t.gastronomyPage.main.step3 || 'Técnicas culinarias tradicionales'}</span>
                </li>
              </ul>
              <Link 
                to={ROUTES.RECIPES}
                className="inline-block bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              >
                {t.gastronomyPage.main.viewRecipes || 'Ver Recetas'}
              </Link>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-600 opacity-20"></div>
              <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800')] bg-cover bg-center"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 to-orange-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t.homePage.ctaTitle || '¿Listo para Explorar?'}
          </h2>
          <p className="text-xl text-amber-50 mb-8">
            {t.homePage.ctaDescription || 'Comienza tu viaje gastronómico por Arroyo Seco hoy mismo'}
          </p>
          <Link 
            to={ROUTES.INTERACTIVE_SKETCH}
            className="inline-block bg-white text-amber-700 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {t.common.viewInteractiveMap || 'Ver Mapa Interactivo'}
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">50+</div>
              <div className="text-gray-600">{t.common.recipes || 'Recetas'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">100+</div>
              <div className="text-gray-600">{t.common.ingredients || 'Ingredientes'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">25+</div>
              <div className="text-gray-600">{t.common.places || 'Lugares'}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-amber-600 mb-2">15+</div>
              <div className="text-gray-600">{t.navigation.events.title || 'Eventos'}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;