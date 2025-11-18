import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Home.css'

function Home() {
  const events = [
    {
      id: 1,
      title: "Red Festival",
      date: "15 mai 2026",
      time: "18:00",
      artist: "Local Artists",
      description: "Festival d'artiste bordelais réunissant divers talents émergents.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=500&fit=crop",
      category: "concert",
      location: "Plaine de Barbanac "
    }
  ]

  const artists = [
    {
      id: 1,
      name: "DN$",
      genre: "Rap",
      image: "https://i.scdn.co/image/ab676161000051746cf3aff7bc9406c188666fbc"
    },
    {
      id: 2,
      name: "Vin's",
      genre: "Indy",
      image: "https://i1.sndcdn.com/avatars-Tb0Ds5cskz6haord-1gs3xQ-t500x500.jpg"
    },
    {
      id: 3,
      name: "Ivane",
      genre: "Pop",
      image: "https://i1.sndcdn.com/avatars-DfzPSVfodvByHfkU-rPvwYg-t500x500.jpg"
    }
  ]

  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

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

  // Animate title letters
  useEffect(() => {
    if (!titleRef.current) return
    
    const title = titleRef.current
    const text = title.textContent || ''
    title.innerHTML = ''
    
    text.split('').forEach((letter, index) => {
      const span = document.createElement('span')
      span.textContent = letter === ' ' ? '\u00A0' : letter
      span.className = 'letter'
      span.style.animationDelay = `${index * 0.06}s`
      title.appendChild(span)
    })
  }, [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section ref={heroRef} className="hero">
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title">The Red Studio</h1>
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
              <Link key={artist.id} to="/artists" onClick={() => window.scrollTo(0, 0)} className="artist-card artist-card-link">
                <div className="artist-bubble">
                  <img src={artist.image} alt={artist.name} />
                </div>
                <h3 className="artist-name">{artist.name}</h3>
                <p className="artist-genre">{artist.genre}</p>
              </Link>
            ))}
          </div>
          <div className="view-all">
            <Link to="/artists" onClick={() => window.scrollTo(0, 0)} className="link-button">Voir plus d'artistes →</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
