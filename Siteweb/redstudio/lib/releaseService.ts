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

// Hardcoded releases data
const RELEASES_DATA: Release[] = [
  // DN$ - Spotify releases
  {
    id: "dn-bz-tout-un-label",
    title: "BZ TOUT UN LABEL",
    artist: "DN$",
    type: "EP",
    image: "/images/releases/bz-tout-un-label.jpg",
    releaseDate: "2025-09-05",
    url: "https://open.spotify.com/album/6Obe1kQblkh5NP8ln4EtPU",
    platform: "Spotify",
  },
  {
    id: "dn-tema-lpaysage",
    title: "TEMA L'PAYSAGE",
    artist: "DN$",
    type: "Single",
    image: "https://i.scdn.co/image/ab67616d00001e020348d4285db475efe30147e2",
    releaseDate: "2025-01-31",
    url: "https://open.spotify.com/album/4cxzwOCwnkmlt3F2RduTPW",
    platform: "Spotify",
  },
  {
    id: "dn-pastel",
    title: "PASTEL",
    artist: "DN$",
    type: "Single",
    image: "https://i.scdn.co/image/ab67616d00001e02d66bf23332c28e9bb5f9c4bb",
    releaseDate: "2024-07-31",
    url: "https://open.spotify.com/album/26F1qGe3PrtcOGGNGzKdZh",
    platform: "Spotify",
  },
  // Vin's - SoundCloud releases
  {
    id: "vins-moi-en-mieux",
    title: "Moi en mieux",
    artist: "Vin's",
    type: "Single",
    image: "https://i1.sndcdn.com/artworks-ygn4RysxMyp4jItf-8tpGjA-t1080x1080.png",
    releaseDate: "2025-08-15",
    url: "https://soundcloud.com/h2lios/moi-en-mieux",
    platform: "SoundCloud",
  },
  {
    id: "vins-jeune-lyriciste",
    title: "Jeune Lyriciste",
    artist: "Vin's",
    type: "EP",
    image: "https://i1.sndcdn.com/artworks-QslmxYz2Arev9rin-5mH1OQ-t1080x1080.jpg",
    releaseDate: "2025-05-02",
    url: "https://soundcloud.com/h2lios/sets/jeune-lyriciste",
    platform: "SoundCloud",
  },
  // Ivane - SoundCloud releases
  {
    id: "ivane-beau-degat",
    title: "Beau Dégât",
    artist: "Ivane",
    type: "Single",
    image: "https://i1.sndcdn.com/artworks-jTxMqE9Bi0xoF2Jv-V3qbIg-t1080x1080.jpg",
    releaseDate: "2025-07-20",
    url: "https://soundcloud.com/user-821023271/beau-degat",
    platform: "SoundCloud",
  },
];

export async function fetchSpotifyReleases(
  artistId: string
): Promise<Release[]> {
  // Return hardcoded releases for the artist
  return RELEASES_DATA.filter(
    (release) => release.platform === "Spotify" && release.artist === "DN$"
  );
}

export async function fetchSoundCloudReleases(
  username: string
): Promise<Release[]> {
  // Return hardcoded releases for the artist
  if (username === "h2lios" || username === "vin's") {
    return RELEASES_DATA.filter(
      (release) => release.platform === "SoundCloud" && release.artist === "Vin's"
    );
  } else if (username === "user-821023271" || username === "ivane") {
    return RELEASES_DATA.filter(
      (release) => release.platform === "SoundCloud" && release.artist === "Ivane"
    );
  }
  return [];
}

export async function fetchAllArtistReleases(
  artistName: string,
  spotifyId?: string,
  soundcloudUsername?: string
): Promise<Release[]> {
  const releases: Release[] = [];

  // Filter by artist name from hardcoded data
  const artistReleases = RELEASES_DATA.filter(
    (release) => release.artist.toLowerCase() === artistName.toLowerCase()
  );

  releases.push(...artistReleases);

  // Sort by date (newest first)
  releases.sort(
    (a, b) => {
      const getYear = (dateStr: string) => {
        const yearMatch = dateStr.match(/20\d{2}/);
        return yearMatch ? parseInt(yearMatch[0]) : 0;
      };
      return getYear(b.releaseDate) - getYear(a.releaseDate);
    }
  );

  return releases;
}

export function clearReleaseCache(): void {
  // No cache to clear with hardcoded data
}
