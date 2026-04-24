import { type FC, type JSX } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const LoansHeader: FC = (): JSX.Element => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Yangi Nasiya</h2>
            <p className="text-gray-500 text-sm mt-1">Yangi mijozga muddatli to'lov savdosini rasmiylashtirish</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 font-medium py-2 px-5 rounded-xl shadow-sm transition-all flex items-center gap-2">
            <ArrowLeftOutlined /> Bekor qilish
        </button>
    </div>
);
