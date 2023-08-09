import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notes: [],
};

const notesSlice = createSlice({
    name: "Notes",
    initialState,
    reducers: {
        addNote: (state, action) => {
            let exists = false;
            state.notes.forEach((note) =>
                note.name === action.payload.name ? (exists = true) : null
            );

            !exists && state.notes.push(action.payload);
        },
        removeNote: (state, action) => {
            state.notes = state.notes.filter(
                (note) => note.name !== action.payload.name
            );
        },
    },
});

export const { addNote, removeNote } = notesSlice.actions;
export default notesSlice.reducer;
