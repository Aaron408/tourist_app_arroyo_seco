import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { ROUTES } from '../../utils/constants';
import { useLanguageStore } from '../../stores/languageStore';

const Header = ({
  isMobileMenuOpen,
  toggleMobileMenu,
  navigationMenus,
  currentLanguage,
  handleLanguageChange,
  t,
  closeMobileMenu
}) => {
  const { supportedLanguages } = useLanguageStore();

  // Mapeo de flags para cada idioma
  const languageFlags = {
    'es-MX': '🇲🇽',
    'en-US': '🇺🇸',
    'pam': '🇲🇽'
  };

  // Construir array de idiomas dinámicamente desde supportedLanguages
  const languages = supportedLanguages.map(lang => ({
    code: lang.code,
    label: lang.name.split('(')[0].trim(),
    fullName: lang.name,
    flag: languageFlags[lang.code] || '🌐'
  }));

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  // Detectar si un menú debería ser link directo
  const isLinkDirectMenu = (menu) => {
    // Si tiene items pero todos tienen isOverview, o solo tiene 1 item, es link directo
    if (!menu.items || menu.items.length === 0) {
      return true;
    }
    // Si tiene 1 item con isOverview, es link directo
    if (menu.items.length === 1 && menu.items[0].isOverview) {
      return true;
    }
    return false;
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Mobile Menu Button - Left Side */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 text-gray-700 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Logo - Center on mobile, left on desktop */}
          <Link 
            to={ROUTES.HOME} 
            className="flex items-center space-x-2 md:space-x-3 absolute left-1/2 transform -translate-x-1/2 lg:static lg:transform-none" 
            onClick={closeMobileMenu}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl md:text-2xl">🍽️</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-gray-900">
                Xiao Gourmet
              </span>
              <span className="text-xs text-amber-600 font-medium hidden sm:block">
                Arroyo Seco
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to={ROUTES.HOME} 
              className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
            >
              {t.navigation.home.title}
            </Link>
            
            {/* Dynamic Navigation Menus */}
            {navigationMenus.map((menu, index) => {
              const isDirectLink = isLinkDirectMenu(menu);
              const targetRoute = isDirectLink && menu.items.length > 0 ? menu.items[0].route : menu.route;

              return isDirectLink ? (
                // Link directo (Eventos, Lugares con 1 item, etc)
                <Link 
                  key={index}
                  to={targetRoute}
                  className="text-gray-700 hover:text-amber-600 transition-colors font-medium"
                >
                  {menu.title}
                </Link>
              ) : (
                // Dropdown con múltiples items
                <div key={index} className="relative group">
                  <Link 
                    to={menu.route}
                    className="text-gray-700 hover:text-amber-600 transition-colors font-medium flex items-center"
                  >
                    {menu.title}
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Link>
                  <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="py-1">
                      {menu.items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          {item.isOverview && itemIndex > 0 && (
                            <div className="border-t border-gray-100 my-1"></div>
                          )}
                          <Link 
                            to={item.route} 
                            className={`block px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-600 transition-colors ${
                              item.isOverview ? 'font-medium' : ''
                            }`}
                          >
                            {item.label}
                          </Link>
                          {item.isOverview && (
                            <div className="border-t border-gray-100 my-1"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Language Selector - Right Side (Desktop Only) */}
          <div className="hidden lg:block relative group">
            <button
              className="flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm font-medium text-gray-700 hover:text-amber-600 border-2 border-gray-300 rounded-lg hover:border-amber-600 transition-all"
            >
              <Globe className="w-4 h-4" />
              <span>{currentLang.flag} {currentLang.label}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-50 first:rounded-t-lg last:rounded-b-lg transition-colors flex items-center gap-2 ${
                    currentLanguage === lang.code ? 'bg-amber-50 text-amber-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  <span className="text-lg">{lang.flag}</span>
                  <span>{lang.label}</span>
                  {lang.code === 'pam' && <span className="text-xs text-gray-500 ml-auto">(Ñhä)</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;