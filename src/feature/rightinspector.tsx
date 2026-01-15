import { useuiStore } from "@/store/ui"
const RightInspector = () => {
    const selectedNodeId = useuiStore((s) => s.selectedNodeId)
    return (
        <div className="min-h-0 flex flex-col">
            <div className="p-3 border-b font-medium">Inspector</div>
            <div className="p-3 overflow-auto min-h-0 space-y-3">
                {!selectedNodeId ? (
                    <div className="rounded-md border p-3">
                        <div className="font-medium">No node selected</div>
                        <div className="text-sm text-muted-foreground">
                            Select a node to edit settings.
                        </div>
                    </div>
                ) : (
                    <div className="rounded-md border p-3">
                        <div className="font-medium">Selected</div>
                        <div className="text-sm text-muted-foreground">{selectedNodeId}</div>

                        <button
                            className="mt-3 rounded-md border px-3 py-2 text-sm hover:bg-accent"
                            onClick={() => useuiStore.getState().setSelectedNodeId(null)}
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