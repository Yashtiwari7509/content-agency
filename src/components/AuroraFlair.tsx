/**
 * AuroraFlair — reusable GSAP aurora flair wrapper
 *
 * Wraps any child element with a cursor-tracked aurora orb reveal
 * and optional magnetic char-parallax on text content.
 *
 * ── Basic usage ──────────────────────────────────────────────────────────────
 *
 *   <AuroraFlair>
 *     <a href="#">Get Started</a>
 *   </AuroraFlair>
 *
 * ── Advanced usage ───────────────────────────────────────────────────────────
 *
 *   <AuroraFlair
 *     colors={{ a: "#8b6bff", b: "#35e6c9", c: "#ff4fa3" }}
 *     blur={22}
 *     magneticChars
 *     magneticStrength={0.14}
 *     magneticRadius={160}
 *   >
 *     <button>Explore</button>
 *   </AuroraFlair>
 *
 * ── Vanilla-JS usage (no React) ──────────────────────────────────────────────
 *
 *   import { AuroraFlairController, letterize, AURORA_FLAIR_CSS } from './AuroraFlair'
 *   document.head.insertAdjacentHTML('beforeend', `<style>${AURORA_FLAIR_CSS}</style>`)
 *   const host  = document.querySelector('.my-button')        // host must have overflow:hidden + position:relative
 *   const flair = host.querySelector('.af-flair')             // inject the .af-flair markup manually
 *   letterize(host.querySelector('.af-content'))
 *   new AuroraFlairController(host, flair, { ...defaultOpts })
 */

import React, {
  useRef,
  useEffect,
  type ReactElement,
  type CSSProperties,
} from "react";
import gsap from "gsap";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuroraFlairColors {
  /** Primary orb (largest)   — default: violet  #8b6bff */
  a?: string;
  /** Secondary orb           — default: cyan    #35e6c9 */
  b?: string;
  /** Tertiary orb (smallest) — default: magenta #ff4fa3 */
  c?: string;
}

export interface AuroraFlairOptions {
  colors: Required<AuroraFlairColors>;
  /** Blur radius in px applied to the entire flair layer (default: 18) */
  blur: number;
  /** CSS saturate() filter value (default: 1.3) */
  saturate: number;
  /** Enable magnetic char-parallax on text nodes (default: true) */
  magneticChars: boolean;
  /** Strength multiplier for magnetic pull (default: 0.12) */
  magneticStrength: number;
  /** Distance in px at which pull fades to zero (default: 140) */
  magneticRadius: number;
  /** GSAP ease for cursor-tracking tween (default: "power2") */
  trackEase: string;
  /** GSAP ease for enter / leave scale tween (default: "power2.out") */
  scaleEase: string;
}

export interface AuroraFlairProps
  extends Partial<Omit<AuroraFlairOptions, "colors">> {
  /** Single child element that receives the aurora effect */
  children: ReactElement;
  colors?: AuroraFlairColors;
  /** Extra class names applied to the outermost wrapper div */
  className?: string;
  /** Inline styles applied to the outermost wrapper div */
  style?: CSSProperties;
}

// ─── Shared CSS string (can also be imported for vanilla-JS use) ──────────────

export const AURORA_FLAIR_CSS = /* css */ `
  /* Host wrapper — overflow:hidden clips the flair to the element's bounds */
  .af-host {
    position: relative;
    overflow: hidden;
    isolation: isolate;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* Flair canvas — sits below content */
  .af-flair {
    position: absolute;
    inset: 0;
    z-index: 1;
    transform: scale(0);
    transform-origin: 0 0;
    mix-blend-mode: screen;
  }

  /* Orbs — common base */
  .af-orb {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    transform: translate(-50%, -50%);
  }
  .af-orb--a { width: 85%; }
  .af-orb--b { width: 60%; transform: translate(-65%, -35%); }
  .af-orb--c { width: 55%; transform: translate(-30%, -65%); }

  /* Content slot — floats above flair */
  .af-content {
    position: relative;
    z-index: 2;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
  }

  /* Per-character spans injected by letterize() */
  .af-char {
    display: inline-block;
    will-change: transform;
  }
`;

// ─── CSS injection (once per document lifetime) ───────────────────────────────

const STYLE_ID = "aurora-flair-styles-v1";

function injectStyles(): void {
  if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
  const el = document.createElement("style");
  el.id = STYLE_ID;
  el.textContent = AURORA_FLAIR_CSS;
  document.head.appendChild(el);
}

