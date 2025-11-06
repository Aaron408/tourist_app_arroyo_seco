import { Suspense, lazy } from 'react';
import { ROUTES } from '../utils/constants';
import LoadingFallback from '../components/LoadingFallback';

// Lazy load legal pages
const PrivacyPolicy = lazy(() => import('../pages/PrivacyPolicy'));
const TermsAndConditions = lazy(() => import('../pages/TermsAndConditions'));

export const commonRoutes = [
  {
    path: ROUTES.POLICY_SPANISH,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PrivacyPolicy />
      </Suspense>
    ),
  },
  {
    path: ROUTES.POLICY_ENGLISH,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <PrivacyPolicy />
      </Suspense>
    ),
  },
  {
    path: ROUTES.TERMS_SPANISH,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <TermsAndConditions />
      </Suspense>
    ),
  },
  {
    path: ROUTES.TERMS_ENGLISH,
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <TermsAndConditions />
      </Suspense>
    ),
  },
];