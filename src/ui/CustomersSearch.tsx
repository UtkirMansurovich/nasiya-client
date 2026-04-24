import { type FC, type JSX } from "react";
import { SearchOutlined } from "@ant-design/icons";

export const CustomersSearch: FC = (): JSX.Element => (
    <div className="p-5 border-b border-gray-100 bg-white">
        <div className="flex items-center bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 focus-within:bg-white focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100/50 transition-all w-full max-w-md">
            <SearchOutlined className="text-gray-400 text-lg" />
            <input
                type="text"
                placeholder="Ism yoki telefon bo'yicha qidirish..."
                className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700 placeholder-gray-400 font-medium"
            />
        </div>
    </div>
);