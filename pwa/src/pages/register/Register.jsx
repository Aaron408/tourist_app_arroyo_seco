import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useLanguageStore } from '../../stores/languageStore';
import { validateEmail } from '../../utils/helpers';
import { ROUTES } from '../../utils/constants';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  
  const navigate = useNavigate();
  const { register, isLoading, error, clearError } = useAuthStore();
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
    
    if (!formData.name) {
      errors.name = currentLanguage === 'es-MX' 
        ? 'El nombre es obligatorio' 
        : 'Name is required';
    }
    
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
    } else if (formData.password.length < 6) {
      errors.password = currentLanguage === 'es-MX' 
        ? 'La contraseña debe tener al menos 6 caracteres' 
        : 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      errors.confirmPassword = currentLanguage === 'es-MX' 
        ? 'Confirma tu contraseña' 
        : 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = currentLanguage === 'es-MX' 
        ? 'Las contraseñas no coinciden' 
        : 'Passwords do not match';
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
    
    //Intentar registro
    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    
    if (result.success) {
      navigate(ROUTES.HOME);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {currentLanguage === 'es-MX' ? 'Crear cuenta' : 'Create account'}
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
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {currentLanguage === 'es-MX' ? 'Nombre completo' : 'Full name'}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={formData.name}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  formErrors.name ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10`}
                placeholder={currentLanguage === 'es-MX' ? 'Nombre completo' : 'Full name'}
              />
              {formErrors.name && (
                <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
              )}
            </div>
            
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
            
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                {currentLanguage === 'es-MX' ? 'Contraseña' : 'Password'}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
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
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                {currentLanguage === 'es-MX' ? 'Confirmar contraseña' : 'Confirm password'}
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none relative block w-full px-3 py-2 border ${
                  formErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                } placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10`}
                placeholder={currentLanguage === 'es-MX' ? 'Confirmar contraseña' : 'Confirm password'}
              />
              {formErrors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
              )}
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
                  {currentLanguage === 'es-MX' ? 'Registrando...' : 'Registering...'}
                </span>
              ) : (
                currentLanguage === 'es-MX' ? 'Registrarse' : 'Sign up'
              )}
            </button>
          </div>
          
          <div className="text-center">
            <p className="mt-2 text-sm text-gray-600">
              {currentLanguage === 'es-MX' ? '¿Ya tienes cuenta?' : 'Already have an account?'}{' '}
              <a href={ROUTES.LOGIN} className="font-medium text-blue-600 hover:text-blue-500">
                {currentLanguage === 'es-MX' ? 'Iniciar sesión' : 'Sign in'}
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
