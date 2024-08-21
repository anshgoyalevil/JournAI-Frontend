import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
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
