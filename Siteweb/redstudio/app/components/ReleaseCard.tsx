'use client';

import '../styles/ReleaseCard.css';

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

interface ReleaseCardProps {
  release: Release;
}

export default function ReleaseCard({ release }: ReleaseCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Spotify':
        return '🎵';
      case 'SoundCloud':
        return '☁️';
      default:
        return '♫';
    }
  };

  return (
    <a
      href={release.url}
      target="_blank"
      rel="noopener noreferrer"
      className="release-card-modern"
    >
      <div className="release-card-image-wrapper">
        {release.image ? (
          <img src={release.image} alt={release.title} className="release-card-image" />
        ) : (
          <div className="release-card-placeholder">No Image</div>
        )}
        <div className="release-card-overlay"></div>
        <div className="release-card-play-icon">
          {getPlatformIcon(release.platform)}
        </div>
      </div>

      <div className="release-card-content">
        <div className="release-card-meta">
          <span className={`release-card-platform platform-${release.platform.toLowerCase()}`}>
            {release.platform}
          </span>
          <span className="release-card-type">{release.type}</span>
        </div>

        <h3 className="release-card-title">{release.title}</h3>
        <p className="release-card-artist">{release.artist}</p>
        <p className="release-card-date">{formatDate(release.releaseDate)}</p>
      </div>

      <div className="release-card-shine"></div>
    </a>
  );
}
