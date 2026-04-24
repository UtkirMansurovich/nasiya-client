import { create } from "zustand";

interface SidebarState {
    isCollapsed: string;
    setIsCollapsed: (isCollapsed: string) => void;
}

export const useSidebar = create<SidebarState>((set) => ({
    isCollapsed: localStorage.getItem('sidebar') ? localStorage.getItem("sidebar") : 'true',
    setIsCollapsed: (isCollapsed: string) => {
        set(() => ({ isCollapsed }))
        localStorage.setItem('sidebar', isCollapsed)
    }
}))