/* eslint-disable react/prop-types */
// react imports
import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsLayoutSidebarInset, BsSearch } from "react-icons/bs";
import { LiaAngleRightSolid } from "react-icons/lia";
// redux store imports
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../store/notesSlice";
import { addSubject } from "../store/subjectsSlice";
import { addTopic } from "../store/topicsSlice";
import {
    popTopicB,
    popTopicF,
    pushTopicB,
    pushTopicF,
    setCurrentPage,
    setCurrentSubject,
    setCurrentTopic,
} from "../store/userSlice";
// module imports
import axios from "axios";
// comoponent imports
import {
    MarkdownRenderer,
    SubjectCard,
    TopicCard,
} from "../components/components";

const Subjects = () => {
    const subjects = useSelector((state) => state.subjectsReducer.subjects);
    return (
        <div className="grid grid-flow-col auto-cols-max gap-2 rounded-md">
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
        <div className="grid auto-rows-max gap-2 flex-grow mt-2  rounded-md overflow-y-scroll">
            {topics &&
                topics.map((topic, index) => (
                    <TopicCard key={index} topicName={topic.name} />
                ))}
        </div>
    );
};

const Viewer = (props) => {
    const dispatch = useDispatch();
    const notesStackBackward = useSelector(
        (store) => store.userReducer.notesStackBackward
    );
    const notesStackForward = useSelector(
        (store) => store.userReducer.notesStackForward
    );
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
    const { setLeftSidebar } = props;

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
        <div className="flex flex-col flex-grow w-full p-4 z-[0] bg-gray-900 rounded-xl shadow-md border border-violet-400 ease-in-out duration-500">
            <div className="flex flex-row items-center p-2 rounded-lg bg-slate-800 bg-opacity-50">
                <div className="flex flex-row">
                    <AiOutlineArrowLeft
                        className="flex-shrink-0 hover:cursor-pointer"
                        onClick={() => {
                            if (notesStackBackward.length > 0) {
                                dispatch(pushTopicF(currentTopic));
                                dispatch(
                                    setCurrentTopic(
                                        notesStackBackward.slice(
                                            notesStackBackward.length - 1
                                        )[0]
                                    )
                                );
                                dispatch(popTopicB());
                            }
                        }}
                    />
                    <AiOutlineArrowRight
                        className="flex-shrink-0 ml-2 hover:cursor-pointer"
                        onClick={() => {
                            if (notesStackForward.length > 0) {
                                dispatch(pushTopicB(currentTopic));
                                dispatch(
                                    setCurrentTopic(
                                        notesStackForward.slice(
                                            notesStackForward.length - 1
                                        )[0]
                                    )
                                );
                                dispatch(popTopicF());
                            }
                        }}
                    />
                </div>
                <div className="flex flex-row items-center justify-start w-full mx-5 text-sm overflow-clip">
                    {notesStackBackward.length > 0 &&
                        notesStackBackward
                            .slice(notesStackBackward.length - 2)
                            .map((note, index) => {
                                return (
                                    <span
                                        key={index}
                                        className="flex flex-row items-center"
                                    >
                                        <p className="max-w-[7rem] truncate">
                                            {note &&
                                                note
                                                    .split("/")[1]
                                                    .slice(
                                                        5,
                                                        note.split("/")[1]
                                                            .length - 3
                                                    )}
                                        </p>
                                        <LiaAngleRightSolid className="text-gray-300 " />
                                    </span>
                                );
                            })}
                    <span className="flex flex-row items-center">
                        <p className="min-w-min max-w-[50%] truncate">
                            {currentTopic &&
                                currentTopic
                                    .split("/")[1]
                                    .slice(
                                        5,
                                        currentTopic.split("/")[1].length - 3
                                    )}
                        </p>
                    </span>
                </div>
                <BsLayoutSidebarInset
                    className="flex-shrink-0 ml-auto hover:cursor-pointer"
                    size={16}
                    onClick={() => setLeftSidebar((state) => !state)}
                />
            </div>
            <div className="mt-2 markdown rounded-lg overflow-y-scroll">
                {decodedText && <MarkdownRenderer content={decodedText} />}
            </div>
        </div>
    );
};

const LeftSidebar = (props) => {
    const dispatch = useDispatch();
    const selectedSubject = useSelector(
        (state) => state.userReducer.currentSubject
    );
    const { setLeftSidebar, leftSidebar } = props;
    return (
        <div
            className={
                leftSidebar
                    ? "md:relative absolute md:left-0 left-5 right-5 flex flex-col flex-grow-0 flex-shrink-0 md:w-80 h-[85vh] p-4 md:mr-2 z-[1] bg-gray-900 rounded-xl shadow-md border border-violet-400 ease-in-out duration-500"
                    : "absolute -left-full right-full flex flex-col flex-grow-0 flex-shrink-0 h-[85vh] md:w-80 p-4 mr-2 z-[1] bg-gray-900 rounded-xl shadow-md border border-violet-400 ease-in-out duration-500"
            }
        >
            <div className="flex flex-row justify-between items-center p-2 rounded-lg bg-slate-800 bg-opacity-50">
                {/* <BiArrowBack
                    className="flex-shrink-0 hover:cursor-pointer"
                    onClick={() => {
                        dispatch(setCurrentSubject(""));
                        // dispatch(setCurrentTopic(""));
                    }}
                /> */}
                <BsSearch
                    className="flex-shrink-0 hover:cursor-pointer"
                    onClick={() => {}}
                    size={16}
                />
                <div className="text-sm">
                    <p>{selectedSubject && selectedSubject.slice(6)}</p>
                </div>
                <BsLayoutSidebarInset
                    size={16}
                    className="hover:cursor-pointer"
                    onClick={() => setLeftSidebar((state) => !state)}
                />
            </div>
            {selectedSubject && <Topics />}
        </div>
    );
};

const Notes = () => {
    const [leftSidebar, setLeftSidebar] = useState(true);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setCurrentPage("Notes"));
    }, []);
    return (
        <div className="flex flex-col w-full h-max min-h-screen text-white px-5">
            <div className="flex flex-row justify-center items-center mt-24">
                <Subjects />
            </div>
            <div className="flex w-full h-[85vh] mt-6 mb-12">
                <LeftSidebar {...{ setLeftSidebar, leftSidebar }} />
                <Viewer {...{ setLeftSidebar }} />
            </div>
        </div>
    );
};

export default Notes;
