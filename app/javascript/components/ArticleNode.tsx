// モック用のNODEコンポーネント
import React, {useState, useRef} from "react";
import { NodeDataType } from './MindMap';
import { Handle, Position } from 'react-flow-renderer';
import { AiOutlineEdit } from "react-icons/ai";
// import MarkdownEditor from "./MarkdownEditor";
import { useMarkdownEditorContext } from "../hooks/useMarkdownEditor";

interface EventNodeProps {
    data: NodeDataType
    selected: boolean
}

export const ArticleNode = ({ data, selected }: EventNodeProps) => {
    const selectedStyleBase = "border-2 max-w-3xl";
    const previewRef = useRef();
    const mdeCtxValue = useMarkdownEditorContext();
    const [mdContent, setMdContent] = useState<string>("# hello");

    function openMde() {
        mdeCtxValue.setPreviewElement(previewRef.current);
        mdeCtxValue.setContent(mdContent);
        mdeCtxValue.setIsVisible(true);
    }

    return (
        <div className="article-node">
            <div
                className={
                    selected
                        // ? ' border-blue-400 ' + selectedStyleBase
                        ? 'border-transparent' + selectedStyleBase //実質ボーダーないのと一緒
                        : 'border-transparent' + selectedStyleBase
                }
            >
                
                <div
                    className={`rounded bg-white border-2 justify-center items-center p-4`}
                    style={{ borderColor: data.color }}
                >
                    <span className="absolute top-0 right-0 mt-2 mr-2 opacity-10 hover:opacity-100" onClick={openMde}><AiOutlineEdit /></span>
                    <div ref={previewRef} className="break-words">
                        node
                    </div>
                    <Handle
                        type="target"
                        style={{ top: '0%' }}
                        position={Position.Top}
                    />
                    <Handle
                        type="source"
                        style={{ bottom: '0%' }}
                        position={Position.Bottom}
                    />
                </div>
            </div>
        </div>
    );
}
