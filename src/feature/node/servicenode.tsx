import { memo } from "react"
import { Handle, Position, NodeToolbar, type NodeProps } from "@xyflow/react"
import {type  ServiceNodeData } from "@/lib/type"
const ServiceNode = ({ data, selected }: NodeProps<ServiceNodeData>) => {
    return (
        <div className="rounded-xl border bg-background px-3 py-2 shadow-sm min-w-[180px]">
            <NodeToolbar isVisible={selected} position={Position.Top}>
                <div className="flex gap-2 rounded-md border bg-background p-1">
                    <button className="px-2 py-1 text-xs hover:bg-accent rounded">Copy</button>
                    <button className="px-2 py-1 text-xs hover:bg-accent rounded">Delete</button>
                </div>
            </NodeToolbar>

            {/* Target (incoming) */}
            <Handle type="target" position={Position.Left} />

            <div className="text-xs text-muted-foreground">Service</div>
            <div className="font-medium">{data.label}</div>
            <div className="text-xs text-muted-foreground">{data.serviceType ?? "api"}</div>

            {/* Source (outgoing) */}
            <Handle type="source" position={Position.Right} />
        </div>
    )
}

export default memo(ServiceNode)