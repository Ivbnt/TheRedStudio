# The Red Studio

A modern full-stack website for The Red Studio recording studio, built with Next.js 15.

## Project Structure

```
redstudio/
├── app/
│   ├── api/
│   │   └── releases/          # API routes for fetching releases
│   │       ├── spotify/
│   │       └── soundcloud/
│   ├── components/            # React components (Navbar, etc)
│   ├── pages/                 # Page components (Home, Events, Artists, Contact)
│   ├── styles/                # CSS files
│   ├── assets/                # Images, fonts, etc
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Main app
├── lib/
│   └── releaseService.ts      # Release fetching logic
├── public/                    # Static files
├── .env.local                 # Environment variables
├── next.config.ts             # Next.js config
└── package.json
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Edit `.env.local` with your API credentials:

```env
# Spotify API (https://developer.spotify.com)
SPOTIFY_CLIENT_ID=your_id
SPOTIFY_CLIENT_SECRET=your_secret
SPOTIFY_ACCESS_TOKEN=your_token

# SoundCloud API
SOUNDCLOUD_CLIENT_ID=your_id
SOUNDCLOUD_ACCESS_TOKEN=your_token
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

- **Responsive Design** - Works on desktop, tablet, and mobile
- **Multi-page Navigation** - Home, Events, Artists, Contact
- **Dynamic Release Loading** - Fetches releases from Spotify/SoundCloud
- **Integrated API** - Backend API routes for release management
- **TypeScript** - Full type safety

## Pages

### Home
- Hero section with studio info
- Featured events
- Artist spotlight

### Events
- List of upcoming events
- Event categories
- Event details

### Artists
- Artist roster
- Artist bios
- Releases per artist (fetched from Spotify/SoundCloud)

### Contact
- Contact information
- Social media links
- Contact form

## API Routes

### Spotify Releases
```
GET /api/releases/spotify/artist?id=<artistId>
```

Returns array of releases from Spotify for given artist ID.

### SoundCloud Releases
```
GET /api/releases/soundcloud/user?username=<username>
```

Returns array of releases from SoundCloud for given username.

## Design

- **Colors**: Red (#C41E3A) and Dark background
- **Fonts**: Clean, modern typography
- **Animations**: Smooth transitions and interactive elements
- **Layout**: Responsive grid and flexbox

## Technologies

- **Next.js 15.5.6** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **CSS3** - Styling
- **Spotify API** - Release data
- **SoundCloud API** - Release data

## Future Enhancements

- [ ] User authentication
- [ ] User accounts
- [ ] Favorite releases
- [ ] User playlists
- [ ] Webhook integration
- [ ] Database integration

## License

ISC
