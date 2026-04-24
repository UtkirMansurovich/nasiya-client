import { type FC, type JSX } from "react";
import { EyeOutlined } from "@ant-design/icons";
import type { ICustomer } from "../interfaces";

const customersList: ICustomer[] = [
    { id: 1, name: "Akbar Karimov", phone: "+998 90 123 45 67", balance: "1 250 000", status: "Faol", color: "emerald" },
    { id: 2, name: "Zulfiya Yusupova", phone: "+998 91 234 56 78", balance: "875 000", status: "Faol", color: "emerald" },
    { id: 3, name: "Sardor Xolmatov", phone: "+998 93 345 67 89", balance: "850 000", status: "O'tgan", color: "rose" },
    { id: 4, name: "Mansur Toshmatov", phone: "+998 97 456 78 90", balance: "0", status: "Yopiq", color: "gray" },
    { id: 5, name: "Nilufar Raximova", phone: "+998 95 567 89 01", balance: "1 200 000", status: "O'tgan", color: "rose" }
];

const getAvatarColor = (color: string) => {
    switch (color) {
        case 'emerald': return 'bg-emerald-100 text-emerald-600';
        case 'rose': return 'bg-rose-100 text-rose-600';
        case 'gray': return 'bg-gray-200 text-gray-600';
        default: return 'bg-blue-100 text-blue-600';
    }
}

const getBadgeColor = (color: string) => {
    switch (color) {
        case 'emerald': return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'rose': return 'bg-rose-50 text-rose-700 border-rose-200';
        case 'gray': return 'bg-gray-100 text-gray-600 border-gray-200';
        default: return 'bg-blue-50 text-blue-700 border-blue-200';
    }
}

export const CustomersTable: FC = (): JSX.Element => (
    <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Ism</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">Telefon</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Qoldiq (UZS)</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                    <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Harakat</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {customersList.map((customer: ICustomer) => (
                    <tr key={customer.id} className="hover:bg-blue-50/50 transition-colors group">
                        <td className="py-4 px-6">
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${getAvatarColor(customer.color)} group-hover:scale-105 transition-transform shadow-sm`}>
                                    {customer.name.split(" ")[0].charAt(0)}{customer.name.split(" ")[1]?.charAt(0)}
                                </div>
                                <span className="font-bold text-gray-800 text-[15px]">{customer.name}</span>
                            </div>
                        </td>
                        <td className="py-4 px-6 text-gray-500 font-medium text-[14px]">
                            {customer.phone}
                        </td>
                        <td className="py-4 px-6 text-right">
                            <span className={`font-bold text-[16px] ${customer.color === 'rose' ? 'text-rose-600' : 'text-gray-800'}`}>
                                {customer.balance}
                            </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                            <span className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-bold border ${getBadgeColor(customer.color)}`}>
                                {customer.status}
                            </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                            <button className="text-gray-400 hover:text-(--secondary) transition-colors p-2 rounded-lg hover:bg-white border border-transparent hover:border-blue-100 hover:shadow-sm">
                                <EyeOutlined className="text-lg" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);
