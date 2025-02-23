import HeroSection from "./HeroSection"
import Navbar from "./Navbar"
import SponsorsSection from "./SponsorsSection"
import Timeline from "./Timeline"
import FAQSection from "./FAQSection"
import ProblemStatement from "./ProblemStatement"


export default function MainContent() {
  return (
    <div>
        <Navbar />
        <HeroSection />
      <Timeline /> 
      <SponsorsSection />
      <ProblemStatement />
      <FAQSection />
    </div>
  )
}
