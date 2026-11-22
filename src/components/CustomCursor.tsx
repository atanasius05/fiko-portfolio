import { useEffect, useRef, useState } from "react";

/**
 * Kursor kustom berupa titik bulat hitam + pill "YOU" yang mengikuti posisi mouse.
 * Kursor asli disembunyikan via CSS di `index.css` pada elemen interaktif tetap
 * menampilkan cursor pointer agar tetap jelas.
 */
export default function CustomCursor() {
  // posisi mouse aktual
  const [pos, setPos] = useState({ x: -100, y: -100 });
  // kursor kustom tampil / tersembunyi (saat mouse keluar dari halaman)
  const [visible, setVisible] = useState(true);
  // status hover elemen interaktif (dibaca dari `cursor` inline elemen di bawah pointer)
  const [mode, setMode] = useState<"idle" | "grab" | "grabbing" | "pointer">("idle");
  // posisi pill "YOU" yang mengikuti dengan lerp (halus)
  const pillRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    /**
     * Membaca nilai `cursor` inline pada elemen di bawah pointer (mis. yang
     * dipasang TechText: "grab" / "grabbing" / "pointer"). Visual cursor asli
     * memang ditimpa `cursor: none`, tapi nilai inline-nya tetap bisa dibaca
     * sehingga kursor kustom bisa memberi sinyal yang sama.
     */
    const readMode = (x: number, y: number): "idle" | "grab" | "grabbing" | "pointer" => {
      // `elementsFromPoint` mengembalikan seluruh elemen pada titik tersebut (urut dari
      // paling atas). Dipakai agar sinyal `cursor` dari layer bawah (mis. TechText) tetap
      // terbaca walau ada layer lain (kanvas Lanyard) yang menutupinya secara visual.
      const nodes = document.elementsFromPoint(x, y) as HTMLElement[];
      for (const node of nodes) {
        const value = node.style?.cursor;
        if (value === "grabbing" || value === "grab" || value === "pointer") return value;
      }
      return "idle";
    };

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      targetRef.current = { x: e.clientX, y: e.clientY };
      setMode(readMode(e.clientX, e.clientY));
    };

    // Mouse keluar dari jendela halaman -> sembunyikan kursor kustom
    const onLeave = () => setVisible(false);
    // Mouse masuk kembali -> tampilkan kursor kustom
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Animasi halus pill "YOU" mengikuti titik
  useEffect(() => {
    const tick = () => {
      if (pillRef.current) {
        const cx = pillRef.current.dataset.x ?? -10;
        const cy = pillRef.current.dataset.y ?? -10;
        const nx = Number(cx) + (targetRef.current.x - Number(cx)) * 0.90;
        const ny = Number(cy) + (targetRef.current.y - Number(cy)) * 0.90;
        pillRef.current.dataset.x = String(nx);
        pillRef.current.dataset.y = String(ny);
        pillRef.current.style.transform = `translate3d(${nx}px, ${ny}px, 0)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Sembunyikan kursor asli hanya ketika kursor kustom aktif (mouse berada di halaman).
  // Saat mouse keluar halaman, kembalikan kursor asli agar user tetap bisa melihatnya.
  useEffect(() => {
    if (visible) {
      document.documentElement.classList.add("cursor-none-app");
    } else {
      document.documentElement.classList.remove("cursor-none-app");
    }
    return () => document.documentElement.classList.remove("cursor-none-app");
  }, [visible]);

  return (
    <>
      {/* Segi delapan (oktagon) hitam yang mengikuti mouse secara langsung.
          Membesar saat berada di atas elemen interaktif. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 -translate-x-1/2 -translate-y-1/2 bg-black transition-opacity duration-150"
        style={{
          opacity: visible ? 1 : 0,
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${
            mode === "idle" ? 1 : 1.8
          })`,
          // oktagon dengan sisi atas & bawah rata (flat-top / flat-bottom)
          clipPath:
            "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)",
        }}
      />

      {/* Pill yang mengikuti titik, rounded pada 3 sudut (atas kiri = 0).
          Label & warna berubah saat hover elemen yang bisa di-drag/diklik. */}
      <div
        ref={pillRef}
        data-x="-100"
        data-y="-100"
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[9998] flex h-8 items-center rounded-tl-none rounded-tr-2xl rounded-br-2xl rounded-bl-2xl px-3 font-mono text-sm font-medium transition-opacity duration-150 ${
          mode === "idle" ? "bg-black text-white" : "bg-red-400 text-black"
        }`}
        style={{
          opacity: visible ? 1 : 0,
          transform: "translate3d(-100px, -100px, 0)",
          marginLeft: "0px",
          marginTop: "3 px",
        }}
      >
        {mode === "idle" ? "YOU" : mode === "pointer" ? "CLICK" : "DRAG"}
      </div>
    </>
  );
}
