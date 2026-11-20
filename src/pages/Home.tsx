import { Link } from "react-router-dom";

/**
 * Halaman HOME — titik awal portofolio (route "/").
 * Ganti teks di bawah dengan perkenalan singkat milikmu.
 */
export default function Home() {
  return (
    <section className="px-14 py-16 font-mono text-black">
      <p className="text-xs tracking-[0.25em] text-neutral-400">HOME</p>

      <h1 className="mt-3 max-w-3xl text-5xl leading-[1.1] tracking-tight">
        Hi, I&apos;m Fiko. Welcome to my portfolio.
      </h1>

      <p className="mt-6 max-w-2xl text-base text-neutral-600">
        Halaman ini adalah titik awal. Tulis di sini satu-dua kalimat tentang siapa kamu,
        apa yang kamu kerjakan, dan hal apa yang sedang kamu cari.
      </p>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          to="/projects"
          className="flex h-11 items-center border border-black bg-black px-5 tracking-wide text-white transition-colors hover:bg-white hover:text-black"
        >
          LIHAT PROJECTS
        </Link>
        <Link
          to="/about"
          className="flex h-11 items-center border border-black px-5 tracking-wide transition-colors hover:bg-neutral-100"
        >
          TENTANG SAYA
        </Link>
      </div>
    </section>
  );
}
