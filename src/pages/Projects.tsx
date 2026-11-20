/**
 * Halaman PROJECTS — daftar proyek (route "/projects").
 */
const projects = [
  {
    title: "Project One",
    year: "2025",
    description: "Deskripsi singkat proyek: masalah yang dipecahkan dan solusi yang dibuat.",
  },
  {
    title: "Project Two",
    year: "2024",
    description: "Deskripsi singkat proyek: peran kamu di dalam tim dan hasil akhirnya.",
  },
  {
    title: "Project Three",
    year: "2024",
    description: "Deskripsi singkat proyek: teknologi yang dipakai dan dampaknya.",
  },
];

export default function Projects() {
  return (
    <section className="px-14 py-16 font-mono text-black">
      <p className="text-xs tracking-[0.25em] text-neutral-400">PROJECTS</p>

      <h2 className="mt-3 text-4xl tracking-tight">Projects</h2>
      <p className="mt-4 max-w-2xl text-base text-neutral-600">
        Kumpulan proyek yang pernah dikerjakan. Ganti setiap kartu dengan proyek aslimu.
      </p>

      <ul className="mt-10 space-y-4">
        {projects.map((project) => (
          <li key={project.title}>
            <article className="rounded-[14px] border border-neutral-100 bg-neutral-50 p-6 transition-colors hover:border-neutral-300">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-xl tracking-tight text-black">{project.title}</h3>
                <span className="text-xs tracking-[0.2em] text-neutral-400">
                  {project.year}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-base text-neutral-600">
                {project.description}
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
