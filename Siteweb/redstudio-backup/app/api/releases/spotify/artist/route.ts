import { NextRequest, NextResponse } from "next/server";
import { fetchSpotifyReleases } from "@/lib/releaseService";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const artistId = searchParams.get("id");

  if (!artistId) {
    return NextResponse.json(
      { error: "Artist ID is required" },
      { status: 400 }
    );
  }

  try {
    const releases = await fetchSpotifyReleases(artistId);
    return NextResponse.json(releases);
  } catch (error) {
    console.error("Error in Spotify releases endpoint:", error);
    return NextResponse.json(
      { error: "Failed to fetch releases" },
      { status: 500 }
    );
  }
}
