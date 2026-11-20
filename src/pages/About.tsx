/**
 * Halaman ABOUT — profil singkat (route "/about").
 */
export default function About() {
  return (
    <section className="px-14 py-16 font-mono text-black">
      <p className="text-xs tracking-[0.25em] text-neutral-400">ABOUT</p>

      <h2 className="mt-3 text-4xl tracking-tight">Tentang Saya</h2>

      <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-neutral-600">
        <p>
          Tulis paragraf pertama di sini: latar belakang, fokus keahlian, dan bidang yang
          paling kamu nikmati untuk dikerjakan.
        </p>
        <p>
          Paragraf kedua bisa berisi pengalaman, nilai yang kamu pegang saat bekerja, atau
          cara kamu berkolaborasi dengan tim.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { label: "BIDANG", value: "Frontend & Web" },
          { label: "LOKASI", value: "Indonesia" },
          { label: "STATUS", value: "Open to work" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-[14px] border border-neutral-100 bg-neutral-50 px-5 py-4"
          >
            <p className="text-xs tracking-[0.2em] text-neutral-400">{item.label}</p>
            <p className="mt-1 text-base text-black">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
