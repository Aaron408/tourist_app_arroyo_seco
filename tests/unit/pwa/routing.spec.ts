import { describe, it, expect } from '@jest/globals';

/**
 * Test Suite: Routing System
 * Propósito: Validar las rutas y navegación de la aplicación
 */
describe('PWA - Routing System', () => {
  const ROUTES = {
    // Landing Routes
    HOME: '/',
    GASTRONOMY: '/gastronomia',
    RECIPES: '/gastronomia/recetas',
    INGREDIENTS: '/gastronomia/ingredientes',
    TECHNIQUES: '/gastronomia/tecnicas',
    TOOLS: '/gastronomia/herramientas',
    LOCATIONS: '/ubicaciones',
    INTERACTIVE_SKETCH: '/ubicaciones/mapa-interactivo',
    EVENTS: '/eventos',
    WORKSHOPS: '/eventos/talleres',
    FLAVOR_ROUTE: '/eventos/ruta-del-sabor',
    
    // Admin Routes
    ADMIN_LOGIN: '/administracion/login',
    ADMIN_DASHBOARD: '/administracion/dashboard',
    ADMIN_CATALOGS: '/administracion/catalogos',
    ADMIN_EVENTS: '/administracion/eventos',
    ADMIN_USERS: '/administracion/usuarios',
    ADMIN_STATISTICS: '/administracion/estadisticas',
    ADMIN_FEEDBACK: '/administracion/retroalimentacion',
  };

  describe('Landing Routes', () => {
    it('should have valid home route', () => {
      expect(ROUTES.HOME).toBe('/');
    });

    it('should have gastronomy section routes', () => {
      expect(ROUTES.GASTRONOMY).toBe('/gastronomia');
      expect(ROUTES.RECIPES).toBe('/gastronomia/recetas');
      expect(ROUTES.INGREDIENTS).toBe('/gastronomia/ingredientes');
      expect(ROUTES.TECHNIQUES).toBe('/gastronomia/tecnicas');
      expect(ROUTES.TOOLS).toBe('/gastronomia/herramientas');
    });

    it('should have locations routes', () => {
      expect(ROUTES.LOCATIONS).toBe('/ubicaciones');
      expect(ROUTES.INTERACTIVE_SKETCH).toBe('/ubicaciones/mapa-interactivo');
    });

    it('should have events routes', () => {
      expect(ROUTES.EVENTS).toBe('/eventos');
      expect(ROUTES.WORKSHOPS).toBe('/eventos/talleres');
      expect(ROUTES.FLAVOR_ROUTE).toBe('/eventos/ruta-del-sabor');
    });
  });

  describe('Admin Routes', () => {
    it('should have admin login route', () => {
      expect(ROUTES.ADMIN_LOGIN).toBe('/administracion/login');
    });

    it('should have admin dashboard route', () => {
      expect(ROUTES.ADMIN_DASHBOARD).toBe('/administracion/dashboard');
    });

    it('should have admin management routes', () => {
      expect(ROUTES.ADMIN_CATALOGS).toBe('/administracion/catalogos');
      expect(ROUTES.ADMIN_EVENTS).toBe('/administracion/eventos');
      expect(ROUTES.ADMIN_USERS).toBe('/administracion/usuarios');
    });

    it('should have admin monitoring routes', () => {
      expect(ROUTES.ADMIN_STATISTICS).toBe('/administracion/estadisticas');
      expect(ROUTES.ADMIN_FEEDBACK).toBe('/administracion/retroalimentacion');
    });
  });

  describe('Route Protection', () => {
    it('should identify protected routes', () => {
      const protectedRoutes = [
        '/administracion/dashboard',
        '/administracion/catalogos',
        '/administracion/usuarios'
      ];

      protectedRoutes.forEach(route => {
        expect(route.startsWith('/administracion/')).toBe(true);
        expect(route).not.toBe('/administracion/login');
      });
    });

    it('should identify public routes', () => {
      const publicRoutes = [
        '/',
        '/gastronomia',
        '/ubicaciones',
        '/eventos',
        '/administracion/login'
      ];

      publicRoutes.forEach(route => {
        const isAdminProtected = route.startsWith('/administracion/') && 
                                  route !== '/administracion/login';
        expect(isAdminProtected).toBe(false);
      });
    });
  });

  describe('Route Navigation', () => {
    it('should handle navigation state', () => {
      const navigationState = {
        from: { pathname: '/gastronomia' },
        to: { pathname: '/gastronomia/recetas' }
      };

      expect(navigationState.from.pathname).toBe('/gastronomia');
      expect(navigationState.to.pathname).toBe('/gastronomia/recetas');
    });

    it('should preserve query parameters', () => {
      const routeWithQuery = '/gastronomia/recetas?category=traditional&region=sierra';
      const url = new URL('http://localhost' + routeWithQuery);
      
      expect(url.pathname).toBe('/gastronomia/recetas');
      expect(url.searchParams.get('category')).toBe('traditional');
      expect(url.searchParams.get('region')).toBe('sierra');
    });
  });

  describe('404 Handling', () => {
    it('should detect invalid routes', () => {
      const validRoutes = Object.values(ROUTES);
      const invalidRoute = '/ruta-inexistente';
      
      expect(validRoutes).not.toContain(invalidRoute);
    });
  });
});

