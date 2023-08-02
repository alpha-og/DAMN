import React from "react";

const PageNotFound = () => {
    return (
        <div className="flex flex-col justify-center h-screen text-white">
            <div className="max-w-max p-24 mx-auto rounded-3xl bg-slate-900 bg-opacity-60 backdrop-blur-md hover:shadow-md hover:shadow-violet-600 hover:scale-105 ease-in-out duration-500">
                <h1 className="text-8xl text-violet-400 text-center font-bold">
                    Error 404
                </h1>
                <p className="text-6xl text-zinc-700 text-center">
                    Page Not Found
                </p>
            </div>
        </div>
    );
};

export default PageNotFound;
