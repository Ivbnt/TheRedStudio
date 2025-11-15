import { useState } from 'react'
import '../styles/Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-content">
          <h1 className="hero-title">Nous Contacter</h1>
          <p className="hero-subtitle">Rejoignez-nous et faisons de la musique ensemble</p>
        </div>
        <div className="animated-bg">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content">
        <div className="section-container">
          <div className="contact-wrapper">
            {/* Info Cards */}
            <div className="contact-info">
              <div className="info-card">
                <div className="icon-wrapper">
                  <span className="icon">📍</span>
                </div>
                <h3>Adresse</h3>
                <p>123 Rue de la Musique<br />Paris, 75000<br />France</p>
              </div>

              <div className="info-card">
                <div className="icon-wrapper">
                  <span className="icon">📞</span>
                </div>
                <h3>Téléphone</h3>
                <p>+33 1 23 45 67 89<br />Disponible du lundi au vendredi<br />09:00 - 18:00</p>
              </div>

              <div className="info-card">
                <div className="icon-wrapper">
                  <span className="icon">✉️</span>
                </div>
                <h3>Email</h3>
                <p>contact@redstudio.fr<br />info@redstudio.fr<br />bookings@redstudio.fr</p>
              </div>

              <div className="info-card">
                <div className="icon-wrapper">
                  <span className="icon">🌐</span>
                </div>
                <h3>Réseaux Sociaux</h3>
                <div className="social-links">
                  <a href="#" className="social-btn">Instagram</a>
                  <a href="#" className="social-btn">Twitter</a>
                  <a href="#" className="social-btn">LinkedIn</a>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Envoyez-nous un message</h2>

              <div className="form-group">
                <label htmlFor="name">Votre nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Jean Dupont"
                />
                <span className="input-border"></span>
              </div>

              <div className="form-group">
                <label htmlFor="email">Votre email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="jean@example.com"
                />
                <span className="input-border"></span>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Sujet</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez un sujet</option>
                  <option value="booking">Réservation d'artiste</option>
                  <option value="production">Services de production</option>
                  <option value="partnership">Partenariat</option>
                  <option value="event">Événement</option>
                  <option value="other">Autre</option>
                </select>
                <span className="input-border"></span>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  placeholder="Dites-nous en plus..."
                  rows={5}
                ></textarea>
                <span className="input-border"></span>
              </div>

              <button type="submit" className={`submit-btn ${submitted ? 'success' : ''}`}>
                {submitted ? '✓ Message envoyé!' : 'Envoyer'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {submitted && (
        <div className="success-notification">
          <div className="success-content">
            <div className="success-icon">✓</div>
            <h3>Merci pour votre message!</h3>
            <p>Nous vous répondrons dans les plus brefs délais.</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Contact
