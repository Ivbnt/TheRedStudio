'use client';

import { useState } from 'react';
import './Navbar.css';

type PageType = 'home' | 'events' | 'artists' | 'contact';

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <button 
          onClick={() => handleNavigate('home')} 
          className="nav-logo"
        >
          <img src="/logo.png" alt="The Red Studio" className="logo-image" />
        </button>
        
        {/* Menu Burger Button */}
        <button 
          className={`burger-menu ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Menu */}
        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <button 
              onClick={() => handleNavigate('home')}
              className={currentPage === 'home' ? 'active' : ''}
            >
              Accueil
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigate('events')}
              className={currentPage === 'events' ? 'active' : ''}
            >
              Événements
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigate('artists')}
              className={currentPage === 'artists' ? 'active' : ''}
            >
              Artistes
            </button>
          </li>
          <li>
            <button 
              onClick={() => handleNavigate('contact')}
              className={currentPage === 'contact' ? 'active' : ''}
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
