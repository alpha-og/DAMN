import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    topics: [],
};

const topicsSlice = createSlice({
    name: "Topics",
    initialState,
    reducers: {
        addTopic: (state, action) => {
            let exists = false;
            state.topics.forEach((topic) =>
                topic.name === action.payload.name ? (exists = true) : null
            );

            !exists && state.topics.push(action.payload);
        },
    },
});

export const { addTopic } = topicsSlice.actions;
export default topicsSlice.reducer;
