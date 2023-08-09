const Home = () => {
    return (
        <div className="flex flex-col w-full h-max min-h-screen text-white">
            <div className="flex flex-col items-center max-w-max px-5 mx-auto my-[15%]">
                <h1 className="text-[11rem] font-bold text-violet-400">
                    D.A.M.<span className="text-white">N</span>
                </h1>
                <div className="flex flex-row justify-between items-center w-full px-2">
                    <div>
                        <p className="text-2xl">
                            <span className="font-bold text-violet-400">D</span>
                            ata Science.
                        </p>
                        <p className="text-2xl py-2">
                            <span className="font-bold text-violet-400">A</span>
                            rtificial Intelligence.
                        </p>
                        <p className="text-2xl">
                            <span className="font-bold text-violet-400">M</span>
                            achine Learning.
                        </p>
                    </div>
                    <h2 className="text-9xl font-bold">Notes</h2>
                </div>
            </div>

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
