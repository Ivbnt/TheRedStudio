# 🎵 The Red Studio - Configuration et Déploiement

## ✅ Status Actuel

Le projet est maintenant **unifié en un seul projet Next.js** qui inclut:
- ✅ **Frontend** complètement intégré avec React et Next.js
- ✅ **Backend API** avec routes pour Spotify et SoundCloud
- ✅ **Pages dynamiques** (Accueil, Événements, Artistes, Contact)
- ✅ **Releases fetching** depuis Spotify et SoundCloud
- ✅ **Build réussi** sans erreurs

## 📁 Structure du Projet

```
redstudio/
├── app/
│   ├── api/
│   │   └── releases/
│   │       ├── spotify/artist     # GET /api/releases/spotify/artist?id=<artistId>
│   │       └── soundcloud/user    # GET /api/releases/soundcloud/user?username=<username>
│   ├── components/                # Composants React (Navbar, etc)
│   ├── pages/                     # Pages (Home, Events, Artists, Contact)
│   ├── styles/                    # Fichiers CSS
│   ├── assets/                    # Images, fonts
│   ├── layout.tsx                 # Root layout Next.js
│   └── page.tsx                   # Page principale (App)
├── lib/
│   └── releaseService.ts          # Logique de fetching des releases
├── public/                        # Fichiers statiques (logo, etc)
├── next.config.ts                 # Configuration Next.js
├── tsconfig.json                  # Configuration TypeScript
├── package.json                   # Dépendances
└── .env.local                     # Variables d'environnement
```

## 🚀 Démarrage Rapide

### 1. Installation des dépendances

```bash
cd /home/ivane/RedStudio/TheRedStudio/Siteweb/redstudio
npm install
```

### 2. Démarrer le serveur de développement

```bash
npm run dev
```

Le site sera disponible à: **http://localhost:3000**

## 📝 Configuration des Credentials

Éditer `.env.local`:

```env
# Spotify API
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_ACCESS_TOKEN=your_access_token

# SoundCloud API  
SOUNDCLOUD_CLIENT_ID=your_client_id
SOUNDCLOUD_ACCESS_TOKEN=your_access_token
```

### Obtenir les Credentials

**Spotify:**
1. Aller sur https://developer.spotify.com/dashboard
2. Créer une application
3. Copier Client ID et Client Secret
4. Générer un access token avec le flow Client Credentials

**SoundCloud:**
1. S'enregistrer sur https://soundcloud.com/settings/applications
2. Créer une application pour obtenir le Client ID
3. Obtenir un OAuth token

## 📦 Scripts Disponibles

```bash
# Développement
npm run dev              # Démarrer le serveur sur localhost:3000

# Production
npm run build           # Builder pour production
npm run start           # Démarrer le serveur de production
npm run lint            # Vérifier le code avec ESLint
```

## 🎨 Pages et Fonctionnalités

### Accueil (`/`)
- Hero section animée avec effet parallaxe
- Section des événements à venir
- Roster des artistes avec liens vers la page artistes

### Événements (`/events`)
- Liste des événements
- Filtrage par catégorie (Concert, Festival, etc)
- Détails des événements

### Artistes (`/artists`)
- 4 artistes avec cartes flip 3D
- Sections pour chaque artiste
- Releases dynamiques depuis Spotify/SoundCloud
- Liens vers les profiles Spotify/SoundCloud

### Contact (`/contact`)
- Informations de contact (email)
- Liens vers réseaux sociaux
- Formulaire de contact (HTML)

## 🔗 API Endpoints

### Spotify Releases
```
GET /api/releases/spotify/artist?id=<artistId>
```

**Réponse:**
```json
[
  {
    "id": "string",
    "title": "Album Name",
    "artist": "Artist Name",
    "type": "Album|Single|EP",
    "image": "https://...",
    "releaseDate": "2024-01-01",
    "url": "https://spotify.com/...",
    "platform": "Spotify"
  }
]
```

### SoundCloud Releases
```
GET /api/releases/soundcloud/user?username=<username>
```

Même structure de réponse avec `"platform": "SoundCloud"`.

## 🎯 Architecture Frontend-Backend

Le frontend et backend sont maintenant **entièrement intégrés**:

1. **Frontend** (pages React)
   - Composants dans `app/pages/`
   - Styles CSS dans `app/styles/`
   - Service layer dans `lib/releaseService.ts`

2. **Backend** (API Routes Next.js)
   - Routes dans `app/api/`
   - Logique partagée avec frontend
   - Variables d'environnement centralisées

3. **Compilation**
   - Tous les fichiers TS/TSX compilés ensemble
   - Build unique pour déploiement
   - Zero dépendance externe (pas de Vite, React Router, etc)

## 🛠️ Développement

### Hot Reload
Les fichiers sont automatiquement rechargés en développement quand vous changez:
- Composants React
- Styles CSS
- API routes
- Configurations

### Debugging
```bash
# Vérifier les types TypeScript
npm run build

# Vérifier le linting
npm run lint
```

## 📊 Technologies

- **Next.js 15.5.6** - Framework React avec SSR/SSG
- **React 19.2.0** - Bibliothèque UI
- **TypeScript 5** - Typage statique
- **CSS3** - Styling (pas de framework CSS)
- **Spotify API** - Données des releases
- **SoundCloud API** - Données des releases

## 🚀 Déploiement

### Pour Vercel
```bash
# Vercel déploie automatiquement depuis Git
# Juste connecter le repo GitHub
```

### Pour serveur custom
```bash
# Build
npm run build

# Start
npm run start

# Le serveur démarre sur le port défini par PORT env var (default 3000)
```

## 📋 Checklist

- [x] Projet unifié frontend + backend
- [x] Pages React fonctionnelles
- [x] API routes intégrées
- [x] Styles CSS appliqués
- [x] Build réussi
- [x] Serveur de dev en marche
- [ ] Credentials Spotify configurés
- [ ] Credentials SoundCloud configurés
- [ ] Déploiement en production

## 🔧 Troubleshooting

### Port 3000 déjà utilisé
```bash
# Utiliser un autre port
npm run dev -- -p 3001
```

### Erreur de build TypeScript
```bash
# Vérifier les types
npm run build

# Vérifier tsconfig.json
```

### API ne retourne rien
Vérifier que `.env.local` a les bons credentials et que les tokens sont valides.

## 📞 Support

En cas de problème:
1. Vérifier les logs dans le terminal
2. Vérifier `.env.local` est correctement configuré
3. Vérifier les erreurs TypeScript avec `npm run build`
4. Vérifier les erreurs de linting avec `npm run lint`

