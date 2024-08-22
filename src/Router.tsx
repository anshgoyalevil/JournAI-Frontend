import { Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import Footer from './components/Footer/Footer';
import NewTripPage from './pages/NewTripPage/NewTripPage';
import AllTripsPage from './pages/AllTripsPage/AllTripsPage';

export function Router() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route index element={<LandingPage />} />
        <Route path="new-trip" element={<NewTripPage />} />
        <Route path="my-trips" element={<AllTripsPage />} />
      </Routes>
      <Footer />
    </>
  );
}
