import { updateNode } from "@/api/mock";
import type { GraphResponse, ServiceNodeData } from "@/lib/type";
// import { useGraphStore } from "@/store/graph";
import { useuiStore } from "@/store/ui"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
const RightInspector = () => {
    const queryClient = useQueryClient()
    const selectedNodeId = useuiStore((s) => s.selectedNodeId)
    const selectedAppId = useuiStore((s) => s.selectedAppId);

    // const setSelectedNodeId = useuiStore((s) => s.setSelectedNodeId);

    // const nodes = useGraphStore((s) => s.nodes);
    // const updateNodeLabel = useGraphStore((s) => s.updateNodeLabel);

    const graph = queryClient.getQueryData<GraphResponse>(["graph", selectedAppId]);

    const selectedNode = graph?.nodes.find((n) => n.id === selectedNodeId) ?? null;


    const [draftLabel, setDraftLabel] = useState("")
    useEffect(() => {
        setDraftLabel((selectedNode?.data as ServiceNodeData | undefined)?.label ?? "");
    }, [selectedNodeId])


    const mutation = useMutation({
        mutationFn: async (payload: { appId: string; nodeId: string; patch: Partial<ServiceNodeData> }) =>
            updateNode(payload.appId, payload.nodeId, payload.patch),

        onMutate: async ({ appId, nodeId, patch }) => {
            // cancel ongoing fetch so we don’t race ourselves
            await queryClient.cancelQueries({ queryKey: ["graph", appId] });

            const previous = queryClient.getQueryData<GraphResponse>(["graph", appId]);

            // optimistic update
            if (previous) {
                queryClient.setQueryData<GraphResponse>(["graph", appId], {
                    ...previous,
                    nodes: previous.nodes.map((n) =>
                        n.id === nodeId ? { ...n, data: { ...(n.data as any), ...patch } } : n
                    ),
                });
            }

            return { previous };
        },

        onError: (_err, vars, ctx) => {
            // rollback
            if (ctx?.previous) {
                queryClient.setQueryData(["graph", vars.appId], ctx.previous);
            }
        },

        onSuccess: (serverGraph, vars) => {
            // align cache with server response
            queryClient.setQueryData(["graph", vars.appId], serverGraph);
        },
    })
    if (!selectedNode) {
        return (
            <div className="min-h-0 flex flex-col">
                <div className="p-3 border-b font-medium">Inspector</div>
                <div className="p-3">
                    <div className="rounded-md border p-3">
                        <div className="font-medium">No node selected</div>
                        <div className="text-sm text-muted-foreground">Select a node to edit settings.</div>
                    </div>
                </div>
            </div>
        )
    }
    const canSave =
        selectedAppId && selectedNodeId && draftLabel !== ((selectedNode.data as ServiceNodeData).label ?? "")
    return (
        <div className="min-h-0 flex flex-col">
            <div className="p-3 border-b font-medium">Inspector</div>

            <div className="p-3 space-y-3 overflow-auto min-h-0">
                <div className="rounded-md border p-3 space-y-2">
                    <div className="text-xs text-muted-foreground">Label</div>
                    <input
                        className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                        value={draftLabel}
                        onChange={(e) => setDraftLabel(e.target.value)}
                    />

                    <button
                        disabled={!canSave || mutation.isPending}
                        className="rounded-md border px-3 py-2 text-sm hover:bg-accent disabled:opacity-50"
                        onClick={() =>
                            mutation.mutate({
                                appId: selectedAppId!,
                                nodeId: selectedNodeId!,
                                patch: { label: draftLabel },
                            })
                        }
                    >
                        {mutation.isPending ? "Saving…" : "Save"}
                    </button>

                    
                    {mutation.isError && (
                        <div className="text-sm text-destructive">Save failed. Try again.</div>
                    )}
                </div>
            </div>
        </div>
    )

}

export default RightInspector