export type ArtistLinkType = 'instagram' | 'spotify' | 'soundcloud' | 'tiktok' | 'website'

export interface ArtistLink {
  type: ArtistLinkType
  label: string
  url: string
}

export interface ArtistSection {
  title: string
  content: string
}

export interface ArtistSheet {
  id: number
  name: string
  genre: string
  image: string
  links: ArtistLink[]
  sections: ArtistSection[]
}

const ARTIST_SHEETS: ArtistSheet[] = [
  {
    id: 1,
    name: 'DN$',
    genre: 'Rap / Musiques actuelles',
    image: 'https://i.scdn.co/image/ab676161000051746cf3aff7bc9406c188666fbc',
    links: [
      {
        type: 'instagram',
        label: 'Instagram',
        url: 'https://www.instagram.com/dnsonbeat',
      },
      {
        type: 'spotify',
        label: 'Spotify',
        url: 'https://open.spotify.com/intl-fr/artist/2NrOZEHVA2k9IysdNfaeBT',
      },
      {
        type: 'soundcloud',
        label: 'SoundCloud',
        url: 'https://soundcloud.com/dns-462860171',
      },
      {
        type: 'tiktok',
        label: 'TikTok',
        url: 'https://www.tiktok.com/@dnsonbeat',
      },
    ],
    sections: [
      {
        title: 'Origine',
        content:
          "Originaire de La Réunion, DN$ arrive en métropole en 2024 et s'intègre rapidement à la scène rap bordelaise, où il développe et affirme son identité artistique.",
      },
      {
        title: 'Collectif',
        content: 'Membre du collectif RedStudio',
      },
      {
        title: 'Présentation',
        content:
          'DN$ est un jeune rappeur émergent qui développe un univers à la fois technique, revendicateur et introspectif. Son projet artistique repose sur un équilibre assumé entre prise de position, réflexion personnelle et affirmation de soi, offrant une proposition forte et cohérente sur scène.',
      },
      {
        title: 'Projet',
        content:
          'Le projet DN$ — « BZ TOUT UN LABEL » tel qu\'il est présenté aujourd\'hui constitue son premier projet officiellement structuré et diffusé sur les plateformes de streaming.\n\nCependant, l\'artiste a déjà fait ses preuves en amont sur SoundCloud, où il a construit son identité, affiné son écriture et développé une première audience avant son arrivée sur les plateformes traditionnelles.',
      },
      {
        title: 'Dernier projet',
        content:
          'Son dernier projet, sorti en septembre 2025, marque une étape clé dans son parcours.\n\nCe projet propose un mélange maîtrisé de technicité rap et de discours revendicatif, tout en conservant une dimension égotripe et introspective, reflet de son vécu et de sa place dans la société.',
      },
    ],
  },
  {
    id: 2,
    name: "Vin's",
    genre: 'Indie rock',
    image: 'https://i1.sndcdn.com/avatars-Tb0Ds5cskz6haord-1gs3xQ-t500x500.jpg',
    links: [
      {
        type: 'instagram',
        label: 'Instagram',
        url: 'https://www.instagram.com/vince_lvx',
      },
      {
        type: 'website',
        label: 'Site',
        url: 'https://theredstudio.fr',
      },
      {
        type: 'soundcloud',
        label: 'SoundCloud',
        url: 'https://soundcloud.com/vinsredstudio',
      },
    ],
    sections: [
      {
        title: 'Collectif',
        content: 'Membre du collectif TheRedStudio',
      },
      {
        title: 'Présentation institutionnelle',
        content:
          "Vin's est un artiste indie rock, membre du collectif TheRedStudio, qui débute officiellement son projet musical en 2025 après plusieurs années consacrées à la production et à l'accompagnement d'autres artistes. Cette expérience lui permet de développer une approche artistique structurée, centrée sur l'écriture et le sens.\n\nSon projet mêle introspection personnelle et réflexion sur les enjeux contemporains, avec une attention particulière portée aux textes et à leur résonance sociale.",
      },
      {
        title: 'Parcours et productions',
        content:
          "En mai 2025, Vin's publie un premier projet introspectif abordant son parcours, ses doutes et les relations humaines. En août 2025, il poursuit cette démarche avec un single consacré à la place de l'individu dans la société et aux normes sociales.\n\nIl travaille actuellement sur un nouveau projet plus engagé, centré sur des problématiques sociétales, tout en conservant une forte dimension introspective et une réflexion personnelle sur l'engagement.",
      },
      {
        title: 'Univers artistique et parti pris',
        content:
          "Vin's développe un univers marqué par le contraste. Il affectionne particulièrement l'association de paroles crues et directes à des productions douces, parfois électroniques, créant un décalage assumé entre la forme et le propos.\n\nSes titres s'appuient sur des instrumentales très présentes, à forte identité sonore, laissant une place centrale à l'instrumentation et à l'immersion musicale.",
      },
    ],
  },
  {
    id: 3,
    name: 'Ivane',
    genre: 'Pop',
    image: 'https://i1.sndcdn.com/avatars-4rkFmW8Vft47Pqpw-LxBGPQ-t500x500.jpg',
    links: [
      {
        type: 'soundcloud',
        label: 'SoundCloud',
        url: 'https://soundcloud.com/user-821023271',
      },
    ],
    sections: [
      {
        title: 'Fiche',
        content: "Fiche en cours de rédaction.",
      },
    ],
  },
  {
    id: 4,
    name: 'Izadora Bezie',
    genre: 'Pop',
    image: 'https://i1.sndcdn.com/avatars-6VruH1iR86pz5i0t-8YHzgw-t200x200.jpg',
    links: [
      {
        type: 'instagram',
        label: 'Instagram',
        url: 'https://www.instagram.com/izadorabezie',
      },
      {
        type: 'soundcloud',
        label: 'SoundCloud',
        url: 'https://soundcloud.com/izadora-bezie',
      },
    ],
    sections: [
      {
        title: 'Fiche',
        content: 'Fiche en cours de rédaction.',
      },
    ],
  },
]

export function getArtistSheetById(id: number): ArtistSheet | undefined {
  return ARTIST_SHEETS.find((a) => a.id === id)
}
