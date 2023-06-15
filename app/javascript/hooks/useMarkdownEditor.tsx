import React, { useState, useContext, createContext, Dispatch, SetStateAction, ReactNode} from "react";
// import MarkdownEditor from "../components/MarkdownEditor";

// export function useMarkdownEditor(previewElement: HTMLElement) {
//     const [isVisible, setIsVisible] = useState(false);
//     const editor = isVisible ? <MarkdownEditor previewElement={previewElement} /> : null;
// }

type MarkdownEditorContextItem = {
    isVisible: boolean
    setIsVisible: Dispatch<SetStateAction<boolean>>
    previewElement: HTMLElement | null
    setPreviewElement: Dispatch<SetStateAction<HTMLElement | null>>
    content: string
    setContent: Dispatch<SetStateAction<string>>
    onClose: () => void
    setOnClose: Dispatch<() => void>
};

const MarkdownEditorContext = createContext<MarkdownEditorContextItem | null>(null);
export function useMarkdownEditorContext(): MarkdownEditorContextItem {
    const mdeCtx = useContext(MarkdownEditorContext);
    
    return mdeCtx;
}

function newContextItem(): MarkdownEditorContextItem {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [previewElement, setPreviewElement] = useState<HTMLElement | null>(false);
    const [content, setContent] = useState<string>("");
    const [onClose, setOnClose] = useState<() => void>(() => () => { });
    

    return { isVisible, setIsVisible, previewElement, setPreviewElement, content, setContent, onClose, setOnClose}
}

export const MarkdownEditorContextProvider = (props: { children: ReactNode }) => {
    return <MarkdownEditorContext.Provider value={newContextItem()}>{props.children}</MarkdownEditorContext.Provider>;
};
