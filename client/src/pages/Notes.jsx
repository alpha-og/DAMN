//react imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSubject } from "../store/subjectsSlice";
// module imports
import axios from "axios";
// file imports
import { Card } from "../components/components";

const Notes = () => {
    const dispatch = useDispatch();
    const subjects = useSelector((state) => state.subjectsReducer.subjects);
    useEffect(() => {
        axios
            .get(
                `https://api.github.com/repos/alpha-og/42-Data-Science-AI-ML-and-DL/contents/`
            )
            .then((res) =>
                res.data.forEach((subject) => {
                    subject.name !== ".gitignore" &&
                        dispatch(addSubject(subject));
                })
            )
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="flex flex-col w-full h-max min-h-screen text-white">
            <div className={`mx-auto md:my-[25%]`}>
                <h1 className="text-9xl font-bold">Subjects</h1>
            </div>
            <div
                className={`grid grid-cols-${
                    subjects && subjects.length
                } w-full p-5 mx-auto mb-[10%]`}
            >
                {subjects.map((subject, index) => (
                    <Card key={index} subjectName={subject.name} />
                ))}
            </div>
        </div>
    );
};

export default Notes;
