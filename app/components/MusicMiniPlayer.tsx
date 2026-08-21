"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type MusicTrack = {
  id: string;
  name: string;
  artist: string;
  audio: string;
};

type PlayerStatus = "loading" | "ready" | "error";

const formatTime = (time: number) => {
  if (!Number.isFinite(time) || time <= 0) return "00:00";

  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

const chooseRandomTrack = (tracks: MusicTrack[], currentId?: string) => {
  const available = tracks.filter((track) => track.id !== currentId);
  const pool = available.length > 0 ? available : tracks;

  return pool[Math.floor(Math.random() * pool.length)];
};

export default function MusicMiniPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [tracks, setTracks] = useState<MusicTrack[]>([]);
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [status, setStatus] = useState<PlayerStatus>("loading");
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const prepareTracks = async () => {
    setStatus("loading");

    try {
      const response = await fetch("/api/music/tracks");
      if (!response.ok) throw new Error("Não foi possível preparar o player.");

      const data = (await response.json()) as { tracks?: MusicTrack[] };
      if (!data.tracks?.length) throw new Error("Nenhuma faixa disponível.");

      const initialTrack = chooseRandomTrack(data.tracks);
      const audio = audioRef.current;

      setTracks(data.tracks);
      setCurrentTrack(initialTrack);
      setStatus("ready");

      if (audio) {
        audio.src = initialTrack.audio;
        audio.load();
      }
    } catch {
      setStatus("error");
    }
  };

  useEffect(() => {
    void prepareTracks();

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio || !currentTrack || status !== "ready") return;

    if (!audio.paused) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const playRandomTrack = async () => {
    const audio = audioRef.current;
    if (!audio || tracks.length === 0) return;

    const nextTrack = chooseRandomTrack(tracks, currentTrack?.id);
    setCurrentTrack(nextTrack);
    setCurrentTime(0);
    setDuration(0);

    audio.pause();
    audio.src = nextTrack.audio;
    audio.load();

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  const seek = (value: number) => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.duration)) return;

    audio.currentTime = value;
    setCurrentTime(value);
  };

  const playerLabel =
    status === "loading"
      ? "Preparando uma música aleatória..."
      : status === "error"
        ? "O player não conseguiu carregar"
        : currentTrack?.name ?? "Música aleatória";

  return (
    <div className={`project-visual visual-music music-mini-player${isPlaying ? " is-playing" : ""}`}>
      <div className="music-mini-kicker">
        <span className="music-mini-status" />
        Prévia interativa
      </div>

      <div className="record music-mini-record">
        <button
          className="music-mini-play"
          type="button"
          aria-label={isPlaying ? "Pausar música" : "Reproduzir música aleatória"}
          disabled={status !== "ready"}
          onClick={() => void togglePlayback()}
        >
          {isPlaying ? <><i /><i /></> : <span>▶</span>}
        </button>
      </div>

      <div className="equalizer" aria-hidden="true"><i /><i /><i /><i /><i /></div>

      <div className="music-mini-panel">
        <div className="music-mini-heading" aria-live="polite">
          <div>
            <strong>{playerLabel}</strong>
            <span>{status === "ready" ? currentTrack?.artist : "Music Streaming"}</span>
          </div>

          {status === "error" ? (
            <button type="button" onClick={() => void prepareTracks()}>Tentar novamente</button>
          ) : (
            <button
              type="button"
              disabled={status !== "ready"}
              onClick={() => void playRandomTrack()}
              aria-label="Tocar outra música aleatória"
            >
              Aleatória ↻
            </button>
          )}
        </div>

        <div className="music-mini-timeline">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={Math.min(currentTime, duration || 0)}
            disabled={!duration}
            aria-label="Posição da música"
            style={{ "--music-progress": duration ? `${(currentTime / duration) * 100}%` : "0%" } as CSSProperties}
            onChange={(event) => seek(Number(event.target.value))}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        preload="metadata"
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onEnded={() => void playRandomTrack()}
      />
    </div>
  );
}
