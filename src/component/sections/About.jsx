const About = () => {
    return (
        <div className="flex flex-col justify-between sm:gap-10">
            <p className="text-2xl font-bold text-slate-200">About Me</p>
            <p className="text-slate-500 text-sm sm:w-[30%]">A brief look into who I am and what drives my passion for development.</p>
            <div className="flex flex-col sm:flex-row justify-between sm:gap-10 sm:p-15 items-center p-2 bg-slate-800 rounded-md">
                <div className=" rounded-md sm:w-[25%] w-[80%] mx-auto my-5 h-50 sm:h-60 bg-slate-500"></div>
                <div className="flex flex-col justify-between gap-3 sm:w-[75%]">
                    <p className="font-bold text-lg text-slate-200">Passionate about crafting digital experiences</p>
                    <p className="text-slate-500 text-sm">I am a decicated Full-Stack Developer with a strong focus on building modern, performant web applications. With a solid foundation in both frotend and backend technologies, I enjoy bridging the gap between design and engineering.</p>
                    <p className="text-slate-500 text-sm">My journey in software development is driven by a constant desire to lear and solve complex problems. Whether it's architecting a scalable database or fint-tuning user interfaces for optimal accessibility, I strive for excellence in every line of code I write.</p>
                    <button className="bg-blue-400 w-fit hover:cursor-pointer text-slate-200 px-5 py-2 rounded-md font-semibold" type="button">Download Resume</button>
                </div>
            </div>
        </div>
    );
}

export default About;