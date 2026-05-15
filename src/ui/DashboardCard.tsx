import { type FC, type JSX, useState } from "react";
import { useReportsSummary } from "../hooks/useReports";
import { useOwner } from "../hooks/useOwner";
import { Skeleton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { AddOwnerBalanceModal } from "./AddOwnerBalanceModal";

const fmt = (n: number) => new Intl.NumberFormat("fr-CA").format(Math.round(n));

const cards = [
  {
    key: "total_debt" as const,
    title: "Jami nasiya",
    currency: "UZS",
    color: "oklch(62.3% 0.214 259.815)",
  },
  {
    key: "total_paid" as const,
    title: "Yig'ilgan",
    currency: "UZS",
    color: "oklch(72.3% 0.219 149.579)",
  },
  {
    key: "total_remaining" as const,
    title: "Qoldiq",
    currency: "UZS",
    color: "oklch(70.5% 0.213 47.604)",
  },
  {
    key: "total_profit" as const,
    title: "Jami foyda",
    currency: "UZS",
    color: "oklch(63.7% 0.237 25.331)",
  },
];

const ownerCards = [
  {
    key: "balance" as const,
    title: "Mening balansim",
    color: "oklch(62.3% 0.214 259.815)",
  },
  {
    key: "total_invested" as const,
    title: "Jami kiritilgan",
    color: "oklch(72.3% 0.219 149.579)",
  },
  {
    key: "total_profit" as const,
    title: "Mening foydaim",
    color: "oklch(70.5% 0.213 47.604)",
  },
  {
    key: "total_loss" as const,
    title: "Mening zararim",
    color: "oklch(63.7% 0.237 25.331)",
  },
];

export const DashboardCard: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: summary, isLoading } = useReportsSummary();
  const { data: owner, isLoading: isOwnerLoading } = useOwner();

  if (isLoading || isOwnerLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {cards.map((c) => (
            <div
              key={c.key}
              className="bg-white p-3.5 sm:p-5 rounded-xl border border-gray-100 shadow-sm"
            >
              <Skeleton active paragraph={{ rows: 1 }} />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {ownerCards.map((c) => (
            <div
              key={c.key}
              className="bg-white p-3.5 sm:p-5 rounded-xl border border-gray-100 shadow-sm"
            >
              <Skeleton active paragraph={{ rows: 1 }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Umumiy nasiya statistikasi */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
          Umumiy statistika
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {cards.map((card) => (
            <div
              key={card.key}
              className="bg-white p-3.5 sm:p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow duration-200"
            >
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{ backgroundColor: card.color }}
              />
              <p className="text-gray-500 font-medium text-xs sm:text-sm mb-2 sm:mb-3">
                {card.title}
              </p>
              <div className="flex flex-wrap items-baseline gap-1 sm:gap-1.5 mt-auto">
                <p className="text-lg sm:text-2xl font-bold text-gray-800 tracking-tight truncate w-full sm:w-auto">
                  {fmt(summary?.[card.key] ?? 0)}
                </p>
                <p
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-wider"
                  style={{ color: card.color }}
                >
                  UZS
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Asosiy kishi hisobi */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Mening hisobim
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            <PlusOutlined /> Mablag' qo'shish
          </button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {ownerCards.map((card) => (
            <div
              key={card.key}
              className="bg-white p-3.5 sm:p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col relative overflow-hidden group hover:shadow-md transition-shadow duration-200"
            >
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{ backgroundColor: card.color }}
              />
              <p className="text-gray-500 font-medium text-xs sm:text-sm mb-2 sm:mb-3">
                {card.title}
              </p>
              <div className="flex flex-wrap items-baseline gap-1 sm:gap-1.5 mt-auto">
                <p className="text-lg sm:text-2xl font-bold text-gray-800 tracking-tight truncate w-full sm:w-auto">
                  {fmt(Number(owner?.[card.key] ?? 0))}
                </p>
                <p
                  className="text-[10px] sm:text-xs font-bold uppercase tracking-wider"
                  style={{ color: card.color }}
                >
                  UZS
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AddOwnerBalanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
