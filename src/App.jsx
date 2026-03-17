import Hero from "./component/sections/Hero";
import Projects from "./component/sections/Projects";
import About from "./component/sections/About";
import Skills from "./component/sections/Skills";
import Contact from "./component/sections/Contact";
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";


function App(){
  return (
    <div className="h-screen bg-linear-120 from-slate-900 to-slate-700">
      <Navbar/>

      <main>
        <Hero/>
        <Projects/>
        <Skills/>
        <About/>
        <Contact/>
      </main>
      <Footer/>
    </div>
  )
}

export default App;