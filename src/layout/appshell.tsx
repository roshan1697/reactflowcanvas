import RightInspector from "@/feature/rightinspector"
import LeftRail from "../components/leftrail"
import TopBar from "../components/topbar"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { useuiStore } from "@/store/ui"
import Flow from "@/feature/flow"


const AppShell = () => {
    const inspectorOpen = useuiStore((s) => s.inspectorOpen);
    const setInspectorOpen = useuiStore((s) => s.setInspectorOpen)
    return (
        <div className="h-screen w-screen grid grid-rows-[56px_1fr] bg-background text-foreground">
            <TopBar />

            <div className="grid grid-cols-[260px_1fr] lg:grid-cols-[260px_1fr_360px] min-h-0">
                <LeftRail />

                <main className="min-h-0 relative">
                    
                    <Flow/>  
                </main>

                {/* Desktop inspector */}
                <aside className="hidden lg:flex border-l min-h-0">
                    <RightInspector />
                </aside>
            </div>

            {/* Mobile drawer inspector */}
            
            <Sheet  open={inspectorOpen} onOpenChange={setInspectorOpen} >
                <SheetContent side="right" className="w-[360px] max-w-[90vw] p-0 ">
                    <RightInspector />
                </SheetContent>
            </Sheet>
            
        </div>

    )
}

export default AppShell