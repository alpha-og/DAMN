const Hero = () => {
    return (
        <div className="flex flex-col items-center max-w-max px-5 mx-auto md:my-64 my-80">
            <h1 className="md:text-[11rem] sm:text-9xl text-8xl font-bold text-violet-400 ease-in-out duration-75">
                D.A.M.<span className="text-white">N</span>
            </h1>
            <div className="flex flex-row justify-between items-center w-full px-2">
                <div>
                    <p className="md:text-2xl sm:text-xl text-sm ease-in-out duration-75">
                        <span className="font-bold text-violet-400">D</span>
                        ata Science.
                    </p>
                    <p className="md:text-2xl sm:text-xl text-sm md:py-2 ease-in-out duration-75">
                        <span className="font-bold text-violet-400">A</span>
                        rtificial Intelligence.
                    </p>
                    <p className="md:text-2xl sm:text-xl text-sm ease-in-out duration-75">
                        <span className="font-bold text-violet-400">M</span>
                        achine Learning.
                    </p>
                </div>
                <h2 className="md:text-9xl sm:text-8xl text-7xl font-bold ease-in-out duration-75">
                    Notes
                </h2>
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <div className="flex flex-col w-full h-max min-h-screen text-white">
            <Hero />
            {/* <div className="border grid grid-cols-3 w-full py-10 px-20 mx-auto my-[15%]">
                <div className="border col-span-1">
                    <h1 className="text-2xl">Visit Us on GitHub</h1>
                    <div>

                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Home;
