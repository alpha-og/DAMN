import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
// file imports
import { routes } from "../assets/constants";
import { Branding } from "./components";

const Navbar = () => {
    const [navrail, setNavrail] = useState(false);
    const toggleNavrail = () => {
        setNavrail((navrail) => !navrail);
    };
    return (
        <div className="fixed top-5 w-full z-20 text-white">
            <nav className=" flex flex-row items-center h-12 px-5 mx-5 rounded-2xl bg-slate-900 bg-opacity-60 backdrop-blur-md">
                <Branding />
                <ul className="md:flex hidden flex-row ml-auto ">
                    {routes.map((route, index) => (
                        <li
                            className="flex flex-row ml-2 rounded-lg hover:cursor-pointer hover:text-violet-600 hover:bg-slate-900 hover:shadow-sm hover:shadow-violet-500 hover:scale-105 ease-in-out duration-500"
                            key={index}
                        >
                            <Link className="px-7 py-1" to={route.path}>
                                {route.title}
                            </Link>
                        </li>
                    ))}
                </ul>
                <AiOutlineMenu
                    size={28}
                    className="md:hidden block p-1 ml-auto hover:cursor-pointer hover:text-violet-600 ease-in-out duration-500"
                    onClick={toggleNavrail}
                />
            </nav>
            <nav
                className={
                    navrail
                        ? "fixed top-5 left-5 w-1/2 h-[95%] p-5 rounded-xl bg-slate-900 bg-opacity-60 backdrop-blur-md ease-in-out duration-500"
                        : "fixed top-5 -left-full w-1/2 h-[95%] p-5 rounded-xl bg-slate-900 bg-opacity-60 backdrop-blur-md ease-in-out duration-500"
                }
            >
                <div className="flex flex-row items-center pl-5">
                    <Branding />
                    <AiOutlineClose
                        size={28}
                        className="p-1 ml-auto hover:text-violet-600 hover:cursor-pointer ease-in-out duration-500"
                        onClick={toggleNavrail}
                    />
                </div>

                <ul className="mt-10 flex flex-col">
                    {routes.map((route, index) => (
                        <li
                            className="flex flex-row w-full mb-5 rounded-lg hover:cursor-pointer hover:text-violet-600 hover:bg-slate-900 hover:shadow-sm hover:shadow-violet-500 hover:scale-105 ease-in-out duration-500"
                            key={index}
                        >
                            <Link
                                className=" w-full px-5 py-2.5"
                                to={route.path}
                            >
                                {route.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
