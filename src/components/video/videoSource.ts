import type { PlyrSource } from "plyr-react";

export type VideoProvider = "html5" | "youtube" | "vimeo";

const HTML5_EXT = /\.(mp4|webm|mov|ogg)(\?|$)/i;

const YOUTUBE_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtu\.be\/)([\w-]{11})/i,
  /^([\w-]{11})$/,
];

const VIMEO_PATTERNS = [/vimeo\.com\/(?:video\/)?(\d+)/i];

export function extractYouTubeId(src: string): string | null {
  const trimmed = src.trim();
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export function extractVimeoId(src: string): string | null {
  const trimmed = src.trim();
  for (const pattern of VIMEO_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match?.[1]) return match[1];
  }
  return null;
}

export function getVideoProvider(src: string): VideoProvider {
  if (extractYouTubeId(src)) return "youtube";
  if (extractVimeoId(src)) return "vimeo";
  return "html5";
}

export function isPlayableVideoSrc(src: string): boolean {
  const trimmed = src.trim();
  if (!trimmed) return false;
  if (getVideoProvider(trimmed) !== "html5") return true;
  return HTML5_EXT.test(trimmed);
}

export function getVideoThumbnail(src: string, poster?: string): string | undefined {
  if (poster) return poster;
  const youtubeId = extractYouTubeId(src);
  if (youtubeId) return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  return undefined;
}

export function buildPlyrSource(src: string, poster?: string): PlyrSource {
  const youtubeId = extractYouTubeId(src);
  if (youtubeId) {
    return {
      type: "video",
      sources: [{ src: youtubeId, provider: "youtube" }],
      poster,
    };
  }

  const vimeoId = extractVimeoId(src);
  if (vimeoId) {
    return {
      type: "video",
      sources: [{ src: vimeoId, provider: "vimeo" }],
      poster,
    };
  }

  const ext = src.split("?")[0].split(".").pop()?.toLowerCase();
  const mime =
    ext === "webm"
      ? "video/webm"
      : ext === "mov"
        ? "video/quicktime"
        : ext === "ogg"
          ? "video/ogg"
          : "video/mp4";

  return {
    type: "video",
    sources: [{ src, type: mime }],
    poster,
  };
}
