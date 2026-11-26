/**
 * Katalog proyek bersama untuk Folder interaktif dan showcase bertingkat.
 * Daftar ini menjadi sumber tunggal nama serta informasi presentasi proyek.
 */
export interface PortfolioProject {
  title: string;
  description: string;
  category: string;
  date: string;
  tags: string[];
  summary: string;
  color: string;
  ink: string;
}

export const projects: PortfolioProject[] = [
  {
    title: "Padukuhan Blimbing",
    description: "Information Web • 2025",
    category: "Information Web",
    date: "2025",
    tags: ["INFORMATION WEB", "DASHBOARD"],
    summary:
      "An assisted vehicle-inspection flow combining AI guidance and augmented-reality overlays to make checks easier to follow.",
    color: "#5A5D38",
    ink: "#ffffff",
  },
  {
    title: "LMS Rumah Karya Vokasi",
    description: "Web App • 2025",
    category: "Web Application",
    date: "2025",
    tags: ["WEB APP", "LMS"],
    summary:
      "A product dashboard that turns dense information into a calmer, more actionable workspace.",
    color: "#619BCA",
    ink: "#ffffff",
  },
  {
    title: "Pemeriksaan MCMI-IV",
    description: "Web App • 2025",
    category: "Web Application",
    date: "2025",
    tags: ["WEB APP", "DASHBOARD"],
    summary:
      "A visual system built to feel distinctive and stay consistent across the product, its content, and its touchpoints.",
    color: "#197491",
    ink: "#ffffff",
  },
  {
    title: "DIAN-KC",
    description: "Web Prototype • 2026",
    category: "Web Prototype",
    date: "2026",
    tags: ["WEB PROTOTYPE", "UI/UX DESIGN"],
    summary:
      "A mobile-first concept that keeps the most important actions close and makes everyday tasks feel effortless.",
    color: "#1E4D54",
    ink: "#ffffff",
  },
  {
    title: "Website CMS RS Imanuel",
    description: "Web App • 2026",
    category: "Web Content Management System",
    date: "2026",
    tags: ["WEB CMS", "PRODUCT DESIGN"],
    summary:
      "A focused web experience shaped around clear workflows, useful details, and a simple path from start to finish.",
    color: "#0D1646",
    ink: "#ffffff",
  },
  {
    title: "Tulus App",
    description: "Mobile • 2026",
    category: "Mobile Application",
    date: "2026",
    tags: ["MOBILE APP", "PRODUCT DESIGN"],
    summary:
      "A focused web experience shaped around clear workflows, useful details, and a simple path from start to finish.",
    color: "#709bb4ff",
    ink: "#ffffff",
  },
  {
    title: "E-Parlemen",
    description: "UI/UX Design • 2026",
    category: "UI/UX Design",
    date: "2026",
    tags: ["WEB","MOBILE APP", "UI/UX DESIGN"],
    summary:
      "A focused web experience shaped around clear workflows, useful details, and a simple path from start to finish.",
    color: "#044b13ff",
    ink: "#ffffff",
  },
];
