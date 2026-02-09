'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ArtistSheetModal from './components/ArtistSheetModal';
import Home from './pages/Home';
import Events from './pages/Events';
import Artists from './pages/Artists';
import Contact from './pages/Contact';
import './App.css';

type PageType = 'home' | 'events' | 'artists' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleArtistClick = (artistId: number) => {
    setSelectedArtistId(artistId);
  };

  const handleCloseArtistSheet = () => {
    setSelectedArtistId(null);
  };

  const handleNavbarPageChange = (page: PageType) => {
    setCurrentPage(page);
    if (page !== 'artists') {
      setSelectedArtistId(null);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={(page) => setCurrentPage(page)} onArtistClick={handleArtistClick} />;
      case 'events':
        return <Events />;
      case 'artists':
        return <Artists onArtistClick={handleArtistClick} />;
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={(page) => setCurrentPage(page)} />;
    }
  };

  return (
    <>
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={handleNavbarPageChange} 
      />
      <main className="page-content">
        {renderPage()}
      </main>

      <ArtistSheetModal artistId={selectedArtistId} onClose={handleCloseArtistSheet} />
      
      <footer className="footer">
        <div className="section-container">
          <p>&copy; 2025 The Red Studio. Tous droits réservés.</p>
          <div className="footer-links">
            <a href="https://instagram.com/theredstudio.asso/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <button onClick={() => setCurrentPage('contact')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit', textDecoration: 'underline' }}>Contact</button>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
