type RemoteTrack = {
  _id?: unknown;
  id?: unknown;
  name?: unknown;
  artist?: unknown;
  audio?: unknown;
};

type PublicTrack = {
  id: string;
  name: string;
  artist: string;
  audio: string;
};

const MUSIC_API_URL = "https://spotify-backend-rnanwp.onrender.com/songs";

export const runtime = "nodejs";
export const revalidate = 3600;

const normalizeTrack = (track: RemoteTrack, index: number): PublicTrack | null => {
  if (
    typeof track.name !== "string" ||
    typeof track.artist !== "string" ||
    typeof track.audio !== "string"
  ) {
    return null;
  }

  try {
    const audioUrl = new URL(track.audio);
    if (audioUrl.protocol !== "https:") return null;
  } catch {
    return null;
  }

  return {
    id: String(track._id ?? track.id ?? `${track.artist}-${track.name}-${index}`),
    name: track.name,
    artist: track.artist,
    audio: track.audio,
  };
};

export async function GET() {
  try {
    const response = await fetch(MUSIC_API_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(25_000),
    });

    if (!response.ok) {
      return Response.json({ tracks: [], error: "Serviço de músicas indisponível." }, { status: 502 });
    }

    const payload = (await response.json()) as RemoteTrack[];
    const tracks = Array.isArray(payload)
      ? payload
          .map(normalizeTrack)
          .filter((track): track is PublicTrack => track !== null)
          .sort(() => Math.random() - 0.5)
          .slice(0, 24)
      : [];

    return Response.json(
      { tracks },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch {
    return Response.json({ tracks: [], error: "Serviço de músicas indisponível." }, { status: 502 });
  }
}
