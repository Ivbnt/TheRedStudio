'use client';

import './Navbar.css';

type PageType = "home" | "events" | "artists" | "contact";

interface NavbarProps {
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
}

export default function Navbar({ currentPage, setCurrentPage }: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <button onClick={() => setCurrentPage("home")} className="nav-logo">
          <img src="/logo.png" alt="The Red Studio" className="logo-image" />
        </button>
        <ul className="nav-menu">
          <li>
            <button
              onClick={() => setCurrentPage("home")}
              className={currentPage === "home" ? "active" : ""}
            >
              Accueil
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage("events")}
              className={currentPage === "events" ? "active" : ""}
            >
              Événements
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage("artists")}
              className={currentPage === "artists" ? "active" : ""}
            >
              Artistes
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage("contact")}
              className={currentPage === "contact" ? "active" : ""}
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
