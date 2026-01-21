import { create } from "zustand";
import {
    addEdge,
    applyEdgeChanges,
    applyNodeChanges,

} from "@xyflow/react";
import type { Connection, Edge, EdgeChange, Node, NodeChange } from "@xyflow/react";


type GraphState = {
    nodes: Node[];
    edges: Edge[];

    onNodesChange: (changes: NodeChange[]) => void;
    onEdgesChange: (changes: EdgeChange[]) => void;
    onConnect: (connection: Connection) => void;

    updateNodeLabel: (nodeId: string, label: string) => void;
    setGraph: (nodes: Node[], edges: Edge[]) => void;
    addLocalNode: (node: Node) => void;
    removeLocalNode: (nodeId: string) => void;
};

const initialNodes: Node[] = [
    { id: "node-1", type: "service", position: { x: 120, y: 120 }, data: { label: "Auth Service", serviceType: "api" } },
    { id: "node-2", type: "service", position: { x: 420, y: 220 }, data: { label: "Payments Service", serviceType: "api" } },
    { id: "node-3", type: "service", position: { x: 120, y: 340 }, data: { label: "Notifications", serviceType: "api" } },
];

const initialEdges: Edge[] = [
    { id: "e-1-2", source: "node-1", target: "node-2" },
    { id: "e-1-3", source: "node-1", target: "node-3" },
];

export const useGraphStore = create<GraphState>((set, get) => (
    {
        nodes: initialNodes,
        edges: initialEdges,

        onNodesChange: (changes) => set({ nodes: applyNodeChanges(changes, get().nodes) }),
        onEdgesChange: (changes) => set({ edges: applyEdgeChanges(changes, get().edges) }),
        onConnect: (connection) => set({ edges: addEdge(connection, get().edges) }),

        updateNodeLabel: (nodeId, label) => set({
            nodes: get().nodes.map((n) => n.id === nodeId ? { ...n, data: { ...n, label } } : n)
        }),
        setGraph: (nodes, edges) => set({ nodes, edges }),
        addLocalNode: (node) => set({ nodes: [...get().nodes, node] }),

        removeLocalNode: (nodeId) =>
            set({
                nodes: get().nodes.filter((n) => n.id !== nodeId),
                edges: get().edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
            })
    }
))