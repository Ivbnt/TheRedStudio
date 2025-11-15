import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Events from './pages/Events'
import Artists from './pages/Artists'
import Contact from './pages/Contact'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/artists" element={<Artists />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      
      {/* Footer */}
      <footer className="footer">
        <div className="section-container">
          <p>&copy; 2025 The Red Studio. Tous droits réservés.</p>
          <div className="footer-links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    </Router>
  )
}

export default App
