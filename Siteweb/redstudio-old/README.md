# RedStudio Backend - Next.js API

Backend API pour récupérer les releases depuis Spotify et SoundCloud.

## Installation

```bash
npm install
```

## Variables d'environnement

Crée un fichier `.env.local`:

```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_ACCESS_TOKEN=your_token
SOUNDCLOUD_CLIENT_ID=your_client_id
SOUNDCLOUD_ACCESS_TOKEN=your_token
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Démarrage du serveur

```bash
npm run dev
```

Le serveur démarre sur `http://localhost:3001`

## API Endpoints

### Spotify Releases
```
GET /api/releases/spotify/[artistId]
```

Exemple:
```
GET /api/releases/spotify/2NrOZEHVA2k9IysdNfaeBT
```

Réponse:
```json
[
  {
    "id": "album_id",
    "title": "Album Name",
    "artist": "Artist Name",
    "type": "Album",
    "image": "image_url",
    "releaseDate": "2025-01-01",
    "url": "spotify_url",
    "platform": "Spotify"
  }
]
```

### SoundCloud Releases
```
GET /api/releases/soundcloud/[username]
```

Exemple:
```
GET /api/releases/soundcloud/dns-462860171
```

## Utilisation depuis le frontend

Dans ton app React, tu peux appeler l'API:

```typescript
const releases = await fetch(
  'http://localhost:3001/api/releases/spotify/2NrOZEHVA2k9IysdNfaeBT'
).then(res => res.json())
```

## Structure du projet

```
app/
  ├── api/
  │   ├── route.ts (health check)
  │   └── releases/
  │       ├── spotify/[artistId]/route.ts
  │       └── soundcloud/[username]/route.ts
lib/
  └── releaseService.ts (logique métier)
```

## Prochaines étapes

- [ ] Authentification avec NextAuth.js
- [ ] Système d'utilisateurs
- [ ] Base de données Prisma
- [ ] Webhooks pour mise à jour automatique
