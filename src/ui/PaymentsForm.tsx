import { type FC, type JSX } from "react";
import { CreditCardOutlined, SaveOutlined, UserOutlined, ShoppingCartOutlined, WalletOutlined, FileTextOutlined } from "@ant-design/icons";

export const PaymentsForm: FC = (): JSX.Element => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full z-0 opacity-70"></div>
        
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-100 relative z-10">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
                <WalletOutlined className="text-xl" />
            </div>
            <h3 className="font-bold text-gray-800 text-xl tracking-tight">To'lov qabul qilish</h3>
        </div>

        <div className="flex flex-col gap-7 relative z-10">
            <div className="flex flex-col gap-2.5">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <UserOutlined className="text-gray-400" /> Mijozni tanlang
                </label>
                <select className="bg-gray-50/50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-4 focus:ring-emerald-100/50 focus:border-emerald-400 focus:bg-white block w-full p-3.5 transition-all outline-none font-medium">
                    <option>Akbar Karimov</option>
                    <option>Zulfiya Yusupova</option>
                </select>
            </div>

            <div className="flex flex-col gap-2.5">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <ShoppingCartOutlined className="text-gray-400" /> Faol nasiyani tanlang
                </label>
                <select className="bg-gray-50/50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-4 focus:ring-emerald-100/50 focus:border-emerald-400 focus:bg-white block w-full p-3.5 transition-all outline-none font-medium">
                    <option>Samsung Galaxy A55 — Qoldiq: 1 250 000 UZS</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2.5">
                    <label className="text-sm font-bold text-gray-700">To'lov miqdori (UZS)</label>
                    <input type="text" defaultValue="50 000" className="bg-emerald-50/30 border border-emerald-200 text-emerald-700 text-lg rounded-xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 focus:bg-white block w-full p-3.5 transition-all outline-none font-bold" />
                </div>
                <div className="flex flex-col gap-2.5">
                    <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                        <CreditCardOutlined className="text-gray-400" /> To'lov usuli
                    </label>
                    <select className="bg-gray-50/50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-4 focus:ring-emerald-100/50 focus:border-emerald-400 focus:bg-white block w-full p-3.5 transition-all outline-none font-medium h-[54px]">
                        <option>Naqd</option>
                        <option>Karta</option>
                        <option>O'tkazma</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col gap-2.5">
                <label className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <FileTextOutlined className="text-gray-400" /> Izoh (ixtiyoriy)
                </label>
                <input type="text" placeholder="To'lov haqida qo'shimcha ma'lumot..." className="bg-gray-50/50 border border-gray-200 text-gray-800 text-sm rounded-xl focus:ring-4 focus:ring-emerald-100/50 focus:border-emerald-400 focus:bg-white block w-full p-3.5 transition-all outline-none font-medium placeholder-gray-400" />
            </div>

            <button className="w-full sm:w-auto mt-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2 text-[15px] sm:self-end">
                <SaveOutlined className="text-lg" /> To'lovni saqlash
            </button>
        </div>
    </div>
);
