/**
 * Halaman PLAYGROUND — eksperimen dan karya sampingan (route "/playground").
 */
const experiments = [
  {
    title: "Experiment One",
    description: "Eksperimen UI, animasi, atau potongan kode yang kamu buat untuk belajar.",
  },
  {
    title: "Experiment Two",
    description: "Prototipe kecil, template, atau utilitas yang kamu pakai berulang.",
  },
];

export default function Playground() {
  return (
    <section className="px-14 py-16 font-mono text-black">
      <p className="text-xs tracking-[0.25em] text-neutral-400">PLAYGROUND</p>

      <h2 className="mt-3 text-4xl tracking-tight">Playground</h2>
      <p className="mt-4 max-w-2xl text-base text-neutral-600">
        Tempat untuk hal-hal kecil yang tidak masuk ke daftar proyek utama.
      </p>

      <ul className="mt-10 space-y-4">
        {experiments.map((experiment) => (
          <li
            key={experiment.title}
            className="rounded-[14px] border border-neutral-100 bg-neutral-50 p-6"
          >
            <h3 className="text-xl tracking-tight text-black">{experiment.title}</h3>
            <p className="mt-2 max-w-2xl text-base text-neutral-600">
              {experiment.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
