'use client';

import { useEffect, useId, useState } from 'react';
import './Navbar.css';

type PageType = 'home' | 'events' | 'artists' | 'contact';

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = useId();

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (isMenuOpen) document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMenuOpen]);

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
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <button
          type="button"
          className={`nav-backdrop ${isMenuOpen ? 'active' : ''}`}
          aria-label="Fermer le menu"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Navigation Menu */}
        <ul id={menuId} className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
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
