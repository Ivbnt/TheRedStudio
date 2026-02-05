'use client';

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Events from './pages/Events';
import Artists from './pages/Artists';
import ArtistProfile from './pages/ArtistProfile';
import Contact from './pages/Contact';
import './App.css';

type PageType = 'home' | 'events' | 'artists' | 'contact';
type ExtendedPageType = PageType | 'artist-profile';

function App() {
  const [currentPage, setCurrentPage] = useState<ExtendedPageType>('home');
  const [selectedArtistId, setSelectedArtistId] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleArtistClick = (artistId: number) => {
    setSelectedArtistId(artistId);
    setCurrentPage('artist-profile');
  };

  const handleBackToArtists = () => {
    setCurrentPage('artists');
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
        return <Home onNavigate={(page) => setCurrentPage(page)} />;
      case 'events':
        return <Events />;
      case 'artists':
        return <Artists onArtistClick={handleArtistClick} />;
      case 'artist-profile':
        return selectedArtistId ? (
          <ArtistProfile artistId={selectedArtistId} onBack={handleBackToArtists} />
        ) : (
          <Artists onArtistClick={handleArtistClick} />
        );
      case 'contact':
        return <Contact />;
      default:
        return <Home onNavigate={(page) => setCurrentPage(page)} />;
    }
  };

  return (
    <>
      <Navbar 
        currentPage={currentPage === 'artist-profile' ? 'artists' : currentPage} 
        setCurrentPage={handleNavbarPageChange} 
      />
      <main className="page-content">
        {renderPage()}
      </main>
      
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
