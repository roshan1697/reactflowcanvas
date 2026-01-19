import { getGraph } from '@/api/mock';
import Flow from '@/feature/flow';
import { useGraphStore } from '@/store/graph';
import { useuiStore } from '@/store/ui';
import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'

const FlowLoader = () => {
    const selectedAppId = useuiStore((s) => s.selectedAppId)
    const setSelectedNodeId = useuiStore((s) => s.setSelectedNodeId)
    const setInspectorOpen = useuiStore((s) => s.setInspectorOpen)

    const setGraph = useGraphStore((s) => s.setGraph)



    const { data, isLoading, isError } = useQuery({
        queryKey: ["graph", selectedAppId],
        queryFn: () => getGraph(selectedAppId!),
        enabled: !!selectedAppId,
    })


    useEffect(() => {
        setSelectedNodeId(null);
        setInspectorOpen(false);
    }, [selectedAppId, setSelectedNodeId, setInspectorOpen])

    useEffect(() => {
        if (data) setGraph(data.nodes, data.edges);
    }, [data, setGraph]);

    if (isLoading) return <div className="h-full w-full grid place-items-center text-muted-foreground">Loading graph…</div>;
    if (isError) return <div className="h-full w-full grid place-items-center text-destructive">Failed to load graph</div>;

    return <Flow />;
}

export default FlowLoader