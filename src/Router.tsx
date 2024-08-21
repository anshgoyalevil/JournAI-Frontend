import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';
import NewTripPage from './pages/NewTripPage/NewTripPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/new-trip',
    element: <NewTripPage />,
  },
]);

export function Router() {
  return (
    <>
      <Navbar />
      <RouterProvider router={router} />
      <Footer />
    </>
  );
}
