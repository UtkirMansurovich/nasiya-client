import type { FC, JSX } from "react";
import type { IDashboardExpired } from "../interfaces";
import { dataDashboardExpired } from "../fakers/data-dashboard-expired";

export const DashboardExpired: FC = (): JSX.Element => {
    const avatarColors = [
        "bg-rose-100 text-rose-700",
        "bg-red-100 text-red-700",
        "bg-orange-100 text-orange-700",
        "bg-amber-100 text-amber-700",
        "bg-pink-100 text-pink-700",
    ];

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col h-full">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center relative">
                        <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse border-2 border-white"></div>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h4 className="font-bold text-gray-800 text-base">Muddati o'tganlar</h4>
                </div>
                <button className="text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors">Barchasi</button>
            </div>
            
            <div className="flex flex-col gap-2">
                {dataDashboardExpired?.map((item: IDashboardExpired, index: number) => (
                    <div 
                        key={item?.id} 
                        className="p-3 flex items-center justify-between hover:bg-rose-50/50 transition-all duration-200 rounded-xl border border-transparent hover:border-rose-100 group"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-11 h-11 rounded-full ${avatarColors[index % avatarColors.length]} font-bold flex items-center justify-center shrink-0 text-sm shadow-sm group-hover:scale-105 transition-transform`}>
                                {item?.fullName?.split(" ")[0]?.charAt(0)}
                                {item?.fullName?.split(" ")[1]?.charAt(0)}
                            </div>
                            <div className="flex flex-col">
                                <p className="font-bold text-gray-800 text-[15px]">{item?.fullName}</p>
                                <div className="flex items-center text-[13px] text-gray-500 mt-1">
                                    <p className="bg-gray-100/80 px-2 py-0.5 rounded-md text-gray-600 border border-gray-200/60 shadow-xs">{item?.product}</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <p className="font-bold text-rose-600 text-[16px]">
                                {new Intl.NumberFormat('fr-CA').format(item?.value)} {item?.currency}
                            </p>
                            <p className="text-[12px] text-gray-400 mt-1 font-medium bg-gray-50 px-2.5 py-0.5 rounded-full border border-gray-100">
                                Oxirgi: {item?.lastPaymentDate}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}