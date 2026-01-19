import type { Edge, Node } from "@xyflow/react";

export type ServiceNodeData = {
    label: string;
    serviceType: 'api' | 'db' | 'queue' | undefined;
}

export type AppItem = { id: string; name: string };

export type GraphResponse = {
    nodes: Node<ServiceNodeData>[];
    edges: Edge[];
};