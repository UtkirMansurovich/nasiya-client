import { type FC, type JSX } from "react";
import type { IMenuItem } from "../interfaces";
import {
  CreditCardOutlined,
  CustomerServiceOutlined,
  DashboardOutlined,
  DollarOutlined,
  LeftOutlined,
  TableOutlined,
  PlusOutlined,
} from "@ant-design/icons";
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
      active: location.pathname.includes("dashboard"),
      label: "Bosh sahifa",
    },
    {
      to: "customers",
      title: "Mijozlar",
      icon: <CustomerServiceOutlined />,
      active: location.pathname.includes("customers"),
      label: "Mijozlar",
    },
    {
      to: "loans",
      title: "Nasiya",
      icon: <CreditCardOutlined />,
      active: location.pathname.includes("loans"),
      label: "Nasiya",
    },
    {
      to: "payments",
      title: "To'lovlar",
      icon: <DollarOutlined />,
      active: location.pathname.includes("payments"),
      label: "To'lovlar",
    },
    {
      to: "reports",
      title: "Hisobotlar",
      icon: <TableOutlined />,
      active: location.pathname.includes("reports"),
      label: "Hisobotlar",
    },
  ];

  const handlerSidebar = () => {
    if (sidebar.isCollapsed === "true") {
      sidebar.setIsCollapsed("false");
    } else {
      sidebar.setIsCollapsed("true");
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex ${sidebar.isCollapsed === "true" ? "w-50" : "w-18"} bg-white transition-all duration-300 ease-in-out row-start-2 row-end-3 col-start-1 col-end-2 shadow-(--shadow-right) z-10 flex-col justify-between border-r border-gray-100`}
      >
        <ul className="px-2 py-6 flex flex-col gap-2">
          {menuItems?.map((item: IMenuItem) => (
            <li key={item?.to} className="w-full">
              <Link
                to={item?.to}
                title={sidebar.isCollapsed === "false" ? item?.title : ""}
                className={`
                                    ${item?.active ? "bg-blue-50 text-(--secondary) font-semibold" : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"} 
                                    flex items-center ${sidebar.isCollapsed === "true" ? "px-4" : "justify-center px-0"} py-3 rounded-xl transition-all duration-200 ease-in-out group relative overflow-hidden
                                `}
              >
                {/* Active Indicator Line */}
                {item?.active && sidebar.isCollapsed === "true" && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1/2 w-1 bg-(--secondary) rounded-r-md"></div>
                )}

                <span
                  className={`text-[20px] transition-all duration-200 ease-in-out ${item?.active ? "" : "group-hover:scale-110"} ${sidebar.isCollapsed === "true" ? "mr-4" : ""}`}
                >
                  {item?.icon}
                </span>

                <span
                  className={`
                                    ${sidebar.isCollapsed === "true" ? "opacity-100 w-auto translate-x-0" : "opacity-0 w-0 hidden -translate-x-4"} 
                                    text-[15px] whitespace-nowrap transition-all duration-200 ease-in-out
                                `}
                >
                  {item?.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div
          onClick={handlerSidebar}
          className="w-full py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-center text-gray-400 hover:text-(--secondary) hover:bg-gray-100 cursor-pointer transition-colors group"
          title={sidebar.isCollapsed === "true" ? "Yopish" : "Ochish"}
        >
          <div className="p-2 rounded-lg bg-white shadow-sm border border-gray-200 group-hover:border-blue-200 group-hover:shadow-md transition-all">
            <LeftOutlined
              className={`text-sm transition-transform duration-300 ${sidebar.isCollapsed === "true" ? "" : "rotate-180"}`}
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex items-center justify-around px-2 py-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] z-50 shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.05)]">
        <Link
          to="/dashboard"
          className={`flex flex-col items-center justify-center w-14 h-12 gap-1 rounded-xl transition-colors ${location.pathname.includes("dashboard") ? "text-(--secondary)" : "text-gray-400 hover:text-gray-600"}`}
        >
          <DashboardOutlined className="text-[20px]" />
          <span className="text-[10px] font-bold">Bosh</span>
        </Link>

        <Link
          to="/customers"
          className={`flex flex-col items-center justify-center w-14 h-12 gap-1 rounded-xl transition-colors ${location.pathname.includes("customers") ? "text-(--secondary)" : "text-gray-400 hover:text-gray-600"}`}
        >
          <CustomerServiceOutlined className="text-[20px]" />
          <span className="text-[10px] font-bold">Mijozlar</span>
        </Link>

        {/* FAB (Floating Action Button) */}
        <div className="relative -top-6">
          <Link
            to="/payments"
            className="flex items-center justify-center w-13.5 h-13.5 bg-(--secondary) text-white rounded-full shadow-lg shadow-blue-500/40 border-4 border-gray-50 hover:scale-105 transition-transform"
          >
            <PlusOutlined className="text-[22px] font-bold" />
          </Link>
        </div>

        <Link
          to="/loans"
          className={`flex flex-col items-center justify-center w-14 h-12 gap-1 rounded-xl transition-colors ${location.pathname.includes("loans") ? "text-(--secondary)" : "text-gray-400 hover:text-gray-600"}`}
        >
          <CreditCardOutlined className="text-[20px]" />
          <span className="text-[10px] font-bold">Nasiya</span>
        </Link>

        <Link
          to="/reports"
          className={`flex flex-col items-center justify-center w-14 h-12 gap-1 rounded-xl transition-colors ${location.pathname.includes("reports") ? "text-(--secondary)" : "text-gray-400 hover:text-gray-600"}`}
        >
          <TableOutlined className="text-[20px]" />
          <span className="text-[10px] font-bold">Hisobot</span>
        </Link>
      </div>
    </>
  );
};
