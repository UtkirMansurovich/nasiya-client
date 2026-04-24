import { type FC, type JSX } from "react";
import type { IDebtorsData } from "../interfaces";

const debtorsData: IDebtorsData[] = [
    { id: 1, name: "Nilufar Raximova", amount: "1 200 000 UZS", colorClass: "text-rose-600", bgClass: "bg-rose-100" },
    { id: 2, name: "Akbar Karimov", amount: "1 250 000 UZS", colorClass: "text-amber-600", bgClass: "bg-amber-100" },
    { id: 3, name: "Sardor Xolmatov", amount: "850 000 UZS", colorClass: "text-rose-600", bgClass: "bg-rose-100" },
];

export const ReportsTopDebtors: FC = (): JSX.Element => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 h-full">
        <h3 className="font-bold text-gray-800 text-lg mb-6 pb-4 border-b border-gray-100">Eng ko'p qarzdorlar</h3>

        <div className="flex flex-col gap-4">
            {debtorsData.map((item: IDebtorsData, index: number) => (
                <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${item.bgClass} ${item.colorClass} shadow-sm group-hover:scale-110 transition-transform`}>
                            {index + 1}
                        </div>
                        <span className="font-bold text-gray-800 text-[15px] group-hover:text-blue-600 transition-colors">{item.name}</span>
                    </div>
                    <span className={`font-black text-[15px] tracking-tight ${item.colorClass}`}>{item.amount}</span>
                </div>
            ))}
        </div>

        <button className="w-full mt-8 py-3.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 hover:text-gray-800 transition-colors text-sm shadow-sm">
            Barchasini ko'rish
        </button>
    </div>
);
