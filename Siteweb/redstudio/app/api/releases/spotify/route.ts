import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const artistId = searchParams.get('id')

  if (!artistId) {
    return NextResponse.json({ error: 'Artist ID required' }, { status: 400 })
  }

  try {
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'Spotify credentials not configured' },
        { status: 500 }
      )
    }

    // Get access token
    const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    })

    if (!tokenResponse.ok) {
      throw new Error('Failed to get Spotify access token')
    }

    const { access_token } = await tokenResponse.json()

    // Fetch artist albums
    const albumsResponse = await fetch(
      `https://api.spotify.com/v1/artists/${artistId}/albums?limit=50&market=US`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )

    if (!albumsResponse.ok) {
      throw new Error('Failed to fetch Spotify albums')
    }

    const albumsData = await albumsResponse.json()

    const releases = albumsData.items.map((album: any) => {
      let type = 'Album'
      
      // Determine type based on album_type and track count
      if (album.album_type === 'single') {
        type = 'Single'
      } else if (album.album_type === 'album') {
        // Distinguish between Album and EP based on track count
        // EP typically has 3-10 tracks, Album has 11+
        const trackCount = album.total_tracks || 0
        if (trackCount >= 3 && trackCount <= 10) {
          type = 'EP'
        } else {
          type = 'Album'
        }
      } else {
        type = 'EP'
      }

      return {
        id: album.id,
        title: album.name,
        artist: album.artists[0]?.name || 'Unknown',
        type: type,
        image: album.images[0]?.url || '',
        releaseDate: album.release_date,
        url: album.external_urls.spotify,
        platform: 'Spotify',
      }
    })

    return NextResponse.json(releases)
  } catch (error) {
    console.error('Spotify API error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch Spotify releases' },
      { status: 500 }
    )
  }
}
