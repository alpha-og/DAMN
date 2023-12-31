/* eslint-disable react/prop-types */
// react imports
import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
// constant imports
import { routes } from "../assets/constants";
// component imports
import { Branding } from "./components";

const NavbarUl = (props) => {
    const { navrail } = props;
    return (
        <ul className={navrail ? "hidden" : "md:flex hidden flex-row ml-auto "}>
            {routes.map((route, index) => (
                <li
                    className="flex flex-row ml-2 rounded-lg hover:cursor-pointer hover:text-accent-400 hover:bg-slate-900 hover:shadow-sm hover:shadow-violet-400 hover:scale-105 ease-in-out duration-500"
                    key={index}
                >
                    <Link className="px-7 py-1" to={route.path}>
                        {route.title}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

const Nav = () => {
    const [navrail, setNavrail] = useState(false);
    const toggleNavrail = () => {
        setNavrail((navrail) => !navrail);
    };
    return (
        <div className="fixed top-5 w-full z-20 text-white">
            <nav className="flex flex-row items-center h-12 px-5 mx-5 rounded-2xl bg-slate-900 bg-opacity-60 backdrop-blur-md shadow-md">
                <Branding />
                <div className="flex flex-row justify-evenly items-center ml-auto">
                    {!navrail && <NavbarUl />}
                    <AiOutlineMenu
                        size={28}
                        className={
                            navrail
                                ? "block p-1 ml-auto hover:cursor-pointer hover:text-violet-600 ease-in-out duration-500"
                                : "md:hidden block p-1 hover:cursor-pointer hover:text-violet-600 ease-in-out duration-500"
                        }
                        onClick={toggleNavrail}
                    />
                </div>
            </nav>
            <nav
                className={
                    navrail
                        ? "fixed top-5 left-5 md:w-1/4 w-1/2 h-[95%] p-5 rounded-xl bg-slate-900 bg-opacity-60 backdrop-blur-md ease-in-out duration-500"
                        : "fixed top-5 -left-full md:w-1/4 w-1/2 h-[95%] p-5 rounded-xl bg-slate-900 bg-opacity-60 backdrop-blur-md ease-in-out duration-500"
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
                                onClick={toggleNavrail}
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

export default Nav;
