import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./notesSlice";
import subjectsReducer from "./subjectsSlice";
import topicsReducer from "./topicsSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        notesReducer,
        subjectsReducer,
        topicsReducer,
        userReducer,
    },
});

export default store;
