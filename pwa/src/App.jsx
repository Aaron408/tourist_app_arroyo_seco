import './App.css';
import { useEffect, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useLanguageStore as useLandingLanguageStore } from './landing/stores/languageStore';
import { useLanguageStore as useAdminLanguageStore } from './admin/stores/languageStore';
import { AuthProvider } from './admin/contexts/AuthProvider';

// Import routes
import { commonRoutes } from './common/routes/commonRoutes';
import { landingRoutes } from './landing/routes/LandingRoutes';
import { adminRoutes } from './admin/routes/AdminRoutes';

// Create router with all routes
const router = createBrowserRouter([
  ...commonRoutes,
  ...landingRoutes,
  ...adminRoutes,
]);

export default function App() {
  const { initializeLanguage: initLanding, setLanguage: setLandingLanguage } = useLandingLanguageStore();
  const { initializeLanguage: initAdmin, setLanguage: setAdminLanguage } = useAdminLanguageStore();

  useEffect(() => {
    initLanding();
    initAdmin();

    const syncLanguage = (languageCode) => {
      setLandingLanguage(languageCode);
      setAdminLanguage(languageCode);
    };

    const handleStorageChange = (e) => {
      if (e.key === 'preferredLanguage' && e.newValue) {
        syncLanguage(e.newValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [initLanding, initAdmin, setLandingLanguage, setAdminLanguage]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}