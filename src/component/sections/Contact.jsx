const Contact = () => {
    return (
        <section className="flex justify-center items-center px-2">
            <div className="sm:w-[50%] w-full">
                <div className=" flex flex-col gap-4">
                    <p className="text-3xl text-center text-slate-100">Get In Touch</p>
                    <p className="text-sm text-slate-400 text-center">Have a project inmind or just want to say hi? I'd be happy to hear from you.</p>
                </div>

                <form className="flex flex-col gap-4">
                    <label className="text-slate-200 " htmlFor="name">Name</label>
                    <input type="text" required placeholder="Iradukunda Alain"  className="focus:outline-0 px-5 py-2 text-slate-400 bg-slate-800 rounded-md"/>
                
                    <label className="text-slate-200 " htmlFor="email">Email</label>
                    <input type="email" required placeholder="alain@gmail.com"  className="focus:outline-0 px-5 py-2 text-slate-400 bg-slate-800 rounded-md"/>
                
                    <label className="text-slate-200 " htmlFor="text">Message</label>
                    <textarea name="text" id="" placeholder="Tell me about your project..." className="focus:outline-0 px-5 text-slate-400 bg-slate-800"></textarea>

                    <button className="px-4 py-3 text-slate-200 rounded-md hover:cursor-pointer transition-all duration-300 ease-in-out bg-blue-500">Send Message</button>
                </form>
            </div>
        </section>
    );
}

export default Contact;