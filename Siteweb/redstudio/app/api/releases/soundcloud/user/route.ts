import { NextRequest, NextResponse } from "next/server";
import { fetchSoundCloudReleases } from "@/lib/releaseService";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const releases = await fetchSoundCloudReleases(username);
    return NextResponse.json(releases);
  } catch (error) {
    console.error("Error in SoundCloud releases endpoint:", error);
    return NextResponse.json(
      { error: "Failed to fetch releases" },
      { status: 500 }
    );
  }
}
