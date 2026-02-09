'use client';

import { useEffect } from 'react'
import { getArtistSheetById } from '@/lib/artistSheets'

interface ArtistSheetModalProps {
  artistId: number | null
  onClose: () => void
}

function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export default function ArtistSheetModal({ artistId, onClose }: ArtistSheetModalProps) {
  const artist = artistId ? getArtistSheetById(artistId) : undefined

  useEffect(() => {
    if (!artist) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [artist, onClose])

  if (!artist) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>

        <div className="modal-header">
          <img src={artist.image} alt={artist.name} className="modal-image" />
          <div className="modal-header-info">
            <h2>{artist.name}</h2>
            <div className="modal-meta">
              <span>🎧 {artist.genre}</span>
              {artist.links.map((link) => (
                <a
                  key={link.type}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="artist-link-chip"
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-body">
          {artist.sections.map((section) => (
            <div key={section.title} className="artist-sheet-section">
              <h3>{section.title}</h3>
              {splitParagraphs(section.content).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
