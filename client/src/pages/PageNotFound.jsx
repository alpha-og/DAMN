import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/userSlice";

const PageNotFound = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPage("Home"));
    }, []);
    return (
        <div className="flex flex-col justify-center h-screen text-white">
            <div className="max-w-max md:p-24 p-10 mx-auto rounded-3xl bg-slate-900 bg-opacity-60 border border-violet-500 backdrop-blur-md hover:scale-105 ease-in-out duration-500">
                <h1 className="md:text-8xl text-5xl text-accent-400 text-center font-bold">
                    Error 404
                </h1>
                <p className="md:text-6xl text-3xl text-zinc-700 text-center">
                    Page Not Found
                </p>
            </div>
        </div>
    );
};

export default PageNotFound;
