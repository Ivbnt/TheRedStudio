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
  sheetId?: number
}

interface Beatmaker {
  id: number
  name: string
  image: string
  instagram: string
  spotify: string
  soundcloud: string
  youtube: string
  sheetId?: number
}

interface ArtistsProps {
  onArtistClick?: (artistId: number) => void
}

function Artists({ onArtistClick }: ArtistsProps = {}) {
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
      soundcloud: "vinsredstudio"
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
      image: "https://i1.sndcdn.com/avatars-6VruH1iR86pz5i0t-8YHzgw-t200x200.jpg",
      instagram: "@izadorabezie",
      spotify: "",
      soundcloud: "izadora-bezie"
    },
    {
      id: 5,
      name: "RoxasXIII",
      genre: "Rap",
      bio: "",
      image: "https://i1.sndcdn.com/visuals-000714548149-AlO3Xv-t2480x520.jpg",
      instagram: "roxas.xill",
      spotify: "0LMXJ8WrZrQq4vKYCIeOKC",
      soundcloud: "roxasxiiiiiiiiiiiii",
      sheetId: 9
    },
    {
      id: 6,
      name: "Arles",
      genre: "Rap",
      bio: "",
      image: "/images/artistes/arles1.jpg",
      instagram: "arlesnelesvoitpas",
      spotify: "4yS7iexox7gowF7CQdjjAD",
      soundcloud: "",
      sheetId: 8
    },
    {
      id: 7,
      name: "101 Mess",
      genre: "Rap",
      bio: "",
      image: "https://i1.sndcdn.com/avatars-ZstNFRgwqwSpXu6d-5h5nOg-t500x500.jpg",
      instagram: "101mess",
      spotify: "5gBA2ORDWJZujcSojMLP5c",
      soundcloud: "",
      sheetId: 6
    }
  ]

  const genres = ['Tous', 'Rap', 'Pop', 'Indie']

  const beatmakers: Beatmaker[] = [
    {
      id: 1,
      name: "KBBY",
      image: "",
      instagram: "kbby.kbabe",
      spotify: "",
      soundcloud: "",
      youtube: "@kbbykbabe"
    },
    {
      id: 2,
      name: "ayozain",
      image: "https://i.scdn.co/image/ab6761610000e5ebbbe73761047b0123da69147b",
      instagram: "ayozain_",
      spotify: "6j5ZRx1CvMaBian5Y0Qi2E",
      soundcloud: "",
      youtube: ""
    },
    {
      id: 3,
      name: "409 Asher",
      image: "",
      instagram: "409asher",
      spotify: "",
      soundcloud: "",
      youtube: "",
      sheetId: 5
    },
    {
      id: 4,
      name: "gapple",
      image: "",
      instagram: "prodgvpple",
      spotify: "",
      soundcloud: "",
      youtube: "@prodgvpple",
      sheetId: 7
    }
  ]

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
          const dateA = new Date(a.releaseDate).getTime()
          const dateB = new Date(b.releaseDate).getTime()
          return dateB - dateA
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
                <div 
                  className="artist-circle"
                  onClick={() => onArtistClick && onArtistClick(artist.sheetId ?? artist.id)}
                  style={{ cursor: onArtistClick ? 'pointer' : 'default' }}
                >
                  {artist.image
                    ? <img src={artist.image} alt={artist.name} />
                    : <div className="artist-circle-placeholder">{artist.name[0]}</div>
                  }
                  <div className="circle-overlay"></div>
                </div>
                <h3 className="artist-name">{artist.name}</h3>
                <p className="artist-genre">{artist.genre}</p>
                <div className="artist-social-links">
                  {artist.spotify && (
                    <a href={`https://open.spotify.com/artist/${artist.spotify}`} target="_blank" rel="noopener noreferrer" className="social-icon" title="Spotify">
                      🎵
                    </a>
                  )}
                  {artist.soundcloud && (
                    <a href={`https://soundcloud.com/${artist.soundcloud}`} target="_blank" rel="noopener noreferrer" className="social-icon" title="SoundCloud">
                      ☁️
                    </a>
                  )}
                  {artist.instagram && (
                    <a href={`https://www.instagram.com/${artist.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
                      📸
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beatmakers / Producers Section */}
      <section className="beatmakers-section">
        <div className="section-container">
          <h2 className="section-title">Producteurs &amp; Beatmakers</h2>
          <div className="artists-circles-grid">
            {beatmakers.map((bm) => (
              <div key={bm.id} className="artist-circle-container">
                <div
                  className="artist-circle"
                  onClick={() => bm.sheetId && onArtistClick && onArtistClick(bm.sheetId)}
                  style={{ cursor: bm.sheetId && onArtistClick ? 'pointer' : 'default' }}
                >
                  {bm.image
                    ? <img src={bm.image} alt={bm.name} />
                    : <div className="artist-circle-placeholder">{bm.name[0]}</div>
                  }
                  <div className="circle-overlay"></div>
                </div>
                <h3 className="artist-name">{bm.name}</h3>
                <p className="artist-genre">Beatmaker</p>
                <div className="artist-social-links">
                  {bm.spotify && (
                    <a href={`https://open.spotify.com/artist/${bm.spotify}`} target="_blank" rel="noopener noreferrer" className="social-icon" title="Spotify">
                      🎵
                    </a>
                  )}
                  {bm.soundcloud && (
                    <a href={`https://soundcloud.com/${bm.soundcloud}`} target="_blank" rel="noopener noreferrer" className="social-icon" title="SoundCloud">
                      ☁️
                    </a>
                  )}
                  {bm.instagram && (
                    <a href={`https://www.instagram.com/${bm.instagram}`} target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram">
                      📸
                    </a>
                  )}
                  {bm.youtube && (
                    <a href={`https://www.youtube.com/${bm.youtube}`} target="_blank" rel="noopener noreferrer" className="social-icon" title="YouTube">
                      📡
                    </a>
                  )}
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
