import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "", //user id [for logged in users]
    notesStackBackward: [], // history of notes in chronoligical sequence for going back (olders to latest — L->R
    notesStackForward: [], // history of notes in chronoligical sequence for going forward(latest to Oldest — L->R
    bookmarks: [], // paths of boomarked notes [for logged in users]
    currentSubject: "", //path of current subject
    currentTopic: "", // path of current note
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
    pushTopicB,
    pushTopicF,
    popTopicB,
    popTopicF,
} = userSlice.actions;
export default userSlice.reducer;
