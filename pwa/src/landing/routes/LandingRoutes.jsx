import { Suspense, lazy } from 'react';
import LandingLayout from '../layouts/LandingLayout';
import { ROUTES } from '../utils/constants';

const HomePage = lazy(() => import('../pages/home/Home.jsx'));
const GastronomyPage = lazy(() => import('../pages/gastronomy/Gastronomy.jsx'));
const RecipesPage = lazy(() => import('../pages/gastronomy/Recipes.jsx'));
const IngredientsPage = lazy(() => import('../pages/gastronomy/Ingredients.jsx'));
const TechniquesPage = lazy(() => import('../pages/gastronomy/Techniques.jsx'));
const ToolsPage = lazy(() => import('../pages/gastronomy/Tools.jsx'));
const LocationsPage = lazy(() => import('../pages/locations/Locations.jsx'));
// const PlacesPage = lazy(() => import('../pages/locations/Places.jsx'));
// const RouteRestaurantsPage = lazy(() => import('../pages/locations/RouteRestaurants.jsx'));
// const PointsOfInterestPage = lazy(() => import('../pages/locations/PointsOfInterest.jsx'));
// const SketchPage = lazy(() => import('../pages/locations/Sketch.jsx'));
// const CategorySearchPage = lazy(() => import('../pages/locations/CategorySearch.jsx'));
// const MapPage = lazy(() => import('../pages/locations/Map.jsx'));
const EventsPage = lazy(() => import('../pages/events/Events.jsx'));
const FlavorRoutePage = lazy(() => import('../pages/events/FlavorRoute.jsx'));
const WorkshopsPage = lazy(() => import('../pages/events/Workshops.jsx'));
const NotFoundPage = lazy(() => import('../pages/NotFound.jsx'));

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
      { path: ROUTES.GASTRONOMY, element: <Suspense fallback={<LoadingFallback />}><GastronomyPage /></Suspense> },
      { path: ROUTES.RECIPES, element: <Suspense fallback={<LoadingFallback />}><RecipesPage /></Suspense> },
      { path: ROUTES.INGREDIENTS, element: <Suspense fallback={<LoadingFallback />}><IngredientsPage /></Suspense> },
      { path: ROUTES.CULINARY_TECHNIQUES, element: <Suspense fallback={<LoadingFallback />}><TechniquesPage /></Suspense> },
      { path: ROUTES.TOOLS, element: <Suspense fallback={<LoadingFallback />}><ToolsPage /></Suspense> },

      // Ubicaciones
      { path: ROUTES.LOCATIONS, element: <Suspense fallback={<LoadingFallback />}><LocationsPage /></Suspense> },
      // { path: ROUTES.EMBLEMATIC_PLACES, element: <Suspense fallback={<LoadingFallback />}><PlacesPage /></Suspense> },
      // { path: ROUTES.ROUTE_RESTAURANTS, element: <Suspense fallback={<LoadingFallback />}><RouteRestaurantsPage /></Suspense> },
      // { path: ROUTES.POINTS_OF_INTEREST, element: <Suspense fallback={<LoadingFallback />}><PointsOfInterestPage /></Suspense> },
      // { path: ROUTES.INTERACTIVE_SKETCH, element: <Suspense fallback={<LoadingFallback />}><SketchPage /></Suspense> },
      // { path: ROUTES.CATEGORY_SEARCH, element: <Suspense fallback={<LoadingFallback />}><CategorySearchPage /></Suspense> },
      // { path: ROUTES.GOOGLE_MAPS_REDIRECT, element: <Suspense fallback={<LoadingFallback />}><MapPage /></Suspense> },

      // Eventos
      { path: ROUTES.EVENTS, element: <Suspense fallback={<LoadingFallback />}><EventsPage /></Suspense> },
      { path: ROUTES.WORKSHOPS, element: <Suspense fallback={<LoadingFallback />}><WorkshopsPage /></Suspense> },
      { path: ROUTES.FLAVOR_ROUTE, element: <Suspense fallback={<LoadingFallback />}><FlavorRoutePage /></Suspense> },

      { path: '*', element: <Suspense fallback={<LoadingFallback />}><NotFoundPage /></Suspense> },
    ],
  },
];