import { useSelector } from "react-redux";

const useSubjects = () => {
    return useSelector((state) => state.subjectsReducer.subjects);
};

const useTopics = () => {
    return useSelector((state) => state.topicsReducer.topics);
};

const useNotes = () => {
    return useSelector((state) => state.notesReducer.notes);
};

const useCurrentSubject = () => {
    return useSelector((state) => state.userReducer.currentSubject);
};

const useCurrentTopic = () => {
    return useSelector((state) => state.userReducer.currentTopic);
};

const useNotesStackBackward = () => {
    return useSelector((state) => state.userReducer.notesStackBackward);
};

const useNotesStackForward = () => {
    return useSelector((state) => state.userReducer.notesStackForward);
};

const useLeftSideBarState = () => {
    return useSelector((state) => state.userReducer.leftSideBarState);
};

const useRightSideBarState = () => {
    return useSelector((state) => state.userReducer.rightSideBarState);
};

export {
    useCurrentSubject,
    useCurrentTopic,
    useLeftSideBarState,
    useNotes,
    useNotesStackBackward,
    useNotesStackForward,
    useRightSideBarState,
    useSubjects,
    useTopics,
};
