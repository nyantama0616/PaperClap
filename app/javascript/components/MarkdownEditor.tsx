import React, { useState, useEffect } from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { marked } from "marked";
import DOMPurify from "dompurify";
import highlightjs from "highlight.js";
import "highlight.js/styles/github.css";
import { useMarkdownEditorContext } from "../hooks/useMarkdownEditor";

marked.setOptions({ breaks: true });

// interface MarkdownEditorProps {
//     previewElement: HTMLElement | null
// }

const MarkdownEditor = () => {
    // ハイライトの設定
    marked.setOptions({
        highlight: (code, lang) => {
            return highlightjs.highlightAuto(code, [lang]).value;
        },
    });

    // const [markdownValue, setMarkdownValue] = useState(initContent);
    const mdeCtxValue = useMarkdownEditorContext();

    const onChange = (value) => {
        mdeCtxValue.setContent(value);
    };

    useEffect(() => {
        if (mdeCtxValue.previewElement) {
            mdeCtxValue.previewElement.innerHTML = DOMPurify.sanitize(marked(mdeCtxValue.content));
        }
    }, [mdeCtxValue.content]);

    return (
        <div className="markdown-editor">
            {/* <SimpleMde value={markdownValue} onChange={onChange}/> */}
            <SimpleMde value={mdeCtxValue.content} onChange={onChange}/>
        </div>
    );
};

// TODO: 画像を扱えるようにする https://zenn.dev/rinka/articles/b260e200cb5258

export default MarkdownEditor;
