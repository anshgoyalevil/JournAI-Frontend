import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Notifications } from '@mantine/notifications';
import { theme } from './theme';
import { Navbar } from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import NewTripPage from './pages/NewTripPage/NewTripPage';
import AllTripsPage from './pages/AllTripsPage/AllTripsPage';
import TripPage from './pages/TripPage/TripPage';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <BrowserRouter>
      <MantineProvider theme={theme}>
        <Notifications />
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route index element={<LandingPage />} />
          <Route path="new-trip" element={<NewTripPage />} />
          <Route path="my-trips" element={<AllTripsPage />} />
          <Route path="trip">
            <Route path=":tripId" element={<TripPage />} />
          </Route>
        </Routes>
        <Footer />
      </MantineProvider>
    </BrowserRouter>
  );
}
