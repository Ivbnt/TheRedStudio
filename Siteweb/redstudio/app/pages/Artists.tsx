'use client';
import { useState, useEffect } from 'react'
import '../styles/Artists.css'
import { fetchAllArtistReleases, type Release } from '@/lib/releaseService'
import ReleaseCard from '@/app/components/ReleaseCard'

interface Artist {
  id: number
  name: string
  genre: string
  bio: string
  image: string
  instagram: string
  spotify: string
  soundcloud: string
}

function Artists() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [recentReleases, setRecentReleases] = useState<Release[]>([])
  const [isLoadingReleases, setIsLoadingReleases] = useState(true)

  const artists: Artist[] = [
    {
      id: 1,
      name: "DN$",
      genre: "Rap",
      bio: "",
      image: "https://i.scdn.co/image/ab676161000051746cf3aff7bc9406c188666fbc",
      instagram: "@dns",
      spotify: "2NrOZEHVA2k9IysdNfaeBT",
      soundcloud: "dns-462860171"
    },
    {
      id: 2,
      name: "Vin's",
      genre: "Indie",
      bio: "",
      image: "https://i1.sndcdn.com/avatars-Tb0Ds5cskz6haord-1gs3xQ-t500x500.jpg",
      instagram: "@vins",
      spotify: "",
      soundcloud: "h2lios"
    },
    {
      id: 3,
      name: "Ivane",
      genre: "Pop",
      bio: "Do for love.",
      image: "https://i1.sndcdn.com/avatars-4rkFmW8Vft47Pqpw-LxBGPQ-t500x500.jpg",
      instagram: "@ivane",
      spotify: "",
      soundcloud: "user-821023271"
    },
    {
      id: 4,
      name: "Izadora Bezie",
      genre: "Pop",
      bio: "",
      image: "https://i1.sndcdn.com/avatars-000589148493-7eh83t-t500x500.jpg",
      instagram: "@izadorabezie",
      spotify: "",
      soundcloud: "izadora-bezie"
    }
  ]

  const genres = ['Tous', 'Rap', 'Pop', 'Indie']

  // Load releases from all artists on component mount
  useEffect(() => {
    const loadReleases = async () => {
      setIsLoadingReleases(true)
      try {
        const allReleases: Release[] = []
        
        // Fetch releases for each artist
        for (const artist of artists) {
          const artistReleases = await fetchAllArtistReleases(
            artist.name,
            artist.spotify,
            artist.soundcloud
          )
          
          // Map the fetched releases to our Release interface
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
          
          allReleases.push(...mappedReleases)
        }
        
        // Sort by date (newest first) and take top 6
        allReleases.sort((a, b) => {
          // Parse dates - try to extract year first
          const getYear = (dateStr: string) => {
            const yearMatch = dateStr.match(/20\d{2}/)
            return yearMatch ? parseInt(yearMatch[0]) : 0
          }
          return getYear(b.releaseDate) - getYear(a.releaseDate)
        })
        
        setRecentReleases(allReleases.slice(0, 6))
      } catch (error) {
        console.error('Error loading releases:', error)
        // Keep the empty state if there's an error
      } finally {
        setIsLoadingReleases(false)
      }
    }

    loadReleases()
  }, [])  // Empty dependency array means this runs once on mount

  const filteredArtists = selectedGenre === 'all' || selectedGenre === 'Tous'
    ? artists
    : artists.filter(artist => artist.genre === selectedGenre)

  return (
    <div className="artists-page">
      {/* Genre Filter */}
      <section className="genre-filter-section">
        <div className="section-container">
          <div className="genre-buttons">
            {genres.map(genre => (
              <button
                key={genre}
                className={`genre-btn ${selectedGenre === genre || (selectedGenre === 'all' && genre === 'Tous') ? 'active' : ''}`}
                onClick={() => setSelectedGenre(genre === 'Tous' ? 'all' : genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="artists-grid-section">
        <div className="section-container">
          <div className="artists-circles-grid">
            {filteredArtists.map((artist, index) => (
              <div key={artist.id} className="artist-circle-container">
                <div className="artist-circle">
                  <img src={artist.image} alt={artist.name} />
                  <div className="circle-overlay"></div>
                </div>
                <h3 className="artist-name">{artist.name}</h3>
                <p className="artist-genre">{artist.genre}</p>
                <div className="artist-social-links">
                  {artist.spotify && (
                    <a href={`https://open.spotify.com/artist/${artist.spotify}`} target="_blank" rel="noopener noreferrer" className="social-icon">
                      🎵
                    </a>
                  )}
                  <a href={`https://soundcloud.com/${artist.soundcloud}`} target="_blank" rel="noopener noreferrer" className="social-icon">
                    ☁️
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Releases Section */}
      <section className="featured-artists">
        <div className="section-container">
          <h2 className="section-title">Sorties Récentes</h2>
          {isLoadingReleases ? (
            <div className="loading-message">Chargement des sorties...</div>
          ) : recentReleases.length === 0 ? (
            <div className="loading-message">Aucune sortie disponible pour le moment</div>
          ) : (
            <div className="featured-grid">
              {recentReleases.map((release) => (
                <ReleaseCard key={release.id} release={release} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Artists
