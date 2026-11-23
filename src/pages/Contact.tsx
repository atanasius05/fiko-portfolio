/**
 * Halaman CONTACT — kanal kontak (route "/contact").
 * Dibuka lewat tombol CONTACT di Navbar.
 */
const contacts = [
  {
    label: "EMAIL",
    value: "atanasiusfiko05@gmail.com",
    href: "mailto:atanasiusfiko05@gmail.com",
  },
  {
    label: "PHONE",
    value: "+62 821 4220 1853",
    href: "tel:+6282142201853",
  },
];

export default function Contact() {
  return (
    <section className="px-14 py-16 font-mono text-black">
      <p className="text-xs tracking-[0.25em] text-neutral-400">CONTACT</p>

      <h2 className="mt-3 text-4xl tracking-tight">Hubungi Saya</h2>
      <p className="mt-4 max-w-2xl text-base text-neutral-600">
        Terbuka untuk peluang kerja, proyek freelance, atau sekadar berdiskusi soal
        desain dan pengembangan web. Pilih salah satu kanal di bawah ini.
      </p>

      <ul className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-2">
        {contacts.map((contact) => (
          <li key={contact.label}>
            <a
              href={contact.href}
              className="block rounded-[14px] border border-neutral-100 bg-neutral-50 px-5 py-4 transition-colors hover:border-neutral-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
            >
              <p className="text-xs tracking-[0.2em] text-neutral-400">{contact.label}</p>
              <p className="mt-1 text-base text-black">{contact.value}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
