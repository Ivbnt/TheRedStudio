'use client';
import { useEffect, useRef, useState } from 'react'
import '../styles/Home.css'
import ReleaseCard from '@/app/components/ReleaseCard'

interface HomeProps {
  onNavigate?: (page: 'events' | 'artists') => void;
}

interface Release {
  id: string;
  title: string;
  artist: string;
  type: "Album" | "Single" | "Playlist" | "EP";
  image: string;
  releaseDate: string;
  url: string;
  platform: "Spotify" | "SoundCloud";
}

function Home({ onNavigate }: HomeProps) {
  const [recentReleases, setRecentReleases] = useState<Release[]>([])
  const [loadingReleases, setLoadingReleases] = useState(true)

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
      image: "https://i.scdn.co/image/ab676161000051746cf3aff7bc9406c188666fbc",
      spotifyId: "2NrOZEHVA2k9IysdNfaeBT",
      soundcloudUsername: "dns-462860171"
    },
    {
      id: 2,
      name: "Vin's",
      genre: "Indy",
      image: "https://i1.sndcdn.com/avatars-Tb0Ds5cskz6haord-1gs3xQ-t500x500.jpg",
      spotifyId: "",
      soundcloudUsername: "vins-artist"
    },
    {
      id: 3,
      name: "Ivane",
      genre: "Pop",
      image: "https://i1.sndcdn.com/avatars-DfzPSVfodvByHfkU-rPvwYg-t500x500.jpg",
      spotifyId: "",
      soundcloudUsername: "ivane-music"
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

  // Fetch recent releases from all artists
  useEffect(() => {
    const fetchAllReleases = async () => {
      try {
        setLoadingReleases(true)
        const allReleases: Release[] = []

        // Fetch from Spotify and SoundCloud for each artist
        for (const artist of artists) {
          try {
            // Fetch from Spotify
            if (artist.spotifyId) {
              const spotifyRes = await fetch(`/api/releases/spotify?id=${artist.spotifyId}`)
              if (spotifyRes.ok) {
                const spotifyReleases = await spotifyRes.json()
                allReleases.push(...spotifyReleases)
              }
            }

            // Fetch from SoundCloud
            if (artist.soundcloudUsername) {
              const scRes = await fetch(`/api/releases/soundcloud?username=${artist.soundcloudUsername}`)
              if (scRes.ok) {
                const scReleases = await scRes.json()
                allReleases.push(...scReleases)
              }
            }
          } catch (error) {
            console.error(`Error fetching releases for ${artist.name}:`, error)
          }
        }

        // Sort by date (most recent first) and take top 6
        const sorted = allReleases
          .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
          .slice(0, 6)

        setRecentReleases(sorted)
      } catch (error) {
        console.error('Error fetching releases:', error)
      } finally {
        setLoadingReleases(false)
      }
    }

    fetchAllReleases()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section ref={heroRef} className="hero">
        <div className="hero-content">
          <h1 ref={titleRef} className="hero-title">The Red Studio</h1>
          <p className="hero-subtitle">Découvrez l'énergie créative et la solidarité artistique</p>
          <button onClick={() => onNavigate?.('events')} className="cta-button">Explorez</button>
        </div>
      </section>

      {/* Recent Releases Section */}
      <section className="releases-section">
        <div className="section-container">
          <h2 className="section-title">Sorties Récentes</h2>
          {loadingReleases ? (
            <div className="loading-message">Chargement des sorties...</div>
          ) : recentReleases.length > 0 ? (
            <div className="releases-grid">
              {recentReleases.map((release) => (
                <ReleaseCard key={`${release.platform}-${release.id}`} release={release} />
              ))}
            </div>
          ) : (
            <div className="loading-message">Aucune sortie disponible</div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="events-section">
        <div className="section-container">
          <h2 className="section-title">Prochains Événements</h2>
          <div className="events-grid">
            {events.map((event) => (
              <button 
                key={event.id} 
                onClick={() => onNavigate?.('events')}
                className="event-card event-card-button"
              >
                <div className="event-image">
                  <img src={event.image} alt={event.title} />
                  <div className="event-badge">À venir</div>
                </div>
                <div className="event-info">
                  <h3 className="event-title">{event.title}</h3>
                  <p className="event-date">{event.date}</p>
                  <p className="event-artist">{event.artist}</p>
                </div>
              </button>
            ))}
          </div>
          <div className="view-all">
            <button onClick={() => onNavigate?.('events')} className="link-button">Voir tous les événements →</button>
          </div>
        </div>
      </section>

      {/* Artists Section */}
      <section id="artists" className="artists-section">
        <div className="section-container">
          <h2 className="section-title">Nos Artistes</h2>
          <div className="artists-grid">
            {artists.map((artist) => (
              <button key={artist.id} onClick={() => onNavigate?.('artists')} className="artist-card artist-card-link">
                <div className="artist-bubble">
                  <img src={artist.image} alt={artist.name} />
                </div>
                <h3 className="artist-name">{artist.name}</h3>
                <p className="artist-genre">{artist.genre}</p>
              </button>
            ))}
          </div>
          <div className="view-all">
            <button onClick={() => onNavigate?.('artists')} className="link-button">Voir plus d'artistes →</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
