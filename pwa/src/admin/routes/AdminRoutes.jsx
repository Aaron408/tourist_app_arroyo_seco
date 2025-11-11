import { Suspense, lazy } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import { ROUTES } from '../utils/constants';
import LoadingFallback from '../../common/components/LoadingFallback';

const DashboardPage = lazy(() => import('../pages/Dashboard'));

// Gastronomy
const RecipesPage = lazy(() => import('../pages/gastronomy/Recipes'));
const IngredientsPage = lazy(() => import('../pages/gastronomy/Ingredients'));
const TechniquesPage = lazy(() => import('../pages/gastronomy/Techniques'));
const ToolsPage = lazy(() => import('../pages/gastronomy/Tools'));

// Locations
const LocationsPage = lazy(() => import('../pages/locations/Locations'));

// Workshops
const WorkshopsPage = lazy(() => import('../pages/workshops/Workshops'));

// Users
const UsersPage = lazy(() => import('../pages/users/Users'));

// Auth & Error
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
      { path: '', element: (<ProtectedRoute><AdminLayout /></ProtectedRoute>),
        children: [
          { index: true, element: <Suspense fallback={<LoadingFallback />}><DashboardPage /></Suspense> },
          { path: ROUTES.DASHBOARD, element: <Suspense fallback={<LoadingFallback />}><DashboardPage /></Suspense> },

          // Gastronomy
          { path: ROUTES.ADMIN_RECIPES, element: <Suspense fallback={<LoadingFallback />}><RecipesPage /></Suspense> },
          { path: ROUTES.ADMIN_INGREDIENTS, element: <Suspense fallback={<LoadingFallback />}><IngredientsPage /></Suspense> },
          { path: ROUTES.ADMIN_TECHNIQUES, element: <Suspense fallback={<LoadingFallback />}><TechniquesPage /></Suspense> },
          { path: ROUTES.ADMIN_TOOLS, element: <Suspense fallback={<LoadingFallback />}><ToolsPage /></Suspense> },

          // Locations
          { path: ROUTES.ADMIN_LOCATIONS, element: <Suspense fallback={<LoadingFallback />}><LocationsPage /></Suspense> },

          // Workshops
          { path: ROUTES.ADMIN_WORKSHOPS, element: <Suspense fallback={<LoadingFallback />}><WorkshopsPage /></Suspense> },

          // Users
          { path: ROUTES.ADMIN_USERS, element: <Suspense fallback={<LoadingFallback />}><UsersPage /></Suspense> },

          // 404
          { path: '*', element: <Suspense fallback={<LoadingFallback />}><NotFoundPage /></Suspense> },
        ],
      },
    ],
  },
];