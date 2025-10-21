import { create } from 'zustand';

export const useLanguageStore = create((set) => ({
  currentLanguage: 'es-MX',
  
  supportedLanguages: [
    { code: 'es-MX', name: 'Español (México)' },
    { code: 'en-US', name: 'English (US)' }
  ],
  
  translations: {
    'es-MX': {
      // Navigation
      home: 'Inicio',
      gastronomy: 'Gastronomía',
      locations: 'Ubicaciones',
      events: 'Eventos',
      explore: 'Explorar',
      
      // Home Hero Section
      welcomeMessage: 'Descubre los Sabores de Arroyo Seco',
      heroSubtitle: 'Explora la riqueza gastronómica de la Sierra Gorda. Recetas tradicionales, ingredientes locales y experiencias únicas.',
      exploreGastronomy: 'Explorar Gastronomía',
      viewEvents: 'Ver Eventos',
      
      // Features Section
      whatWeOffer: '¿Qué Ofrecemos?',
      offerDescription: 'Todo lo que necesitas para explorar y disfrutar la cultura gastronómica de Arroyo Seco',
      
      // Features Cards
      gastronomyDesc: 'Descubre recetas tradicionales, ingredientes locales y técnicas culinarias ancestrales de la región.',
      locationsDesc: 'Explora lugares emblemáticos, restaurantes y puntos de interés en un mapa interactivo.',
      eventsDesc: 'Participa en talleres gastronómicos, rutas guiadas y eventos culturales especiales.',
      learnMore: 'Conocer más →',
      
      // Highlights Section
      traditionalRecipes: 'Recetas Tradicionales',
      recipesDescription: 'Aprende a preparar platillos auténticos de Arroyo Seco con ingredientes locales y técnicas transmitidas de generación en generación.',
      step1: 'Recetas paso a paso con imágenes detalladas',
      step2: 'Información sobre ingredientes de temporada',
      step3: 'Técnicas culinarias tradicionales',
      viewRecipes: 'Ver Recetas',
      
      // CTA Section
      ctaTitle: '¿Listo para Explorar?',
      ctaDescription: 'Comienza tu viaje gastronómico por Arroyo Seco hoy mismo',
      viewInteractiveMap: 'Ver Mapa Interactivo',
      
      // Stats Section
      recipes: 'Recetas',
      ingredients: 'Ingredientes',
      places: 'Lugares',
      
      // Footer
      footerDescription: 'Descubre la riqueza gastronómica de Arroyo Seco, Querétaro. Explora recetas tradicionales, ingredientes locales y eventos culturales de la Sierra Gorda.',
      techniques: 'Técnicas',
      restaurants: 'Restaurantes',
      emblematicPlaces: 'Lugares Emblemáticos',
      workshops: 'Talleres',
      guidedTours: 'Rutas Guiadas',
      interactiveMap: 'Mapa Interactivo',
      allRightsReserved: 'Todos los derechos reservados.',
    },
    'en-US': {
      // Navigation
      home: 'Home',
      gastronomy: 'Gastronomy',
      locations: 'Locations',
      events: 'Events',
      explore: 'Explore',
      
      // Home Hero Section
      welcomeMessage: 'Discover the Flavors of Arroyo Seco',
      heroSubtitle: 'Explore the gastronomic richness of Sierra Gorda. Traditional recipes, local ingredients, and unique experiences.',
      exploreGastronomy: 'Explore Gastronomy',
      viewEvents: 'View Events',
      
      // Features Section
      whatWeOffer: 'What We Offer?',
      offerDescription: 'Everything you need to explore and enjoy the gastronomic culture of Arroyo Seco',
      
      // Features Cards
      gastronomyDesc: 'Discover traditional recipes, local ingredients, and ancestral culinary techniques from the region.',
      locationsDesc: 'Explore emblematic places, restaurants, and points of interest on an interactive map.',
      eventsDesc: 'Participate in gastronomic workshops, guided tours, and special cultural events.',
      learnMore: 'Learn more →',
      
      // Highlights Section
      traditionalRecipes: 'Traditional Recipes',
      recipesDescription: 'Learn to prepare authentic dishes from Arroyo Seco with local ingredients and techniques passed down through generations.',
      step1: 'Step-by-step recipes with detailed images',
      step2: 'Information about seasonal ingredients',
      step3: 'Traditional culinary techniques',
      viewRecipes: 'View Recipes',
      
      // CTA Section
      ctaTitle: 'Ready to Explore?',
      ctaDescription: 'Start your gastronomic journey through Arroyo Seco today',
      viewInteractiveMap: 'View Interactive Map',
      
      // Stats Section
      recipes: 'Recipes',
      ingredients: 'Ingredients',
      places: 'Places',
      
      // Footer
      footerDescription: 'Discover the gastronomic richness of Arroyo Seco, Querétaro. Explore traditional recipes, local ingredients and cultural events of the Sierra Gorda.',
      techniques: 'Techniques',
      restaurants: 'Restaurants',
      emblematicPlaces: 'Emblematic Places',
      workshops: 'Workshops',
      guidedTours: 'Guided Tours',
      interactiveMap: 'Interactive Map',
      allRightsReserved: 'All rights reserved.',
    }
  },
  
  setLanguage: (languageCode) => {
    set({ currentLanguage: languageCode });
    localStorage.setItem('preferredLanguage', languageCode);
  },
  
  t: (key) => {
    const state = useLanguageStore.getState();
    return state.translations[state.currentLanguage]?.[key] || key;
  },
  
  initializeLanguage: () => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      set({ currentLanguage: savedLanguage });
    } else {
      const browserLanguage = navigator.language;
      const languageToUse = useLanguageStore.getState().supportedLanguages
        .find(lang => browserLanguage.startsWith(lang.code.split('-')[0]))?.code || 'es-MX';
      
      set({ currentLanguage: languageToUse });
    }
  }
}));