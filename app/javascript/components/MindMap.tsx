import React, {useState, useCallback} from "react";
import ReactFlow, {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,
    Background,
    Connection,
    Controls,
    Edge,
    EdgeChange,
    FitViewOptions,
    Node,
    NodeChange,
    OnSelectionChangeParams,
    updateEdge,
} from 'react-flow-renderer';

import { useGetWindowSize } from '../hooks/useGetWindowSize';
import { ArticleNode } from "./ArticleNode";
import MarkdownEditor from "./MarkdownEditor";
import { MarkdownEditorContextProvider, useMarkdownEditorContext } from "../hooks/useMarkdownEditor";

// TODO: 一旦ここに書いてあるが、この部分がPluginごとに異なる部分になる想定
export type NodeDataType = {
    label: string
    name: string
    color: string
}

const initialNodes: Node<NodeDataType>[] = [
    {
        id: '1',
        data: {
            label: 'Node 1',
            name: 'Article Node 1',
            color: '#38B5AD',
        },
        position: { x: 5, y: 5 },
        type: 'articleNode',
    },
    {
        id: '2',
        data: {
            label: 'Node 2',
            name: 'Article Node 2',
            color: '#38B5AD',
        },
        position: { x: 5, y: 100 },
        type: 'articleNode',
    },
    {
        id: '3',
        data: {
            label: 'Node 3',
            name: 'Article Node 3',
            color: '#38B5AD',
        },
        position: { x: 5, y: 200 },
        type: 'articleNode',
    },
];

const initialEdges: Edge[] = [{ id: 'e1-2', source: '1', target: '2' }];

const fitViewOptions: FitViewOptions = {
    padding: 0.2,
};

const nodeTypes = { articleNode: ArticleNode };

function MindMap() {
    const { height: windowHeight, width: windowWidth } = useGetWindowSize();
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);
    const [selectedNode, setSelectedNode] = useState<Node | null>(null);
    const mdeCtxValue = useMarkdownEditorContext();

    const onNodesChange = useCallback(
        (changes: NodeChange[]) =>
            setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes],
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            setEdges((eds) => applyEdgeChanges(changes, eds))
        },
        [setEdges],
    );

    const onConnect = useCallback(
        (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges],
    );

    const onEdgeUpdate = useCallback(
        (oldEdge: Edge, newConnection: Connection) =>
            setEdges((els) => updateEdge(oldEdge, newConnection, els)),
        [],
    );

    const onSelectionChange = useCallback(
        ({ nodes, edges }: OnSelectionChangeParams) => {
            const selectedNodes = nodes.filter((node) => node.selected)
            if (selectedNodes.length === 0) setSelectedNode(null)
            if (selectedNodes.length === 1) setSelectedNode(selectedNodes[0])
        },
        [],
    );
    return (
        <div style={{ height: windowHeight, width: windowWidth }}>
            {windowWidth > 0 && windowHeight > 0 ? (
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onEdgeUpdate={onEdgeUpdate}
                    nodeTypes={nodeTypes}
                    // onSelectionChange={onSelectionChange}
                    fitView
                    fitViewOptions={fitViewOptions}
                >
                    <Controls />
                    <Background style={{ backgroundColor: '#f5f5f5' }} />
                </ReactFlow>
            ) : undefined}
            {mdeCtxValue.isVisible ?
                // なぜかz-50つけないとエディター使えない
                <div className="fixed bottom-0 z-50">
                    <MarkdownEditor previewElement={mdeCtxValue.previewElement} initContent={mdeCtxValue.content} />
                </div>
            : null}
        </div>
    );
}

export default MindMap;
