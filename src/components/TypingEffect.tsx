import { useEffect, useRef, useCallback, type ReactNode } from "react";
import gsap from "gsap";

interface TypingLoopProps {
  words?: string[];
  prefix?: string;
  className?: string;
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseAfterType?: number;
  pauseAfterDelete?: number;
  textClassName?: string;
  cursorChar?: string;
  cursorClassName?: string;
}

interface TypingState {
  wordIndex: number;
  charIndex: number;
  isDeleting: boolean;
  tween: gsap.core.Tween | null;
}

interface MeasuredSlotProps {
  words: string[];
  children: ReactNode;
}

const DEFAULT_WORDS = ["Designers", "Developers", "Creators", "Students", "Dreamers"];

export default function TypingLoop({
  words = DEFAULT_WORDS,
  // prefix = "We build\u00A0",
  className = "",
  typeSpeed = 0.07,
  deleteSpeed = 0.04,
  pauseAfterType = 1,
  pauseAfterDelete = 0.2,
  cursorChar = "|",
  cursorClassName = "",
}: TypingLoopProps) {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  const stateRef = useRef<TypingState>({
    wordIndex: 0,
    charIndex: 0,
    isDeleting: false,
    tween: null,
  });

  const tick = useCallback(() => {
    const el = textRef.current;

    if (!el) return;

    const s = stateRef.current;
    const word = words[s.wordIndex];

    if (!s.isDeleting) {
      // Typing
      s.charIndex++;

      el.textContent = word.slice(0, s.charIndex);

      const jitter = s.charIndex === 1 ? typeSpeed * 1.6 : typeSpeed;

      if (s.charIndex === word.length) {
        s.isDeleting = true;

        s.tween = gsap.delayedCall(pauseAfterType, tick);
      } else {
        s.tween = gsap.delayedCall(jitter, tick);
      }
    } else {
      // Deleting
      s.charIndex--;

      el.textContent = word.slice(0, s.charIndex);

      if (s.charIndex === 0) {
        s.isDeleting = false;

        s.wordIndex = (s.wordIndex + 1) % words.length;

        s.tween = gsap.delayedCall(pauseAfterDelete, tick);
      } else {
        s.tween = gsap.delayedCall(deleteSpeed, tick);
      }
    }
  }, [words, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete]);

  useEffect(() => {
    const s = stateRef.current;

    s.wordIndex = 0;
    s.charIndex = 0;
    s.isDeleting = false;

    if (s.tween) {
      s.tween.kill();
      s.tween = null;
    }

    s.tween = gsap.delayedCall(0.5, tick);

    const cursorTween = gsap.to(cursorRef.current, {
      opacity: 0,
      repeat: -1,
      yoyo: true,
      duration: 0.52,
      ease: "sine.inOut",
    });

    return () => {
      if (stateRef.current.tween) {
        stateRef.current.tween.kill();
      }

      cursorTween.kill();
    };
  }, [tick]);

  return (
    <div className="flex justify-center items-center">
      <h1
        className={[
          "text-3xl sm:text-5xl md:text-5xl lg:text-6xl whitespace-nowrap",
          "tracking-tight",
          "flex flex-wrap justify-center items-center gap-x-2",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* <span className="whitespace-nowrap text-center">{prefix}</span> */}

        <MeasuredSlot words={words}>
          <span ref={textRef} aria-live="polite" aria-atomic="true" />

          <span ref={cursorRef} className={cursorClassName} aria-hidden="true">
            {cursorChar}
          </span>
        </MeasuredSlot>
      </h1>
    </div>
  );
}

function MeasuredSlot({ words, children }: MeasuredSlotProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);

  const rulerRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const ruler = rulerRef.current;
    const container = containerRef.current;

    if (!ruler || !container) return;

    const maxWidth = ruler.scrollWidth;

    container.style.width = `${maxWidth}px`;
  }, [words]);

  return (
    <span className="relative inline-flex items-center">
      {/* Invisible ruler */}
      <span
        ref={rulerRef}
        aria-hidden="true"
        className="invisible absolute whitespace-nowrap pointer-events-none"
        style={{ left: 0, fontWeight: 800 }}
      >
        {words.map((word, index) => (
          <span key={index} className="block">
            {word}
          </span>
        ))}
      </span>

      {/* Visible content */}
      <span
        ref={containerRef}
        style={{ fontWeight: "700 !important" }}
        className="inline-flex items-center whitespace-nowrap gradient-text leading-tight"
      >
        {children}
      </span>
    </span>
  );
}
