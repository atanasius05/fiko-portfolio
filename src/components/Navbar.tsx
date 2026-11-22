import { useEffect, useId, useRef, useState } from "react";
import { NavLink } from "react-router-dom";

// import avatarSvg from "../assets/avatar.svg";
import homeSvg from "../assets/home.svg";
import asteriskSvg from "../assets/asterisk.svg";
import bowtieSvg from "../assets/bowtie.svg";
import stairsSvg from "../assets/stairs.svg";
import heartSvg from "../assets/heart.svg";
import faceSvg from "../assets/face.jpg";

type NavItem = {
  id: string;
  label: string;
  to: string; // path route tujuan
  icon: string; // URL file .svg
};

/**
 * Menampilkan file SVG sebagai ikon yang warnanya mengikuti `currentColor`,
 * jadi ikon ikut berubah warna saat menu aktif atau di-hover.
 */
function SvgIcon({ src }: { src: string }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block h-5 w-5 shrink-0 bg-current"
      style={{
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
      }}
    />
  );
}

/**
 * Ikon burger yang berubah bentuk (morph) jadi tanda X:
 * garis atas & bawah berputar menyilang, garis tengah menghilang.
 */
function BurgerIcon({ open }: { open: boolean }) {
  const line =
    "origin-center [transform-box:fill-box] transition-all duration-300 ease-out motion-reduce:transition-none";
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="square"
    >
      <path
        d="M4 7h16"
        className={line}
        style={{ transform: open ? "translateY(5px) rotate(45deg)" : "none" }}
      />
      <path
        d="M4 12h16"
        className={line}
        style={{ transform: open ? "scaleX(0)" : "none", opacity: open ? 0 : 1 }}
      />
      <path
        d="M4 17h16"
        className={line}
        style={{ transform: open ? "translateY(-5px) rotate(-45deg)" : "none" }}
      />
    </svg>
  );
}

type Badge = {
  label: string; // teks di dalam badge, mis. "EM"
  tooltip: string; // isi tooltip biru saat badge di-hover
};

/**
 * Badge bulat dengan tooltip biru.
 * - Desktop: muncul saat di-hover.
 * - Keyboard: muncul saat badge difokus (Tab).
 * - Layar sentuh: ketuk badge untuk membuka/menutup; ketuk di luar untuk menutup.
 * `placement` menentukan tooltip muncul di bawah atau di atas badge.
 */
