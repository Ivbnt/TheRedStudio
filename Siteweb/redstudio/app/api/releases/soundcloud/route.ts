import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username')

  if (!username) {
    return NextResponse.json({ error: 'Username required' }, { status: 400 })
  }

  try {
    // SoundCloud API v2 - Using unofficial endpoints
    // Note: SoundCloud has limited API, we'll use the web API approach
    const response = await fetch(
      `https://api-v2.soundcloud.com/users/by/username?username=${encodeURIComponent(username)}&client_id=${process.env.SOUNDCLOUD_CLIENT_ID}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )

    if (!response.ok) {
      // If user not found, return empty array instead of error
      return NextResponse.json([])
    }

    const userData = await response.json()

    // Fetch user tracks
    const tracksResponse = await fetch(
      `https://api-v2.soundcloud.com/users/${userData.id}/tracks?limit=50&client_id=${process.env.SOUNDCLOUD_CLIENT_ID}`,
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )

    if (!tracksResponse.ok) {
      return NextResponse.json([])
    }

    const tracksData = await tracksResponse.json()

    const releases = tracksData.collection.map((track: any) => ({
      id: track.id.toString(),
      title: track.title,
      artist: track.user?.username || 'Unknown',
      type: track.kind === 'playlist' ? 'Album' : 'Single',
      image: track.artwork_url?.replace('-large.jpg', '-t500x500.jpg') || '',
      releaseDate: track.created_at || new Date().toISOString().split('T')[0],
      url: track.permalink_url,
      platform: 'SoundCloud',
    }))

    return NextResponse.json(releases)
  } catch (error) {
    console.error('SoundCloud API error:', error)
    // Return empty array instead of error to gracefully handle API unavailability
    return NextResponse.json([])
  }
}
