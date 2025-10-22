import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useLanguageStore } from '../../stores/languageStore';
import { validateEmail } from '../../utils/helpers';
import { ROUTES } from '../../utils/constants';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const { currentLanguage } = useLanguageStore();
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    //Limpia el error cuando el usuario comienza a escribir
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
    
    //Limpiar error general
    if (error) {
      clearError();
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.email) {
      errors.email = currentLanguage === 'es-MX' 
        ? 'El correo electrónico es obligatorio' 
        : 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = currentLanguage === 'es-MX' 
        ? 'Formato de correo electrónico inválido' 
        : 'Invalid email format';
    }
    
    if (!formData.password) {
      errors.password = currentLanguage === 'es-MX' 
        ? 'La contraseña es obligatoria' 
        : 'Password is required';
    }
    
    return errors;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    //Validar formulario
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    //Intentar login
    const result = await login(formData);
    if (result.success) {
      navigate(ROUTES.HOME);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {currentLanguage === 'es-MX' ? 'Iniciar sesión' : 'Sign in'}
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Mensaje de error general */}
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          <div className="rounded-md -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                {currentLanguage === 'es-MX' ? 'Correo electrónico' : 'Email address'}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  formErrors.email ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10`}
                placeholder={currentLanguage === 'es-MX' ? 'Correo electrónico' : 'Email address'}
              />
              {formErrors.email && (
                <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {currentLanguage === 'es-MX' ? 'Contraseña' : 'Password'}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  formErrors.password ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10`}
                placeholder={currentLanguage === 'es-MX' ? 'Contraseña' : 'Password'}
              />
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                {currentLanguage === 'es-MX' ? 'Recordarme' : 'Remember me'}
              </label>
            </div>
            
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                {currentLanguage === 'es-MX' ? '¿Olvidaste tu contraseña?' : 'Forgot your password?'}
              </a>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {currentLanguage === 'es-MX' ? 'Cargando...' : 'Loading...'}
                </span>
              ) : (
                currentLanguage === 'es-MX' ? 'Iniciar sesión' : 'Sign in'
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              {currentLanguage === 'es-MX' ? '¿No tienes cuenta?' : "Don't have an account?"}{' '}
              <a href={ROUTES.REGISTER} className="font-medium text-blue-600 hover:text-blue-500">
                {currentLanguage === 'es-MX' ? 'Regístrate' : 'Sign up'}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
