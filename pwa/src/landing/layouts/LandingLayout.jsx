import { useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useLanguageStore } from '../stores/languageStore';
import { ROUTES } from '../utils/constants';

const LandingLayout = () => {
  const { initializeLanguage, currentLanguage, setLanguage, t } = useLanguageStore();

  useEffect(() => {
    initializeLanguage();
  }, []);

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'es-MX' ? 'en-US' : 'es-MX');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to={ROUTES.HOME} className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">🍽️</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900">
                  Arroyo Seco
                </span>
                <span className="text-xs text-amber-600 font-medium">
                  {t('gastronomy') || 'Gastronomía y Cultura'}
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to={ROUTES.HOME} 
                className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                {t('home') || 'Inicio'}
              </Link>
              
              <Link 
                to={ROUTES.GASTRONOMY} 
                className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                {t('gastronomy') || 'Gastronomía'}
              </Link>
              
              <Link 
                to={ROUTES.LOCATIONS} 
                className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                {t('locations') || 'Ubicaciones'}
              </Link>
              
              <Link 
                to={ROUTES.EVENTS} 
                className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
              >
                {t('events') || 'Eventos'}
              </Link>
            </div>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-amber-600 border-2 border-gray-300 rounded-lg hover:border-amber-600 transition-all"
            >
              {currentLanguage === 'es-MX' ? '🇺🇸 English' : '🇲🇽 Español'}
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">🍽️</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-white">
                    Arroyo Seco
                  </span>
                  <span className="text-sm text-amber-400">
                    {t('gastronomy') || 'Gastronomía y Cultura'}
                  </span>
                </div>
              </div>
              <p className="text-gray-400 max-w-md leading-relaxed">
                {t('footerDescription') || 'Descubre la riqueza gastronómica de Arroyo Seco, Querétaro. Explora recetas tradicionales, ingredientes locales y eventos culturales de la Sierra Gorda.'}
              </p>
            </div>

            {/* Gastronomía Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">
                {t('gastronomy') || 'Gastronomía'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to={ROUTES.RECIPES} className="hover:text-amber-400 transition-colors">
                    {t('recipes') || 'Recetas'}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.INGREDIENTS} className="hover:text-amber-400 transition-colors">
                    {t('ingredients') || 'Ingredientes'}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.CULINARY_TECHNIQUES} className="hover:text-amber-400 transition-colors">
                    {t('techniques') || 'Técnicas'}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.REFERENCE_RESTAURANTS} className="hover:text-amber-400 transition-colors">
                    {t('restaurants') || 'Restaurantes'}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Explora Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-lg">
                {t('explore') || 'Explora'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to={ROUTES.EMBLEMATIC_PLACES} className="hover:text-amber-400 transition-colors">
                    {t('emblematicPlaces') || 'Lugares Emblemáticos'}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.WORKSHOPS} className="hover:text-amber-400 transition-colors">
                    {t('workshops') || 'Talleres'}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.GUIDED_ROUTES} className="hover:text-amber-400 transition-colors">
                    {t('guidedTours') || 'Rutas Guiadas'}
                  </Link>
                </li>
                <li>
                  <Link to={ROUTES.INTERACTIVE_SKETCH} className="hover:text-amber-400 transition-colors">
                    {t('interactiveMap') || 'Mapa Interactivo'}
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
            <p className="mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Arroyo Seco. {t('allRightsReserved') || 'Todos los derechos reservados.'}
            </p>
            <div className="flex items-center space-x-4">
              <span>📍 Arroyo Seco, Querétaro</span>
              <span>|</span>
              <span>🏔️ Sierra Gorda</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingLayout;