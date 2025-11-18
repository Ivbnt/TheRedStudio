/**
 * Release Service - Fetches artist releases from Spotify and SoundCloud
 * Automatically updates when new artists are added
 */

interface SpotifyAlbum {
  id: string
  name: string
  release_date: string
  images: Array<{ url: string }>
  external_urls: { spotify: string }
  album_type: 'album' | 'single' | 'compilation'
}

interface SoundCloudTrack {
  id: number
  title: string
  created_at: string
  artwork_url: string
  permalink_url: string
  kind: string
}

interface FetchedRelease {
  id: string
  title: string
  artist: string
  type: 'Album' | 'Single'
  image: string
  releaseDate: string
  url: string
  platform: 'Spotify' | 'SoundCloud'
}

// Cache for releases to avoid excessive API calls
const releaseCache = new Map<string, { data: FetchedRelease[], timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Fetch releases from Spotify for an artist
 */
export async function fetchSpotifyReleases(artistId: string): Promise<FetchedRelease[]> {
  try {
    // Note: In production, you'd use a backend service with proper OAuth
    // For now, we'll structure this for future implementation
    const cacheKey = `spotify-${artistId}`;
    
    if (releaseCache.has(cacheKey)) {
      const cached = releaseCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
      }
    }

    // This would call your backend endpoint that has Spotify credentials
    const response = await fetch(`/api/releases/spotify/${artistId}`);
    if (!response.ok) throw new Error('Failed to fetch Spotify releases');
    
    const albums: SpotifyAlbum[] = await response.json();
    
    const releases: FetchedRelease[] = albums
      .slice(0, 5) // Get top 5 most recent
      .map((album) => ({
        id: album.id,
        title: album.name,
        artist: '', // Will be set by caller
        type: album.album_type === 'single' ? 'Single' : 'Album',
        image: album.images[0]?.url || '',
        releaseDate: formatDate(album.release_date),
        url: album.external_urls.spotify,
        platform: 'Spotify' as const,
      }));

    releaseCache.set(cacheKey, { data: releases, timestamp: Date.now() });
    return releases;
  } catch (error) {
    console.error('Error fetching Spotify releases:', error);
    return [];
  }
}

/**
 * Fetch releases from SoundCloud for an artist
 */
export async function fetchSoundCloudReleases(username: string): Promise<FetchedRelease[]> {
  try {
    const cacheKey = `soundcloud-${username}`;
    
    if (releaseCache.has(cacheKey)) {
      const cached = releaseCache.get(cacheKey);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
        return cached.data;
      }
    }

    // This would call your backend endpoint that interfaces with SoundCloud
    const response = await fetch(`/api/releases/soundcloud/${username}`);
    if (!response.ok) throw new Error('Failed to fetch SoundCloud releases');
    
    const tracks: SoundCloudTrack[] = await response.json();
    
    const releases: FetchedRelease[] = tracks
      .slice(0, 5) // Get top 5 most recent
      .map((track) => ({
        id: track.id.toString(),
        title: track.title,
        artist: '', // Will be set by caller
        type: track.kind === 'playlist' ? 'Album' : 'Single',
        image: track.artwork_url?.replace('-large.jpg', '-t500x500.jpg') || '',
        releaseDate: formatDate(track.created_at),
        url: track.permalink_url,
        platform: 'SoundCloud' as const,
      }));

    releaseCache.set(cacheKey, { data: releases, timestamp: Date.now() });
    return releases;
  } catch (error) {
    console.error('Error fetching SoundCloud releases:', error);
    return [];
  }
}

/**
 * Fetch all releases for an artist (from both platforms)
 */
export async function fetchAllArtistReleases(
  artistName: string,
  spotifyId?: string,
  soundcloudUsername?: string
): Promise<FetchedRelease[]> {
  const releases: FetchedRelease[] = [];

  if (spotifyId) {
    const spotifyReleases = await fetchSpotifyReleases(spotifyId);
    releases.push(
      ...spotifyReleases.map((r) => ({ ...r, artist: artistName }))
    );
  }

  if (soundcloudUsername) {
    const scReleases = await fetchSoundCloudReleases(soundcloudUsername);
    releases.push(
      ...scReleases.map((r) => ({ ...r, artist: artistName }))
    );
  }

  // Sort by date (newest first)
  return releases.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
}

/**
 * Format date to readable format
 */
function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}

/**
 * Clear cache (useful for manual refresh)
 */
export function clearReleaseCache(): void {
  releaseCache.clear();
}
