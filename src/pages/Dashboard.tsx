import type { FC, JSX } from "react";
import { DashboardCard } from "../ui/DashboardCard";
import { DashboardPayments } from "../ui/DashboardPayments";
import { DashboardExpired } from "../ui/DashboardExpired";

export const Dashboard: FC = (): JSX.Element => {
    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto animate-fade-in">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Bosh sahifa</h2>
                <p className="text-gray-500 text-sm mt-1">Tizimdagi umumiy holat va so'nggi jarayonlar</p>
            </div>
            
            <div className="flex flex-col gap-8">
                {/* Top Metrics Cards (Full Width) */}
                <div className="w-full">
                    <DashboardCard />
                </div>
                
                {/* Detailed Lists (2 Columns on Large Screens) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <DashboardPayments />
                    <DashboardExpired />
                </div>
            </div>
        </div>
    )
}