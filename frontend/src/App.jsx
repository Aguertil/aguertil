import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import DebtPage from './pages/DebtPage';
import NetworkPage from './pages/NetworkPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<DebtPage />} />
          <Route path="/network" element={<NetworkPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
