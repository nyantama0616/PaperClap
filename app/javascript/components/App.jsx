import React from "react";
import MindMap from "./MindMap";
import MarkdownEditor from "./MarkdownEditor";
import { MarkdownEditorContextProvider } from "../hooks/useMarkdownEditor";

function App() {
    return <div>
        <h1 className="text-5xl">App</h1>
        {/* <MindMap /> */}
        {/* <MarkdownEditor /> */}
        <MarkdownEditorContextProvider>
            <MindMap />
        </MarkdownEditorContextProvider>
    </div>
}

export default App;
