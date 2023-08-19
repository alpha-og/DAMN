/* eslint-disable react/prop-types */
// react imports
import React, { useEffect } from "react";
// redux store imports
import { useDispatch } from "react-redux";
import { setCurrentPage } from "../store/userSlice";
// component imports
import {
    LeftSideBar,
    NoteViewer,
    SubjectPicker,
} from "../components/components";

const Notes = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPage("Notes"));
    }, []);
    return (
        <div className="flex flex-col w-full h-max min-h-screen text-white px-5">
            <div className="flex flex-row justify-center items-center mt-24">
                <SubjectPicker />
            </div>
            <div className="flex w-full h-[85vh] mt-6 mb-12">
                <LeftSideBar />
                <NoteViewer />
            </div>
        </div>
    );
};

export default Notes;
