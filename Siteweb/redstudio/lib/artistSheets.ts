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
    genre: 'Pop mélancolique / Indie pop / Indie rock',
    image: 'https://i1.sndcdn.com/avatars-4rkFmW8Vft47Pqpw-LxBGPQ-t500x500.jpg',
    links: [
      {
        type: 'soundcloud',
        label: 'SoundCloud',
        url: 'https://soundcloud.com/user-821023271',
      },
      {
        type: 'instagram',
        label: 'Instagram',
        url: 'https://www.instagram.com/ivbnt',
      },
    ],
    sections: [
      {
        title: 'Présentation',
        content:
          "Ivane est un artiste de pop mélancolique qui explore les thèmes de l'amour, de la perte et de l'abandon à travers des textes sensibles et imagés. Son écriture repose sur de belles comparaisons et une simplicité émotionnelle qui rend ses morceaux à la fois accessibles et touchants.\n\nSon univers s'inscrit dans une esthétique indie pop et indie rock, où les productions viennent mettre en valeur ses textes et son interprétation posée. Sa musique laisse une large place à l'émotion, avec une approche sincère et directe qui crée une connexion immédiate avec l'auditeur.",
      },
      {
        title: 'Identité artistique',
        content:
          "Ivane se distingue par une identité de « lover » assumée au sein du studio, avec une sensibilité forte et une capacité à transformer des expériences personnelles en morceaux intimes et universels.",
      },
      {
        title: 'Style',
        content: 'Pop mélancolique / Indie pop / Indie rock / Écriture émotionnelle',
      },
      {
        title: 'Sortie',
        content: '« Beau Dégât » (2025) – premier morceau officiel d\'Ivane',
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
  {
    id: 5,
    name: '409Asher',
    genre: 'Trap / Underground / Experimental / Inspiration jazz',
    image: '',
    links: [
      {
        type: 'instagram',
        label: 'Instagram',
        url: 'https://www.instagram.com/409asher',
      },
    ],
    sections: [
      {
        title: 'Présentation',
        content:
          "409Asher est un producteur et beatmaker originaire de Perpignan. Il développe un univers sonore centré sur la trap, l'underground et les influences new jazz, avec une approche résolument expérimentale de la production. Son travail se distingue par un soin particulier apporté au sound design, aux basses et aux rythmiques, ainsi qu'une volonté constante de recherche et d'évolution sonore.\n\nSa musique repose sur une esthétique moderne et immersive, où chaque instrumentale est pensée comme un espace en mouvement, entre textures sombres, énergie trap et inspirations jazz.",
      },
      {
        title: 'Duo artistique',
        content:
          "Il forme aujourd'hui un véritable duo artistique exclusif avec le rappeur 101Mess. Ensemble, ils construisent un projet commun dans lequel la production et l'écriture évoluent main dans la main. 409Asher compose uniquement pour 101Mess, dans une logique de direction artistique partagée et cohérente. Leur collaboration repose sur une alchimie forte, où les prods s'adaptent et se transforment en fonction de l'évolution du rappeur et de leur vision commune.\n\nCe duo développe actuellement un projet en préparation, pensé comme une continuité de leur univers commun, avec une identité sonore affirmée et singulière.",
      },
      {
        title: 'Style',
        content: 'Trap / Underground / Experimental / Inspiration jazz',
      },
      {
        title: 'Dernières sorties',
        content:
          "« Des l'aube Pt. II » – 101Mess (prod. 409Asher)\n\n« Matinal » – 101Mess (prod. 409Asher)",
      },
      {
        title: 'En résumé',
        content:
          "Artiste acharné et passionné, 409Asher s'impose comme un producteur en pleine construction d'un univers solide, porté par une vision claire et une collaboration exclusive.",
      },
    ],
  },
  {
    id: 6,
    name: '101Mess',
    genre: 'Rap mélodique / Trap introspective / Égo trip / Rap chanté / Autotune',
    image: 'https://i1.sndcdn.com/avatars-ZstNFRgwqwSpXu6d-5h5nOg-t500x500.jpg',
    links: [
      {
        type: 'instagram',
        label: 'Instagram',
        url: 'https://www.instagram.com/101mess',
      },
      {
        type: 'spotify',
        label: 'Spotify',
        url: 'https://open.spotify.com/intl-fr/artist/5gBA2ORDWJZujcSojMLP5c',
      },
      {
        type: 'soundcloud',
        label: 'SoundCloud',
        url: 'https://soundcloud.com/pizi-nono',
      },
    ],
    sections: [
      {
        title: 'Présentation',
        content:
          "101Mess est un rappeur originaire de Toulouse, capable de naviguer entre égo trip et textes plus mélancoliques, avec une écriture à la fois précise et sensible. Il développe un univers où se croisent récits personnels, émotions brutes et passages plus chantés, souvent portés par l'autotune.\n\nSon approche vocale alterne entre flows posés, parties râpés techniques et mélodies plus ouvertes, ce qui lui permet de varier les ambiances tout en gardant une identité cohérente. Ses morceaux s'inscrivent dans une esthétique moderne, avec une attention particulière portée au rythme, aux back vocals et à la construction des morceaux.",
      },
      {
        title: 'Duo artistique',
        content:
          "Il évolue en duo artistique avec le producteur 409Asher, avec qui il construit une direction musicale commune. Ensemble, ils développent des instrumentales calmes, mélancoliques et immersives, laissant beaucoup d'espace à la voix et à l'interprétation. Leur collaboration repose sur une vraie continuité artistique et une vision partagée des projets à venir.",
      },
      {
        title: 'Style',
        content: 'Rap mélodique / Trap introspective / Égo trip / Rap chanté / Autotune',
      },
      {
        title: 'Dernières sorties',
        content:
          "« Des l'aube Pt. II » (2026) – avec 409Asher à la production\n\n« Marques Effacées » (2024)\n\nPlusieurs singles et sorties complémentaires disponibles en ligne",
      },
    ],
  },
  {
    id: 7,
    name: 'gapple',
    genre: 'Trap / Boom bap / Sampling / Jazzwave',
    image: '',
    links: [
      {
        type: 'instagram',
        label: 'Instagram',
        url: 'https://www.instagram.com/prodgvpple',
      },
      {
        type: 'website',
        label: 'Site',
        url: 'https://gappleprod.com',
      },
    ],
    sections: [
      {
        title: 'Présentation',
        content:
          "gapple est beatmaker, producteur, ingénieur du son, mix et mastering, et membre fondateur du RedStudio. Figure centrale de la structure, il intervient à toutes les étapes de la création musicale : de la composition au sound design, jusqu'à l'enregistrement et la finalisation des projets.",
      },
      {
        title: 'Univers musical',
        content:
          "À l'origine beatmaker spécialisé dans la boom bap et le sampling, il a progressivement élargi son univers pour devenir un producteur polyvalent, capable de créer aussi bien des instrumentales jazzy, des prods plus bounce que des atmosphères modernes et expérimentales. Son travail se distingue particulièrement par la qualité de ses boucles, la précision de son sound design et la musicalité de ses compositions.",
      },
      {
        title: 'Technicien complet',
        content:
          "gapple est également un technicien complet. En plus de ses compétences en production et en ingénierie sonore, il développe des outils pour les autres ingénieurs du son, notamment des presets et plugins, grâce à ses compétences en informatique. Cette dimension renforce son rôle de créateur mais aussi de facilitateur au sein de la scène.",
      },
      {
        title: 'Projets majeurs',
        content:
          "« BZ tout un Label » – EP porté par DN$ (2025), en tant que structure de label\n\n« Jeune Lyriciste » – projet de Vin's (2025), où il assure une partie importante de la direction sonore",
      },
      {
        title: 'Style',
        content: 'Trap / Boom bap / Sampling / Jazzwave',
      },
    ],
  },
  {
    id: 8,
    name: 'Arles',
    genre: 'Hip-hop / Rap / Underground',
    image: '/images/artistes/arles1.jpg',
    links: [
      {
        type: 'instagram',
        label: 'Instagram',
        url: 'https://www.instagram.com/arlesnelesvoitpas',
      },
      {
        type: 'spotify',
        label: 'Spotify',
        url: 'https://open.spotify.com/intl-fr/artist/4yS7iexox7gowF7CQdjjAD',
      },
      {
        type: 'soundcloud',
        label: 'SoundCloud',
        url: 'https://on.soundcloud.com/xFo12ULyubw8DT9bFn',
      },
    ],
    sections: [
      {
        title: 'Présentation',
        content:
          "Artiste rap engagé originaire de Bordeaux, Arles développe un univers brut, conscient et profondément humain. À travers une écriture précise, chargée de doubles sens et de références politiques, il construit des morceaux où se croisent introspection, critique sociale et culture rap.\n\nSon identité artistique repose sur une plume incisive, capable de mêler vécu personnel, actualité et engagement sans jamais perdre l'énergie du live. Entre boom bap moderne, influences underground et productions travaillées, Arles défend une vision du rap sincère, indépendante et authentique.",
      },
      {
        title: 'Scène',
        content:
          "Habitué des open mics bordelais, il s'illustre notamment sur des scènes comme la MAC 3 et différents événements rap locaux, où il impose une présence scénique solide et une interprétation intense de ses textes. Le live occupe une place centrale dans son projet : mettre en lumière la puissance des mots et créer une vraie connexion avec le public.",
      },
      {
        title: 'Production',
        content:
          "En parallèle de son activité de rappeur, il développe également un travail de production et de beatmaking sous le pseudonyme ayozain, affirmant une direction artistique cohérente et autonome.",
      },
      {
        title: 'Collectif',
        content: 'Red Studio',
      },
      {
        title: 'Style',
        content: 'Hip-hop / Rap / Underground',
      },
      {
        title: 'Dernières sorties',
        content:
          "« Yves Le Vent » – feat. LND\n\n« Mao Kuomintang » – feat. Wired\n\nPlusieurs sorties et exclusivités disponibles sur SoundCloud",
      },
    ],
  },
  {
    id: 9,
    name: 'RoxasXIII',
    genre: 'Trap / Hyperpop / Rap créole & français / New jazz',
    image: 'https://i1.sndcdn.com/visuals-000714548149-AlO3Xv-t2480x520.jpg',
    links: [
      {
        type: 'instagram',
        label: 'Instagram',
        url: 'https://www.instagram.com/roxas.xill',
      },
      {
        type: 'spotify',
        label: 'Spotify',
        url: 'https://open.spotify.com/intl-fr/artist/0LMXJ8WrZrQq4vKYCIeOKC',
      },
      {
        type: 'soundcloud',
        label: 'SoundCloud',
        url: 'https://on.soundcloud.com/oaLARiM1PLngIyNM2N',
      },
    ],
    sections: [
      {
        title: 'Présentation',
        content:
          "RoxasXIII est un rappeur pluriel, originaire de Martinique et aujourd'hui basé entre les Antilles et Bordeaux. Il développe un univers musical extrêmement versatile, capable de naviguer entre trap, hyper pop, en français comme en créole.\n\nSa force réside dans une voix adaptable et expressive, qui change selon les thèmes, les émotions et les instrumentales. Cette flexibilité lui permet d'explorer des registres très différents, allant de l'égo trip à l'introspection, jusqu'à la narration de sa vie et de ses expériences.",
      },
      {
        title: 'Identité visuelle',
        content:
          "Artiste attentif à son identité visuelle, RoxasXIII accorde une importance particulière à ses covers, souvent dessinés ou graphiques, renforçant une direction artistique cohérente et soignée autour de sa musique.",
      },
      {
        title: 'Style',
        content: 'Trap / Hyperpop / Rap créole & français / New jazz',
      },
      {
        title: 'Projets récents',
        content:
          "« Bowser » (2026) – sur une prod new jazz aux influences jazz trap\n\nEP « Lacrimosa » (2025) – en collaboration avec UIBO",
      },
    ],
  },
]

export function getArtistSheetById(id: number): ArtistSheet | undefined {
  return ARTIST_SHEETS.find((a) => a.id === id)
}
