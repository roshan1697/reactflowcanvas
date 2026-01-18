import { useState, useCallback, useMemo } from 'react'
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge, MiniMap, Background, Controls } from '@xyflow/react'
import type { Connection, EdgeChange, NodeChange, Node, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css'
import { useuiStore } from '@/store/ui';
import { useGraphStore } from '@/store/graph';
import ServiceNode from './node/servicenode';



const Flow = () => {
      const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useGraphStore();

    const setSelectedNodeId = useuiStore((s) => s.setSelectedNodeId);
    const setInspectorOpen = useuiStore((s) => s.setInspectorOpen);
      const selectedNodeId = useuiStore((s) => s.selectedNodeId);

    const decoratedNodes = useMemo(
    () =>
      nodes.map((n) =>
        n.id === selectedNodeId
          ? { ...n, style: { ...n.style, outline: "2px solid currentColor" } }
          : { ...n, style: { ...n.style, outline: undefined } }
      ),
    [nodes, selectedNodeId]
  );

    const onNodeClick = useCallback(
        (_: React.MouseEvent, node: Node) => {
            setSelectedNodeId(node.id);
            setInspectorOpen(true); // desktop does nothing; mobile opens drawer
        },
        [setSelectedNodeId, setInspectorOpen]
    );
      const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
    // optional: close drawer when cleared 
    setInspectorOpen(false);
  }, [setSelectedNodeId, setInspectorOpen]);

  const nodeTypes = {service:ServiceNode}

    return (
        <div className='w-full h-full'>
            <ReactFlow
                nodes={decoratedNodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onPaneClick={onPaneClick}
                fitView
                nodeTypes={nodeTypes}
            >
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default Flow