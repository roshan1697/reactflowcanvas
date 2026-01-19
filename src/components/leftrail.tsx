import { listApps } from "@/api/mock";
import { useuiStore } from "../store/ui";
import { useQuery } from "@tanstack/react-query";






const LeftRail = () => {
    const selectedAppId = useuiStore((s) => s.selectedAppId);
    const setSelectedAppId = useuiStore((s) => s.setSelectedAppId);
    const { data, isLoading, isError } = useQuery({
        queryKey: ["apps"],
        queryFn: listApps,
    });
    return (
        <aside className="border-r min-h-0 flex flex-col">
            <div className="p-3 border-b font-medium">Apps</div>

            <div className="p-3 overflow-auto min-h-0 space-y-2">
                {isLoading && <div className="text-sm text-muted-foreground">Loading…</div>}
                {isError && <div className="text-sm text-destructive">Failed to load apps</div>}

                {data?.map((app) => {
                    const active = app.id === selectedAppId;
                    return (
                        <button
                            key={app.id}
                            onClick={() => setSelectedAppId(app.id)}
                            className={[
                                "w-full text-left rounded-md border px-3 py-2",
                                "hover:bg-accent transition",
                                active ? "bg-accent border-foreground/20" : "",
                            ].join(" ")}
                        >
                            <div className="font-medium">{app.name}</div>
                            <div className="text-xs text-muted-foreground">{app.id}</div>
                        </button>
                    );
                })}
            </div>
        </aside>
    )
}

export default LeftRail