import { useState, useCallback, useMemo } from 'react'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, MiniMap, Background, Controls } from '@xyflow/react'
import type { Connection, EdgeChange, NodeChange, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import { useuiStore } from '@/store/ui';



const Flow = () => {
     const setSelectedNodeId = useuiStore((s) => s.setSelectedNodeId);
  const setInspectorOpen = useuiStore((s) => s.setInspectorOpen);

    const initialNodes = useMemo<Node[]>(() => [
        { id: 'n1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
        { id: 'n2', position: { x: 0, y: 100 }, data: { label: 'Node 2' } },
    ], [])
    const initialEdges = useMemo<Edge[]>(() => [{ id: 'n1-n2', source: 'n1', target: 'n2' }], [])
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
        [],
    );
    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
        [],
    );
    const onConnect = useCallback(
        (params: Connection) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );

    const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      setSelectedNodeId(node.id);
      setInspectorOpen(true); // desktop does nothing; mobile opens drawer
    },
    [setSelectedNodeId, setInspectorOpen]
  );
    return (
        <div className='w-full h-full'>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                fitView
            >
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default Flow