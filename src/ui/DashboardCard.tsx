import { type FC, type JSX } from "react";
import { dataDashboardCard } from "../fakers/data-dashboard-card";
import type { IDashboardCard } from "../interfaces";

export const DashboardCard: FC = (): JSX.Element => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {dataDashboardCard?.map((item: IDashboardCard) => (
                <div 
                    key={item?.id} 
                    className="bg-white p-3.5 sm:p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow duration-200"
                >
                    {/* Decorative top border */}
                    <div 
                        className="absolute top-0 left-0 w-full h-1" 
                        style={{ backgroundColor: item?.color }} 
                    />
                    
                    <p className="text-gray-500 font-medium text-xs sm:text-sm mb-2 sm:mb-3">{item?.title}</p>
                    
                    <div className="flex flex-wrap items-baseline gap-1 sm:gap-1.5 mt-auto">
                        <p className="text-lg sm:text-2xl font-bold text-gray-800 tracking-tight truncate w-full sm:w-auto">
                            {new Intl.NumberFormat('fr-CA').format(item?.value)}
                        </p>
                        <p 
                            className="text-[10px] sm:text-xs font-bold uppercase tracking-wider" 
                            style={{ color: item?.color }}
                        >
                            {item?.currency}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}