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
    const dispatch = useDispatch();
    return (
        <div
            className="px-5 py-2 bg-slate-800 rounded-md shadow-md hover:cursor-pointer hover:text-gray-900 hover:font-medium hover:bg-violet-500 ease-in-out duration-300"
            onClick={() => dispatch(setCurrentSubject(subject.path))}
        >
            <h1>{subject.name}</h1>
            <p className="text-gray-600">Description</p>
        </div>
    );
};

export default SubjectCard;
