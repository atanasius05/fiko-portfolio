import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";

import Lanyard from "../components/Lanyard";
import TechText from "../components/TechText";
// import Lightfall from "../components/Lightfall";
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

/** Ukuran font awal wordmark & batasnya. */
const DEFAULT_SIZE = 280;
const MIN_SIZE = 100;
const MAX_SIZE = 520;

/** Rasio frame: lebar = fontSize * FRAME_W_RATIO, tinggi = lebar / FRAME_ASPECT. */
const FRAME_W_RATIO = 2.4;
const FRAME_ASPECT = 2.8;

/** Tinggi frame (px) pada ukuran default. Dipakai sebagai titik acuan spacing. */
const DEFAULT_FRAME_H = (DEFAULT_SIZE * FRAME_W_RATIO) / FRAME_ASPECT;

/**
 * Jarak ekstra antara frame dan AvailabilitySkills supaya label ukuran
 * "W × H" tidak menimpanya. Makin besar makin jauh ke bawah.
 */
const LABEL_GAP = "3.5rem";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const clampSize = (n: number) => Math.max(MIN_SIZE, Math.min(MAX_SIZE, Math.round(n)));

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
  const [nameFontSize, setNameFontSize] = useState(DEFAULT_SIZE);
  const draggedRef = useRef(false);

  // Ukuran frame yang sebenarnya (px), untuk label "W × H"
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [frameSize, setFrameSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () =>
      setFrameSize({ w: Math.round(el.offsetWidth), h: Math.round(el.offsetHeight) });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /**
   * Resize dari salah satu dari 4 sudut. Frame berada di tengah, jadi
   * setiap sisi tumbuh 2x dari gerakan sudut. Sumbu X dan Y keduanya dipakai.
   */
  const startResize = (corner: Corner, event: PointerEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const sx = corner.endsWith("right") ? 1 : -1;
    const sy = corner.startsWith("bottom") ? 1 : -1;
    const startX = event.clientX;
    const startY = event.clientY;
    const startSize = nameFontSize;
    draggedRef.current = false;

    const onMove = (e: globalThis.PointerEvent) => {
      const dx = (e.clientX - startX) * sx;
      const dy = (e.clientY - startY) * sy;

      if (Math.abs(e.clientX - startX) > 4 || Math.abs(e.clientY - startY) > 4) {
        draggedRef.current = true;
      }

      // lebar = size * 2.4  -> deltaSize dari X = 2*dx / 2.4
      // tinggi = lebar / 2.8 -> deltaSize dari Y = 2*dy * 2.8 / 2.4
      const fromX = (2 * dx) / FRAME_W_RATIO;
      const fromY = (2 * dy * FRAME_ASPECT) / FRAME_W_RATIO;
      setNameFontSize(clampSize(startSize + (fromX + fromY) / 2));
    };

    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
  };

  // Klik biasa (tanpa drag): sudut kanan = besar, sudut kiri = kecil
  const clickResize = (corner: Corner) => {
    if (draggedRef.current) {
      draggedRef.current = false;
      return;
    }
    setNameFontSize((size) => clampSize(size + (corner.endsWith("right") ? 20 : -20)));
  };

  return (
    <>
      {/* Latar "bintang jatuh" (Lightfall) FIXED menutupi seluruh halaman,
          sehingga tetap terlihat saat scroll ke section "about me" di bawah.
          `pointer-events-none` supaya tidak menghalangi interaksi kartu/teks. */}
      <div className="pointer-events-none fixed inset-0 z-0">
        {/* <Lightfall
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
        /> */}
      </div>

      {/* Variabel CSS:
          --hero-lift      : jarak angkat dasar (dibaca wordmark & frame)
          --hero-lift-base : salinan HERO_LIFT agar bisa dipakai ulang di bawah
          --frame-w/-h     : ukuran frame saat ini, dipakai jam & AvailabilitySkills
                             supaya jaraknya ikut menyesuaikan saat frame diubah. */}
      <section
        className="relative z-10 h-[calc(100svh-6rem)] w-full overflow-hidden font-mono text-black"
        style={
          {
            "--hero-lift": HERO_LIFT,
            "--hero-lift-base": HERO_LIFT,
            "--frame-w": `min(${nameFontSize * FRAME_W_RATIO}px, 86vw)`,
            "--frame-h": `calc(var(--frame-w) / ${FRAME_ASPECT})`,
          } as CSSProperties
        }
      >
        {/* Jam realtime rata tengah. Posisinya mengikuti tepi ATAS frame,
            jadi naik saat frame membesar dan turun saat mengecil. */}
        <div className="pointer-events-none absolute inset-x-0 top-[calc(50%-var(--hero-lift)-var(--frame-h)/2-3.5rem)] z-30 text-center text-gray-800 text-[20px]">
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

        {/* Wordmark "FIKO" beranimasi (font Flux).
            `pointer-events-none` supaya tidak menghalangi drag kartu Lanyard.
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

        {/* Frame + label ukuran + 4 handle sudut.
            z-[60] supaya berada di atas jam (z-30) dan elemen lain,
            sehingga keempat handle bisa diklik. */}
        <div
          ref={frameRef}
          className="pointer-events-none absolute left-1/2 top-[calc(50%-var(--hero-lift))] z-[60] -translate-x-1/2 -translate-y-1/2 border border-red-500/80"
          style={{ width: "var(--frame-w)", aspectRatio: `${FRAME_ASPECT} / 1` }}
        >
          <span className="absolute -top-6 left-0 bg-white/90 px-1 font-jetbrains text-[14px] font-medium text-red-600">
            my name is
          </span>

          {/* Label ukuran ala Figma: "W × H" */}
          <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-red-600 px-2.5 py-1 font-jetbrains text-[13px] font-medium tabular-nums text-white">
            {frameSize.w} × {frameSize.h}
          </span>

          {(["top-left", "top-right", "bottom-left", "bottom-right"] as const).map((corner) => {
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
                // before:-inset-2 = area klik transparan 8px lebih luas ke semua arah
                className={`pointer-events-auto absolute size-3 touch-none border-2 border-red-500 bg-white shadow-[0_0_0_1px_white] before:absolute before:-inset-2 before:content-[''] ${positionClass}`}
                onPointerDown={(event) => startResize(corner, event)}
                onClick={() => clickResize(corner)}
              />
            );
          })}
        </div>

        {/* AvailabilitySkills ikut turun/naik mengikuti tinggi frame.
            `display: contents` tidak mengubah layout; hanya meng-override
            --hero-lift untuk anak-anaknya. Saat frame setinggi default,
            hasilnya sama persis dengan posisi lama. */}
        <div
          className="contents"
          style={
            {
              "--hero-lift": `calc(var(--hero-lift-base) - (var(--frame-h) - ${DEFAULT_FRAME_H}px) / 2 - ${LABEL_GAP})`,
            } as CSSProperties
          }
        >
          <AvailabilitySkills />
        </div>
        {/* <ResumeCard /> */}
      </section>

      {/* Section "about me" di bawah hero opening */}
      <AboutIntro />
    </>
  );
}