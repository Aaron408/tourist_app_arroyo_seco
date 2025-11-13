import { Link } from 'react-router-dom';
import { X, ChevronDown, ChevronRight, Globe } from 'lucide-react';

const MobileMenu = ({
  isOpen,
  onClose,
  navigationMenus,
  openSubmenu,
  toggleSubmenu,
  currentLanguage,
  handleLanguageChange,
  t
}) => {
  const languages = [
    { code: 'es-MX', label: 'Español', flag: '🇲🇽' },
    { code: 'en-US', label: 'English', flag: '🇺🇸' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];
  return (
    <>
      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.15)' }}
        onClick={onClose}
      />
      
      {/* Mobile Sidebar Menu - From Left */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-700 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">🍽️</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">Xiao Gourmet</span>
                <span className="text-xs text-amber-600 font-medium">Arroyo Seco</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <nav className="space-y-2">
            <Link
              to="/"
              onClick={onClose}
              className="block px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg font-medium transition-colors"
            >
              {t.navigation.home.title}
            </Link>

            {navigationMenus.map((menu, index) => (
              <div key={index} className="space-y-1">
                <button
                  onClick={() => toggleSubmenu(index)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-amber-50 hover:text-amber-600 rounded-lg font-medium transition-colors"
                >
                  <span>{menu.title}</span>
                  {openSubmenu === index ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5" />
                  )}
                </button>

                {/* Submenu */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openSubmenu === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-4 space-y-1 pt-1">
                    {menu.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        to={item.route}
                        onClick={onClose}
                        className={`block px-4 py-2 text-sm text-gray-600 hover:bg-amber-50 hover:text-amber-600 rounded-lg transition-colors ${
                          item.isOverview ? 'font-medium text-gray-700' : ''
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </nav>

          {/* Mobile Language Selector */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
              <Globe className="w-4 h-4" />
              <span className="font-medium">Idioma / Language</span>
            </div>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLanguageChange(lang.code);
                    onClose();
                  }}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${
                    currentLanguage === lang.code
                      ? 'bg-amber-100 text-amber-700 border-2 border-amber-300'
                      : 'bg-gray-50 text-gray-700 hover:bg-amber-50 border-2 border-transparent'
                  }`}
                >
                  <span className="text-xl">{lang.flag}</span>
                  <span className="flex-1 text-left">{lang.label}</span>
                  {currentLanguage === lang.code && (
                    <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default MobileMenu;