function BadgeTip({
  label,
  tooltip,
  placement = "bottom",
}: Badge & { placement?: "top" | "bottom" }) {
  const [pinned, setPinned] = useState(false);
  const wrapRef = useRef<HTMLSpanElement | null>(null);
  const tipId = useId();

  // Saat dibuka lewat sentuhan: tutup dengan ketukan di luar atau tombol Escape
  useEffect(() => {
    if (!pinned) return;
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setPinned(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPinned(false);
    };
    document.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [pinned]);

  const above = placement === "top";

  return (
    <span ref={wrapRef} className="relative flex">
      <button
        type="button"
        aria-describedby={tipId}
        onPointerDown={(e) => {
          if (e.pointerType !== "mouse") setPinned((value) => !value);
        }}
        className="peer flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-sm transition-colors hover:bg-red-400 focus-visible:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
      >
        {label}
      </button>

      <span
        id={tipId}
        role="tooltip"
        className={`pointer-events-none absolute left-1/2 z-50 -translate-x-1/2 whitespace-nowrap bg-red-400 px-3 py-1.5 text-sm font-medium text-black transition-[opacity,transform] duration-200 ease-out peer-hover:translate-y-0 peer-hover:opacity-100 peer-focus-visible:translate-y-0 peer-focus-visible:opacity-100 motion-reduce:transition-none ${
          above ? "bottom-full mb-2" : "top-full mt-2"
        } ${
          pinned
            ? "translate-y-0 opacity-100"
            : above
              ? "translate-y-1 opacity-0"
              : "-translate-y-1 opacity-0"
        }`}
      >
        {tooltip}
        {/* panah kecil penunjuk badge */}
        <span
          aria-hidden="true"
          className={`absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-red-400 ${
            above ? "-bottom-1" : "-top-1"
          }`}
        />
      </span>
    </span>
  );
}

const defaultBadges: Badge[] = [
  { label: "EM", tooltip: "atanasiusfiko05@gmail.com" },
  { label: "ID", tooltip: "+62 821 4220 1853" },
];

// Gaya tombol outline yang dipakai bersama oleh tombol CONTACT dan tombol MENU.
const outlineButton =
  "flex h-9 items-center gap-2 border border-black bg-white px-4 tracking-wide transition-colors hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400";

const defaultItems: NavItem[] = [
  { id: "home", label: "HOME", to: "/", icon: homeSvg },
  { id: "about", label: "ABOUT", to: "/about", icon: asteriskSvg },
  { id: "projects", label: "PROJECTS", to: "/projects", icon: bowtieSvg },
  { id: "work", label: "WORK", to: "/work", icon: stairsSvg },
  // { id: "playground", label: "PLAYGROUND", to: "/playground", icon: stairsSvg },
];

type NavbarProps = {
  items?: NavItem[];
  badges?: Badge[];
  onContactClick?: () => void;
};

export default function Navbar({
  items = defaultItems,
  badges = defaultBadges,
  onContactClick,
}: NavbarProps) {
  // Menu mobile/tablet (di bawah breakpoint `lg`) terbuka atau tertutup
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  // Tutup menu dengan tombol Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleContact = () => {
    closeMenu();
    onContactClick?.();
  };

  // Item menu muncul satu per satu (stagger) saat dibuka; saat menutup langsung hilang.
  const STEP_MS = 45;
  const FIRST_MS = 100;
  const reveal = (index: number) => ({
    className: `transition-[opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
      open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
    }`,
    style: { transitionDelay: open ? `${FIRST_MS + index * STEP_MS}ms` : "0ms" },
  });
  const footer = reveal(items.length);

  return (
    <header className="relative w-full border-b border-neutral-300 bg-white font-mono text-sm font-medium text-black">
      <nav
        className="flex h-12 items-stretch justify-between px-4 sm:px-8 lg:pl-14 lg:pr-16"
        aria-label="Main"
      >
        {/* Kiri: avatar (+ menu di desktop) */}
        <div className="flex items-stretch">
          <NavLink
            to="/"
            className="flex items-center lg:mr-6"
            aria-label="Beranda"
            onClick={closeMenu}
          >
            <img src={faceSvg} alt="" className="h-9 w-9" />
          </NavLink>

          <ul className="hidden items-stretch lg:flex">
            {items.map((item) => (
              <li key={item.id} className="flex">
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-5 tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black ${
                      isActive ? "bg-red-400 text-black" : "hover:bg-neutral-100"
                    }`
                  }
                >
                  <SvgIcon src={item.icon} />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Kanan: badge + tombol kontak (desktop) / tombol menu (tablet & handphone) */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 lg:flex">
            {badges.map((badge) => (
              <BadgeTip key={badge.label} {...badge} placement="bottom" />
            ))}

            <button
              type="button"
              onClick={onContactClick}
              className={`ml-2 ${outlineButton}`}
            >
              <SvgIcon src={heartSvg} />
              <span>CONTACT</span>
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className={`${outlineButton} lg:hidden`}
          >
            <BurgerIcon open={open} />
            <span>MENU</span>
          </button>
        </div>
      </nav>

      {/* Panel menu tablet & handphone: tinggi mengembang halus (grid 0fr -> 1fr),
          lalu item-itemnya meluncur masuk satu per satu. `inert` saat tertutup
          supaya tidak bisa difokus lewat keyboard. */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`absolute left-0 right-0 top-full z-50 grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none lg:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="max-h-[calc(100svh-5.5rem)] overflow-y-auto border-b border-neutral-300 bg-white">
            <ul>
              {items.map((item, index) => {
                const motion = reveal(index);
                return (
                  <li key={item.id} className={motion.className} style={motion.style}>
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      onClick={closeMenu}
                      className={({ isActive }) =>
                        `group flex h-12 items-center border-b border-neutral-200 px-4 tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black sm:px-8 ${
                          isActive ? "bg-red-400 text-black" : "hover:bg-neutral-100"
                        }`
                      }
                    >
                      {/* ikon + teks sedikit bergeser ke kanan saat di-hover/ditekan */}
                      <span className="flex items-center gap-2.5 transition-transform duration-200 group-hover:translate-x-1 group-active:translate-x-2 motion-reduce:transform-none">
                        <SvgIcon src={item.icon} />
                        <span>{item.label}</span>
                      </span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            <div
              className={`flex items-center justify-end gap-3 px-4 py-4 sm:px-8 ${footer.className}`}
              style={footer.style}
            >
              {badges.map((badge) => (
                <BadgeTip key={badge.label} {...badge} placement="top" />
              ))}

              <button type="button" onClick={handleContact} className={`ml-2 ${outlineButton}`}>
                <SvgIcon src={heartSvg} />
                <span>CONTACT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}