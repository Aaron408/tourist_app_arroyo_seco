import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useLanguageStore } from '../stores/languageStore';
import { ROUTES } from '../utils/constants';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuthStore();
  const { currentLanguage, supportedLanguages, setLanguage, t } = useLanguageStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a href={ROUTES.HOME} className="text-xl font-bold">
            Arroyo Seco
          </a>
        </div>

        {/* Navigation for desktop */}
        <nav className="hidden md:flex space-x-6">
          <a href={ROUTES.EXPLORE} className="hover:text-blue-200">
            {t('explore')}
          </a>
          <a href={ROUTES.RESTAURANTS} className="hover:text-blue-200">
            Restaurantes
          </a>
          <a href={ROUTES.ATTRACTIONS} className="hover:text-blue-200">
            Atracciones
          </a>
        </nav>

        {/* Auth & Language */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Language selector */}
          <div className="relative">
            <button
              className="flex items-center px-3 py-1 rounded hover:bg-blue-600"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {currentLanguage === 'es-MX' ? 'es-MX' : 'en-MX'}
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 py-2 w-32 bg-white rounded shadow-lg z-10">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      handleLanguageChange(lang.code);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {isAuthenticated ? (
            <div className="flex items-center space-x-3">
              <span>Hola, {user?.name?.split(' ')[0]}</span>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-blue-50"
              >
                Salir
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <a
                href={ROUTES.LOGIN}
                className="bg-transparent border border-white text-white px-4 py-1 rounded hover:bg-white hover:text-blue-500"
              >
                {t('login')}
              </a>
              <a
                href={ROUTES.REGISTER}
                className="bg-white text-blue-500 px-4 py-1 rounded hover:bg-blue-50"
              >
                {t('register')}
              </a>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={toggleMenu}>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-3 bg-blue-600 shadow-inner">
          <nav className="flex flex-col space-y-3 mb-4">
            <a href={ROUTES.EXPLORE} className="hover:text-blue-200">
              {t('explore')}
            </a>
            <a href={ROUTES.RESTAURANTS} className="hover:text-blue-200">
              Restaurantes
            </a>
            <a href={ROUTES.ATTRACTIONS} className="hover:text-blue-200">
              Atracciones
            </a>
          </nav>

          <div className="flex flex-col space-y-3">
            {/* Language selector mobile */}
            <div className="flex flex-col space-y-2">
              <span className="text-sm opacity-70">Idioma:</span>
              <div className="flex space-x-2">
                {supportedLanguages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`px-3 py-1 rounded ${
                      currentLanguage === lang.code
                        ? 'bg-white text-blue-500'
                        : 'bg-blue-700 text-white'
                    }`}
                  >
                    {lang.code === 'es-MX' ? 'es-MX' : 'en-MX'}
                  </button>
                ))}
              </div>
            </div>

            {isAuthenticated ? (
              <div className="flex flex-col space-y-2">
                <span>Hola, {user?.name?.split(' ')[0]}</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-50"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <a
                  href={ROUTES.LOGIN}
                  className="bg-transparent border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-blue-500 text-center"
                >
                  {t('login')}
                </a>
                <a
                  href={ROUTES.REGISTER}
                  className="bg-white text-blue-500 px-4 py-2 rounded hover:bg-blue-50 text-center"
                >
                  {t('register')}
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;