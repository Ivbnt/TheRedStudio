export interface Release {
  id: string;
  title: string;
  artist: string;
  type: "Album" | "Single" | "Playlist" | "EP";
  image: string;
  releaseDate: string;
  url: string;
  platform: "Spotify" | "SoundCloud";
}

// Cache pour éviter les appels API répétés
const releaseCache = new Map<
  string,
  { data: Release[]; timestamp: number }
>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 heures

export async function fetchSpotifyReleases(
  artistId: string
): Promise<Release[]> {
  // Routes API removed for static export
  // Return mock data or empty array
  return [];
}

export async function fetchSoundCloudReleases(
  username: string
): Promise<Release[]> {
  // Routes API removed for static export
  // Return mock data or empty array
  return [];
}

export async function fetchAllArtistReleases(
  artistName: string,
  spotifyId?: string,
  soundcloudUsername?: string
): Promise<Release[]> {
  const releases: Release[] = [];

  if (spotifyId) {
    const spotifyReleases = await fetchSpotifyReleases(spotifyId);
    releases.push(...spotifyReleases);
  }

  if (soundcloudUsername) {
    const scReleases = await fetchSoundCloudReleases(soundcloudUsername);
    releases.push(...scReleases);
  }

  // Trier par date (plus récent d'abord)
  releases.sort(
    (a, b) =>
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
  );

  return releases;
}

export function clearReleaseCache(): void {
  releaseCache.clear();
}
