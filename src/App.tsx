import { Route, Routes } from "react-router-dom";

import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Ruler from "./components/Ruler";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import Projects from "./pages/Projects";
import Work from "./pages/Work";

/**
 * Kerangka aplikasi: Navbar + ruler atas menempel di atas layar, ruler bawah
 * menempel di bawah layar, sedangkan isi halaman ditentukan oleh router.
 */
function App() {
  return (
    <div className="bg-grid flex min-h-svh flex-col bg-white">
      <CustomCursor />

      {/* Navbar dan ruler atas ikut sticky bersama */}
      <div className="sticky top-0 z-40">
        <Navbar />
        <Ruler position="top" />
      </div>

      <main className="flex-1">
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

      <Ruler position="bottom" className="sticky bottom-0 z-40" />
    </div>
  );
}

export default App;