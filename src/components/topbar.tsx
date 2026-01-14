import { useuiStore } from "../store/ui";

const TopBar = () => {
    const setInspectorOpen = useuiStore((s) => s.setInspectorOpen);
    return (
        <header className="border-b flex items-center px-4 gap-3">
            <div className="font-semibold">App Graph Builder</div>

            <input
                className="ml-2 w-[320px] max-w-[50vw] rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="Search apps, nodes, anything…"
            />

            <div className="ml-auto flex items-center gap-2">
                {/* Mobile only */}
                <button
                    onClick={() => setInspectorOpen(true)}
                    className="lg:hidden rounded-md border px-3 py-2 text-sm hover:bg-accent"
                >
                    Inspector
                </button>

                {/* Desktop actions placeholder */}
                <div className="hidden lg:block text-sm text-muted-foreground">
                    Top actions
                </div>
            </div>
        </header>
        
    )
}

export default TopBar