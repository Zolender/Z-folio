import { Code2, Menu, Moon } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full p-2 sm:px-10 flex justify-between items-center border-b border-b-slate-600">


            <div className="flex items-center gap-2 ">
                <p className="p-1 bg-[#33ebd9db] rounded-md">
                    <Code2 size={22}/>
                </p>
                <p className="font-bold text-slate-200">Z_Folio.</p>
            </div>
            
            
            <div className="flex gap-4 items-center text-slate-500 text-sm">
                <p className="hover:text-slate-400 hover:scale-110 transition-all hover:cursor-pointer duration-300 ease-in-out">About</p>
                <p className="hover:text-slate-400 hover:scale-110 transition-all hover:cursor-pointer duration-300 ease-in-out">Projects</p>
                <p className="hover:text-slate-400 hover:scale-110 transition-all hover:cursor-pointer duration-300 ease-in-out">Skills</p>
                <p className="hover:text-slate-400 hover:scale-110 transition-all hover:cursor-pointer duration-300 ease-in-out">Contact</p>
            </div>


            <div className="flex w-fit items-center gap-2 max-sm:hidden">
                <button className="border border-slate-600 p-2 rounded-md">
                    <Moon size={22} className="text-slate-500 hover:cursor-pointer hover:scale-105 hover:text-slate-400 transition-all ease-in duration-300"/>
                </button>
                <button className="bg-[#33ebd9db] text-slate-800 font-semibold py-2 px-4 rounded-md hover:opacity-80 transition-all ease duration-300 hover:cursor-pointer">
                    Hire Me
                </button>
            </div>

            <div className="sm:hidden">
                <Menu size={22} className="text-slate-500"/>
            </div>
        
        </nav>
    );
}

export default Navbar;