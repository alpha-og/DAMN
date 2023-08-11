/* eslint-disable react/prop-types */
// react imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentTopic } from "../store/userSlice";
// module imports

const TopicCard = (props) => {
    const { topicName } = props;
    const topic = useSelector((state) => state.topicsReducer.topics).filter(
        (topic) => topic.name === topicName
    )[0];
    const dispatch = useDispatch();
    return (
        <div
            className="px-5 py-2 bg-slate-800 rounded-md shadow-md hover:cursor-pointer hover:text-gray-900 hover:font-medium hover:bg-violet-500 ease-in-out duration-300"
            onClick={() => dispatch(setCurrentTopic(topic.path))}
        >
            <h1>{topic.name}</h1>
            <p className="text-gray-600">Description</p>
        </div>
    );
};

export default TopicCard;