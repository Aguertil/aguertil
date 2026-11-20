import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Masthead from './components/Masthead';
import Footer from './components/Footer';
import DebtPage from './pages/DebtPage';
import NetworkPage from './pages/NetworkPage';
import PresidentsPage from './pages/PresidentsPage';
import PromisesPage from './pages/PromisesPage';
import PoliticalLinksPage from './pages/PoliticalLinksPage';
import BlogPage from './pages/BlogPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';

function RetourEnHaut() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <RetourEnHaut />
      <Masthead />
      <main id="contenu" className="page">
        <Routes>
          <Route path="/" element={<DebtPage />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/presidents" element={<PresidentsPage />} />
          <Route path="/promises" element={<PromisesPage />} />
          <Route path="/political-links" element={<PoliticalLinksPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
