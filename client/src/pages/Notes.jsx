/* eslint-disable react/prop-types */
//react imports
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { addSubject } from "../store/subjectsSlice";
import { addTopic } from "../store/topicsSlice";
import { setCurrentSubject, setCurrentTopic } from "../store/userSlice";
// module imports
import axios from "axios";
// file imports
import {
    MarkdownRenderer,
    SubjectCard,
    TopicCard,
} from "../components/components";
import { addNote } from "../store/notesSlice";

const Subjects = (props) => {
    const { subjects } = props;
    return (
        <div className=" grid auto-rows-max gap-2 flex-grow py-2 rounded-md overflow-scroll">
            {subjects &&
                subjects.map((subject, index) => (
                    <SubjectCard key={index} subjectName={subject.name} />
                ))}
        </div>
    );
};

const Topics = () => {
    const dispatch = useDispatch();
    const currentSubject = useSelector(
        (state) => state.userReducer.currentSubject
    );
    const topics = useSelector((state) => state.topicsReducer.topics).filter(
        (topic) =>
            topic.path.split("/")[0] === currentSubject &&
            topic.name !== "09.01 attachments" &&
            topic.name !== ".DS_Store"
    );
    axios
        .get(
            `https://api.github.com/repos/alpha-og/42-Data-Science-AI-ML-and-DL/contents/${currentSubject}`
        )
        .then((res) => res.data.forEach((topic) => dispatch(addTopic(topic))));
    return (
        <div className="grid auto-rows-max gap-2 flex-grow py-2 rounded-md overflow-scroll">
            {topics &&
                topics.map((topic, index) => (
                    <TopicCard key={index} topicName={topic.name} />
                ))}
        </div>
    );
};

const Viewer = () => {
    const dispatch = useDispatch();
    const currentTopic = useSelector((store) => store.userReducer.currentTopic);
    const currentNote = useSelector((state) => state.notesReducer.notes).filter(
        (note) => note.name == currentTopic.split("/")[1]
    )[0];
    currentTopic &&
        axios
            .get(
                `https://api.github.com/repos/alpha-og/42-Data-Science-AI-ML-and-DL/contents/${currentTopic}`
            )
            .then((res) => dispatch(addNote(res.data)));

    const [decodedText, setDecodedText] = useState(undefined);

    useEffect(() => {
        // currentNote && console.log(atob(currentNote.content));
        const arrayBuffer = new Uint8Array(
            [...atob(currentNote ? currentNote.content : "")].map((char) =>
                char.charCodeAt(0)
            )
        ).buffer;
        setDecodedText(new TextDecoder("utf-8").decode(arrayBuffer));
    }, [currentNote]);
    return (
        <div className="flex flex-col flex-grow ml-2 p-4 bg-gray-900 rounded-xl shadow-md border border-violet-400">
            <div className="markdown rounded-lg overflow-scroll">
                {decodedText && <MarkdownRenderer content={decodedText} />}
            </div>
        </div>
    );
};

const Notes = () => {
    const dispatch = useDispatch();
    const subjects = useSelector((state) => state.subjectsReducer.subjects);
    const selectedSubject = useSelector(
        (state) => state.userReducer.currentSubject
    );

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
        <div className="flex flex-col w-full h-max min-h-screen text-white px-5">
            <div className="flex flex-row w-full h-[85vh] mt-24 mb-12">
                <div className="flex flex-col flex-grow-0 flex-shrink-0 md:w-80 w-64 p-4 bg-gray-900 rounded-xl shadow-md border border-violet-400 ease-in-out duration-500">
                    <div>
                        <BiArrowBack
                            size={28}
                            className="flex-shrink-0 p-1 hover:cursor-pointer"
                            onClick={() => {
                                dispatch(setCurrentSubject(""));
                                dispatch(setCurrentTopic(""));
                            }}
                        />
                    </div>
                    {selectedSubject ? (
                        <Topics />
                    ) : (
                        <Subjects subjects={subjects} />
                    )}
                </div>
                <Viewer />
            </div>
        </div>
    );
};

export default Notes;
