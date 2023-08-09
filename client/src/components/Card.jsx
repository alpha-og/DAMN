/* eslint-disable react/prop-types */
// react imports
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// module imports
import axios from "axios";

const Card = (props) => {
    const { subjectName } = props;
    const subject = useSelector(
        (state) => state.subjectsReducer.subjects
    ).filter((subject) => subject.name === subjectName)[0];
    useEffect(() => {}, [subject]);
    return (
        <div className="px-5 py-2 mx-3 bg-slate-800 bg-opacity-60 rounded-md hover:cursor-pointer hover:scale-105 hover:text-gray-900 hover:font-medium hover:bg-violet-500 ease-in-out duration-300">
            <h1>{subject.name}</h1>
            <p>Description</p>
        </div>
    );
};

export default Card;
