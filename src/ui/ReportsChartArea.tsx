import { type FC, type JSX } from "react";

const chartData = [
    { id: 1, month: "Yan", value: "3 600 000", percent: 60, barClass: "bg-(--secondary) group-hover:bg-blue-400" },
    { id: 2, month: "Feb", value: "4 500 000", percent: 75, barClass: "bg-(--secondary) group-hover:bg-blue-400" },
    { id: 3, month: "Mar", value: "3 300 000", percent: 55, barClass: "bg-(--secondary) group-hover:bg-blue-400" },
    { id: 4, month: "Apr", value: "5 400 000", percent: 90, barClass: "bg-emerald-500 group-hover:bg-emerald-400" },
];

export const ReportsChartArea: FC = (): JSX.Element => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <h3 className="font-bold text-gray-800 text-lg mb-8 pb-4 border-b border-gray-100">Oylik to'lov dinamikasi</h3>
        
        <div className="flex flex-col gap-7 mt-4">
            {chartData.map(item => (
                <div key={item.id} className="flex items-center gap-4 group">
                    <span className="w-10 text-gray-500 font-bold text-sm uppercase tracking-wide">{item.month}</span>
                    <div className="flex-1 h-4 bg-gray-50 rounded-full overflow-hidden shadow-inner border border-gray-100">
                        <div 
                            className={`h-full rounded-full transition-all duration-1000 ease-out ${item.barClass} relative overflow-hidden`}
                            style={{ width: `${item.percent}%` }}
                        >
                            <div className="absolute inset-0 bg-white/20 w-full h-full -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                        </div>
                    </div>
                    <span className="w-28 text-right font-black text-gray-700 text-[15px] tracking-tight">{item.value}</span>
                </div>
            ))}
        </div>
    </div>
);
