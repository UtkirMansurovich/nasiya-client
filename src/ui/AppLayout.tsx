import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { SideBar } from "./SideBar";

export function AppLayout() {
    return (
        <div className="w-full h-screen grid grid-rows-[max-content_1fr] grid-cols-[max-content_1fr]">
            {/* You can add a header, sidebar, or navigation here in the future */}
            <Header />
            <SideBar />
            <main className="row-start-2 row-end-3 col-start-2 col-end-3 bg-gray-50 p-3 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}
