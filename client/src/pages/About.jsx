import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/userSlice";

const About = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPage("About"));
    }, []);
    return (
        <div className="flex flex-col w-full h-max min-h-screen text-white">
            About
        </div>
    );
};

export default About;
