import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Match from './pages/Match/Match';
import Team from './pages/Team/Team';
import Competition from './pages/Competition/Competition';
import Player from './pages/Player/Player';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/match/:matchId" element={<Match />} />
        <Route path="/team/:teamId" element={<Team />} />
        <Route path="/competition/:competitionId" element={<Competition />} />
        <Route path="/player/:playerId" element={<Player />} />
      </Routes>
    </Router>
  );
}

export default App;