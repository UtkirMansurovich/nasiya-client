import { type FC, type JSX } from "react";
import { UserOutlined } from "@ant-design/icons";

export const LoansCustomerInfo: FC = (): JSX.Element => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="w-9 h-9 rounded-lg bg-blue-50 text-(--secondary) flex items-center justify-center border border-blue-100">
                <UserOutlined className="text-lg" />
            </div>
            <h3 className="font-bold text-gray-800 text-lg">Mijoz ma'lumotlari</h3>
        </div>
        
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">Mijozni tanlang</label>
            <select className="bg-gray-50 border border-gray-200 text-gray-800 text-sm rounded-lg focus:ring-4 focus:ring-blue-100/50 focus:border-blue-400 focus:bg-white block w-full p-3 transition-all outline-none font-medium">
                <option>Akbar Karimov — +998 90 123 45 67</option>
                <option>Zulfiya Yusupova — +998 91 234 56 78</option>
                <option>Mansur Toshmatov — +998 97 456 78 90</option>
            </select>
        </div>
    </div>
);
