import type { ServiceNodeData } from "@/lib/type";
import { useGraphStore } from "@/store/graph";
import { useuiStore } from "@/store/ui"
import { useMemo } from "react";
const RightInspector = () => {
    const selectedNodeId = useuiStore((s) => s.selectedNodeId)
    const setSelectedNodeId = useuiStore((s) => s.setSelectedNodeId);

    const nodes = useGraphStore((s) => s.nodes);
    const updateNodeLabel = useGraphStore((s) => s.updateNodeLabel);

    const selectedNode = useMemo(
        () => nodes.find((n) => n.id === selectedNodeId) ?? null,
        [nodes, selectedNodeId]
    );
    return (
        <div className="min-h-0 flex flex-col">
            <div className="p-3 border-b font-medium">Inspector</div>

            <div className="p-3 overflow-auto min-h-0 space-y-3">
                {!selectedNode ? (
                    <div className="rounded-md border p-3">
                        <div className="font-medium">No node selected</div>
                        <div className="text-sm text-muted-foreground">
                            Select a node to edit settings.
                        </div>
                    </div>
                ) : (
                    <div className="rounded-md border p-3 space-y-3">
                        <div>
                            <div className="text-xs text-muted-foreground">Node</div>
                            <div className="font-medium">{selectedNode.id}</div>
                        </div>

                        <div className="space-y-1">
                            <div className="text-xs text-muted-foreground">Label</div>
                            <input
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                value={(selectedNode.data as ServiceNodeData)?.label ?? ""}
                                onChange={(e) => updateNodeLabel(selectedNode.id, e.target.value)}
                            />
                        </div>

                        <button
                            className="rounded-md border px-3 py-2 text-sm hover:bg-accent"
                            onClick={() => setSelectedNodeId(null)}
                        >
                            Clear selection
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RightInspector