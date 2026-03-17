import Hero from "./component/sections/Hero";
import Projects from "./component/sections/Projects";
import About from "./component/sections/About";
import Skills from "./component/sections/Skills";
import Contact from "./component/sections/Contact";
import Navbar from "./component/layout/Navbar";


function App(){
  return (
    <>
      <Navbar/>

      <main>
        <Hero/>
        <Projects/>
        <Skills/>
        <About/>
        <Contact/>
      </main>
    </>
  )
}

export default App;