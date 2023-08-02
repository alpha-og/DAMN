const Home = () => {
    return (
        <div className="flex flex-col w-full h-max text-white">
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
        </div>
    );
};

export default Home;
