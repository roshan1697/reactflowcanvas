
const RightInspector = () => {
    return (
        <div className="min-h-0 flex flex-col">
            <div className="p-3 border-b font-medium">Inspector</div>
            <div className="p-3 overflow-auto min-h-0 space-y-3">
                <div className="rounded-md border p-3">
                    <div className="font-medium">No node selected</div>
                    <div className="text-sm text-muted-foreground">
                        Select a node to edit settings.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RightInspector