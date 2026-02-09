'use client';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import '../styles/Events.css'

interface Artist {
  name: string
  duration: string
  order: number
  hasProfile: boolean
  profileUrl?: string
  externalUrl?: string
}

interface Event {
  id: number
  title: string
  date: string
  time: string
  artist: string
  description: string
  image: string
  category: string
  location: string
  lineup?: Artist[]
  details?: string
}

function Events() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const events: Event[] = [
    {
      id: 1,
      title: "RedCat Concert",
      date: "7 février 2026",
      time: "20h - 22h",
      artist: "V/N S - DNS - BOYO",
      description: "Soirée RedCat avec V/N S, DNS et BOYO au Cerf Volant.",
      image: "/images/events/Vlisse.jpg",
      category: "concert",
      location: "7 Rue du Cerf Volant, 33000 Bordeaux",
      lineup: [
        { name: "Vin's", duration: "Première partie", order: 1, hasProfile: true, externalUrl: "https://soundcloud.com/vinsredstudio" },
        { name: "DN$", duration: "40 minutes", order: 2, hasProfile: true, externalUrl: "https://open.spotify.com/artist/2NrOZEHVA2k9IysdNfaeBT" },
        { name: "BOYO", duration: "40 minutes", order: 3, hasProfile: true, externalUrl: "https://open.spotify.com/intl-fr/artist/4mbwDzM7SLLfCn4af9JGQi?si=aKIW3qJPSViau8CUah9i1w&nd=1&dlsi=e91227430d154e2e" }
      ],
      details: "Une soirée exceptionnelle avec trois artistes talentueux. Vin's ouvrira le bal en première partie, suivi de DN$ pour un set de 40 minutes, et BOYO clôturera la soirée avec 40 minutes de performance."
    }
  ]

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredEvents(events)
    } else {
      setFilteredEvents(events.filter(event => event.category === selectedCategory))
    }
  }, [selectedCategory])

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'session', label: 'Sessions' },
    { id: 'concert', label: 'Concerts' },
    { id: 'workshop', label: 'Ateliers' },
    { id: 'jam', label: 'Jam Night' }
  ]

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
  }

  const closeModal = () => {
    setSelectedEvent(null)
  }

  const handleArtistClick = (artist: Artist) => {
    if (!artist.hasProfile) return

    if (artist.externalUrl) {
      window.open(artist.externalUrl, '_blank', 'noopener,noreferrer')
      return
    }

    if (artist.profileUrl) {
      closeModal()
      router.push(artist.profileUrl)
    }
  }

  return (
    <div className="events-page">
      {/* Filters */}
      <section className="filters-section">
        <div className="section-container">
          <div className="filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="events-list-section">
        <div className="section-container">
          <div className="events-list">
            {filteredEvents.map((event, index) => (
              <div 
                key={event.id} 
                className={`event-card-modern animate-in`} 
                style={{ animationDelay: `${index * 0.1}s`, cursor: 'pointer' }}
                onClick={() => handleEventClick(event)}
              >
                <div className="event-card-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-card-overlay">
                    <span className="event-category">{categories.find(c => c.id === event.category)?.label}</span>
                  </div>
                </div>
                <div className="event-card-content">
                  <div className="event-card-header">
                    <h3 className="event-card-title">{event.title}</h3>
                    <p className="event-card-artist">{event.artist}</p>
                  </div>
                  <p className="event-card-description">{event.description}</p>
                  <div className="event-card-meta">
                    <span className="meta-badge">📅 {event.date}</span>
                    <span className="meta-badge">⏰ {event.time}</span>
                    <span className="meta-badge">📍 {event.location}</span>
                  </div>
                  <button className="reserve-btn-modern" onClick={(e) => { e.stopPropagation(); handleEventClick(event); }}>
                    Voir détails
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>✕</button>
            
            <div className="modal-header">
              <img src={selectedEvent.image} alt={selectedEvent.title} className="modal-image" />
              <div className="modal-header-info">
                <h2>{selectedEvent.title}</h2>
                <div className="modal-meta">
                  <span>📅 {selectedEvent.date}</span>
                  <span>⏰ {selectedEvent.time}</span>
                  <span>📍 {selectedEvent.location}</span>
                </div>
              </div>
            </div>

            <div className="modal-body">
              {selectedEvent.lineup && (
                <div className="lineup-section">
                  <h3>Programmation</h3>
                  <div className="lineup-list">
                    {selectedEvent.lineup
                      .sort((a, b) => a.order - b.order)
                      .map((artist, index) => (
                        <div 
                          key={index} 
                          className={`lineup-item ${artist.hasProfile ? 'clickable' : ''}`}
                          onClick={() => handleArtistClick(artist)}
                        >
                          <div className="lineup-order">{artist.order}</div>
                          <div className="lineup-info">
                            <h4>{artist.name}</h4>
                            <p>{artist.duration}</p>
                          </div>
                          {artist.hasProfile && <span className="lineup-arrow">→</span>}
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {selectedEvent.details && (
                <div className="event-details-section">
                  <h3>Détails</h3>
                  <p>{selectedEvent.details}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Events
