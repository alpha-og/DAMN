/* eslint-disable react/prop-types */

// react imports
import React, { Fragment, createElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    pushTopicB,
    setCurrentSubject,
    setCurrentTopic,
} from "../store/userSlice";
// module imports
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import rehypeStringify from "rehype-stringify";
import remarkGFM from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
//  onClick=${}

const Backlink = ({ children }) => {
    const dispatch = useDispatch();

    const currentTopic = useSelector((state) => state.userReducer.currentTopic);

    const subjects = useSelector((state) => state.subjectsReducer.subjects);
    const match = children[0];
    const subject = subjects.filter(
        (subject) => subject.name.slice(0, 5) === match.slice(0, 5)
    )[0].name;
    const topic = match;
    const path = `${subject}/${topic}`;

    const handleClick = () => {
        dispatch(setCurrentSubject(subject));
        dispatch(setCurrentTopic(`${path}.md`));
        dispatch(pushTopicB(currentTopic));
    };
    return (
        <span
            className="text-violet-500 hover:cursor-pointer"
            onClick={handleClick}
        >
            {topic.slice(5)}
        </span>
    );
};

const BacklinkwAltText = ({ children }) => {
    const dispatch = useDispatch();

    const currentTopic = useSelector((state) => state.userReducer.currentTopic);

    const subjects = useSelector((state) => state.subjectsReducer.subjects);
    const match = children[0].match(/\d\d\.\d\d\s[\w\-\s()]+/)[0];
    const subject = subjects.filter(
        (subject) => subject.name.slice(0, 5) === match.slice(0, 5)
    )[0].name;
    const topic = match;
    const path = `${subject}/${topic}`;

    const handleClick = () => {
        dispatch(setCurrentSubject(subject));
        dispatch(setCurrentTopic(`${path}.md`));
        dispatch(pushTopicB(currentTopic));
    };

    return (
        <span
            className="text-violet-500 hover:cursor-pointer"
            onClick={handleClick}
        >
            {topic.slice(5)}
        </span>
    );
};

const MarkdownRenderer = (props) => {
    let { content } = props;
    content = content && content.replace(/(\\\\)/g, "\\\\\\\\");
    content =
        content &&
        content.replace(/\[\[[\w-.\s]+\]\]/g, (match) => {
            return !match.includes("Screenshot")
                ? `<backlink>${match.slice(2, match.length - 2)}</backlink>`
                : match;
        });
    content =
        content &&
        content.replace(/\[\[[\w-.\s()|]+\]\]/g, (match) =>
            !match.includes("Screenshot")
                ? `<backlinkwAltText>${match.slice(
                      2,
                      match.length - 2
                  )}</backlinkwAltText>`
                : match
        );

    const [processedContent, setProcessedContent] = useState(Fragment);

    useEffect(() => {
        const result = unified()
            .use(remarkParse)
            .use(remarkGFM)
            .use(remarkRehype, { allowDangerousHtml: true })
            .use(rehypeRaw)
            .use(rehypeStringify)
            .use(rehypeReact, {
                createElement,
                Fragment,
                components: {
                    backlink: Backlink,
                    backlinkwalttext: BacklinkwAltText,
                },
            })
            .processSync(content).result;
        setProcessedContent(result);
    }, [content]);

    useEffect(() => {
        window.MathJax && window.MathJax.typesetPromise();
    }, [processedContent]);

    return <>{processedContent}</>;
};

export default MarkdownRenderer;
