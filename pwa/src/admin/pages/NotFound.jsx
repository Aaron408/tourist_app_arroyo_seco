import { Link } from 'react-router-dom';
import { useLanguageStore } from '../stores/languageStore';
import { ROUTES } from '../utils/constants';

const NotFound = () => {
  const { currentLanguage } = useLanguageStore();
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-blue-500">404</h1>
        <h2 className="text-3xl font-medium mt-4 mb-6">
          {currentLanguage === 'es-MX' 
            ? 'Página no encontrada' 
            : 'Page not found'}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          {currentLanguage === 'es-MX' 
            ? 'La página que estás buscando no existe o ha sido movida.' 
            : 'The page you are looking for does not exist or has been moved.'}
        </p>
        <Link 
          to={ROUTES.HOME}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg shadow-md inline-block"
        >
          {currentLanguage === 'es-MX' 
            ? 'Volver al Inicio' 
            : 'Return to Home'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;