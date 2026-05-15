import { type FC, type JSX } from "react";
import { useMonthlyStats } from "../hooks/useReports";
import { Skeleton } from "antd";

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-CA").format(Math.round(n));

// 2024-05 → "May 2024" kabi chiqarish
const formatMonth = (ym: string) => {
  const [year, month] = ym.split("-");
  const monthNames = [
    "Yan", "Feb", "Mar", "Apr", "May", "Iyn",
    "Iyl", "Avg", "Sen", "Okt", "Noy", "Dek",
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

interface MonthRow {
  month: string;
  total: number;
  count: number;
}

export const ReportsChartArea: FC = (): JSX.Element => {
  const { data: rows = [], isLoading } = useMonthlyStats();

  // Maksimal qiymat uchun foizni hisoblash
  const maxTotal = Math.max(...rows.map((r: MonthRow) => r.total), 1);

  // Oxirgi oyni ajratib ko'rsatish uchun
  const lastIdx = rows.length - 1;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
        <h3 className="font-bold text-gray-800 text-lg">
          Oylik to'lov dinamikasi
        </h3>
        <span className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
          So'nggi 6 oy
        </span>
      </div>

      {isLoading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : rows.length === 0 ? (
        <div className="flex items-center justify-center h-40 text-gray-400 text-sm">
          Hali to'lov ma'lumotlari yo'q
        </div>
      ) : (
        <div className="flex flex-col gap-6 mt-4">
          {rows.map((item: MonthRow, index: number) => {
            const percent = Math.round((item.total / maxTotal) * 100);
            const isLast = index === lastIdx;
            return (
              <div key={item.month} className="flex items-center gap-4 group">
                <span className="w-16 text-gray-500 font-bold text-sm uppercase tracking-wide shrink-0">
                  {formatMonth(item.month)}
                </span>
                <div className="flex-1 h-4 bg-gray-50 rounded-full overflow-hidden shadow-inner border border-gray-100">
                  <div
                    className={`h-full rounded-full transition-all duration-1000 ease-out relative overflow-hidden ${
                      isLast
                        ? "bg-emerald-500 group-hover:bg-emerald-400"
                        : "bg-(--secondary) group-hover:bg-blue-400"
                    }`}
                    style={{ width: `${percent}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full h-full -skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-1000" />
                  </div>
                </div>
                <div className="w-36 text-right shrink-0">
                  <span className="font-black text-gray-700 text-[14px] tracking-tight">
                    {fmt(item.total)} UZS
                  </span>
                  <span className="ml-2 text-[11px] text-gray-400">
                    ({item.count} ta)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
