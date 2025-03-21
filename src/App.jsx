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
import ProblemStatement from "./components/ProblemStatement";
import IdeathonResult from "./components/IdeathonResult";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: "10px" }} />
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <>
              <div id="home"><HeroSection /></div>
              <div id="about"><AboutSection /></div>
              <div id="prize"><PrizeSection /></div>
              <div id="timeline"><Timeline /></div>
              <div id="guidelines"><GuidelinesSection /></div>
              <div id="sponsors"><SponsorsSection /></div>
              <div id="faqs"><FAQSection /></div>
              <div id="contact"><Footer /></div>
            </>
          }
        />

        {/* Register Page Route */}
        <Route path="/ideathon-result" element={<IdeathonResult />} />
        <Route path="/problem-statement" element={<ProblemStatement />} />
        <Route path="*" element={<IdeathonResult />} />
        <Route path="*" element={<ProblemStatement />} />
      </Routes>
    </Router>
  );
}
