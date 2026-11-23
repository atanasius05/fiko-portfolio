import type { CSSProperties, ReactNode } from "react";

import ScrollReveal from "./ScrollReveal";

// import heroImg from "../assets/hero.png";
import faceImg from "../assets/right.jpg";
import faceImg2 from "../assets/left.jpg";

/**
 * Font Inter Display untuk seluruh section ini, termasuk teks ScrollReveal
 * (diwarisi lewat `style` pada <section>).
 * Nama keluarga "InterDisplay" sesuai definisi font-face di
 * inter-display-latin.css yang dimuat dari index.html. Terakhir sans-serif bawaan.
 */
const interDisplay: CSSProperties = {
  fontFamily: '"InterDisplay", sans-serif',
};

/**
 * Posisi 4 handle di sudut frame "what's up".
 * Offset -7px = setengah ukuran handle (6px) + setengah tebal garis (1px)
 * supaya titik tengah handle pas berada di garis frame.
 */
const handlePositions = [
  "-left-[7px] -top-[7px]",
  "-right-[7px] -top-[7px]",
  "-bottom-[7px] -left-[7px]",
  "-bottom-[7px] -right-[7px]",
];

/* ------------------------------------------------------------------ */
/* Ikon tile untuk tiap skill (SVG 48x48, mengisi penuh kotaknya)      */
/* ------------------------------------------------------------------ */

/** Interaction Design: latar kuning, garis putus-putus, 4 kotak hitam. */
function InteractionIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
      <rect width="48" height="48" fill="#E5194F" />
      <rect
        x="1.5"
        y="1.5"
        width="45"
        height="45"
        fill="none"
        stroke="#2b2b2b"
        strokeWidth="2"
        strokeDasharray="6 4"
      />
      {/* 4 kotak berputar di pusat ikon (24,24) */}
      <g
        fill="#fff"
        className="origin-center animate-spin [transform-box:view-box] [animation-duration:3s] motion-reduce:animate-none"
      >
        <rect x="12" y="12" width="11" height="11" rx="1.5" />
        <rect x="25" y="12" width="11" height="11" rx="1.5" />
        <rect x="12" y="25" width="11" height="11" rx="1.5" />
        <rect x="25" y="25" width="11" height="11" rx="1.5" />
      </g>
    </svg>
  );
}

/** Prototyping: latar hijau, sinar hitam menyebar, lingkaran merah di tengah. */
function PrototypingIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
      <rect width="48" height="48" fill="#E5194F" />
      {/* Sinar berputar pelan mengelilingi titik merah.
          [transform-box:view-box] + origin-center = berputar di pusat ikon (24,24).
          Ganti 8s untuk mengatur kecepatan (makin kecil makin cepat). */}
      <g
        fill="#111"
        className="origin-center animate-spin [transform-box:view-box] [animation-duration:3s] motion-reduce:animate-none"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <polygon
            key={i}
            points="24,10 20,-12 28,-4"
            transform={`rotate(${i * 45} 24 24)`}
          />
        ))}
      </g>
      <circle cx="24" cy="24" r="9" fill="#fff" />
    </svg>
  );
}

/** User Research: latar merah muda, mata putih dengan pupil berlian kuning. */
function ResearchIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
      <rect width="48" height="48" fill="#E5194F" />
      {/* Tinggi mata = tinggi bintang (y 12 → 36) */}
      <path d="M4 24 Q24 0 44 24 Q24 48 4 24 Z" fill="#fff" />
      {/* Bintang 4 titik: sisi-sisinya melengkung ke dalam (kurva Q menuju pusat) */}
      <g className="origin-center animate-spin [transform-box:view-box] [animation-duration:3s] motion-reduce:animate-none">
        <path
          d="M24 12 Q27 21 36 24 Q27 27 24 36 Q21 27 12 24 Q21 21 24 12 Z"
          fill="#F5B800"
        />
      </g>
      <circle cx="24" cy="24" r="2.4" fill="#E5194F" />
    </svg>
  );
}

/** Visual Design: latar biru muda, titik hitam dan merah muda. */
function VisualIcon() {
  return (
    <svg viewBox="0 0 48 48" className="size-full" aria-hidden="true">
      <rect width="48" height="48" fill="#E5194F" />
      {/* 4 titik bulat di sudut sebuah persegi imajiner */}
      <g className="origin-center animate-spin [transform-box:view-box] [animation-duration:3s] motion-reduce:animate-none">
        <circle cx="16" cy="16" r="6" fill="#EDAE2A" />
        <circle cx="32" cy="16" r="6" fill="#111" />
        <circle cx="16" cy="32" r="6" fill="#111" />
        <circle cx="32" cy="32" r="6" fill="#EDAE2A" />
      </g>
    </svg>
  );
}

