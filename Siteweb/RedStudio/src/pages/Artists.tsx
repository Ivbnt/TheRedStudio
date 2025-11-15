import { useState } from 'react'
import '../styles/Artists.css'

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

  const artists: Artist[] = [
    {
      id: 1,
      name: "Luna Noire",
      genre: "Électronique",
      bio: "Productrice et DJ basée à Paris, Luna crée des univers sonores hypnotisants.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
      instagram: "@lunanoire",
      spotify: "Luna Noire",
      soundcloud: "lunanoire"
    },
    {
      id: 2,
      name: "Marcus Flow",
      genre: "Hip-Hop",
      bio: "Rappeur et producteur avec un style urbain authentique et poétique.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      instagram: "@marcusflow",
      spotify: "Marcus Flow",
      soundcloud: "marcusflow"
    },
    {
      id: 3,
      name: "Sophie Melodies",
      genre: "Pop",
      bio: "Chanteuse-compositrice avec des mélodies qui captivent et émeuvent.",
      image: "https://images.unsplash.com/photo-1500578066963-6b3243ce68b7?w=300&h=300&fit=crop",
      instagram: "@sophiemelodies",
      spotify: "Sophie Melodies",
      soundcloud: "sophiemelodies"
    },
    {
      id: 4,
      name: "Alex Jazz Trio",
      genre: "Jazz",
      bio: "Formation de trois musiciens expérimentés explorant les territoires du jazz.",
      image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&h=300&fit=crop",
      instagram: "@alexjazztrio",
      spotify: "Alex Jazz Trio",
      soundcloud: "alexjazztrio"
    },
    {
      id: 5,
      name: "Indigo Beats",
      genre: "Électronique",
      bio: "Créateur de beats minimalistes avec une approche expérimentale du son.",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      instagram: "@indigobeats",
      spotify: "Indigo Beats",
      soundcloud: "indigobeats"
    },
    {
      id: 6,
      name: "Rosa Soul",
      genre: "Soul",
      bio: "Vocaliste soul puissante, elle livre des performances chargées d'émotion.",
      image: "https://images.unsplash.com/photo-1511379938547-c1f69b13d835?w=300&h=300&fit=crop",
      instagram: "@rosasoul",
      spotify: "Rosa Soul",
      soundcloud: "rosasoul"
    },
    {
      id: 7,
      name: "Tom Folk",
      genre: "Folk",
      bio: "Musicien folk avec une approche contemporaine et introspective.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&h=300&fit=crop",
      instagram: "@tomfolk",
      spotify: "Tom Folk",
      soundcloud: "tomfolk"
    },
    {
      id: 8,
      name: "Kayla Reggae",
      genre: "Reggae",
      bio: "Artiste reggae apportant des messages d'amour et de paix universels.",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      instagram: "@kaylarreggae",
      spotify: "Kayla Reggae",
      soundcloud: "kaylarreggae"
    }
  ]

  const genres = ['Tous', 'Électronique', 'Hip-Hop', 'Pop', 'Jazz', 'Soul', 'Folk', 'Reggae']

  const filteredArtists = selectedGenre === 'all' || selectedGenre === 'Tous'
    ? artists
    : artists.filter(artist => artist.genre === selectedGenre)

  return (
    <div className="artists-page">
      {/* Hero Section */}
      <section className="artists-hero">
        <div className="hero-content">
          <h1 className="hero-title">Nos Artistes</h1>
          <p className="hero-subtitle">Découvrez les talents qui font vibrer The Red Studio</p>
        </div>
        <div className="animated-gradient"></div>
      </section>

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
          <div className="artists-showcase">
            {filteredArtists.map((artist, index) => (
              <div
                key={artist.id}
                className="artist-showcase-card"
                onMouseEnter={() => setHoveredId(artist.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="card-inner">
                  {/* Front */}
                  <div className="card-front">
                    <img src={artist.image} alt={artist.name} />
                    <div className="overlay-effect"></div>
                    <div className="genre-badge">{artist.genre}</div>
                  </div>

                  {/* Back */}
                  <div className={`card-back ${hoveredId === artist.id ? 'visible' : ''}`}>
                    <div className="back-content">
                      <h3>{artist.name}</h3>
                      <p>{artist.bio}</p>
                      <div className="artist-links">
                        <a href={`https://instagram.com/${artist.instagram}`} target="_blank" rel="noopener noreferrer" className="link-icon">
                          <span>📱</span>
                        </a>
                        <a href={`https://open.spotify.com/search/${artist.spotify}`} target="_blank" rel="noopener noreferrer" className="link-icon">
                          <span>🎵</span>
                        </a>
                        <a href={`https://soundcloud.com/${artist.soundcloud}`} target="_blank" rel="noopener noreferrer" className="link-icon">
                          <span>☁️</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated border */}
                <div className="card-border"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="featured-artists">
        <div className="section-container">
          <h2 className="section-title">À Découvrir</h2>
          <div className="featured-grid">
            {artists.slice(0, 3).map((artist) => (
              <div key={artist.id} className="featured-card">
                <div className="featured-image">
                  <img src={artist.image} alt={artist.name} />
                  <div className="featured-overlay">
                    <button className="play-btn">▶</button>
                  </div>
                </div>
                <h3>{artist.name}</h3>
                <p>{artist.genre}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Artists
