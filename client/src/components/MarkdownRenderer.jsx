/* eslint-disable react/prop-types */

// react imports
import React, { Fragment, createElement, useEffect, useState } from "react";
// module imports
import rehypeReact from "rehype-react";
import rehypeStringify from "rehype-stringify";
import remarkGFM from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

const MarkdownRenderer = (props) => {
    let { content } = props;
    content = content && content.replace(/(\\\\)/g, "\\\\\\\\");
    const [processedContent, setProcessedContent] = useState(Fragment);

    useEffect(() => {
        const result = unified()
            .use(remarkParse)
            .use(remarkGFM)
            .use(remarkRehype)
            .use(rehypeStringify)
            .use(rehypeReact, { createElement, Fragment })
            .processSync(content).result;
        setProcessedContent(result);
    }, [content]);

    useEffect(() => {
        window.MathJax && window.MathJax.typesetPromise();
    }, [processedContent]);

    return <>{processedContent}</>;
};

export default MarkdownRenderer;
