import RightInspector from "@/feature/rightinspector"
import LeftRail from "../components/leftrail"
import TopBar from "../components/topbar"
import { useuiStore } from "@/store/ui"
import { Sidebar, SidebarContent, SidebarGroup,  SidebarProvider } from "@/components/ui/sidebar"
import FlowLoader from "@/components/flowloader"


const AppShell = () => {
    const inspectorOpen = useuiStore((s) => s.inspectorOpen);
    const setInspectorOpen = useuiStore((s) => s.setInspectorOpen)
    return (
        <SidebarProvider open={inspectorOpen} onOpenChange={setInspectorOpen}

        >



            <div className="h-screen w-screen grid grid-rows-[56px_1fr] bg-background text-foreground">
                <TopBar />


                <div className={[
                    "grid min-h-0",
                    inspectorOpen ? "grid-cols-[260px_1fr] " : "grid-cols-[260px_1fr]",
                ].join(" ")}>
                    <LeftRail />

                    <main className="min-h-0 relative h-full overflow-hidden">

                        <FlowLoader />
                    </main>








                </div>



            </div>
            <Sidebar side="right" >


                <SidebarContent>
                    <SidebarGroup>
                        <RightInspector />
                    </SidebarGroup>

                </SidebarContent>

            </Sidebar>
        </SidebarProvider>

    )
}

export default AppShell