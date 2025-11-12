import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useLanguageStore } from '../../stores/languageStore';
import { ROUTES } from '../../utils/constants';
import Header from './Header';
import MobileMenu from './MobileMenu';
import Footer from './Footer';

const LandingLayout = () => {
  const { initializeLanguage, currentLanguage, setLanguage, getTranslations } = useLanguageStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  // 🎉 Obtén el objeto completo de traducciones con autocompletado
  const t = getTranslations();

  useEffect(() => {
    initializeLanguage();
  }, [initializeLanguage]);

  useEffect(() => {
    // Prevenir scroll cuando el menú móvil está abierto
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLanguageChange = (languageCode) => {
    setLanguage(languageCode);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenSubmenu(null);
  };

  const toggleSubmenu = (index) => {
    setOpenSubmenu(openSubmenu === index ? null : index);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenSubmenu(null);
  };

  // 🎉 Configuración de menús - AHORA con acceso directo al objeto
  const navigationMenus = [
    {
      title: t.navigation.gastronomy.title,
      route: ROUTES.GASTRONOMY,
      items: [
        { label: t.navigation.gastronomy.title, route: ROUTES.GASTRONOMY, isOverview: true },
        { label: t.navigation.gastronomy.recipes, route: ROUTES.RECIPES },
        { label: t.navigation.gastronomy.ingredients, route: ROUTES.INGREDIENTS },
        { label: t.navigation.gastronomy.techniques, route: ROUTES.CULINARY_TECHNIQUES },
        { label: t.navigation.gastronomy.tools, route: ROUTES.TOOLS },
      ]
    },
    {
      title: t.navigation.locations.title,
      route: ROUTES.LOCATIONS,
      items: [
        { label: t.navigation.locations.title, route: ROUTES.LOCATIONS, isOverview: true },
      ]
    },
    {
      title: t.navigation.events.title,
      route: ROUTES.EVENTS,
      items: [
        { label: t.navigation.events.title, route: ROUTES.EVENTS, isOverview: true },
        { label: t.navigation.events.workshops, route: ROUTES.WORKSHOPS },
        { label: t.navigation.events.flavorRoute, route: ROUTES.FLAVOR_ROUTE },
      ]
    }
  ];

  // Configuración de enlaces del footer
  const footerSections = [
    {
      title: t.navigation.gastronomy.title,
      links: [
        { label: t.common.recipes, route: ROUTES.RECIPES },
        { label: t.common.ingredients, route: ROUTES.INGREDIENTS },
        { label: t.common.techniques, route: ROUTES.CULINARY_TECHNIQUES },
        { label: t.navigation.gastronomy.tools, route: ROUTES.TOOLS },
      ]
    },
    {
      title: t.common.explore,
      links: [
        { label: t.footer.emblematicPlaces, route: ROUTES.EMBLEMATIC_PLACES },
        { label: t.navigation.events.workshops, route: ROUTES.WORKSHOPS },
        { label: t.navigation.events.guidedTours, route: ROUTES.GUIDED_ROUTES },
        { label: t.footer.interactiveMap, route: ROUTES.INTERACTIVE_SKETCH },
      ]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        navigationMenus={navigationMenus}
        currentLanguage={currentLanguage}
        handleLanguageChange={handleLanguageChange}
        t={t}
        closeMobileMenu={closeMobileMenu}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        navigationMenus={navigationMenus}
        openSubmenu={openSubmenu}
        toggleSubmenu={toggleSubmenu}
        currentLanguage={currentLanguage}
        handleLanguageChange={handleLanguageChange}
        t={t}
      />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer footerSections={footerSections} t={t} />
    </div>
  );
};

export default LandingLayout;