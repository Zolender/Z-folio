import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Projects from "../components/sections/Projects";
import Skills from "../components/sections/Skills";
import Contact from "../components/sections/Contact";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export default function Home() {
  // Route-level motion is handled by the View Transitions API; section
  // reveals (SectionWrapper) and the Hero entrance animate on their own.
  useDocumentTitle();
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </>
  );
}
