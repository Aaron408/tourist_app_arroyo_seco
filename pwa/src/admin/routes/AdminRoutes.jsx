import { Suspense, lazy } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { ROUTES } from '../utils/constants';
import LoadingFallback from '../../common/components/LoadingFallback';

const DashboardPage = lazy(() => import('../pages/Dashboard'));
const CatalogsPage = lazy(() => import('../pages/catalogs/Catalogs'));
const RecipesPage = lazy(() => import('../pages/catalogs/Recipes'));
const IngredientsPage = lazy(() => import('../pages/catalogs/Ingredients'));
const TechniquesPage = lazy(() => import('../pages/catalogs/Techniques'));
const ToolsPage = lazy(() => import('../pages/catalogs/Tools'));
const LocationsPage = lazy(() => import('../pages/catalogs/Locations'));
const EventsPage = lazy(() => import('../pages/events/Events'));
const WorkshopsPage = lazy(() => import('../pages/events/Workshops'));
const RoutesPage = lazy(() => import('../pages/events/Routes'));
const TranslationsPage = lazy(() => import('../pages/Translations'));
const FeedbackPage = lazy(() => import('../pages/Feedback'));
const UsersPage = lazy(() => import('../pages/Users'));
const StatisticsPage = lazy(() => import('../pages/Statistics'));
const LoginPage = lazy(() => import('../pages/login/Login'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

export const adminRoutes = [
  {
    path: '/administracion',
    errorElement: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
    children: [
      // Login (no protegido)
      { path: ROUTES.LOGIN, element: <Suspense fallback={<LoadingFallback />}><LoginPage /></Suspense> },

      // Protected routes with AdminLayout
      {
        path: '',
        element: (
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Suspense fallback={<LoadingFallback />}><DashboardPage /></Suspense> },
          { path: ROUTES.DASHBOARD, element: <Suspense fallback={<LoadingFallback />}><DashboardPage /></Suspense> },

          // Catalogs
          { path: ROUTES.ADMIN_CATALOGS, element: <Suspense fallback={<LoadingFallback />}><CatalogsPage /></Suspense> },
          { path: ROUTES.ADMIN_RECIPES, element: <Suspense fallback={<LoadingFallback />}><RecipesPage /></Suspense> },
          { path: ROUTES.ADMIN_INGREDIENTS, element: <Suspense fallback={<LoadingFallback />}><IngredientsPage /></Suspense> },
          { path: ROUTES.ADMIN_TECHNIQUES, element: <Suspense fallback={<LoadingFallback />}><TechniquesPage /></Suspense> },
          { path: ROUTES.ADMIN_TOOLS, element: <Suspense fallback={<LoadingFallback />}><ToolsPage /></Suspense> },
          { path: ROUTES.ADMIN_LOCATIONS, element: <Suspense fallback={<LoadingFallback />}><LocationsPage /></Suspense> },

          // Events
          { path: ROUTES.ADMIN_EVENTS, element: <Suspense fallback={<LoadingFallback />}><EventsPage /></Suspense> },
          { path: ROUTES.ADMIN_WORKSHOPS, element: <Suspense fallback={<LoadingFallback />}><WorkshopsPage /></Suspense> },
          { path: ROUTES.ADMIN_ROUTES, element: <Suspense fallback={<LoadingFallback />}><RoutesPage /></Suspense> },

          // Others
          { path: ROUTES.ADMIN_TRANSLATIONS, element: <Suspense fallback={<LoadingFallback />}><TranslationsPage /></Suspense> },
          { path: ROUTES.ADMIN_FEEDBACK, element: <Suspense fallback={<LoadingFallback />}><FeedbackPage /></Suspense> },
          { path: ROUTES.ADMIN_USERS, element: <Suspense fallback={<LoadingFallback />}><UsersPage /></Suspense> },
          { path: ROUTES.ADMIN_MONITORING, element: <Suspense fallback={<LoadingFallback />}><StatisticsPage /></Suspense> },

          { path: '*', element: <Suspense fallback={<LoadingFallback />}><NotFoundPage /></Suspense> },
        ],
      },
    ],
  },
];
