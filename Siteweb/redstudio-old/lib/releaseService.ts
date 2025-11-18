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
      `https://api.spotify.com/v1/artists/${artistId}/albums`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from Spotify");
    }

    const data = (await response.json()) as {
      items: Array<{
        id: string;
        name: string;
        album_type: string;
        artists: Array<{ name: string }>;
        images: Array<{ url: string }>;
        release_date: string;
        external_urls: { spotify: string };
      }>;
    };

    const releases: Release[] = data.items.map((album) => ({
      id: album.id,
      title: album.name,
      artist: album.artists[0].name,
      type: album.album_type === "single" ? "Single" : "Album",
      image: album.images[0]?.url || "",
      releaseDate: album.release_date,
      url: album.external_urls.spotify,
      platform: "Spotify" as const,
    }));

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
      `https://api.soundcloud.com/users/${username}/tracks`,
      {
        headers: {
          Authorization: `OAuth ${process.env.SOUNDCLOUD_ACCESS_TOKEN}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch from SoundCloud");
    }

    const data = (await response.json()) as Array<{
      id: number;
      title: string;
      user: { username: string };
      artwork_url: string;
      created_at: string;
      permalink_url: string;
    }>;

    const releases: Release[] = data.map((track) => ({
      id: track.id.toString(),
      title: track.title,
      artist: track.user.username,
      type: "Single",
      image: track.artwork_url || "",
      releaseDate: track.created_at,
      url: track.permalink_url,
      platform: "SoundCloud" as const,
    }));

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
