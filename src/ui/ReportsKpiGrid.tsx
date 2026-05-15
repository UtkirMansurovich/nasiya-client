import { type FC, type JSX } from "react";
import {
  BarChartOutlined,
  LineChartOutlined,
  WarningOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useReportsSummary } from "../hooks/useReports";
import { Skeleton } from "antd";

const fmt = (n: number) =>
  new Intl.NumberFormat("fr-CA").format(Math.round(n));

const kpiConfig = [
  {
    key: "total_debt" as const,
    label: "Jami berilgan nasiya",
    colorClass: "text-blue-500",
    bgClass: "bg-blue-50",
    icon: <LineChartOutlined />,
  },
  {
    key: "total_paid" as const,
    label: "Jami yig'ilgan",
    colorClass: "text-emerald-500",
    bgClass: "bg-emerald-50",
    icon: <DollarOutlined />,
  },
  {
    key: "total_remaining" as const,
    label: "Umumiy qoldiq",
    colorClass: "text-amber-500",
    bgClass: "bg-amber-50",
    icon: <BarChartOutlined />,
  },
  {
    key: "total_profit" as const,
    label: "Jami foyda",
    colorClass: "text-rose-500",
    bgClass: "bg-rose-50",
    icon: <WarningOutlined />,
  },
];

export const ReportsKpiGrid: FC = (): JSX.Element => {
  const { data: summary, isLoading } = useReportsSummary();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpiConfig.map((c) => (
          <div
            key={c.key}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <Skeleton active paragraph={{ rows: 1 }} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {kpiConfig.map((item) => (
        <div
          key={item.key}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5 hover:-translate-y-1 transition-transform duration-300"
        >
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 ${item.bgClass} ${item.colorClass} shadow-sm`}
          >
            {item.icon}
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-[12px] font-bold uppercase tracking-wider mb-1">
              {item.label}
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-[22px] font-black text-gray-800 tracking-tight">
                {fmt(summary?.[item.key] ?? 0)}
              </span>
              <span className={`text-[11px] font-bold ${item.colorClass}`}>
                UZS
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
