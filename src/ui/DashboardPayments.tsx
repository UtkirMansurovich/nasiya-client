import { type FC, type JSX } from "react";
import { dataDashboardPayments } from "../fakers/data-dashboard-payments";
import type { IDashboardPayments } from "../interfaces";

export const DashboardPayments: FC = (): JSX.Element => {
  const avatarColors = [
    "bg-blue-100 text-blue-700",
    "bg-emerald-100 text-emerald-700",
    "bg-purple-100 text-purple-700",
    "bg-orange-100 text-orange-700",
    "bg-pink-100 text-pink-700",
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3.5 sm:p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 sm:mb-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 rounded-lg bg-(--secondary-hover) text-(--secondary) flex items-center justify-center shrink-0">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h4 className="font-bold text-gray-800 text-sm sm:text-base">
            Bugungi to'lovlar
          </h4>
        </div>
        <button className="text-xs sm:text-sm font-semibold text-(--secondary) hover:text-blue-700 transition-colors">
          Barchasi
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {dataDashboardPayments?.map(
          (item: IDashboardPayments, index: number) => (
            <div
              key={item?.id}
              className="p-2 sm:p-3 flex items-center justify-between hover:bg-gray-50 transition-all duration-200 rounded-xl border border-transparent hover:border-gray-200 group gap-2"
            >
              <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
                <div
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${avatarColors[index % avatarColors.length]} font-bold flex items-center justify-center shrink-0 text-sm sm:text-lg shadow-sm group-hover:scale-105 transition-transform`}
                >
                  {item?.fullName?.split(" ")[0]?.charAt(0)}
                  {item?.fullName?.split(" ")[1]?.charAt(0)}
                </div>
                <div className="flex flex-col flex-1 min-w-0">
                  <p className="font-bold text-gray-800 text-[13px] sm:text-[15px] truncate">
                    {item?.fullName}
                  </p>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-[10px] sm:text-[13px] text-gray-500 mt-1">
                    <p className="bg-gray-100/80 px-1.5 sm:px-2 py-0.5 rounded-md text-gray-600 border border-gray-200/60 shadow-xs truncate max-w-17.5 sm:max-w-none">
                      {item?.product}
                    </p>
                    <span className="hidden sm:inline text-gray-300">—</span>
                    <p
                      className={
                        item?.status === "Faol"
                          ? "text-emerald-600 font-medium bg-emerald-50 px-1.5 sm:px-2 py-0.5 rounded-md"
                          : "text-rose-600 font-medium bg-rose-50 px-1.5 sm:px-2 py-0.5 rounded-md"
                      }
                    >
                      {item?.status}
                    </p>
                  </div>
                </div>
              </div>
              <div className="text-right flex flex-col items-end shrink-0 pl-1">
                <p className="font-bold text-gray-800 text-[13px] sm:text-[16px] whitespace-nowrap">
                  +{new Intl.NumberFormat("fr-CA").format(item?.value)} UZS
                </p>
                <p className="text-[9px] sm:text-[12px] text-gray-400 mt-1 font-medium bg-gray-50 px-1.5 sm:px-2.5 py-0.5 rounded-full border border-gray-100 whitespace-nowrap">
                  {item?.time}
                </p>
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
