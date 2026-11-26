import Folder from "./Folder";
import { projects } from "./projectData";

/**
 * Section "Selected Work" di bawah AboutIntro.
 * Layout dua kolom: header (kiri) + folder proyek (kanan).
 *
 * Tipografi:
 * - "explore my work"  → Gochi Hand
 * - "Selected work"    → Inter Tight
 * - "(05)"             → JetBrains Mono
 * - caption            → Inter Tight
 * - "PICK A CARD OR SCROLL" → JetBrains Mono
 * - "pick one →"       → Gochi Hand
 */

export default function SelectedWork() {
  return (
    <section className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-center gap-12 px-4 py-24 sm:px-8 lg:flex-row lg:gap-8 lg:px-14">
      {/* ---------------- KIRI: header ---------------- */}
      <div className="w-full max-w-xl lg:flex-1">
        {/* "explore my work" — Gochi Hand, sedikit miring */}
        <p
          className="mb-4 text-3xl text-neutral-700 sm:text-4xl"
          style={{
            fontFamily: '"Gochi Hand", cursive',
            transform: "rotate(-2deg)",
            display: "inline-block",
          }}
        >
          explore my work!
        </p>

        {/* "Selected work (05)" — Inter Tight besar + JetBrains merah */}
        <h2 className="text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.95] tracking-tight text-neutral-900">
          <span style={{ fontFamily: '"Inter Tight", sans-serif' }}>Selected</span>
          <br />
          <span style={{ fontFamily: '"Inter Tight", sans-serif' }}>work</span>{" "}
          <span
            className="align-top text-[0.45em] font-bold text-red-600"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            (07)
          </span>
        </h2>

        {/* Caption — Inter Tight */}
        <p
          className="mt-6 max-w-md text-base leading-relaxed text-neutral-500 sm:text-lg"
          style={{ fontFamily: '"Inter Tight", sans-serif' }}
        >
          This is a showcase of what happens when curiosity drives the process. Every
          project below is a working prototype, so go ahead and tap things.
        </p>

        {/* "— PICK A CARD OR SCROLL" — JetBrains Mono */}
        <div className="mt-8 flex items-center gap-3">
          <span className="h-px w-8 bg-neutral-900" />
          <span
            className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-900 sm:text-sm"
            style={{ fontFamily: '"JetBrains Mono", monospace' }}
          >
            pick a card or scroll
          </span>
        </div>
      </div>

      {/* ---------------- KANAN: folder proyek ---------------- */}
      <div className="relative flex w-full max-w-lg flex-col items-center justify-center lg:flex-1">
        {/* "← pick one" — Gochi Hand, di atas folder agar tidak tumpang tindih */}
        <p
          className="z-40 mr-4 self-end text-2xl text-neutral-800 sm:text-3xl"
          style={{
            fontFamily: '"Gochi Hand", cursive',
            transform: "rotate(-3deg)",
          }}
        >
          ← pick one
        </p>

        {/* Wrapper diberi ruang atas agar lembar dokumen yang menyebar tidak menabrak teks */}
        <div className="pt-20">
          <Folder
            items={projects}
            label="Project Works"
            color="#911616ff"
            mode="flap"
            variant="solid"
            layout="row"
            size={1.4}
            openOn="click"
            draggable
            zoomOnClick
            intro
          />
        </div>
      </div>
    </section>
  );
}
