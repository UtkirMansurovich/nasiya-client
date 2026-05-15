import { type FC, type JSX } from "react";
import { useTopDebtors } from "../hooks/useReports";
import { Skeleton } from "antd";

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-CA").format(Math.round(n));

const rankColors = [
  { colorClass: "text-rose-600", bgClass: "bg-rose-100" },
  { colorClass: "text-amber-600", bgClass: "bg-amber-100" },
  { colorClass: "text-orange-600", bgClass: "bg-orange-100" },
  { colorClass: "text-pink-600", bgClass: "bg-pink-100" },
  { colorClass: "text-rose-600", bgClass: "bg-rose-100" },
];

interface Debtor {
  id: number;
  full_name: string;
  remaining: number;
}

export const ReportsTopDebtors: FC = (): JSX.Element => {
  const { data: debtors = [], isLoading } = useTopDebtors();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 h-full">
      <h3 className="font-bold text-gray-800 text-lg mb-6 pb-4 border-b border-gray-100">
        Eng ko'p qarzdorlar
      </h3>

      {isLoading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : debtors.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
          Qarzdor mijoz topilmadi 🎉
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {debtors.map((item: Debtor, index: number) => {
            const { colorClass, bgClass } =
              rankColors[index % rankColors.length];
            return (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${bgClass} ${colorClass} shadow-sm group-hover:scale-110 transition-transform`}
                  >
                    {index + 1}
                  </div>
                  <span className="font-bold text-gray-800 text-[15px] group-hover:text-blue-600 transition-colors">
                    {item.full_name}
                  </span>
                </div>
                <span
                  className={`font-black text-[15px] tracking-tight ${colorClass}`}
                >
                  {fmt(item.remaining)} UZS
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
