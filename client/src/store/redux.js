import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";
import subjectsReducer from "./subjectsSlice";

const store = configureStore({
    reducer: {
        notesReducer,
        subjectsReducer,
    },
});

export default store;
