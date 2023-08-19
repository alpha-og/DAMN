// react imports
import { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { LiaAngleRightSolid } from "react-icons/lia";

// redux store imports
import { useDispatch } from "react-redux";
import {
    useCurrentTopic,
    useNotes,
    useNotesStackBackward,
    useNotesStackForward,
} from "../store/getterHooks";
import { addNote } from "../store/notesSlice";
import {
    popTopicB,
    popTopicF,
    pushTopicB,
    pushTopicF,
    setCurrentTopic,
    toggleLeftSideBarState,
} from "../store/userSlice";
// component imports
import { MarkdownRenderer } from "../components/components";
// module imports
import axios from "axios";

const HistoryStack = () => {
    const notesStackBackward = useNotesStackBackward();
    const currentTopic = useCurrentTopic();
    return (
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
                                                note.split("/")[1].length - 3
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
                            .slice(5, currentTopic.split("/")[1].length - 3)}
                </p>
            </span>
        </div>
    );
};

const NoteViewerNav = () => {
    const dispatch = useDispatch();
    const notesStackBackward = useNotesStackBackward();
    const notesStackForward = useNotesStackForward();
    const currentTopic = useCurrentTopic();
    return (
        <div className="flex flex-row items-center p-2 rounded-lg bg-secondary-800 bg-opacity-50">
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
            <HistoryStack />
            <BsLayoutSidebarInset
                className="flex-shrink-0 ml-auto hover:cursor-pointer"
                size={16}
                onClick={() => dispatch(toggleLeftSideBarState())}
            />
        </div>
    );
};

const NoteViewer = () => {
    const dispatch = useDispatch();
    const currentTopic = useCurrentTopic();
    const currentNote = useNotes().filter(
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
        <div className="flex flex-col flex-grow w-full p-4 z-[0] bg-primary-900 rounded-xl shadow-md border border-accent-400 ease-in-out duration-500">
            <NoteViewerNav />
            <div className="mt-2 markdown rounded-lg overflow-y-scroll">
                {decodedText && <MarkdownRenderer content={decodedText} />}
            </div>
        </div>
    );
};

export default NoteViewer;
