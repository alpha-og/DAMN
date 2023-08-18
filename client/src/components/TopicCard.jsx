/* eslint-disable react/prop-types */
// react imports
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pushTopicB, setCurrentTopic } from "../store/userSlice";
// module imports

const TopicCard = (props) => {
    const { topicName } = props;
    const notesStackBackward = useSelector(
        (store) => store.userReducer.notesStackBackward
    );
    const currentTopic = useSelector((store) => store.userReducer.currentTopic);

    const topic = useSelector((state) => state.topicsReducer.topics).filter(
        (topic) => topic.name === topicName
    )[0];
    const dispatch = useDispatch();
    return (
        <div
            className={
                currentTopic.split("/")[1] === topic.name
                    ? "px-5 py-2 bg-slate-800 rounded-md shadow-md border border-violet-400 hover:cursor-pointer hover:text-gray-900 hover:font-medium hover:bg-violet-500 ease-in-out duration-300"
                    : "px-5 py-2 bg-slate-800 rounded-md shadow-md border-none hover:cursor-pointer hover:text-gray-900 hover:font-medium hover:bg-violet-500 ease-in-out duration-300"
            }
            onClick={() => {
                dispatch(setCurrentTopic(topic.path));
                currentTopic &&
                    currentTopic != topic.path &&
                    dispatch(pushTopicB(currentTopic));
            }}
        >
            <h1>{topic.name.slice(6, topic.name.length - 3)}</h1>
            {/* <p className="text-gray-600">Description</p> */}
        </div>
    );
};

export default TopicCard;
