import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import DebtPage from './pages/DebtPage';
import NetworkPage from './pages/NetworkPage';
import PresidentsPage from './pages/PresidentsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<DebtPage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/presidents" element={<PresidentsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
