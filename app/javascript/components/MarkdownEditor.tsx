import React, { useState } from "react";
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { marked } from "marked";
import DOMPurify from "dompurify";
import highlightjs from "highlight.js";
import "highlight.js/styles/github.css";

marked.setOptions({ breaks: true });

interface MarkdownEditorProps {
    previewElement: HTMLElement | null
    initContent: string
}

const MarkdownEditor = ({previewElement, initContent}: MarkdownEditorProps) => {
    // ハイライトの設定
    marked.setOptions({
        highlight: (code, lang) => {
            return highlightjs.highlightAuto(code, [lang]).value;
        },
    });

    // const [markdownValue, setMarkdownValue] = useState("");
    const [markdownValue, setMarkdownValue] = useState(initContent);

    const onChange = (value) => {
        console.log("change!");
        
        setMarkdownValue(value);
        if (previewElement) {
            previewElement.innerHTML = DOMPurify.sanitize(marked(markdownValue));
        }
    };

    return (
        <div className="markdown-editor">
            <SimpleMde value={markdownValue} onChange={onChange}/>
            {/* <div
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(marked(markdownValue)),
                }}
            ></div> */}
        </div>
    );
};

// TODO: 画像を扱えるようにする https://zenn.dev/rinka/articles/b260e200cb5258


export default MarkdownEditor;
