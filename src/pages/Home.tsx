import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

import Lanyard from "../components/Lanyard";
import TechText from "../components/TechText";
import Lightfall from "../components/Lightfall";
// import ResumeCard from "../components/ResumeCard";
import AvailabilitySkills from "../components/AvailabilitySkills";
import AboutIntro from "../components/AboutIntro";
import FrontFace from "../assets/Front.png";
import BackFace from "../assets/Back.png";
import StrapImage from "../assets/lanyard.png";

/**
 * Seberapa jauh jam, wordmark "FIKO" (beserta frame-nya), dan AvailabilitySkills
 * digeser ke ATAS. Satu nilai ini mengatur semuanya sekaligus; makin besar
 * makin naik (mis. "2rem" sedikit naik, "6rem" naik banyak, "0rem" = posisi lama).
 */
const HERO_LIFT = "4rem";

/**
 * Format waktu ke zona Asia/Jakarta (WIB) menjadi "HH:MM:SS AM/PM".
 */
function jakartaTime(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }).format(date);
}

/**
 * Jam realtime zona Jakarta. Diperbarui setiap detik.
 */
function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className="font-jetbrains tabular-nums">
      {jakartaTime(now)}
    </time>
  );
}

/**
 * Halaman HOME — titik awal portofolio (route "/").
 * Menampilkan jam WIB (atas), wordmark "Portfolio" beranimasi (TechText),
 * dan komponen Lanyard (kartu ID menggantung).
 */
export default function Home() {
  const [nameFontSize, setNameFontSize] = useState(280);
  const resizeRef = useRef<{
    side: "left" | "right";
    startX: number;
    startSize: number;
  } | null>(null);
  const draggedRef = useRef(false);

  const startResize = (side: "left" | "right", event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    resizeRef.current = { side, startX: event.clientX, startSize: nameFontSize };
    draggedRef.current = false;
    window.addEventListener("pointermove", resizeName);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopResize);
  };

  const resizeName = (event: globalThis.PointerEvent) => {
    const drag = resizeRef.current;
    if (!drag) return;
    if (Math.abs(event.clientX - drag.startX) > 4) draggedRef.current = true;
    const direction = drag.side === "right" ? 1 : -1;
    const size = drag.startSize + (event.clientX - drag.startX) * direction * 0.8;
    setNameFontSize(Math.max(100, Math.min(520, Math.round(size))));
  };

  const stopResize = () => {
    resizeRef.current = null;
    window.removeEventListener("pointermove", resizeName);
    window.removeEventListener("pointerup", stopResize);
    window.removeEventListener("pointercancel", stopResize);
  };

  const clickResize = (side: "left" | "right") => {
    if (draggedRef.current) {
      draggedRef.current = false;
      return;
    }
    setNameFontSize((size) =>
      Math.max(100, Math.min(520, size + (side === "right" ? 20 : -20))),
    );
  };

  return (
    <>
      {/* Latar "bintang jatuh" (Lightfall) FIXED menutupi seluruh halaman,
          sehingga tetap terlihat saat scroll ke section "about me" di bawah.
          `pointer-events-none` supaya tidak menghalangi interaksi kartu/teks. */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Lightfall
          colors={["#330303ff", "#000000ff", "#631414ff"]}
          backgroundColor="#ffffffff"
          speed={0.35}
          streakCount={2}
          streakWidth={1}
          streakLength={2.2}
          twinkle={0.6}
          density={0.5}
          zoom={3.4}
          backgroundGlow={0.05}
          headGlow={0.6}
          depth={0.6}
          bloom={0.5}
          mouseInteraction
          holdToWarp
          intro
        />
      </div>

      {/* `--hero-lift` dibaca oleh jam, wordmark, frame, dan AvailabilitySkills
          (lihat HERO_LIFT di atas) supaya semuanya naik dengan jarak yang sama. */}
      <section
        className="relative z-10 h-[calc(100svh-6rem)] w-full overflow-hidden font-mono text-black"
        style={{ "--hero-lift": HERO_LIFT } as CSSProperties}
      >
      {/* Jam realtime rata tengah di atas halaman */}
      <div className="pointer-events-none absolute inset-x-0 top-[calc(15rem-var(--hero-lift))] z-30 text-center text-gray-800 text-[20px]">
        <Clock />
      </div>

      {/* Kartu ID menggantung di kanan. Diletakkan DI ATAS wordmark (z-20) agar
          kartu selalu bisa di-drag (prioritas kartu). Interaksi huruf "Portfolio"
          tetap berjalan karena TechText memasang listener-nya di window. */}
      <Lanyard
        className="z-20"
        frontImage={FrontFace}
        backImage={BackFace}
        anchor="right"
        metal="silver"
        finish="glossy"
        size={0.35}
        strapLength={0.3}
        strapWidth={1.2}
        strapImage={StrapImage}
      />

      {/* Wordmark "Portfolio" beranimasi (font Flux).
          `pointer-events-none` supaya tidak menghalangi drag kartu Lanyard —
          animasi sweep tetap berjalan sendiri saat kursor di luar.
          Kotaknya digeser naik sebesar --hero-lift dengan ukuran tetap sama
          (top negatif + bottom positif dengan nilai yang sama). */}
      <div className="pointer-events-none absolute inset-x-0 top-[calc(var(--hero-lift)*-1)] bottom-[var(--hero-lift)] z-10">
        <TechText
          text="FIKO"
          fontFamily='"Flux", sans-serif'
          fontWeight={600}
          fontSize={nameFontSize}
          letterSpacing={-0.02}
          align="center"
          reveal="letter"
          dashLength={2}
          dashGap={2}
          specks={32}
          intro="assemble"
          introDuration={2}
          clickKick
          guides={false}
          accentColor="#f87171"
          draggable
        />
      </div>

      {/* Frame hug-content; empat handle sudut mengubah ukuran wordmark. */}
      <div
        className="pointer-events-none absolute left-1/2 top-[calc(50%-var(--hero-lift))] z-[25] -translate-x-1/2 -translate-y-1/2 border border-red-500/80"
        style={{
          width: `min(calc(${nameFontSize}px * 2.4), 86vw)`,
          aspectRatio: "2.8 / 1",
        }}
      >
        <span className="absolute -top-6 left-0 bg-white/90 px-1 font-jetbrains text-[14px] font-medium text-red-600">
          my name is
        </span>

        {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((corner) => {
          const side = corner.endsWith("right") ? "right" : "left";
          const positionClass = {
            "top-left": "-left-1.5 -top-1.5",
            "top-right": "-right-1.5 -top-1.5",
            "bottom-left": "-bottom-1.5 -left-1.5",
            "bottom-right": "-bottom-1.5 -right-1.5",
          }[corner];

          return (
            <button
              key={corner}
              type="button"
              aria-label={`${corner.replace("-", " ")} name size handle`}
              title="Click or drag to resize name"
              data-name-resize-handle
              className={`pointer-events-auto absolute size-3 border-2 border-red-500 bg-white shadow-[0_0_0_1px_white] touch-none ${positionClass}`}
              onPointerDown={(event) => startResize(side, event)}
              onClick={() => clickResize(side)}
            />
          );
        })}
      </div>

      <AvailabilitySkills />
      {/* <ResumeCard /> */}
      </section>

      {/* Section "about me" di bawah hero opening */}
      <AboutIntro />
    </>
  );
}