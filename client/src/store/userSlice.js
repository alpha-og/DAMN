import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "", //user id [for logged in users]
    notesStack: [], // history of notes in chronoligical sequence (olders to latest — L->R
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
    },
});

export const { setCurrentTopic, setCurrentSubject } = userSlice.actions;
export default userSlice.reducer;
