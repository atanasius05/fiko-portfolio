import ScrollStack, { ScrollStackItem } from "./ScrollStack";

/**
 * Satu lembar "kertas" berwarna di dalam tumpukan.
 * - bg  : warna dasar kertas (pastel)
 * - ink : warna tinta teks agar kontras di atas kertas
 */
interface Paper {
  tag: string;
  title: string;
  body: string;
  bg: string;
  ink: string;
}

/** Isi tiap kertas. */
const papers: Paper[] = [
  {
    tag: "note 01",
    title: "Start messy.",
    body: "Ideas never arrive tidy. I sketch first and refine after — a rough sheet beats a blank canvas.",
    bg: "#FFF1A8",
    ink: "#5b4708",
  },
  {
    tag: "note 02",
    title: "Ship small.",
    body: "Tiny releases teach faster than big bangs. Get it out, watch how people use it, then iterate.",
    bg: "#FFCFDC",
    ink: "#7a1f3d",
  },
  {
    tag: "note 03",
    title: "Ask why.",
    body: "Every screen has to earn its place. If a feature doesn't help someone do something, it goes.",
    bg: "#C6F6D5",
    ink: "#14532d",
  },
  {
    tag: "note 04",
    title: "Stay human.",
    body: "Warmth beats cleverness. Interfaces should feel like a friendly handshake, not a puzzle.",
    bg: "#CBE4FF",
    ink: "#123a5c",
  },
  {
    tag: "note 05",
    title: "Learn out loud.",
    body: "Share the process, not just the result. The messy middle is usually the most useful part.",
    bg: "#E4D4FF",
    ink: "#3b2a6b",
  },
];

/**
 * Section "Field notes" di bawah SelectedWork.
 * Menampilkan beberapa "kertas warna-warni" yang ditumpuk memakai komponen
 * ScrollStack (tumpukan mengikuti scroll halaman / window).
 */
export default function PaperStack() {
  return (
    <section className="relative z-10 w-full px-4 py-24 sm:px-8">
      {/* ---------------- Header ---------------- */}
      <div className="mx-auto mb-16 max-w-xl text-center">
        {/* "scribbles from my desk" — Gochi Hand */}
        <p
          className="mb-4 text-3xl text-neutral-700 sm:text-4xl"
          style={{
            fontFamily: '"Gochi Hand", cursive',
            transform: "rotate(-2deg)",
            display: "inline-block",
          }}
        >
          scribbles from my desk
        </p>

        {/* "Field notes (05)" — Inter Tight besar + JetBrains merah */}
        <h2 className="text-[clamp(2.5rem,8vw,5rem)] font-black leading-[0.95] tracking-tight text-neutral-900">
          <span style={{ fontFamily: '"Inter Tight", sans-serif' }}>Field notes</span>{" "}
          <span
            className="align-top text-[0.45em] font-bold text-red-600"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            (07)
          </span>
        </h2>

        <p
          className="mx-auto mt-6 max-w-md text-base leading-relaxed text-neutral-500 sm:text-lg"
          style={{ fontFamily: '"Inter Tight", sans-serif' }}
        >
          A little pile of things I keep coming back to. Scroll on and watch the sheets
          stack up.
        </p>
      </div>

      {/* ---------------- Tumpukan kertas ---------------- */}
      <div className="mx-auto max-w-2xl">
        <ScrollStack
          useWindowScroll
          itemDistance={70}
          itemStackDistance={30}
          stackPosition="18%"
          itemScale={0.045}
          baseScale={0.86}
          dimAmount={0.16}
          blurAmount={1.2}
          rotationAmount={2}
          holdDistance={220}
        >
          {papers.map((paper) => (
            <ScrollStackItem
              key={paper.tag}
              style={{
                backgroundColor: paper.bg,
                color: paper.ink,
                borderRadius: "16px",
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.65) inset, 0 -12px 34px -18px rgba(0,0,0,0.28), 0 22px 44px -24px rgba(0,0,0,0.35)",
              }}
            >
              {/* Selotip di bagian atas kertas */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 left-1/2 h-7 w-28 -translate-x-1/2 -rotate-2 rounded-[2px] bg-white/45 shadow-sm"
              />

              <span
                className="text-xs font-semibold uppercase tracking-[0.2em] opacity-70"
                style={{ fontFamily: '"JetBrains Mono", monospace' }}
              >
                {paper.tag}
              </span>

              <h3
                className="mt-6 text-4xl sm:text-5xl"
                style={{ fontFamily: '"Gochi Hand", cursive' }}
              >
                {paper.title}
              </h3>

              <p
                className="mt-5 max-w-md text-lg leading-relaxed opacity-80"
                style={{ fontFamily: '"Inter Tight", sans-serif' }}
              >
                {paper.body}
              </p>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
