import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  const events = [
    {
      id: 1,
      title: "Studio Session",
      date: "15 Novembre",
      artist: "Local Artists",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop"
    },
    {
      id: 2,
      title: "Album Release Party",
      date: "22 Novembre",
      artist: "The Red Sessions",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=500&h=500&fit=crop"
    },
    {
      id: 3,
      title: "Jam Night",
      date: "29 Novembre",
      artist: "Young Talents",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&h=500&fit=crop"
    }
  ]

  const artists = [
    {
      id: 1,
      name: "Artist Name",
      instagram: "@artistname",
      spotify: "@artistname",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Creative Mind",
      instagram: "@creativemind",
      spotify: "@creativemind",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Sound Maker",
      instagram: "@soundmaker",
      spotify: "@soundmaker",
      image: "https://images.unsplash.com/photo-1500578066963-6b3243ce68b7?w=200&h=200&fit=crop"
    },
    {
      id: 4,
      name: "Beat Master",
      instagram: "@beatmaster",
      spotify: "@beatmaster",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=200&h=200&fit=crop"
    }
  ]

  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return
      const { clientX, clientY } = e
      const { width, height } = heroRef.current.getBoundingClientRect()
      const x = (clientX / width) * 100
      const y = (clientY / height) * 100
      heroRef.current.style.setProperty('--mouse-x', `${x}%`)
      heroRef.current.style.setProperty('--mouse-y', `${y}%`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section ref={heroRef} className="hero">
        <div className="hero-content">
          <h1 className="hero-title">The Red Studio</h1>
          <p className="hero-subtitle">Découvrez l'énergie créative et la solidarité artistique</p>
          <Link to="/events" className="cta-button">Explorez</Link>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="events-section">
        <div className="section-container">
          <h2 className="section-title">Prochains Événements</h2>
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                </div>
                <div className="event-info">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-date">{event.date}</p>
                  <p className="event-artist">{event.artist}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all">
            <Link to="/events" className="link-button">Voir tous les événements →</Link>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section id="artists" className="artists-section">
        <div className="section-container">
          <h2 className="section-title">Nos Artistes</h2>
          <div className="artists-grid">
            {artists.map((artist) => (
              <div key={artist.id} className="artist-card">
                <div className="artist-bubble">
                  <img src={artist.image} alt={artist.name} />
                </div>
                <h3 className="artist-name">{artist.name}</h3>
                <div className="artist-socials">
                  <a href={`https://instagram.com/${artist.instagram}`} className="social-link" title="Instagram">
                    <span>{artist.instagram}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="view-all">
            <Link to="/artists" className="link-button">Découvrir tous nos artistes →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
