import { type FC, type JSX } from "react";
import type { IMenuItem } from "../interfaces";
import { CreditCardOutlined, CustomerServiceOutlined, DashboardOutlined, DollarOutlined, LeftOutlined, TableOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../store/Sidebar";

export const SideBar: FC = (): JSX.Element => {
    const location = useLocation();
    const sidebar = useSidebar((state) => state);

    const menuItems: IMenuItem[] = [
        {
            to: "dashboard",
            title: "Bosh sahifa",
            icon: <DashboardOutlined />,
            active: location.pathname.includes('dashboard'),
            label: "Bosh sahifa"
        },
        {
            to: "customers",
            title: "Mijozlar",
            icon: <CustomerServiceOutlined />,
            active: location.pathname.includes('customers'),
            label: "Mijozlar"
        },
        {
            to: "loans",
            title: "Nasiya",
            icon: <CreditCardOutlined />,
            active: location.pathname.includes('loans'),
            label: "Nasiya"
        },
        {
            to: "payments",
            title: "To'lovlar",
            icon: <DollarOutlined />,
            active: location.pathname.includes('payments'),
            label: "To'lovlar"
        },
        {
            to: "reports",
            title: "Hisobotlar",
            icon: <TableOutlined />,
            active: location.pathname.includes('reports'),
            label: "Hisobotlar"
        },
    ];

    const handlerSidebar = () => {
        if (sidebar.isCollapsed === 'true') {
            sidebar.setIsCollapsed('false');
        } else {
            sidebar.setIsCollapsed('true');
        }
    };

    return (
        <div className={`${sidebar.isCollapsed === "true" ? "w-[260px]" : "w-[80px]"} bg-white transition-all duration-300 ease-in-out row-start-2 row-end-3 col-start-1 col-end-2 shadow-(--shadow-right) z-10 flex flex-col justify-between border-r border-gray-100`}>
            <ul className="px-4 py-6 flex flex-col gap-2">
                {menuItems?.map((item: IMenuItem) => (
                    <li key={item?.to} className="w-full">
                        <Link
                            to={item?.to}
                            title={sidebar.isCollapsed === "false" ? item?.title : ""}
                            className={`
                                ${item?.active ? 'bg-blue-50 text-(--secondary) font-semibold' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'} 
                                flex items-center ${sidebar.isCollapsed === "true" ? "px-4" : "justify-center px-0"} py-3 rounded-xl transition-all duration-200 ease-in-out group relative overflow-hidden
                            `}
                        >
                            {/* Active Indicator Line */}
                            {item?.active && sidebar.isCollapsed === "true" && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 bg-(--secondary) rounded-r-md"></div>
                            )}

                            <span className={`text-[20px] transition-all duration-200 ease-in-out ${item?.active ? '' : 'group-hover:scale-110'} ${sidebar.isCollapsed === "true" ? "mr-4" : ""}`}>
                                {item?.icon}
                            </span>

                            <span className={`
                                ${sidebar.isCollapsed === "true" ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 hidden -translate-x-4"} 
                                text-[15px] whitespace-nowrap transition-all duration-200 ease-in-out
                            `}>
                                {item?.label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            <div
                onClick={handlerSidebar}
                className="w-full py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-center text-gray-400 hover:text-(--secondary) hover:bg-gray-100 cursor-pointer transition-colors group"
                title={sidebar.isCollapsed === 'true' ? 'Yopish' : 'Ochish'}
            >
                <div className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 group-hover:border-blue-200 group-hover:shadow-md transition-all">
                    <LeftOutlined className={`text-sm transition-transform duration-300 ${sidebar.isCollapsed === 'true' ? '' : 'rotate-180'}`} />
                </div>
            </div>
        </div>
    )
}