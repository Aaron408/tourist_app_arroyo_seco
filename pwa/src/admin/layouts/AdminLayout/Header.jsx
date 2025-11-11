import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguageStore } from '../../stores/languageStore';
import { Menu, X } from 'lucide-react';

const Header = ({ onMenuClick, isMobileMenuOpen }) => {
  const { user, logout } = useAuth();
  const { currentLanguage, setLanguage, t } = useLanguageStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/administracion/login');
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'es-MX' ? 'en-US' : 'es-MX');
  };

  return (
    <header className="bg-white shadow-md border-b-4 border-orange-500">
      <div className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          {/* Logo and Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Mobile menu button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 rounded-lg hover:bg-orange-50 text-gray-700 hover:text-orange-600 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white text-xl">🍽️</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">
                  {t('adminPanel') || 'Panel de Administración'}
                </h1>
                <p className="text-xs text-gray-500">Arroyo Seco Tourism</p>
              </div>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="px-2 sm:px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-orange-600 border-2 border-gray-300 rounded-lg hover:border-orange-500 transition-all"
              title={currentLanguage === 'es-MX' ? 'Switch to English' : 'Cambiar a Español'}
            >
              {currentLanguage === 'es-MX' ? '🇺🇸 EN' : '🇲🇽 ES'}
            </button>

            {/* User Info - Hidden on mobile */}
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs sm:text-sm font-medium rounded-lg hover:from-orange-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
              title={t('logout') || 'Cerrar Sesión'}
            >
              <span className="hidden sm:inline">{t('logout') || 'Cerrar Sesión'}</span>
              <span className="sm:hidden">Salir</span>
            </button>
          </div>
        </div>

        {/* Mobile: User info below header */}
        <div className="md:hidden mt-3 pt-3 border-t border-gray-200">
          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>
    </header>
  );
};

export default Header;