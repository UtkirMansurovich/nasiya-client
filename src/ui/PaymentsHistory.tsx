import { type FC, type JSX } from "react";
import { HistoryOutlined } from "@ant-design/icons";
import type { IPaymentHistory } from "../interfaces";

const paymentHistory: IPaymentHistory[] = [
    { id: 1, name: "Akbar Karimov", date: "23 Apr 2026", method: "Naqd", amount: "+50 000 UZS", color: "blue" },
    { id: 2, name: "Zulfiya Yusupova", date: "23 Apr 2026", method: "Karta", amount: "+75 000 UZS", color: "emerald" },
    { id: 3, name: "Mansur Toshmatov", date: "22 Apr 2026", method: "Naqd", amount: "+120 000 UZS", color: "purple" }
];

const getAvatarColor = (color: string) => {
    switch (color) {
        case 'emerald': return 'bg-emerald-100 text-emerald-600';
        case 'purple': return 'bg-purple-100 text-purple-600';
        default: return 'bg-blue-100 text-blue-600';
    }
}

export const PaymentsHistory: FC = (): JSX.Element => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 sticky top-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-(--secondary) flex items-center justify-center border border-blue-100 shadow-sm shrink-0">
                    <HistoryOutlined className="text-base sm:text-lg" />
                </div>
                <h3 className="font-bold text-gray-800 text-base sm:text-lg">To'lovlar tarixi</h3>
            </div>
        </div>

        <div className="flex flex-col gap-2 sm:gap-3">
            {paymentHistory.map((item: IPaymentHistory) => (
                <div key={item.id} className="p-2.5 sm:p-3.5 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-between group cursor-pointer gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm shrink-0 ${getAvatarColor(item.color)} shadow-sm group-hover:scale-105 transition-transform`}>
                            {item.name.split(" ")[0].charAt(0)}{item.name.split(" ")[1]?.charAt(0)}
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                            <span className="font-bold text-gray-800 text-[13px] sm:text-sm truncate">{item.name}</span>
                            <span className="text-[9px] sm:text-[11px] text-gray-500 font-semibold uppercase tracking-wide mt-0.5 sm:mt-1 truncate">{item.date} · {item.method}</span>
                        </div>
                    </div>
                    <div className="text-right shrink-0 pl-1">
                        <span className="font-bold text-emerald-500 text-[13px] sm:text-[15px] whitespace-nowrap">{item.amount}</span>
                    </div>
                </div>
            ))}
        </div>

        <button className="w-full mt-4 sm:mt-5 py-2.5 sm:py-3 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 hover:text-gray-800 transition-colors text-xs sm:text-sm">
            Barchasini ko'rish
        </button>
    </div>
);
