import { Suspense, lazy } from 'react';
import LandingLayout from '../layouts/LandingLayout';
import { ROUTES } from '../utils/constants';

const HomePage = lazy(() => import('../pages/home/Home'));
const GastronomiaPage = lazy(() => import('../pages/gastronomia/Gastronomia.jsx'));
const RecetasPage = lazy(() => import('../pages/gastronomia/Recetas'));
const IngredientesPage = lazy(() => import('../pages/gastronomia/Ingredientes'));
const TecnicasPage = lazy(() => import('../pages/gastronomia/Tecnicas'));
const HerramientasPage = lazy(() => import('../pages/gastronomia/Herramientas'));
const RestaurantesPage = lazy(() => import('../pages/gastronomia/Restaurantes'));
const UbicacionesPage = lazy(() => import('../pages/ubicaciones/Ubicaciones'));
const LugaresPage = lazy(() => import('../pages/ubicaciones/Lugares'));
const RestaurantesRutaPage = lazy(() => import('../pages/ubicaciones/RestaurantesRuta'));
const PuntosInteresPage = lazy(() => import('../pages/ubicaciones/PuntosInteres'));
const CroquisPage = lazy(() => import('../pages/ubicaciones/Croquis'));
const BusquedaCategoriaPage = lazy(() => import('../pages/ubicaciones/BusquedaCategoria'));
const MapaPage = lazy(() => import('../pages/ubicaciones/Mapa'));
const EventosPage = lazy(() => import('../pages/eventos/Eventos'));
const TalleresPage = lazy(() => import('../pages/eventos/Talleres'));
const RutasPage = lazy(() => import('../pages/eventos/Rutas'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export const landingRoutes = [
  {
    path: '/',
    element: <LandingLayout />,
    errorElement: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
    children: [
      { path: ROUTES.HOME, element: <Suspense fallback={<LoadingFallback />}><HomePage /></Suspense> },

      // Gastronomía
      { path: ROUTES.GASTRONOMIA, element: <Suspense fallback={<LoadingFallback />}><GastronomiaPage /></Suspense> },
      { path: ROUTES.RECETAS, element: <Suspense fallback={<LoadingFallback />}><RecetasPage /></Suspense> },
      { path: ROUTES.INGREDIENTES, element: <Suspense fallback={<LoadingFallback />}><IngredientesPage /></Suspense> },
      { path: ROUTES.TECNICAS_CULINARIAS, element: <Suspense fallback={<LoadingFallback />}><TecnicasPage /></Suspense> },
      { path: ROUTES.HERRAMIENTAS, element: <Suspense fallback={<LoadingFallback />}><HerramientasPage /></Suspense> },
      { path: ROUTES.RESTAURANTES_REFERENCIA, element: <Suspense fallback={<LoadingFallback />}><RestaurantesPage /></Suspense> },

      // Ubicaciones
      { path: ROUTES.UBICACIONES, element: <Suspense fallback={<LoadingFallback />}><UbicacionesPage /></Suspense> },
      { path: ROUTES.LUGARES_EMBLEMATICOS, element: <Suspense fallback={<LoadingFallback />}><LugaresPage /></Suspense> },
      { path: ROUTES.RESTAURANTES_RUTA, element: <Suspense fallback={<LoadingFallback />}><RestaurantesRutaPage /></Suspense> },
      { path: ROUTES.PUNTOS_INTERES, element: <Suspense fallback={<LoadingFallback />}><PuntosInteresPage /></Suspense> },
      { path: ROUTES.CROQUIS_INTERACTIVO, element: <Suspense fallback={<LoadingFallback />}><CroquisPage /></Suspense> },
      { path: ROUTES.BUSQUEDA_CATEGORIA, element: <Suspense fallback={<LoadingFallback />}><BusquedaCategoriaPage /></Suspense> },
      { path: ROUTES.GOOGLE_MAPS_REDIRECT, element: <Suspense fallback={<LoadingFallback />}><MapaPage /></Suspense> },

      // Eventos
      { path: ROUTES.EVENTOS, element: <Suspense fallback={<LoadingFallback />}><EventosPage /></Suspense> },
      { path: ROUTES.TALLERES, element: <Suspense fallback={<LoadingFallback />}><TalleresPage /></Suspense> },
      { path: ROUTES.RUTAS_GUIADAS, element: <Suspense fallback={<LoadingFallback />}><RutasPage /></Suspense> },

      { path: '*', element: <Suspense fallback={<LoadingFallback />}><NotFoundPage /></Suspense> },
    ],
  },
];
