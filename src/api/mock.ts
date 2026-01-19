import type { AppItem, GraphResponse } from "@/lib/type";

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

export async function listApps(): Promise<AppItem[]> {
    await sleep(400);
    return apps;
}

export async function getGraph(appId: string): Promise<GraphResponse> {
    await sleep(500);
    return graphs[appId] ?? { nodes: [], edges: [] };
}