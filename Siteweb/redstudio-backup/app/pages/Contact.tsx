'use client';
import { useState } from 'react'
import '../styles/Contact.css'

interface ContactProps {
  setCurrentPage?: (page: "home" | "events" | "artists" | "contact") => void;
}

export default function Contact({ setCurrentPage }: ContactProps) {
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
      {/* Contact Content */}
      <section className="contact-content">
        <div className="section-container">
          <div className="contact-header">
            <h1>Restons en Contact</h1>
            <p>Vous avez une question, un projet ou une collaboration en vue? Contactez-nous directement.</p>
          </div>

          <div className="contact-wrapper">
            {/* Quick Links */}
            <div className="contact-info">
              <div className="info-card">
                <div className="icon-wrapper">
                  <span className="icon">✉️</span>
                </div>
                <h3>Email</h3>
                <p>
                  <a href="mailto:contact@redstudio.fr">Theredstudio33@gmail.com</a><br />
                </p>
              </div>

              <div className="info-card">
                <div className="icon-wrapper">
                  <span className="icon">🌐</span>
                </div>
                <h3>Réseaux Sociaux</h3>
                <div className="social-links">
                  <a href="https://www.instagram.com/theredstudio.asso/" target="_blank" rel="noopener noreferrer" className="social-btn">
                    <span className="social-icon">📱</span> Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Form */}
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Votre nom</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
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
                  rows={2}
                ></textarea>
                <span className="input-border"></span>
              </div>

              <button type="submit" className={`submit-btn ${submitted ? 'success' : ''}`}>
                {submitted ? '✓ Message envoyé!' : 'Envoyer le message'}
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

