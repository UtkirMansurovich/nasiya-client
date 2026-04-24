import { type FC, type JSX } from "react";
import { CalculatorOutlined, SaveOutlined } from "@ant-design/icons";

export const LoansSummary: FC = (): JSX.Element => (
    <div className="flex flex-col gap-6">
        <div className="bg-linear-to-br from-blue-50 to-indigo-50/50 rounded-xl shadow-sm border border-blue-100 p-6 sticky top-24">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-blue-200/60">
                <div className="w-9 h-9 rounded-lg bg-(--secondary) text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                    <CalculatorOutlined className="text-lg" />
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Avtomatik hisoblash</h3>
            </div>
            
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm font-semibold">Asosiy narx:</span>
                    <span className="text-gray-800 font-bold">3 500 000 UZS</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-500 text-sm font-semibold">Ustama (30%):</span>
                    <span className="text-gray-800 font-bold">1 050 000 UZS</span>
                </div>
                
                <div className="w-full h-px bg-blue-200/60 my-2"></div>
                
                <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                    <span className="text-gray-600 text-sm font-bold">Jami qarz:</span>
                    <span className="text-(--secondary) font-black text-[20px] tracking-tight">4 550 000 UZS</span>
                </div>
                
                <div className="flex justify-between items-center mt-2">
                    <span className="text-gray-500 text-sm font-semibold">Taxminiy muddat:</span>
                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
                        91 kun
                    </span>
                </div>
            </div>

            <button className="w-full mt-8 bg-(--secondary) hover:bg-blue-600 text-white font-bold py-4 px-5 rounded-xl shadow-md shadow-blue-500/30 transition-all hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 text-[15px]">
                <SaveOutlined className="text-lg" /> Nasiyani tasdiqlash
            </button>
        </div>
    </div>
);
