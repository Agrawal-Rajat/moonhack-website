import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import RegisterPage from "./components/RegisterPage";
import Navbar from "./components/Navbar";
import SponsorsSection from "./components/SponsorsSection";
import Timeline from "./components/Timeline";
import FAQSection from "./components/FAQSection";
import AboutSection from "./components/AboutSection";
import PrizeSection from "./components/PrizeSection";
import GuidelinesSection from "./components/GuidelinesSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <HeroSection />
              <AboutSection />
              <PrizeSection />
              <Timeline />
              <GuidelinesSection />
              <SponsorsSection />
              <FAQSection />
              <Footer />
            </>
          }
        />

        {/* Register Page Route */}
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
}
