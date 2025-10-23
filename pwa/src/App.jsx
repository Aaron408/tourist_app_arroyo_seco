import './App.css';
import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useLanguageStore as useLandingLanguageStore } from './landing/stores/languageStore';
import { useLanguageStore as useAdminLanguageStore } from './admin/stores/languageStore';
import { AuthProvider } from './admin/contexts/AuthContext';

// Import routes
import { landingRoutes } from './landing/routes/LandingRoutes';
import { adminRoutes } from './admin/routes/AdminRoutes';

const router = createBrowserRouter([
  ...landingRoutes,
  ...adminRoutes,
]);

export default function App() {
  const { initializeLanguage: initLanding, setLanguage: setLandingLanguage } = useLandingLanguageStore();
  const { initializeLanguage: initAdmin, setLanguage: setAdminLanguage } = useAdminLanguageStore();

  useEffect(() => {
    // Initialize all language stores
    initLanding();
    initAdmin();

    // Sync language changes across all stores
    const syncLanguage = (languageCode) => {
      setLandingLanguage(languageCode);
      setAdminLanguage(languageCode);
    };

    // Listen for language changes in localStorage
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