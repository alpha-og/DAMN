import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "", //user id [for logged in users]
    notesStackBackward: [], // history of notes in chronoligical sequence for going back (olders to latest — L->R
    notesStackForward: [], // history of notes in chronoligical sequence for going forward(latest to Oldest — L->R
    bookmarks: [], // paths of boomarked notes [for logged in users]
    currentSubject: "42.00 General", //path of current subject
    currentTopic: "", // path of current note
    currentPage: "",
    leftSideBarState: true,
    rightSideBarState: true,
};

const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        setCurrentTopic: (state, action) => {
            state.currentTopic = action.payload;
        },
        setCurrentSubject: (state, action) => {
            state.currentSubject = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        toggleLeftSideBarState: (state, action) => {
            state.leftSideBarState = !state.leftSideBarState;
        },
        toggleRightSideBarState: (state, action) => {
            state.RightSideBarState = !state.RightSideBarState;
        },
        pushTopicB: (state, action) => {
            state.notesStackBackward.push(action.payload);
        },
        pushTopicF: (state, action) => {
            state.notesStackForward.push(action.payload);
        },
        popTopicB: (state, action) => {
            state.notesStackBackward.pop();
        },
        popTopicF: (state, action) => {
            state.notesStackForward.pop();
        },
    },
});

export const {
    setCurrentTopic,
    setCurrentSubject,
    setCurrentPage,
    pushTopicB,
    pushTopicF,
    popTopicB,
    popTopicF,
    toggleLeftSideBarState,
    toggleRightSideBarState,
} = userSlice.actions;
export default userSlice.reducer;
