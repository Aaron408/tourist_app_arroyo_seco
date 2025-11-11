import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useLanguageStore } from '../../stores/languageStore';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();

  const { getTranslations, currentLanguage, setLanguage } = useLanguageStore();
  const t = getTranslations();

  const from = location.state?.from?.pathname || '/administracion/dashboard';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const toggleLanguage = () => {
    setLanguage(currentLanguage === 'es-MX' ? 'en-US' : 'es-MX');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.email || !formData.password) {
      setError(t.loginPage.fillAllFields || 'Por favor completa todos los campos');
      return;
    }

    const result = await login(formData.email, formData.password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-red-50 to-orange-100">
      
      {/* Language Toggle - Fixed position */}
      <button
        onClick={toggleLanguage}
        className="fixed top-4 right-4 z-50 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 hover:text-orange-600 border-2 border-gray-300 rounded-lg hover:border-orange-500 transition-all bg-white shadow-md hover:shadow-lg"
      >
        {currentLanguage === 'es-MX' ? '🇺🇸 English' : '🇲🇽 Español'}
      </button>

      <div className="max-w-md w-full">
        {/* Logo y título */}
        <div className="text-center mb-6 sm:mb-8">
          {/* Logo Circle */}
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-full shadow-lg mb-4">
            <span className="text-3xl sm:text-4xl">🍽️</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            {t.loginPage.title || 'Panel de Administración'}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            {t.loginPage.subtitle || 'Arroyo Seco Tourism'}
          </p>
        </div>

        {/* Formulario */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 border-t-4 border-orange-500">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg flex items-start space-x-3" role="alert">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.loginPage.email || 'Correo electrónico'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="correo@ejemplo.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.loginPage.password || 'Contraseña'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-600 transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-orange-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base"
            >
              {isLoading ? (
                <span className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>{t.loginPage.loggingIn || 'Iniciando sesión...'}</span>
                </span>
              ) : (
                t.loginPage.loginButton || 'Iniciar Sesión'
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-xs sm:text-sm text-gray-600 mb-2">
            {t.loginPage.accessProblems || '¿Problemas para acceder? Contacta al administrador'}
          </p>
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Arroyo Seco Tourism
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;