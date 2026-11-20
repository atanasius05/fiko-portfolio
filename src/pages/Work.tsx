/**
 * Halaman WORK — pengalaman kerja (route "/work").
 */
const experiences = [
  {
    role: "Frontend Developer",
    company: "Nama Perusahaan",
    period: "2024 — Sekarang",
    description: "Tulis tanggung jawab utama dan pencapaian yang paling relevan di sini.",
  },
  {
    role: "Web Developer",
    company: "Nama Perusahaan",
    period: "2022 — 2024",
    description: "Tulis tanggung jawab utama dan pencapaian yang paling relevan di sini.",
  },
  {
    role: "Freelance Developer",
    company: "Klien Mandiri",
    period: "2021 — 2022",
    description: "Tulis proyek freelance yang pernah kamu kerjakan bersama klien.",
  },
];

export default function Work() {
  return (
    <section className="px-14 py-16 font-mono text-black">
      <p className="text-xs tracking-[0.25em] text-neutral-400">WORK</p>

      <h2 className="mt-3 text-4xl tracking-tight">Work Experience</h2>
      <p className="mt-4 max-w-2xl text-base text-neutral-600">
        Riwayat pengalaman kerja, magang, atau kolaborasi profesional.
      </p>

      <ul className="mt-10 space-y-4">
        {experiences.map((experience) => (
          <li
            key={`${experience.role}-${experience.period}`}
            className="rounded-[14px] border border-neutral-100 bg-neutral-50 p-6"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl tracking-tight text-black">{experience.role}</h3>
              <span className="text-xs tracking-[0.2em] text-neutral-400">
                {experience.period}
              </span>
            </div>
            <p className="mt-1 text-sm tracking-wide text-neutral-500">
              {experience.company}
            </p>
            <p className="mt-3 max-w-2xl text-base text-neutral-600">
              {experience.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