// ─── Letterize helper ─────────────────────────────────────────────────────────

/**
 * Wraps each character inside an element's text nodes with `.af-char` spans.
 * Preserves nested elements — only leaf text nodes are touched.
 *
 * @param root  The element whose text content should be letterized
 */
export function letterize(root: HTMLElement): void {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const trimmed = node.textContent?.trim() ?? "";
      const parent = node.parentElement;
      if (!trimmed || parent?.classList.contains("af-char")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const collected: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) collected.push(node as Text);

  collected.forEach((textNode) => {
    const parent = textNode.parentElement!;
    const frag = document.createDocumentFragment();
    (textNode.textContent ?? "").split("").forEach((ch) => {
      const span = document.createElement("p");
      span.className = "af-char";
      span.textContent = ch === " " ? "\u00A0" : ch;
      frag.appendChild(span);
    });
    parent.replaceChild(frag, textNode);
  });
}

// ─── Core controller (framework-agnostic) ────────────────────────────────────

/**
 * Pure imperative class — no React dependency.
 * Can be used directly in vanilla JS once the CSS is injected.
 */
export class AuroraFlairController {
  private readonly el: HTMLElement;
  private readonly flair: HTMLElement;
  private chars: HTMLElement[] = [];
  private readonly xSet: (v: number) => void;
  private readonly ySet: (v: number) => void;
  private readonly opts: AuroraFlairOptions;

  // Bound handlers stored for removeEventListener
  private readonly _onEnter: (e: MouseEvent) => void;
  private readonly _onLeave: (e: MouseEvent) => void;
  private readonly _onMove: (e: MouseEvent) => void;

  constructor(el: HTMLElement, flair: HTMLElement, opts: AuroraFlairOptions) {
    this.el = el;
    this.flair = flair;
    this.opts = opts;

    // Apply dynamic filter style
    flair.style.filter = `blur(${opts.blur}px) saturate(${opts.saturate})`;

    // Collect chars (letterize must have run before calling constructor)
    this.chars = Array.from(el.querySelectorAll<HTMLElement>(".af-char"));

    // quickSetter: bypasses tween overhead, used to instantly snap position on enter
    this.xSet = gsap.quickSetter(flair, "xPercent") as (v: number) => void;
    this.ySet = gsap.quickSetter(flair, "yPercent") as (v: number) => void;

    this._onEnter = (e) => this._handleEnter(e);
    this._onLeave = (e) => this._handleLeave(e);
    this._onMove = (e) => this._handleMove(e);

    el.addEventListener("mouseenter", this._onEnter);
    el.addEventListener("mouseleave", this._onLeave);
    el.addEventListener("mousemove", this._onMove);
  }

  /** Remove listeners and kill all active tweens */
  destroy(): void {
    this.el.removeEventListener("mouseenter", this._onEnter);
    this.el.removeEventListener("mouseleave", this._onLeave);
    this.el.removeEventListener("mousemove", this._onMove);
    gsap.killTweensOf(this.flair);
    if (this.chars.length) gsap.killTweensOf(this.chars);
  }

  // ── Private helpers ──────────────────────────────────────────────────────

  /** Map raw mouse coords to % position within the host element */
  private _getXY(e: MouseEvent): { x: number; y: number } {
    const { left, top, width, height } = this.el.getBoundingClientRect();
    const xT = gsap.utils.pipe(
      gsap.utils.mapRange(0, width, 0, 100),
      gsap.utils.clamp(0, 100)
    ) as (v: number) => number;
    const yT = gsap.utils.pipe(
      gsap.utils.mapRange(0, height, 0, 100),
      gsap.utils.clamp(0, 100)
    ) as (v: number) => number;
    return { x: xT(e.clientX - left), y: yT(e.clientY - top) };
  }

  private _handleEnter(e: MouseEvent): void {
    const { x, y } = this._getXY(e);
    // Instant snap to entry point — prevents flair sliding from center
    this.xSet(x);
    this.ySet(y);
    gsap.to(this.flair, {
      scale: 1,
      duration: 0.5,
      ease: this.opts.scaleEase,
    });
  }

