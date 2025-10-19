import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import MainLayout from '../layouts/MainLayout';
import { ROUTES } from '../utils/constants';

//Lazy loading para las páginas
const HomePage = lazy(() => import('../pages/home/Home'));
const LoginPage = lazy(() => import('../pages/login/Login'));
const RegisterPage = lazy(() => import('../pages/register/Register'));
const ExplorePage = lazy(() => import('../pages/explore/Explore'));
const RestaurantsPage = lazy(() => import('../pages/restaurants/Restaurants'));
const RestaurantDetailPage = lazy(() => import('../pages/restaurants/RestaurantDetail'));
const AttractionsPage = lazy(() => import('../pages/attractions/Attractions'));
const AttractionDetailPage = lazy(() => import('../pages/attractions/AttractionDetail'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

//Componente de carga mientras se cargan las rutas
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: (
      <Suspense fallback={<LoadingFallback />}>
        <NotFoundPage />
      </Suspense>
    ),
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.LOGIN,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.REGISTER,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.EXPLORE,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <ExplorePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.RESTAURANTS,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantsPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.RESTAURANT_DETAIL.replace(':id', ':restaurantId'),
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <RestaurantDetailPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ATTRACTIONS,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AttractionsPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ATTRACTION_DETAIL.replace(':id', ':attractionId'),
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <AttractionDetailPage />
          </Suspense>
        ),
      },
    ],
  },
]);

const Navigation = () => {
  return <RouterProvider router={router} />;
};

export default Navigation;
