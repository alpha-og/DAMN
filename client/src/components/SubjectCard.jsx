/* eslint-disable react/prop-types */
// react imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSubject } from "../store/userSlice";
// module imports

const SubjectCard = (props) => {
    const { subjectName } = props;
    const subject = useSelector(
        (state) => state.subjectsReducer.subjects
    ).filter((subject) => subject.name === subjectName)[0];
    const currentSubject = useSelector(
        (state) => state.userReducer.currentSubject
    );
    const dispatch = useDispatch();
    return (
        <div
            className={
                currentSubject === subjectName
                    ? "px-5 py-1 bg-slate-800 rounded-full shadow-md border border-violet-500 hover:cursor-pointer hover:text-gray-900 hover:font-medium hover:bg-violet-500 ease-in-out duration-300"
                    : "px-5 py-1 bg-slate-800 rounded-full shadow-md border-none hover:cursor-pointer hover:text-gray-900 hover:font-medium hover:bg-violet-500 ease-in-out duration-300"
            }
            onClick={() => dispatch(setCurrentSubject(subject.path))}
        >
            <h1>{subject.name.slice(6)}</h1>
            {/* <p className="text-gray-600">Description</p> */}
        </div>
    );
};

export default SubjectCard;
