import type { AppItem, GraphResponse, ServiceNodeData } from "@/lib/type";
import type { Node } from "@xyflow/react";

const apps: AppItem[] = [
    { id: "app-1", name: "Payments Stack" },
    { id: "app-2", name: "Messaging Stack" },
    { id: "app-3", name: "Commerce Stack" },
];

const graphs: Record<string, GraphResponse> = {
    "app-1": {
        nodes: [
            { id: "node-1", type: "service", position: { x: 120, y: 120 }, data: { label: "Auth Service", serviceType: "api" } },
            { id: "node-2", type: "service", position: { x: 420, y: 220 }, data: { label: "Payments Service", serviceType: "api" } },
            { id: "node-3", type: "service", position: { x: 120, y: 340 }, data: { label: "Ledger DB", serviceType: "db" } },
        ],
        edges: [
            { id: "e-1-2", source: "node-1", target: "node-2" },
            { id: "e-2-3", source: "node-2", target: "node-3" },
        ],
    },
    "app-2": { nodes: [], edges: [] },
    "app-3": { nodes: [], edges: [] },
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const listApps = async (): Promise<AppItem[]> => {
    await sleep(400);
    return apps;
}

export const getGraph = async (appId: string): Promise<GraphResponse> => {
    await sleep(500);
    return graphs[appId] ?? { nodes: [], edges: [] };
}

export const updateNode = async (
    appId: string,
    nodeId: string,
    patch: Partial<ServiceNodeData>
): Promise<GraphResponse> => {
    await sleep(400);

    const graph = graphs[appId] ?? { nodes: [], edges: [] };

    graphs[appId] = {
        ...graph,
        nodes: graph.nodes.map((n) =>
            n.id === nodeId ? { ...n, data: { ...(n.data as any), ...patch } } : n
        ),
    };

    return graphs[appId];
}

export const  createNode = async(appId: string, node: Node<ServiceNodeData>): Promise<GraphResponse> => {
    await sleep(400);
    const graph = graphs[appId] ?? { nodes: [], edges: [] };

    graphs[appId] = {
        ...graph,
        nodes: [...graph.nodes, node],
    };

    return graphs[appId];
}

export const  deleteNode = async(appId: string, nodeId: string): Promise<GraphResponse> => {
    await sleep(400);
    const graph = graphs[appId] ?? { nodes: [], edges: [] };

    graphs[appId] = {
        nodes: graph.nodes.filter((n) => n.id !== nodeId),
        edges: graph.edges.filter((e) => e.source !== nodeId && e.target !== nodeId),
    };

    return graphs[appId];
}