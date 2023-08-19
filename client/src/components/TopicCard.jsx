/* eslint-disable react/prop-types */
// redux store imports
import { useDispatch } from "react-redux";
import { useCurrentTopic, useTopics } from "../store/getterHooks";
import { pushTopicB, setCurrentTopic } from "../store/userSlice";

const active =
    "md:max-w-[17.3rem] px-5 py-2 bg-secondary-800 rounded-md shadow-md border border-accent-400 hover:cursor-pointer hover:text-gray-900 hover:font-medium hover:bg-accent-400 ease-in-out duration-300";

const inactive =
    "md:max-w-[17.3rem] px-5 py-2 bg-secondary-800 rounded-md shadow-md border-none hover:cursor-pointer hover:text-gray-900 hover:font-medium hover:bg-accent-400 ease-in-out duration-300";

const TopicCard = (props) => {
    const { topicName } = props;
    const currentTopic = useCurrentTopic();
    const topic = useTopics().filter((topic) => topic.name === topicName)[0];
    const dispatch = useDispatch();
    return (
        <div
            className={
                currentTopic.split("/")[1] === topic.name ? active : inactive
            }
            onClick={() => {
                dispatch(setCurrentTopic(topic.path));
                currentTopic &&
                    currentTopic != topic.path &&
                    dispatch(pushTopicB(currentTopic));
            }}
        >
            <h1 className="md:truncate">
                {topic.name.slice(6, topic.name.length - 3)}
            </h1>
        </div>
    );
};

export default TopicCard;
