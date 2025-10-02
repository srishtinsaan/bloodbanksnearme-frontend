import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Results from "./pages/Results.jsx";
import BloodGroups from "./pages/BloodGroups.jsx";
import Features from "./pages/Features.jsx";
import GetStartedSection from "./pages/GetStartedScection.jsx";
import Footer from "./pages/Footer.jsx";
function App() {
  return (
    <BrowserRouter>
      {/* Background */}
      <div className="min-h-screen w-full relative bg-black text-white">
        
        

        {/* Crimson Shadow Background with Top Glow */}
        

        {/* Page Content */}
        <div className="relative z-10 flex justify-center flex-col min-h-screen">
          <Routes>
            <Route path="/" element={
              <div
  className="absolute inset-0 z-0 "
  style={{
    backgroundColor: "#0a0a0a",
    backgroundImage: `
      radial-gradient(circle at 25% 25%, #222222 0.5px, transparent 1px),
      radial-gradient(circle at 75% 75%, #111111 0.5px, transparent 1px),
      radial-gradient(ellipse 80% 60% at 50% 0%, hsla(346, 100%, 50%, 0.25), transparent 70%)
    `,
    backgroundSize: "10px 10px, 10px 10px, auto",
    imageRendering: "pixelated",
  }}
>
  <Home />
  <Features/>
  <BloodGroups />
  <GetStartedSection/>
  <Footer />
  </div>} />
            <Route path="/banks" element={<Results/>} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
