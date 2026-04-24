import { type FC, type JSX } from "react";
import { BarChartOutlined, LineChartOutlined, WarningOutlined, DollarOutlined } from "@ant-design/icons";

const kpiData = [
    { id: 1, label: "Jami berilgan nasiya", value: "45 200 000", colorClass: "text-blue-500", bgClass: "bg-blue-50", icon: <LineChartOutlined /> },
    { id: 2, label: "Jami yig'ilgan", value: "28 700 000", colorClass: "text-emerald-500", bgClass: "bg-emerald-50", icon: <DollarOutlined /> },
    { id: 3, label: "Umumiy qoldiq", value: "16 500 000", colorClass: "text-amber-500", bgClass: "bg-amber-50", icon: <BarChartOutlined /> },
    { id: 4, label: "Muddati o'tgan", value: "3 200 000", colorClass: "text-rose-500", bgClass: "bg-rose-50", icon: <WarningOutlined /> },
];

export const ReportsKpiGrid: FC = (): JSX.Element => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiData.map(item => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 ${item.bgClass} ${item.colorClass} shadow-sm`}>
                    {item.icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wider mb-1">{item.label}</span>
                    <div className="flex items-baseline gap-1.5">
                        <span className="text-[22px] font-black text-gray-800 tracking-tight">{item.value}</span>
                        <span className={`text-[11px] font-bold ${item.colorClass}`}>UZS</span>
                    </div>
                </div>
            </div>
        ))}
    </div>
);
