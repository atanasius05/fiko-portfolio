import { Route, Routes } from "react-router-dom";

import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Ruler from "./components/Ruler";
import ShapeGrid from "./components/ShapeGrid";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import Projects from "./pages/Projects";
import Work from "./pages/Work";

/**
 * Kerangka aplikasi: Navbar tetap sticky, ruler atas berada di awal dokumen,
 * dan ruler bawah hanya terlihat saat mencapai akhir halaman.
 * Background grid interaktif (ShapeGrid) menempel di viewport sebagai layer
 * paling bawah, menggantikan background `.bg-grid` sebelumnya.
 */
function App() {
  return (
    <div className="relative flex min-h-svh flex-col bg-white">
      {/* Background grid: menyala di dekat kursor dan ikut melayang.
          pointer-events-none supaya tidak menghalangi interaksi konten. */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <ShapeGrid
          shape="square"
          direction="diagonal"
          lineColor="#e5e7eb"
          hoverColor="#bf1e1e"
          hoverFillColor="#ff6767"
          fillOpacity={0.15}
          cellSize={40}
          speed={0.5}
          tiltX={0}
          tiltY={0}
          rainbow={false}
        />
      </div>

      <CustomCursor />

      {/* Navbar tetap menempel di atas; ruler hanya berada di awal halaman */}
      <div className="sticky top-0 z-40">
        <Navbar />
      </div>
      <Ruler position="top" />

      <main className="relative z-10 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/playground" element={<Playground />} />
          {/* Fallback: path yang tidak dikenal dikembalikan ke Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Ruler position="bottom" className="z-40 transition-opacity duration-150" />
    </div>
  );
}

export default App;