  private _handleLeave(e: MouseEvent): void {
    const { x, y } = this._getXY(e);
    gsap.killTweensOf(this.flair);

    // Push the flair a little past the edge it exited from for a natural fade
    const exitX = x > 90 ? x + 20 : x < 10 ? x - 20 : x;
    const exitY = y > 90 ? y + 20 : y < 10 ? y - 20 : y;
    gsap.to(this.flair, {
      xPercent: exitX,
      yPercent: exitY,
      scale: 0,
      duration: 0.35,
      ease: this.opts.scaleEase,
    });

    if (this.opts.magneticChars && this.chars.length) {
      gsap.to(this.chars, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1,0.5)",
        stagger: 0.01,
      });
    }
  }

  private _handleMove(e: MouseEvent): void {
    const { x, y } = this._getXY(e);

    // Track flair position with smooth lag
    gsap.to(this.flair, {
      xPercent: x,
      yPercent: y,
      duration: 0.45,
      ease: this.opts.trackEase,
    });

    if (!this.opts.magneticChars || !this.chars.length) return;

    const rect = this.el.getBoundingClientRect();
    const { magneticStrength: str, magneticRadius: rad } = this.opts;

    this.chars.forEach((char) => {
      const cr = char.getBoundingClientRect();
      // Center of this char relative to the host element
      const cx = cr.left + cr.width / 2 - rect.left;
      const cy = cr.top + cr.height / 2 - rect.top;
      const relX = e.clientX - rect.left - cx;
      const relY = e.clientY - rect.top - cy;
      const dist = Math.hypot(relX, relY);
      // pull → 0 at distance >= rad, pull → 1 at center
      const pull = gsap.utils.clamp(0, 1, 1 - dist / rad) as number;

      gsap.to(char, {
        x: -relX * str * pull,
        y: -relY * str * pull,
        duration: 0.4,
        ease: "power2.out",
      });
    });
  }
}

// ─── Default option values ────────────────────────────────────────────────────

const DEFAULTS: AuroraFlairOptions = {
  colors: { a: "#8b6bff", b: "#35e6c9", c: "skyblue" },
  blur: 13,
  saturate: 1.3,
  magneticChars: true,
  magneticStrength: 0.12,
  magneticRadius: 140,
  trackEase: "power2",
  scaleEase: "power2.out",
};

// ─── React component ──────────────────────────────────────────────────────────

/**
 * Drop any element inside — the aurora flair effect attaches automatically.
 *
 * IMPORTANT: The child element must accept a forwarded ref **or** be a
 * plain HTML element. If you wrap a custom component that doesn't forward
 * refs, pass `asChild={false}` and let `<AuroraFlair>` create its own
 * wrapper div (the default behaviour).
 */
export function AuroraFlair({
  children,
  colors,
  blur = DEFAULTS.blur,
  saturate = DEFAULTS.saturate,
  magneticChars = DEFAULTS.magneticChars,
  magneticStrength = DEFAULTS.magneticStrength,
  magneticRadius = DEFAULTS.magneticRadius,
  trackEase = DEFAULTS.trackEase,
  scaleEase = DEFAULTS.scaleEase,
  className = "",
  style,
}: AuroraFlairProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const flairRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<AuroraFlairController | null>(null);

  const mergedColors: Required<AuroraFlairColors> = {
    ...DEFAULTS.colors,
    ...colors,
  };

  // Inject shared CSS once
  useEffect(() => {
    injectStyles();
  }, []);

  // Mount controller
  useEffect(() => {
    const host = hostRef.current;
    const flair = flairRef.current;
    const content = contentRef.current;
    if (!host || !flair || !content) return;

    // Letterize leaf text nodes inside the content slot
    if (magneticChars) letterize(content);

    const opts: AuroraFlairOptions = {
      colors: mergedColors,
      blur,
      saturate,
      magneticChars,
      magneticStrength,
      magneticRadius,
      trackEase,
      scaleEase,
    };

    controllerRef.current = new AuroraFlairController(host, flair, opts);

    return () => {
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
    // Intentionally run only on mount — changing props mid-flight would
    // require destroy/remount; use a key prop for that pattern instead.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={hostRef}
      className={`af-host ${className}`.trim()}
      style={style}
    >
      {/* ── Flair layer (aurora orbs) ───────────────────────────────────── */}
      <div ref={flairRef} className="af-flair">
        <span className="af-orb af-orb--a" style={{ background: mergedColors.a }} />
        <span className="af-orb af-orb--b" style={{ background: mergedColors.b }} />
        <span className="af-orb af-orb--c" style={{ background: mergedColors.c }} />
      </div>

      {/* ── Content slot (child element) ────────────────────────────────── */}
      <div ref={contentRef} className="af-content">
        {children}
      </div>
    </div>
  );
}

export default AuroraFlair;
