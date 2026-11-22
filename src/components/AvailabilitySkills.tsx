import { useRef, type PointerEvent } from "react";

import RotatingText from "./RotatingText";

/** Teks yang bergantian pada pill status ketersediaan. */
const availabilityTexts = [
  "CONTRACT WORK",
  "FULLTIME WORK",
  "THOUGHTFUL PROJECTS",
  "HARD DESIGN PROBLEMS",
];

/**
 * Daftar bidang keahlian.
 * `color` adalah warna latar label saat normal (saat di-hover berubah jadi
 * warna highlight #ff8585, sama seperti highlight pada teks yang berputar).
 * `tooltip` adalah keterangan singkat yang muncul saat di-hover.
 */
const skills = [
  {
    label: "FULLSTACK DEVELOPER",
    color: "bg-[#8d0004]",
    tooltip: "Bangun sistem solid dari belakang sampai depan",
  },
  {
    label: "UI / UX DESIGN",
    color: "bg-[#8d0004]",
    tooltip: "Rancang tampilan rapi yang bikin user betah",
  },
  {
    label: "GRAPHIC DESIGN",
    color: "bg-[#8d0004]",
    tooltip: "Visual bercerita yang langsung curi perhatian",
  },
  {
    label: "PROTOTYPING",
    color: "bg-[#8d0004]",
    tooltip: "Sulap ide mentah jadi produk siap uji",
  },
];

type Skill = (typeof skills)[number];

// Easing "pegas": sedikit melampaui target lalu kembali, memberi kesan membal.
const SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";

// Gerak (naik, putar, membesar) pakai pegas; warna & bayangan pakai ease-out biasa
// supaya warnanya tidak berkedip melebihi batas.
const tagTransition = [
  `translate 350ms ${SPRING}`,
  `rotate 350ms ${SPRING}`,
  `scale 350ms ${SPRING}`,
  "box-shadow 200ms ease-out",
  "background-color 200ms ease-out",
  "color 200ms ease-out",
].join(", ");

// Tooltip: opacity cepat (150ms) sementara blur & geser lebih lambat (300ms),
// jadi teks muncul dulu agak buram lalu perlahan menajam. Semua ease-out.
const tooltipTransition =
  "[transition:opacity_150ms_ease-out,filter_300ms_ease-out,transform_300ms_ease-out]";

/**
 * Satu label skill bergaya "tag" brutalist (border hitam + bayangan keras)
 * sesuai tema situs. Saat di-hover: terangkat, lurus, membesar, berubah warna,
 * ada kilau yang menyapu, dan miring mengikuti posisi mouse (3D tilt).
 * Saat ditekan: menekan masuk ke bayangannya seperti tombol fisik.
 */
function SkillTag({ skill, index }: { skill: Skill; index: number }) {
  const tiltRef = useRef<HTMLSpanElement | null>(null);

  const handleMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    // Tilt hanya untuk mouse, dan dilewati bila pengguna memilih mengurangi animasi.
    if (!el || e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 (kiri) .. 0.5 (kanan)
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 (atas) .. 0.5 (bawah)
    el.style.transform = `perspective(500px) rotateX(${(-y * 16).toFixed(1)}deg) rotateY(${(x * 20).toFixed(1)}deg)`;
  };

  const handleLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "";
  };

  return (
    <div
      className="group relative"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {/* Lapisan tilt: hanya mengurus kemiringan 3D mengikuti mouse */}
      <span
        ref={tiltRef}
        className="block transition-transform duration-150 ease-out motion-reduce:transition-none!"
      >
        <span
          className={`${skill.color} ${
            index % 2 === 1 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"
          } relative flex cursor-default items-stretch overflow-hidden border border-black font-mono text-xs font-bold tracking-[0.08em] text-white shadow-[3px_3px_0_#000] group-hover:-translate-y-1.5 group-hover:rotate-0 group-hover:scale-105 group-hover:bg-[#ff8585] group-hover:text-black group-hover:shadow-[6px_7px_0_#000] group-active:translate-y-0.5 group-active:scale-100 group-active:shadow-[1px_1px_0_#000] sm:text-sm motion-reduce:transition-none!`}
          style={{ transition: tagTransition }}
        >
          {/* Nomor urut, berubah jadi hitam saat di-hover */}
          <span className="flex items-center border-r border-black bg-black/25 px-2 text-[10px] transition-colors duration-200 group-hover:bg-black group-hover:text-[#ff8585] sm:px-2.5 sm:text-xs">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="px-3 py-2.5 sm:px-4 sm:py-3">{skill.label}</span>

          {/* Kilau yang menyapu dari kiri ke kanan saat hover (reset instan saat keluar) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-[20deg] bg-white/40 transition-[left] duration-0 ease-out group-hover:left-[130%] group-hover:duration-500"
          />
        </span>
      </span>

      {/* Tooltip — muncul saat hover dengan blur tipis yang menajam (±0,3 detik, ease-out).
          Pakai font Just Me Again Down Here, tanpa box, jarak huruf diperlebar. */}
      <span
        className={`caveat-font pointer-events-none absolute left-1/2 top-full z-10 mt-3 -translate-x-1/2 translate-y-1 whitespace-nowrap text-2xl text-black opacity-0 blur-[3px] ${tooltipTransition} group-hover:translate-y-0 group-hover:opacity-100 group-hover:blur-none motion-reduce:transition-none!`}
        style={{ letterSpacing: "0.01em" }}
      >
        {skill.tooltip}
      </span>
    </div>
  );
}

/**
 * Status ketersediaan dan bidang keahlian yang ditampilkan di bawah wordmark.
 */
export default function AvailabilitySkills() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-[calc(68%-var(--hero-lift,0px))] z-30 flex flex-col items-center px-4">
      <div className="flex flex-wrap items-center justify-center gap-2 font-jetbrains text-xs font-medium tracking-[0.12em] text-black sm:gap-3 sm:text-sm">
        <span className="size-2.5 animate-breathe rounded-full bg-red-500 ring-2 ring-red-200" />
        <span>AVAILABLE FOR</span>
        <RotatingText
          texts={availabilityTexts}
          effect="slide"
          direction="up"
          highlight
          highlightColor="#ff8585"
          rotationInterval={2200}
          staggerDuration={0.02}
          staggerFrom="first"
          splitLevelClassName="overflow-hidden"
          mainClassName="border border-red-900 font-bold tracking-[0.14em] shadow-[2px_3px_0_#7f1d1d]"
        />
      </div>

      {/* Container skill diberi pointer-events-auto supaya hover berfungsi
          meskipun wrapper terluar pakai pointer-events-none. */}
      <div className="pointer-events-auto mt-7 flex max-w-[1040px] flex-wrap justify-center gap-x-5 gap-y-6 sm:mt-9 sm:gap-x-8 sm:gap-y-9">
        {skills.map((skill, index) => (
          <SkillTag key={skill.label} skill={skill} index={index} />
        ))}
      </div>
    </div>
  );
}