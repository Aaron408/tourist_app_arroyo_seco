import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useLanguageStore } from '../stores/languageStore';
import { useAuthStore } from '../stores/authStore';

const MainLayout = () => {
  const { initializeLanguage } = useLanguageStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    initializeLanguage();
  }, []);

  useEffect(() => {
  }, [isAuthenticated]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default MainLayout;