import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import LandingPage from './Pages/LandingPage';
import LiveRacePage from './Pages/LiveRacePage';
import CurrentSeasonPage from './Pages/CurrentSeasonPage';
import PastSeasonsPage from './Pages/PastSeasonsPage';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/liverace" element={<LiveRacePage />} />
        <Route path="/currentseason" element={<CurrentSeasonPage />} />
        <Route path="/pastseasons" element={<PastSeasonsPage />} />
      </Routes>
    </div>
  );
}

export default App;
