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
      title: "Red Festival",
      date: "29 mai 2026",
      time: "18:00",
      artist: "Local Artists",
      description: "Festival d'artiste bordelais réunissant divers talents émergents.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop",
      category: "concert",
      location: "Plaine de Barbanac "
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
              <div key={event.id} className={`event-card-modern animate-in`} style={{ animationDelay: `${index * 0.1}s` }}>
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
                  <button className="reserve-btn-modern">A venir</button>
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
