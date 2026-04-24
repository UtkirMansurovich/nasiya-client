import { type FC, type JSX } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";

export const LoansProductInfo: FC = (): JSX.Element => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <ShoppingCartOutlined className="text-lg" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Mahsulot ma'lumotlari</h3>
        </div>
        
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Mahsulot nomi</label>
                <input type="text" defaultValue="Samsung Galaxy A55" className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 focus:bg-white block w-full p-3 transition-all outline-none font-medium" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Narxi (UZS)</label>
                    <input type="text" defaultValue="3 500 000" className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 focus:bg-white block w-full p-3 transition-all outline-none font-bold" />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Soni (dona)</label>
                    <input type="number" defaultValue="1" className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 focus:bg-white block w-full p-3 transition-all outline-none font-medium" />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Ustama (%)</label>
                    <div className="relative">
                        <input type="number" defaultValue="30" className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 focus:bg-white block w-full p-3 transition-all outline-none font-medium pl-3 pr-10" />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-700">Boshlash sanasi</label>
                    <input type="date" defaultValue="2026-04-23" className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 focus:bg-white block w-full p-3 transition-all outline-none font-medium text-gray-600" />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Kunlik to'lov (UZS)</label>
                <input type="text" defaultValue="50 000" className="bg-gray-50 border border-blue-200 text-(--secondary) text-base rounded-lg focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 focus:bg-white block w-full p-3 transition-all outline-none font-bold" />
            </div>
        </div>
    </div>
);
