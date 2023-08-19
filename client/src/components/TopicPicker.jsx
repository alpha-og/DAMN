// redux store imports
import { useDispatch } from "react-redux";
// component imports
import { TopicCard } from "./components";
// module imports
import axios from "axios";
import { useCurrentSubject, useTopics } from "../store/getterHooks";
import { addTopic } from "../store/topicsSlice";

const TopicPicker = () => {
    const dispatch = useDispatch();
    const currentSubject = useCurrentSubject();
    const topics = useTopics().filter(
        (topic) =>
            topic.path.split("/")[0] === currentSubject &&
            topic.name !== "09.01 attachments" &&
            topic.name !== ".DS_Store"
    );
    axios
        .get(
            `https://api.github.com/repos/alpha-og/42-Data-Science-AI-ML-and-DL/contents/${currentSubject}`
        )
        .then((res) => res.data.forEach((topic) => dispatch(addTopic(topic))));
    return (
        <div className="grid auto-rows-max gap-2 flex-grow mt-2  rounded-md overflow-y-scroll">
            {topics &&
                topics.map((topic, index) => (
                    <TopicCard key={index} topicName={topic.name} />
                ))}
        </div>
    );
};

export default TopicPicker;
