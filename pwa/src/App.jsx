import './App.css';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useLanguageStore } from './common/stores/languageStore';
import { AuthProvider } from './admin/contexts/AuthContext';

// Importar las rutas
import { landingRoutes } from './landing/routes/LandingRoutes';
import { adminRoutes } from './admin/routes/AdminRoutes';

const router = createBrowserRouter([
  ...landingRoutes,
  ...adminRoutes,
]);

export default function App() {
  const { initializeLanguage } = useLanguageStore();

  useEffect(() => {
    initializeLanguage();
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}