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
  const cacheKey = `spotify-${artistId}`;
  const cached = releaseCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(
      `/api/releases/spotify?id=${encodeURIComponent(artistId)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Spotify API");
    }

    const releases = (await response.json()) as Release[];

    releaseCache.set(cacheKey, { data: releases, timestamp: Date.now() });
    return releases;
  } catch (error) {
    console.error("Error fetching Spotify releases:", error);
    return [];
  }
}

export async function fetchSoundCloudReleases(
  username: string
): Promise<Release[]> {
  const cacheKey = `soundcloud-${username}`;
  const cached = releaseCache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  try {
    const response = await fetch(
      `/api/releases/soundcloud?username=${encodeURIComponent(username)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from SoundCloud API");
    }

    const releases = (await response.json()) as Release[];

    releaseCache.set(cacheKey, { data: releases, timestamp: Date.now() });
    return releases;
  } catch (error) {
    console.error("Error fetching SoundCloud releases:", error);
    return [];
  }
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
