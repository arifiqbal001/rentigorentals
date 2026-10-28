import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

// Lazy load page components to prevent circular imports
const HomePage = lazy(() => import('@/components/pages/HomePage'));
const FleetPage = lazy(() => import('@/components/pages/FleetPage'));
const VehicleDetailPage = lazy(() => import('@/components/pages/VehicleDetailPage'));
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
const ContactPage = lazy(() => import('@/components/pages/ContactPage'));
const BookingPage = lazy(() => import('@/components/pages/BookingPage'));
const ThankYouPage = lazy(() => import('@/components/pages/ThankYouPage'));

// Layout component that includes ScrollToTop
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
        <Outlet />
      </Suspense>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "fleet",
        element: <FleetPage />,
      },
      {
        path: "fleet/:slug",
        element: <VehicleDetailPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "book-now",
        element: <BookingPage />,
      },
      {
        path: "thank-you",
        element: <ThankYouPage />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
