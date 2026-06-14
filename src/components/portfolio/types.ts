/** Local file path, direct URL, or YouTube / Vimeo link / ID */
export interface PortfolioVideo {
  src: string;
  title?: string;
  poster?: string;
}

export interface PortfolioClient {
  id: string;
  name: string;
  handle: string;
  role: string;
  avatar: string;
  /** Preview media — image, looping video (.mp4), or YouTube / Vimeo URL */
  gifUrl: string;
  photos: string[];
  videos: PortfolioVideo[];
}
