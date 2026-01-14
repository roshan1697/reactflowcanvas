import {create } from 'zustand'

type uiState  = {
    selectedAppId:string | null
    setSelectedAppId:(id:string)=> void

    inspectorOpen: boolean;
    setInspectorOpen: (open: boolean) => void;
}

export const useuiStore =create<uiState>((set)=>({
    selectedAppId:'app-1',
    setSelectedAppId: (id)=> set({selectedAppId:id}),   

    inspectorOpen: false,
    setInspectorOpen: (open) => set({ inspectorOpen: open }),
}))