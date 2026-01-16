import { useuiStore } from "../store/ui";
import { SidebarTrigger } from "./ui/sidebar";

const TopBar = () => {
    const setInspectorOpen = useuiStore((s) => s.setInspectorOpen);
    return (
        <header className="border-b flex items-center px-4 py-2 gap-3">
            <div className="font-semibold">App Graph Builder</div>

            <input
                className="ml-2 w-[320px] max-w-[50vw] rounded-md border bg-background px-3 py-2 text-sm"
                placeholder="Search apps, nodes, anything…"
            />
                <SidebarTrigger/>
            
            <div className="ml-auto flex items-center gap-2">
                {/* Mobile only */}
                <button
                    onClick={() => setInspectorOpen(true)}
                    className="lg:hidden rounded-md border px-3 py-2 text-sm hover:bg-accent"
                >
                    Inspector
                </button>
                
            </div>
        </header>
        
    )
}

export default TopBar