/* eslint-disable react/prop-types */
// react imports
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useCurrentSubject, useSubjects } from "../store/getterHooks";
import { setCurrentSubject } from "../store/userSlice";
// module imports

// tailwindCSS styling
const inactive =
    "px-5 py-1 bg-secondary-800 rounded-full shadow-md border-none hover:cursor-pointer hover:text-gray-900 hover:font-medium hover:bg-accent-400 ease-in-out duration-300";

const active =
    "px-5 py-1 bg-secondary-800 rounded-full shadow-md border border-accent-400 hover:cursor-pointer hover:text-gray-900 hover:font-medium hover:bg-accent-400 ease-in-out duration-300";

const SubjectCard = (props) => {
    const { subjectName } = props;
    const subject = useSubjects().filter(
        (subject) => subject.name === subjectName
    )[0];
    const currentSubject = useCurrentSubject();
    const dispatch = useDispatch();
    return (
        <div
            className={currentSubject === subjectName ? active : inactive}
            onClick={() => dispatch(setCurrentSubject(subject.path))}
        >
            <h1>{subject.name.slice(6)}</h1>
        </div>
    );
};

export default SubjectCard;
