import type { CSSProperties } from "react";

import ScrollReveal from "./ScrollReveal";

// import heroImg from "../assets/hero.png";
// import faceImg from "../assets/face.jpg";

/**
 * Font Inter Display untuk seluruh section ini.
 * "Inter Display Placeholder" adalah font cadangan; terakhir sans-serif bawaan.
 */
const interDisplay: CSSProperties = {
  fontFamily: '"Inter Display", "Inter Display Placeholder", sans-serif',
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

/**
 * Label skill di bagian bawah section.
 * `color` menggunakan variasi kecerahan merah (monochrome merah).
 */
const skills = [
  { label: "Interaction Design", color: "#ff6b6b", icon: "◆" },
  { label: "Prototyping", color: "#ff8787", icon: "✦" },
  { label: "User Research", color: "#e03131", icon: "◎" },
  { label: "Visual Design", color: "#ff9999", icon: "◈" },
];

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
      <div className="relative mb-10 border-2 border-black px-8 py-4 sm:px-10 sm:py-5">
        <span className="text-2xl font-medium tracking-wide text-black sm:text-3xl">
          what&apos;s up
        </span>

        {handlePositions.map((position) => (
          <span
            key={position}
            aria-hidden="true"
            className={`pointer-events-none absolute size-3 border-2 border-black bg-white ${position}`}
          />
        ))}
      </div>

      {/* Konten utama: teks pengantar di tengah */}
      <div className="relative flex w-full max-w-5xl items-center justify-center gap-4 sm:gap-10">
        {/* Polaroid kiri — disembunyikan sementara
        <div className="hidden w-[140px] shrink-0 -rotate-6 bg-white p-2 shadow-lg sm:block sm:w-[170px]">
          <img
            src={heroImg}
            alt="Foto polaroid 2026"
            className="h-[140px] w-full object-cover sm:h-[170px]"
          />
          <p className="caveat-font mt-1 text-center text-lg text-black">2026</p>
        </div>
        */}

        {/* Teks pengantar — terungkap kata demi kata mengikuti scroll (ScrollReveal).
            Kata di dalam <strong> tetap tebal. Hapus `highlightColor` jika tidak
            ingin kata berpendar merah saat muncul. */}
        <ScrollReveal
          containerClassName="max-w-[680px] text-center text-2xl font-medium leading-[1.35] tracking-tight text-black sm:text-4xl sm:leading-[1.2] md:text-5xl"
          highlightColor="#e03131"
          mode="scrub"
          splitBy="words"
          effect="fade"
          stagger={0.05}
          baseOpacity={0.1}
          baseRotation={3}
          enableBlur
          blurStrength={4}
        >
          {"I'm Fiko, a "}
          <strong>Fullstack Developer</strong>
          {" & Designer who gets excited about making complicated things "}
          <strong>simple.</strong>
        </ScrollReveal>

        {/* Polaroid kanan — disembunyikan sementara
        <div className="hidden w-[140px] shrink-0 rotate-6 bg-white p-2 shadow-lg sm:block sm:w-[170px]">
          <img
            src={faceImg}
            alt="Foto polaroid workspace"
            className="h-[140px] w-full object-cover sm:h-[170px]"
          />
          <p className="caveat-font mt-1 text-center text-lg text-black">my workspace</p>
        </div>
        */}
      </div>

      {/* Label skill di bawah */}
      <div className="mt-12 flex max-w-[900px] flex-wrap items-center justify-center gap-3 sm:gap-4">
        {skills.map((skill) => (
          <div
            key={skill.label}
            className="flex items-center gap-2 border border-black bg-white px-3 py-2 shadow-[2px_3px_0_#000] sm:px-4 sm:py-2.5"
          >
            <span
              className="flex size-5 items-center justify-center text-sm text-white sm:size-6 sm:text-base"
              style={{ backgroundColor: skill.color }}
            >
              {skill.icon}
            </span>
            <span className="text-sm font-bold tracking-wide text-black sm:text-base">
              {skill.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}