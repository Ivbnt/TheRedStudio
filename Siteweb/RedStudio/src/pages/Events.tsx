import { useState, useEffect } from 'react'
import '../styles/Events.css'

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
}

function Events() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])

  const events: Event[] = [
    {
      id: 1,
      title: "Studio Session",
      date: "15 Novembre",
      time: "19:00",
      artist: "Local Artists",
      description: "Une soirée intimiste pour découvrir les nouveaux talents du studio.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop",
      category: "session",
      location: "Studio Principal"
    },
    {
      id: 2,
      title: "Album Release Party",
      date: "22 Novembre",
      time: "20:00",
      artist: "The Red Sessions",
      description: "Célébrez la sortie du nouvel album en live avec performances exclusives.",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=800&h=500&fit=crop",
      category: "release",
      location: "The Red Studio"
    },
    {
      id: 3,
      title: "Jam Night",
      date: "29 Novembre",
      time: "21:00",
      artist: "Young Talents",
      description: "Jam session collaborative pour jeunes musiciens. Viens jouer avec nous!",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&h=500&fit=crop",
      category: "jam",
      location: "Salle Jam"
    },
    {
      id: 4,
      title: "Production Workshop",
      date: "01 Décembre",
      time: "15:00",
      artist: "Sound Engineers",
      description: "Apprenez les secrets de la production musicale moderne.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
      category: "workshop",
      location: "Studio 2"
    },
    {
      id: 5,
      title: "Live Concert",
      date: "08 Décembre",
      time: "20:30",
      artist: "Red Studio Collective",
      description: "Concert live d'ensemble avec tous nos artistes phares.",
      image: "https://images.unsplash.com/photo-1500578066963-6b3243ce68b7?w=800&h=500&fit=crop",
      category: "concert",
      location: "Main Hall"
    },
    {
      id: 6,
      title: "Networking Event",
      date: "15 Décembre",
      time: "18:00",
      artist: "Industry Professionals",
      description: "Rencontrez producteurs, managers et autres professionnels du secteur.",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&h=500&fit=crop",
      category: "networking",
      location: "VIP Lounge"
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
    { id: 'jam', label: 'Jam Night' },
    { id: 'release', label: 'Sorties' },
    { id: 'networking', label: 'Networking' }
  ]

  return (
    <div className="events-page">
      {/* Hero */}
      <section className="events-hero">
        <div className="hero-content">
          <h1 className="hero-title">Nos Événements</h1>
          <p className="hero-subtitle">Découvrez une programmation riche et variée</p>
        </div>
        <div className="floating-elements">
          <div className="float float-1"></div>
          <div className="float float-2"></div>
          <div className="float float-3"></div>
        </div>
      </section>

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
              <div key={event.id} className={`event-item animate-in`} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="event-image-large">
                  <img src={event.image} alt={event.title} />
                  <div className="event-overlay"></div>
                </div>
                <div className="event-details">
                  <div className="event-header">
                    <h3 className="event-large-title">{event.title}</h3>
                    <span className="event-category">{categories.find(c => c.id === event.category)?.label}</span>
                  </div>
                  <p className="event-description">{event.description}</p>
                  <div className="event-meta">
                    <div className="meta-item">
                      <span className="meta-label">📅 Date</span>
                      <span className="meta-value">{event.date}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">⏰ Heure</span>
                      <span className="meta-value">{event.time}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">🎤 Artiste</span>
                      <span className="meta-value">{event.artist}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">📍 Lieu</span>
                      <span className="meta-value">{event.location}</span>
                    </div>
                  </div>
                  <button className="reserve-btn">Réserver maintenant</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Events
