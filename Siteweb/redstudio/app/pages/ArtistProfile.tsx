'use client';
import { useState, useEffect } from 'react'
import '../styles/ArtistProfile.css'
import { fetchAllArtistReleases, type Release } from '@/lib/releaseService'
import ReleaseCard from '@/app/components/ReleaseCard'

interface ArtistProfileProps {
  artistId: number
  onBack: () => void
}

interface Artist {
  id: number
  name: string
  genre: string
  bio: string
  image: string
  instagram: string
  spotify: string
  soundcloud: string
  origin?: string
  collective?: string
  presentation?: string
  project?: string
  lastProject?: string
}

function ArtistProfile({ artistId, onBack }: ArtistProfileProps) {
  const [releases, setReleases] = useState<Release[]>([])
  const [isLoadingReleases, setIsLoadingReleases] = useState(true)

  // Données des artistes (à terme, ceci pourrait venir d'une API)
  const artistsData: Artist[] = [
    {
      id: 1,
      name: "DN$",
      genre: "Rap / Musiques actuelles",
      bio: "",
      image: "https://i.scdn.co/image/ab676161000051746cf3aff7bc9406c188666fbc",
      instagram: "@dns",
      spotify: "2NrOZEHVA2k9IysdNfaeBT",
      soundcloud: "dns-462860171",
      origin: "Originaire de La Réunion, DN$ arrive en métropole en 2024 et s'intègre rapidement à la scène rap bordelaise, où il développe et affirme son identité artistique.",
      collective: "Membre du collectif RedStudio",
      presentation: "DN$ est un jeune rappeur émergent qui développe un univers à la fois technique, revendicateur et introspectif. Son projet artistique repose sur un équilibre assumé entre prise de position, réflexion personnelle et affirmation de soi, offrant une proposition forte et cohérente sur scène.",
      project: 'Le projet DN$ - "BZ TOUT UN LABEL" tel qu\'il est présenté aujourd\'hui constitue son premier projet officiellement structuré et diffusé sur les plateformes de streaming.\n\nCependant, l\'artiste a déjà fait ses preuves en amont sur SoundCloud, où il a construit son identité, affiné son écriture et développé une première audience avant son arrivée sur les plateformes traditionnelles.',
      lastProject: "Son dernier projet, sorti en septembre 2025, marque une étape clé dans son parcours.\n\nCe projet propose un mélange maîtrisé de technicité rap et de discours revendicatif, tout en conservant une dimension égotripe et introspective, reflet de son vécu et de sa place dans la société."
    },
    {
      id: 2,
      name: "Vin's",
      genre: "Indie rock",
      bio: "",
      image: "https://i1.sndcdn.com/avatars-Tb0Ds5cskz6haord-1gs3xQ-t500x500.jpg",
      instagram: "@vins",
      spotify: "",
      soundcloud: "h2lios",
      origin: "",
      collective: "Membre du collectif TheRedStudio",
      presentation: "Vin's est un artiste indie rock, membre du collectif TheRedStudio, qui débute officiellement son projet musical en 2025 après plusieurs années consacrées à la production et à l'accompagnement d'autres artistes. Cette expérience lui permet de développer une approche artistique structurée, centrée sur l'écriture et le sens.\n\nSon projet mêle introspection personnelle et réflexion sur les enjeux contemporains, avec une attention particulière portée aux textes et à leur résonance sociale.",
      project: "En mai 2025, Vin's publie un premier projet introspectif abordant son parcours, ses doutes et les relations humaines. En août 2025, il poursuit cette démarche avec un single consacré à la place de l'individu dans la société et aux normes sociales.\n\nIl travaille actuellement sur un nouveau projet plus engagé, centré sur des problématiques sociétales, tout en conservant une forte dimension introspective et une réflexion personnelle sur l'engagement.",
      lastProject: "L'univers de Vin's se caractérise par une écriture sincère et accessible, questionnant l'identité, les relations humaines et la place de l'individu dans la société, au sein d'une esthétique indie rock sobre et immersive."
    }
  ]

  const artist = artistsData.find(a => a.id === artistId)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const loadReleases = async () => {
      if (!artist) return
      
      setIsLoadingReleases(true)
      try {
        const artistReleases = await fetchAllArtistReleases(
          artist.name,
          artist.spotify,
          artist.soundcloud
        )
        
        const mappedReleases = artistReleases.map((release, idx) => ({
          id: `${artist.id}-${idx}`,
          title: release.title,
          artist: release.artist,
          type: release.type as 'Album' | 'Single',
          image: release.image,
          releaseDate: release.releaseDate,
          url: release.url,
          platform: release.platform as 'Spotify' | 'SoundCloud'
        }))
        
        mappedReleases.sort((a, b) => {
          const dateA = new Date(a.releaseDate).getTime()
          const dateB = new Date(b.releaseDate).getTime()
          return dateB - dateA
        })
        
        setReleases(mappedReleases)
      } catch (error) {
        console.error('Error loading releases:', error)
      } finally {
        setIsLoadingReleases(false)
      }
    }

    loadReleases()
  }, [artist])

  if (!artist) {
    return (
      <div className="artist-profile">
        <div className="section-container">
          <button className="back-button" onClick={onBack}>
            ← Retour aux artistes
          </button>
          <p>Artiste non trouvé</p>
        </div>
      </div>
    )
  }

  return (
    <div className="artist-profile">
      {/* Header avec bouton retour */}
      <div className="profile-header">
        <div className="section-container">
          <button className="back-button" onClick={onBack}>
            ← Retour aux artistes
          </button>
        </div>
      </div>

      {/* Section Hero */}
      <section className="profile-hero">
        <div className="section-container">
          <div className="hero-content">
            <div className="hero-image-container">
              <img src={artist.image} alt={artist.name} className="hero-image" />
              <div className="hero-image-overlay"></div>
            </div>
            <div className="hero-info">
              <h1 className="artist-title">{artist.name}</h1>
              <p className="artist-genre-tag">{artist.genre}</p>
              <div className="artist-social-links-hero">
                {artist.spotify && (
                  <a 
                    href={`https://open.spotify.com/artist/${artist.spotify}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link"
                  >
                    <span className="social-icon">🎵</span>
                    <span className="social-label">Spotify</span>
                  </a>
                )}
                {artist.soundcloud && (
                  <a 
                    href={`https://soundcloud.com/${artist.soundcloud}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="social-link"
                  >
                    <span className="social-icon">☁️</span>
                    <span className="social-label">SoundCloud</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Biographie */}
      <section className="profile-bio-section">
        <div className="section-container">
          <div className="bio-grid">
            {artist.origin && (
              <div className="bio-card">
                <h3 className="bio-card-title">Origine</h3>
                <p className="bio-card-text">{artist.origin}</p>
              </div>
            )}
            
            {artist.collective && (
              <div className="bio-card">
                <h3 className="bio-card-title">Collectif</h3>
                <p className="bio-card-text">{artist.collective}</p>
              </div>
            )}
            
            {artist.presentation && (
              <div className="bio-card full-width">
                <h3 className="bio-card-title">Présentation artistique</h3>
                <p className="bio-card-text">{artist.presentation}</p>
              </div>
            )}
            
            {artist.project && (
              <div className="bio-card">
                <h3 className="bio-card-title">Projet et diffusion</h3>
                <p className="bio-card-text" style={{ whiteSpace: 'pre-line' }}>{artist.project}</p>
              </div>
            )}
            
            {artist.lastProject && (
              <div className="bio-card">
                <h3 className="bio-card-title">Dernier projet</h3>
                <p className="bio-card-text" style={{ whiteSpace: 'pre-line' }}>{artist.lastProject}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Section Discographie */}
      <section className="profile-releases-section">
        <div className="section-container">
          <h2 className="section-title">Discographie</h2>
          {isLoadingReleases ? (
            <div className="loading-message">Chargement de la discographie...</div>
          ) : releases.length === 0 ? (
            <div className="loading-message">Aucune sortie disponible pour le moment</div>
          ) : (
            <div className="releases-grid">
              {releases.map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ArtistProfile
