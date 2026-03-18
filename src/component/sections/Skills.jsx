const Skills = () => {
    return (
        <section className="flex flex-col gap-4">
            <h1 className="text-3xl text-slate-200">Technical Skills</h1>
            <p className="text-sm text-slate-400 sm:w-[40%]">The technologies, tools, and frameworks I use to build scalable web applications.</p>

            <div className="flex justify-between gap-4 items-center mx-auto sm:my-5 my-2 w-3/4 ">
                <div className="flex flex-col w-1/3 bg-slate-700 rounded-md p-2 gap-2 sm:p-4">
                    <p className="text-center text-slate-200 ">Frontend</p>
                    <ul className="flex flex-col text-slate-400 gap-2">
                        <li>React & Next.js</li>
                        <li>TailwindCSS</li>
                        <li>JavaScript and TypeScript</li>
                        <li>Framer motion</li>
                        <li>GSAP</li>
                    </ul>
                </div>

                <div className="flex flex-col w-1/3 bg-slate-700 rounded-md p-2 gap-2 sm:p-4">
                    <p className="text-center text-slate-200 ">Backend</p>
                    <ul className="flex flex-col text-slate-400 gap-2">
                        <li>Node.js & Expressjs</li>
                        <li>Supabase</li>
                        <li>Zod</li>
                        <li>Prisma</li>
                        <li>PostgreSQL</li>
                    </ul>
                </div>

                <div className="flex flex-col w-1/3 bg-slate-700 rounded-md p-2 gap-2 sm:p-4">
                    <p className="text-center text-slate-200  ">Tools</p>
                    <ul className="flex flex-col text-slate-400 gap-2">
                        <li>Git & Github</li>
                        <li>Vercel</li>
                        <li>Figma and Banani</li>
                        <li>Lucide-react</li>
                        <li>uiverse</li>
                    </ul>
                </div>
            </div>

        </section>
    );
}

export default Skills;