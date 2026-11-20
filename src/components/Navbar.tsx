import { NavLink } from "react-router-dom";

import avatarSvg from "../assets/avatar.svg";
import homeSvg from "../assets/home.svg";
import asteriskSvg from "../assets/asterisk.svg";
import bowtieSvg from "../assets/bowtie.svg";
import stairsSvg from "../assets/stairs.svg";
import heartSvg from "../assets/heart.svg";

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

const defaultItems: NavItem[] = [
  { id: "home", label: "HOME", to: "/", icon: homeSvg },
  { id: "about", label: "ABOUT", to: "/about", icon: asteriskSvg },
  { id: "projects", label: "PROJECTS", to: "/projects", icon: bowtieSvg },
  { id: "work", label: "WORK", to: "/work", icon: bowtieSvg },
  { id: "playground", label: "PLAYGROUND", to: "/playground", icon: stairsSvg },
];

type NavbarProps = {
  items?: NavItem[];
  badges?: string[];
  onContactClick?: () => void;
};

export default function Navbar({
  items = defaultItems,
  badges = ["EM", "ID"],
  onContactClick,
}: NavbarProps) {
  return (
    <header className="w-full border-b border-neutral-300 bg-white font-mono text-sm font-medium text-black">
      <nav className="flex h-12 items-stretch justify-between pl-14 pr-16" aria-label="Main">
        {/* Kiri: avatar + menu */}
        <div className="flex items-stretch">
          <NavLink to="/" className="mr-6 flex items-center" aria-label="Beranda">
            <img src={avatarSvg} alt="" className="h-9 w-9" />
          </NavLink>

          <ul className="flex items-stretch">
            {items.map((item) => (
              <li key={item.id} className="flex">
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-5 tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-black ${
                      isActive ? "bg-sky-400 text-black" : "hover:bg-neutral-100"
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

        {/* Kanan: badge + tombol kontak */}
        <div className="flex items-center gap-3">
          {badges.map((text) => (
            <span
              key={text}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-200 text-xs"
            >
              {text}
            </span>
          ))}

          <button
            type="button"
            onClick={onContactClick}
            className="ml-2 flex h-9 items-center gap-2 border border-black bg-white px-4 tracking-wide transition-colors hover:bg-black hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
          >
            <SvgIcon src={heartSvg} />
            <span>CONTACT</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
