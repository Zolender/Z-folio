import Hero from "./component/sections/Hero";
import Projects from "./component/sections/Projects";
import About from "./component/sections/About";
import Skills from "./component/sections/Skills";
import Contact from "./component/sections/Contact";
import Navbar from "./component/layout/Navbar";
import Footer from "./component/layout/Footer";


function App(){
  return (
    <div className="h-full bg-slate-900">
      <Navbar/>

      <main className="w-full px-2 sm:px-10 flex flex-col justify-around gap-10 sm:gap-20">
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