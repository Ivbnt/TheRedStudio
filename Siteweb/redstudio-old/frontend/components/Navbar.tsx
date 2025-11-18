import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="The Red Studio" className="logo-image" />
        </Link>
        <ul className="nav-menu">
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/events">Événements</Link></li>
          <li><Link to="/artists">Artistes</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
