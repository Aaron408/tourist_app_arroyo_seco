// src/admin/routes/AdminRoutes.jsx
import { Suspense, lazy } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { ROUTES } from '../utils/constants';

const DashboardPage = lazy(() => import('../pages/Dashboard'));
const CatalogosPage = lazy(() => import('../pages/catalogos/Catalogos'));
const RecetasPage = lazy(() => import('../pages/catalogos/Recetas'));
const IngredientesPage = lazy(() => import('../pages/catalogos/Ingredientes'));
const TecnicasPage = lazy(() => import('../pages/catalogos/Tecnicas'));
const HerramientasPage = lazy(() => import('../pages/catalogos/Herramientas'));
const UbicacionesPage = lazy(() => import('../pages/catalogos/Ubicaciones'));
const EventosPage = lazy(() => import('../pages/eventos/Eventos'));
const TalleresPage = lazy(() => import('../pages/eventos/Talleres'));
const RutasPage = lazy(() => import('../pages/eventos/Rutas'));
const TraduccionesPage = lazy(() => import('../pages/Traducciones'));
const FeedbackPage = lazy(() => import('../pages/Feedback'));
const UsuariosPage = lazy(() => import('../pages/Usuarios'));
const EstadisticasPage = lazy(() => import('../pages/Estadisticas'));
const LoginPage = lazy(() => import('../pages/login/Login'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-gradient-to-br from-amber-50 to-orange-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Cargando...</p>
    </div>
  </div>
);

export const adminRoutes = [
  {
    path: '/administracion',
    children: [
      // Login NO protegido - fuera del ProtectedRoute
      { 
        path: ROUTES.LOGIN, 
        element: <Suspense fallback={<LoadingFallback />}><LoginPage /></Suspense> 
      },

      // Todas las demás rutas SÍ protegidas
      {
        path: '',
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        errorElement: <Suspense fallback={<LoadingFallback />}><NotFoundPage /></Suspense>,
        children: [
          { 
            index: true, 
            element: <Suspense fallback={<LoadingFallback />}><DashboardPage /></Suspense> 
          },
          { 
            path: ROUTES.DASHBOARD, 
            element: <Suspense fallback={<LoadingFallback />}><DashboardPage /></Suspense> 
          },

          // Catálogos
          { 
            path: ROUTES.ADMIN_CATALOGOS, 
            element: <Suspense fallback={<LoadingFallback />}><CatalogosPage /></Suspense> 
          },
          { 
            path: ROUTES.ADMIN_RECETAS, 
            element: <Suspense fallback={<LoadingFallback />}><RecetasPage /></Suspense> 
          },
          { 
            path: ROUTES.ADMIN_INGREDIENTES, 
            element: <Suspense fallback={<LoadingFallback />}><IngredientesPage /></Suspense> 
          },
          { 
            path: ROUTES.ADMIN_TECNICAS, 
            element: <Suspense fallback={<LoadingFallback />}><TecnicasPage /></Suspense> 
          },
          { 
            path: ROUTES.ADMIN_HERRAMIENTAS, 
            element: <Suspense fallback={<LoadingFallback />}><HerramientasPage /></Suspense> 
          },
          { 
            path: ROUTES.ADMIN_UBICACIONES, 
            element: <Suspense fallback={<LoadingFallback />}><UbicacionesPage /></Suspense> 
          },

          // Eventos
          { 
            path: ROUTES.ADMIN_EVENTOS, 
            element: <Suspense fallback={<LoadingFallback />}><EventosPage /></Suspense> 
          },
          { 
            path: ROUTES.ADMIN_TALLERES, 
            element: <Suspense fallback={<LoadingFallback />}><TalleresPage /></Suspense> 
          },
          { 
            path: ROUTES.ADMIN_RUTAS, 
            element: <Suspense fallback={<LoadingFallback />}><RutasPage /></Suspense> 
          },

          // Otros
          { 
            path: ROUTES.ADMIN_TRADUCCIONES, 
            element: <Suspense fallback={<LoadingFallback />}><TraduccionesPage /></Suspense> 
          },
          { 
            path: ROUTES.ADMIN_FEEDBACK, 
            element: <Suspense fallback={<LoadingFallback />}><FeedbackPage /></Suspense> 
          },
          { 
            path: ROUTES.ADMIN_USUARIOS, 
            element: <Suspense fallback={<LoadingFallback />}><UsuariosPage /></Suspense> 
          },
          { 
            path: ROUTES.ADMIN_MONITOREO, 
            element: <Suspense fallback={<LoadingFallback />}><EstadisticasPage /></Suspense> 
          },

          { 
            path: '*', 
            element: <Suspense fallback={<LoadingFallback />}><NotFoundPage /></Suspense> 
          },
        ],
      },
    ],
  },
];