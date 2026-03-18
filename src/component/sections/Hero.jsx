const Hero = () => {
    return (
        <section className="flex ">
            
            <div className="w-full flex flex-col gap-5">
                <p className="text-blue-600 text-sm">Hi, I'm Eben-Ezer</p>

                <p className="text-4xl text-slate-100 font-"> Full-Stack Developer</p>
            
                <p className="text-slate-500 text-sm sm:w-[30%]">Building modern web applications with React and Node.js. I enjoy turning ideas into clean, interactive user experiences.</p>

                <div className="flex justify-between sm:w-[50%]">
                    <p className="bg-slate-700 text-slate-200 text-sm px-2 h-fit py-1 rounded-xl">React</p>
                    <p className="bg-slate-700 text-slate-200 text-sm px-2 h-fit py-1 rounded-xl">PostgreSQL and Supabase</p>
                    <p className="bg-slate-700 text-slate-200 text-sm px-2 h-fit py-1 rounded-xl">Prisma</p>
                    <p className="bg-slate-700 text-slate-200 text-sm px-2 h-fit py-1 rounded-xl">TailwindCss</p>
                    <p className="bg-slate-700 text-slate-200 text-sm px-2 h-fit py-1 rounded-xl">JavaScript</p>
                    <p className="bg-slate-700 text-slate-200 text-sm px-2 h-fit py-1 rounded-xl">Framer motion</p>
                </div>

                <div className="flex gap-4">
                    <button className="px-4 py-3 text-slate-200 rounded-md hover:cursor-pointer transition-all duration-300 ease-in-out bg-blue-500" type="button">View Projects</button>
                    <button className="px-4 py-3 text-slate-200 rounded-md hover:cursor-pointer transition-all duration-300 ease-in-out bg-slate-950" type="button">Contact Me</button>
                </div>
            </div>
            
            
            <div className=""></div>

        </section>
    );
}

export default Hero;