import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="w-full md:w-[80%] fixed bottom-0 md:left-[10%] border-t text-slate-400 border-t-slate-400 py-5 md:py-10 flex flex-col md:gap-0 gap-5 sm:flex-row justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Eben-Ezer Ndeingar alias Zolender</p>

            <div className="flex w-fit items-center gap-4">
                <Linkedin size={22} className="text-slate-500 hover:cursor-pointer hover:text-slate-400 transition-colors ease-in-out duration-300"/>
                <Instagram size={22} className="text-slate-500 hover:cursor-pointer hover:text-slate-400 transition-colors ease-in-out duration-300"/>
                <Facebook size={22} className="text-slate-500 hover:cursor-pointer hover:text-slate-400 transition-colors ease-in-out duration-300"/>
                <Github size={22} className="text-slate-500 hover:cursor-pointer hover:text-slate-400 transition-colors ease-in-out duration-300"/>
            </div>
        </footer>
    );
}

export default Footer;