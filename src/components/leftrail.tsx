import { useuiStore } from "../store/ui";

const APPS = Array.from({ length: 6 }).map((_, i) => ({
    id: `app-${i + 1}`,
    name: `App ${i + 1}`,
}));
const LeftRail = () => {
    const selectedAppId = useuiStore((s) => s.selectedAppId);
    const setSelectedAppId = useuiStore((s) => s.setSelectedAppId);
    return (
        <aside className="border-r min-h-0 flex flex-col">
            <div className="p-3 border-b font-medium">Apps</div>

            <div className="p-3 overflow-auto min-h-0 space-y-2">
                {APPS.map((app) => {
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