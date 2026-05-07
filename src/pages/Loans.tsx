import { type FC, type JSX, useState } from "react";
import { useCredits } from "../hooks/useCredits";
import { AddCreditModal } from "../ui/AddCreditModal";
import { CreditsTable } from "../ui/CreditsTable";
import {
  CreditCardOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import { PlusOutlined, FileExcelOutlined } from "@ant-design/icons";
import type { ICredit } from "../interfaces";

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("uz-UZ").format(Math.round(amount)) + " UZS";

export const Loans: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: credits = [] } = useCredits();

  // KPI hisoblash
  const totalDebt = credits.reduce(
    (sum: number, c: ICredit) => sum + Number(c.total_debt),
    0,
  );
  const totalPaid = credits.reduce(
    (sum: number, c: ICredit) => sum + Number(c.paid_amount),
    0,
  );
  const totalRemaining = credits.reduce(
    (sum: number, c: ICredit) => sum + Number(c.remaining_debt),
    0,
  );
  const activeCount = credits.filter(
    (c: ICredit) => c.status === "active",
  ).length;

  const kpiCards = [
    {
      title: "Aktiv nasiyalar",
      value: `${activeCount} ta`,
      icon: <CreditCardOutlined />,
      color: "bg-blue-50 text-blue-500",
      shadow: "shadow-blue-100",
    },
    {
      title: "Jami qarz",
      value: formatMoney(totalDebt),
      icon: <DollarOutlined />,
      color: "bg-purple-50 text-purple-500",
      shadow: "shadow-purple-100",
    },
    {
      title: "Jami to'langan",
      value: formatMoney(totalPaid),
      icon: <CheckCircleOutlined />,
      color: "bg-emerald-50 text-emerald-500",
      shadow: "shadow-emerald-100",
    },
    {
      title: "Qolgan qarz",
      value: formatMoney(totalRemaining),
      icon: <RiseOutlined />,
      color: "bg-rose-50 text-rose-500",
      shadow: "shadow-rose-100",
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-400 mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Nasiyalar
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Barcha nasiyalar va ularning holati
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {}}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-5 rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
          >
            <FileExcelOutlined /> Excel import
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-(--secondary) hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
          >
            <PlusOutlined /> Nasiya qo'shish
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpiCards.map((card) => (
          <div
            key={card.title}
            className={`bg-white rounded-xl p-5 shadow-sm ${card.shadow} border border-gray-100`}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${card.color}`}
              >
                {card.icon}
              </div>
            </div>
            <p className="text-xl font-bold text-gray-800">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <CreditsTable />

      {/* Modal */}
      <AddCreditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
