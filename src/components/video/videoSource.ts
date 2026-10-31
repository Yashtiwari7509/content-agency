import type { PlyrSource } from "plyr-react";

export type VideoProvider = "html5" | "youtube" | "vimeo";

const W = 1600;
const H = 900;

const clips = [
  [80, 260, 0],
  [346, 190, 1],
  [542, 330, 0],
  [878, 210, 1],
  [1094, 260, 0],
  [1360, 160, 1],
]
  .map(
    ([x, w, v]) =>
      `<rect x="${x}" y="664" width="${w}" height="56" rx="8" fill="url(#clip${v})" stroke="#fff" stroke-opacity=".14"/>
       <rect x="${x + 10}" y="676" width="${Math.min(w - 20, 70)}" height="6" rx="3" fill="#fff" fill-opacity=".35"/>`,
  )
  .join("");

const wave = Array.from({ length: 143 }, (_, i) => {
  const x = 90 + i * 10;
  const h = 8 + Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.17)) * 38 + ((i * 37) % 9);
  return `<rect x="${x}" y="${770 - h / 2}" width="4" height="${h}" rx="2" fill="${
    x < 720 ? "#a78bfa" : "#fff"
  }" fill-opacity="${x < 720 ? 0.9 : 0.22}"/>`;
}).join("");

const ticks = Array.from({ length: 37 }, (_, i) => {
  const x = 80 + i * 40;
  return `<path d="M${x} 640v${i % 5 === 0 ? 14 : 8}" />`;
}).join("");

const corner = (x: number, y: number, sx: number, sy: number) => `<path d="M${x} ${y + sy * 44}V${y}H${x + sx * 44}"/>`;

export const LOADING_VIDEO_POSTER = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#0b0c16"/><stop offset=".5" stop-color="#1a1633"/><stop offset="1" stop-color="#0b0c16"/>
    </linearGradient>
    <radialGradient id="gA"><stop stop-color="#8b5cf6" stop-opacity=".55"/><stop offset="1" stop-color="#8b5cf6" stop-opacity="0"/></radialGradient>
    <radialGradient id="gB"><stop stop-color="#22d3ee" stop-opacity=".35"/><stop offset="1" stop-color="#22d3ee" stop-opacity="0"/></radialGradient>
    <radialGradient id="gC"><stop stop-color="#f472b6" stop-opacity=".3"/><stop offset="1" stop-color="#f472b6" stop-opacity="0"/></radialGradient>
    <radialGradient id="vig" cx=".5" cy=".45" r=".75"><stop offset=".5" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".75"/></radialGradient>
    <linearGradient id="clip0" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#7c3aed"/><stop offset="1" stop-color="#4f46e5"/></linearGradient>
    <linearGradient id="clip1" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#0891b2"/><stop offset="1" stop-color="#2563eb"/></linearGradient>
    <linearGradient id="play" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#fff" stop-opacity=".05"/></linearGradient>
    <linearGradient id="head" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#f472b6"/><stop offset="1" stop-color="#f472b6" stop-opacity=".1"/></linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#fff" stroke-opacity=".035"/>
    </pattern>
    <filter id="blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="80"/></filter>
    <filter id="soft"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/>
      <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 .55 0"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <g filter="url(#blur)">
    <ellipse cx="520" cy="360" rx="460" ry="300" fill="url(#gA)"/>
    <ellipse cx="1180" cy="330" rx="420" ry="280" fill="url(#gB)"/>
    <ellipse cx="860" cy="560" rx="360" ry="200" fill="url(#gC)"/>
  </g>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- viewfinder -->
  <g fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="3" stroke-linecap="round">
    ${corner(80, 70, 1, 1)}${corner(1520, 70, -1, 1)}${corner(80, 580, 1, -1)}${corner(1520, 580, -1, -1)}
  </g>
  <g stroke="#fff" stroke-opacity=".18" stroke-width="2">
    <path d="M800 300v40M800 460v40M700 400h40M860 400h40"/>
  </g>
  <circle cx="108" cy="102" r="7" fill="#ef4444"/>
  <text x="128" y="108" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="20" letter-spacing="3" fill="#fff" fill-opacity=".75">REC  00:00:12:08</text>
  <text x="1492" y="108" text-anchor="end" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="20" letter-spacing="3" fill="#fff" fill-opacity=".45">4K  24FPS  RAW</text>

  <!-- play button -->
  <circle cx="800" cy="400" r="120" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="2"/>
  <circle cx="800" cy="400" r="92" fill="url(#play)" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>
  <path d="M780 360v80l66-40z" fill="#fff" fill-opacity=".92"/>

  <!-- timeline panel -->
  <rect x="56" y="604" width="1488" height="240" rx="20" fill="#05060d" fill-opacity=".55" stroke="#fff" stroke-opacity=".08"/>
  <g stroke="#fff" stroke-opacity=".28" stroke-width="1.5">${ticks}</g>
  ${clips}
  <rect x="80" y="730" width="1440" height="80" rx="10" fill="#fff" fill-opacity=".04"/>
  ${wave}

  <!-- playhead -->
  <rect x="716" y="620" width="8" height="214" fill="#f472b6" opacity=".6" filter="url(#soft)"/>
  <rect x="719" y="628" width="2" height="206" fill="url(#head)"/>
  <path d="M706 614h28v14l-14 12-14-12z" fill="#f472b6"/>

  <rect width="${W}" height="${H}" fill="url(#vig)"/>
  <rect width="${W}" height="${H}" filter="url(#grain)" opacity=".07"/>
</svg>`)}`;

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

  if (!src.startsWith("https://res.cloudinary.com/")) return undefined;
  const url = new URL(src);
  if (url.hostname !== "res.cloudinary.com" || url.search || !url.pathname.includes("/video/upload/")) return undefined;

  const uploadPath = "/video/upload/";
  const [beforeUpload, afterUpload] = url.pathname.split(uploadPath);
  if (!afterUpload) return undefined;
  const imagePath = afterUpload.replace(/\.(mp4|webm|mov|ogg)$/i, ".jpg");
  url.pathname = `${beforeUpload}${uploadPath}so_0,w_640,h_360,c_fill,q_auto,f_jpg/${imagePath}`;
  return url.toString();
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
