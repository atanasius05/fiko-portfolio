import { Route, Routes } from "react-router-dom";

import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Playground from "./pages/Playground";
import Projects from "./pages/Projects";
import Work from "./pages/Work";

/**
 * Kerangka aplikasi: Navbar tampil di semua halaman, sedangkan isi halaman
 * ditentukan oleh router.
 */
function App() {
  return (
    <div className="flex min-h-svh flex-col bg-white">
      <CustomCursor />
      <Navbar />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/work" element={<Work />} />
          <Route path="/playground" element={<Playground />} />
          {/* Fallback: path yang tidak dikenal dikembalikan ke Home */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
