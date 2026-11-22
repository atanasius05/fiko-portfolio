import { useEffect, useRef } from "react";

type RulerProps = {
  /** "top": ticks hang from the top edge (put it under the navbar).
   *  "bottom": ticks rise from the bottom edge (put it at the page bottom). */
  position?: "top" | "bottom";
  className?: string;
};

// Value range drawn in the strip. Wide enough for screens up to ~4000px.
const MIN = -2500;
const MAX = 6000;
const STEP = 50; // a tick every 50
const LABEL_EVERY = 100; // a number every 100

// Visible start value at the cursor extremes:
// cursor far left  -> ruler starts at +2000 (shows 2000++)
// cursor center    -> ruler starts at 0
// cursor far right -> ruler starts at -2000 (shows 0 and negative numbers)
const RANGE = 2000;

// Follow speed per frame: lower = slower and smoother (0.12 was the old value,
// 1 = instant). Try 0.02 for very slow, 0.08 for a bit quicker.
const EASE = 0.003;

// Static ticks, built once.
const ticks: number[] = [];
for (let v = MIN; v <= MAX; v += STEP) ticks.push(v);

/**
 * Horizontal ruler. The numbers slide with the cursor's X position:
 * moving the cursor left counts up (2000++), moving it right counts
 * down through 0 into negative numbers.
 *
 * It animates through refs and direct DOM writes, so mouse movement
 * never triggers a React re-render.
 */
export default function Ruler({ position = "top", className = "" }: RulerProps) {
  const stripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduceMotion ? 1 : EASE;

    let current = 0; // value currently shown at the left edge
    let target = 0; // value we are easing toward
    let raf: number | null = null;

    const render = () => {
      // value v sits at (v - MIN)px inside the strip, so shifting the strip
      // by (MIN - start) puts value `start` on the left edge of the ruler.
      strip.style.transform = `translate3d(${MIN - current}px, 0, 0)`;
    };

    const tick = () => {
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.05) {
        current = target;
        raf = null;
      } else {
        raf = requestAnimationFrame(tick);
      }
      render();
    };

    const onMove = (e: MouseEvent) => {
      const ratio = e.clientX / window.innerWidth; // 0 = left, 1 = right
      target = RANGE - ratio * RANGE * 2;
      if (raf === null) raf = requestAnimationFrame(tick);
    };

    // Cursor left the page: freeze the ruler right where it is.
    // It starts moving again on the next mousemove after the cursor returns.
    const onLeave = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
      target = current;
    };

    render();
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      if (raf !== null) cancelAnimationFrame(raf);
    };
  }, []);

  const isTop = position === "top";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-10 w-full select-none overflow-hidden bg-white font-mono text-[10px] text-neutral-400 ${
        isTop ? "border-b" : "border-t"
      } border-neutral-300 ${className}`}
    >
      <div
        ref={stripRef}
        className="absolute inset-y-0 left-0 will-change-transform"
        style={{ width: MAX - MIN }}
      >
        {ticks.map((v) => {
          const x = v - MIN;
          const hasLabel = v % LABEL_EVERY === 0;
          return (
            <div key={v}>
              <span
                className={`absolute w-px bg-neutral-300 ${
                  isTop ? "top-0" : "bottom-0"
                } h-2.5`}
                style={{ left: x }}
              />
              {hasLabel && (
                <span
                  className={`absolute -translate-x-1/2 leading-none ${
                    isTop ? "top-4" : "bottom-4"
                  }`}
                  style={{ left: x }}
                >
                  {v}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}