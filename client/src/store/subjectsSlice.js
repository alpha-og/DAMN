import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subjects: [],
};

const subjectsSlice = createSlice({
    name: "Subjects",
    initialState,
    reducers: {
        addSubject: (state, action) => {
            let exists = false;
            state.subjects.forEach((note) =>
                note.name === action.payload.name ? (exists = true) : null
            );

            !exists && state.subjects.push(action.payload);
        },
    },
});

export const { addSubject } = subjectsSlice.actions;
export default subjectsSlice.reducer;