type Skill = {
  label: string;
  bg: string; // warna latar label
  fg: string; // warna teks label
  icon: ReactNode; // tile ikon di sebelah kanan label
};

/**
 * Label skill di bagian bawah section: blok warna datar + tile ikon persegi.
 * Disusun 2 baris (2 skill per baris).
 */
const skills: Skill[] = [
  { label: "Clean Code", bg: "#E5194F", fg: "#fff", icon: <InteractionIcon /> },
  { label: "Prototyping", bg: "#E5194F", fg: "#fff", icon: <PrototypingIcon /> },
  { label: "Problem Solver", bg: "#E5194F", fg: "#fff", icon: <ResearchIcon /> },
  { label: "Visual Design", bg: "#E5194F", fg: "#fff", icon: <VisualIcon /> },
];

const skillRows = [skills.slice(0, 2), skills.slice(2)];

/**
 * Section "about me" yang muncul di bawah hero opening.
 * Berisi sapaan "what's up" di dalam frame, kalimat pengantar dengan aksen,
 * dua foto polaroid di sisi kiri/kanan, dan label skill di bawah.
 */
export default function AboutIntro() {
  return (
    <section
      className="relative z-10 flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-4 py-20 text-black sm:px-8"
      style={interDisplay}
    >
      {/* Frame "what's up" bergaya kotak transformasi Photoshop:
          garis hitam tebal (2px) + handle kotak di keempat sudut. */}
      <div className="relative mb-10 border-1 border-red-400 px-6 py-2 sm:px-8 sm:py-3">
        {/* Teks ini memakai font Flux (wordmark), bukan Inter Display bawaan section. */}
        <span
          className="text-4xl font-semibold tracking-wide text-black sm:text-4xl"
          style={{ fontFamily: '"Flux", sans-serif', fontWeight: 900 }}
        >
          WHAT&apos;S UP
        </span>

        {handlePositions.map((position) => (
          <span
            key={position}
            aria-hidden="true"
            className={`pointer-events-none absolute size-3 border-2 border-red-600 bg-white ${position}`}
          />
        ))}
      </div>

      {/* Konten utama: teks pengantar di tengah */}
      <div className="relative flex w-full max-w-6xl items-center justify-center gap-4 sm:gap-10">
        <div className="hidden w-[140px] shrink-0 -rotate-6 bg-white p-2 shadow-lg sm:block sm:w-[170px]">
          <img
            src={faceImg}
            alt="Foto polaroid 2026"
            className="h-[140px] w-full object-cover sm:h-[170px]"
          />
          <p className="caveat-font mt-1 text-center text-lg text-black">2026</p>
        </div>
       

        {/* Teks pengantar — terungkap kata demi kata mengikuti scroll (ScrollReveal).
            Kata di dalam <strong> tetap tebal. Hapus `highlightColor` jika tidak
            ingin kata berpendar merah saat muncul. */}
        <ScrollReveal
          containerClassName="max-w-[786px] text-center text-2xl font-medium leading-[1.35] tracking-tight text-black sm:text-4xl sm:leading-[1.15] md:text-5xl"
          highlightColor="#e03131"
          mode="scrub"
          splitBy="lines"
          effect="rise"
          stagger={0.1}
          baseOpacity={0.1}
          baseRotation={7}
          enableBlur
          blurStrength={4}
        >
          {"I'm Fiko, a "}
          <strong>Fullstack Developer & UI/UX Designer</strong>
          {" who gets excited about making complicated things "}
          <strong>simple.</strong>
        </ScrollReveal>

        {/* Polaroid kanan — disembunyikan sementara */}
        <div className="hidden w-[140px] shrink-0 rotate-6 bg-white p-2 shadow-lg sm:block sm:w-[170px]">
          <img
            src={faceImg2}
            alt="Foto polaroid workspace"
            className="h-[140px] w-full object-cover sm:h-[170px]"
          />
          <p className="caveat-font mt-1 text-center text-lg text-black">2026</p>
        </div>
       
      </div>

      {/* Label skill di bawah: 2 baris, tiap skill = blok label + tile ikon persegi */}
      <div className="mt-12 flex flex-col items-center gap-3">
        {skillRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-3"
          >
            {row.map((skill) => (
              <div key={skill.label} className="flex h-10 items-stretch gap-1.5 sm:h-12">
                <span
                  className="flex items-center px-3 text-lg font-medium tracking-tight sm:px-4 sm:text-[32px]"
                  style={{ backgroundColor: skill.bg, color: skill.fg }}
                >
                  {skill.label}
                </span>
                <span className="aspect-square h-full overflow-hidden">{skill.icon}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}