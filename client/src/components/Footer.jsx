// react imports
import React from "react";
// component imports
import Branding from "../components/Branding";

const Footer = () => {
    return (
        <div className=" w-screen h-48 flex items-center text-gray-600 bg-gray-900">
            <div className=" max-w-max h-24 mx-auto flex flex-row justify-between items-center">
                <div className=" flex flex-col justify-between h-full mr-16">
                    <Branding />
                    <p className="text-lg md:w-80 ">
                        Open source notes for Data Science, AI and ML
                    </p>
                </div>
                <div className="">
                    <ul>
                        <li>About</li>
                        <li className="my-2">Github</li>
                        <li>Contact Us</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Footer;
