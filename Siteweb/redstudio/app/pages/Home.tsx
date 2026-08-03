'use client';
import { useEffect, useRef, useState } from 'react'
import '../styles/Home.css'
import ReleaseCard from '@/app/components/ReleaseCard'
import { fetchAllArtistReleases, type Release } from '@/lib/releaseService'

const allArtists = [
  {
    id: 1,
    name: "DN$",
    genre: "Rap",
    image: "https://i.scdn.co/image/ab676161000051746cf3aff7bc9406c188666fbc",
    spotifyId: "2NrOZEHVA2k9IysdNfaeBT",
    soundcloudUsername: "dns-462860171",
    sheetId: 1
  },
  {
    id: 2,
    name: "Vin's",
    genre: "Indie",
    image: "https://i1.sndcdn.com/avatars-Tb0Ds5cskz6haord-1gs3xQ-t500x500.jpg",
    spotifyId: "",
    soundcloudUsername: "vinsredstudio",
    sheetId: 2
  },
  {
    id: 3,
    name: "Ivane",
    genre: "Pop",
    image: "https://i1.sndcdn.com/avatars-4rkFmW8Vft47Pqpw-LxBGPQ-t500x500.jpg",
    spotifyId: "",
    soundcloudUsername: "user-821023271",
    sheetId: 3
  },
  {
    id: 4,
    name: "Izadora Bezie",
    genre: "Pop",
    image: "https://i1.sndcdn.com/avatars-6VruH1iR86pz5i0t-8YHzgw-t200x200.jpg",
    spotifyId: "",
    soundcloudUsername: "izadora-bezie",
    sheetId: 4
  },
  {
    id: 5,
    name: "RoxasXIII",
    genre: "Rap",
    image: "https://i1.sndcdn.com/visuals-000714548149-AlO3Xv-t2480x520.jpg",
    spotifyId: "0LMXJ8WrZrQq4vKYCIeOKC",
    soundcloudUsername: "roxasxiiiiiiiiiiiii",
    sheetId: 9
  },
  {
    id: 6,
    name: "Arles",
    genre: "Rap",
    image: "/images/artistes/arles1.jpg",
    spotifyId: "4yS7iexox7gowF7CQdjjAD",
    soundcloudUsername: "",
    sheetId: 8
  },
  {
    id: 7,
    name: "101 Mess",
    genre: "Rap",
    image: "https://i1.sndcdn.com/avatars-ZstNFRgwqwSpXu6d-5h5nOg-t500x500.jpg",
    spotifyId: "5gBA2ORDWJZujcSojMLP5c",
    soundcloudUsername: "",
    sheetId: 6
  }
]

interface HomeProps {
  onNavigate?: (page: 'events' | 'artists') => void;
  onArtistClick?: (artistId: number) => void;
}

function Home({ onNavigate, onArtistClick }: HomeProps) {
  const [recentReleases, setRecentReleases] = useState<Release[]>([])
  const [loadingReleases, setLoadingReleases] = useState(true)
  const [displayedArtists, setDisplayedArtists] = useState<typeof allArtists>([])

  const events = [
    {
      id: 3,
      title: "33Mesures",
      date: "17 juillet 2026",
      time: "Soirée",
      artist: "RedStudio × CROUS × Apollo",
      description: "Cypher rap organisé à Bordeaux, en collaboration avec le CROUS de Bordeaux et Apollo.",
      image: "/images/events/33mesures/33mesures_1.jpg",
      category: "session",
      location: "Bordeaux",
      status: 'done' as const
    },
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
      status: 'done' as const
    },
    {
      id: 2,
      title: "Afev'tival",
      date: "22 avril 2026",
      time: "Journée complète",
      artist: "RedStudio × AFEV",
      description: "Festival d'une journée sur le campus Victoire de Bordeaux. Scène ouverte et ambiance sonore assurée par RedStudio.",
      image: "/images/events/afev/RNN_5429.jpg",
      category: "projet",
      location: "Campus Victoire, Bordeaux",
      status: 'done' as const
    }
  ]

  const getEventBadgeLabel = (event: { status?: 'upcoming' | 'done' }) => {
    return event.status === 'done' ? 'Terminé' : 'À venir'
  }

  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const shuffled = [...allArtists].sort(() => Math.random() - 0.5)
    setDisplayedArtists(shuffled.slice(0, 4))
  }, [])

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

        // Fetch releases for each artist
        for (const artist of allArtists) {
          const artistReleases = await fetchAllArtistReleases(
            artist.name,
            artist.spotifyId,
            artist.soundcloudUsername
          )
          allReleases.push(...artistReleases)
        }

        // Sort by date (most recent first) and take top 6
        const sorted = allReleases
          .sort((a, b) => {
            const dateA = new Date(a.releaseDate).getTime()
            const dateB = new Date(b.releaseDate).getTime()
            return dateB - dateA
          })
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
                  <div className="event-badge">{getEventBadgeLabel(event)}</div>
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
            {displayedArtists.map((artist) => (
              <button
                key={artist.id}
                onClick={() => {
                  if (artist.sheetId !== undefined && onArtistClick) {
                    onArtistClick(artist.sheetId)
                  } else {
                    onNavigate?.('artists')
                  }
                }}
                className="artist-card artist-card-link"
                type="button"
              >
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
