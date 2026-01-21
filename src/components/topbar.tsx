import type { Node } from "@xyflow/react";
import { SidebarTrigger } from "./ui/sidebar";
import type { GraphResponse, ServiceNodeData } from "@/lib/type";
import { useuiStore } from "@/store/ui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNode } from "@/api/mock";

const TopBar = () => {

    const queryClient = useQueryClient();
    const selectedAppId = useuiStore((s) => s.selectedAppId);
    const setSelectedNodeId = useuiStore((s) => s.setSelectedNodeId);
    const setInspectorOpen = useuiStore((s) => s.setInspectorOpen);

    const mutation = useMutation({
        mutationFn: (payload: { appId: string; node: Node<ServiceNodeData> }) =>
            createNode(payload.appId, payload.node),

        onMutate: async ({ appId, node }) => {
            await queryClient.cancelQueries({ queryKey: ["graph", appId] });
            const prev = queryClient.getQueryData<GraphResponse>(["graph", appId]);

            if (prev) {
                queryClient.setQueryData<GraphResponse>(["graph", appId], {
                    ...prev,
                    nodes: [...prev.nodes, node],
                });
            }
            return { prev };
        },

        onError: (_e, vars, ctx) => {
            if (ctx?.prev) queryClient.setQueryData(["graph", vars.appId], ctx.prev);
        },

        onSuccess: (serverGraph, vars) => {
            queryClient.setQueryData(["graph", vars.appId], serverGraph);
        },
    });

    const addNode = () => {
        if (!selectedAppId) return;

        const id = `node-${crypto.randomUUID().slice(0, 8)}`;
        const node: Node<ServiceNodeData> = {
            id,
            type: "service",
            position: { x: 220 + Math.random() * 140, y: 180 + Math.random() * 140 },
            data: { label: "New Service", serviceType: "api" },
        };

        setSelectedNodeId(id);
        setInspectorOpen(true);

        mutation.mutate({ appId: selectedAppId, node });
    }
    return (
        <header className="border-b flex items-center px-4 py-2 gap-3">
            <div className="font-semibold">App Graph Builder</div>

            <input
                className="ml-2 w-[320px] max-w-[50vw] rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="Search apps, nodes, anything…"
            />
            <button
                onClick={addNode}
                disabled={!selectedAppId || mutation.isPending}
                className="rounded-md border px-3 py-2 text-sm hover:bg-accent disabled:opacity-50"
            >
                {mutation.isPending ? "Adding…" : "Add Node"}
            </button>

            <div className="ml-auto flex items-center gap-2">
                <SidebarTrigger />

            </div>
        </header>

    )
}

export default TopBar