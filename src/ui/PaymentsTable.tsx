import { type FC } from "react";
import { Table, Tag, Tooltip } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useCredits } from "../hooks/useCredits";
import type { ICredit, IPayment } from "../interfaces";

const fmt = (n: number) => new Intl.NumberFormat("uz-UZ").format(Math.round(n));

const StatusTag: FC<{ status: string }> = ({ status }) => {
  const map: Record<string, { color: string; text: string }> = {
    active: { color: "blue", text: "Aktiv" },
    completed: { color: "green", text: "Tugagan" },
    defaulted: { color: "red", text: "Muddati o'tgan" },
  };
  const { color, text } = map[status] || { color: "default", text: status };
  return <Tag color={color}>{text}</Tag>;
};

// Oxirgi 6 ish kuni (seshanbadan yakshanbagacha)
const getLastWeekDates = (): string[] => {
  const today = new Date();
  const day = today.getDay(); // 0=yakshanba
  // Oxirgi seshanbani topish
  const daysFromTuesday = day === 0 ? 5 : day === 1 ? 6 : day - 2;
  const tuesday = new Date(today);
  tuesday.setDate(today.getDate() - daysFromTuesday);

  return Array.from({ length: 6 }, (_, i) => {
    const d = new Date(tuesday);
    d.setDate(tuesday.getDate() + i);
    return d.toISOString().split("T")[0]; // "2025-11-04"
  });
};

const WeeklyPayments: FC<{ payments: IPayment[] }> = ({ payments }) => {
  const dates = getLastWeekDates();

  // Har kun uchun to'lov summasi
  const dailyMap: Record<string, number> = {};
  payments.forEach((p) => {
    const date = new Date(p.payment_date).toISOString().split("T")[0];
    dailyMap[date] = (dailyMap[date] || 0) + Number(p.amount);
  });

  const OYLAR = [
    "yan",
    "fev",
    "mar",
    "apr",
    "may",
    "iun",
    "iul",
    "avg",
    "sen",
    "okt",
    "noy",
    "dek",
  ];

  return (
    <div className="flex gap-1">
      {dates.map((date) => {
        const amount = dailyMap[date] || 0;

        // "12.may" formatini yaratish
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = OYLAR[d.getMonth()];

        const label = `${day}.${month}`; // Natija: "12.may"

        return (
          <Tooltip key={date} title={`${label}: ${fmt(amount)} so'm`}>
            <div
              className={`w-10 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold cursor-default transition-colors ${
                amount > 0
                  ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                  : "bg-gray-100 text-gray-400 border border-gray-200"
              }`}
            >
              {label}
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};

interface Props {
  onEdit?: (credit: ICredit) => void;
}

export const PaymentsTable: FC<Props> = ({ onEdit }) => {
  const navigate = useNavigate();
  const { data: credits = [], isLoading } = useCredits();

  const columns = [
    {
      title: <div className="h-10 flex items-center pl-2">Mijoz</div>,
      key: "customer",
      fixed: "left" as const,
      width: 180,
      render: (_: unknown, record: ICredit) => {
        const name = record.customer?.full_name || "—";
        const colors = [
          "bg-emerald-100 text-emerald-600",
          "bg-blue-100 text-blue-600",
          "bg-rose-100 text-rose-600",
          "bg-purple-100 text-purple-600",
        ];
        const color = colors[name.charCodeAt(0) % colors.length];
        const initials = name
          .split(" ")
          .slice(0, 2)
          .map((n) => n[0])
          .join("");
        return (
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${color}`}
            >
              {initials}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm leading-tight">
                {name}
              </p>
              <p className="text-xs text-gray-400">
                {record.customer?.phone || ""}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      title: "Mahsulot",
      dataIndex: "product_name",
      width: 160,
      render: (text: string) => (
        <span className="text-gray-700 text-sm font-medium">{text || "—"}</span>
      ),
    },
    {
      title: "Tannarx",
      dataIndex: "cost_price",
      width: 140,
      render: (v: number) => (
        <span className="text-gray-700 font-semibold text-sm">
          {fmt(v)} so'm
        </span>
      ),
    },
    {
      title: "Ustama",
      dataIndex: "markup_percent",
      width: 90,
      render: (v: number) => <Tag color="orange">{v}%</Tag>,
    },
    {
      title: "Jami qarz",
      dataIndex: "total_debt",
      width: 150,
      render: (v: number) => (
        <span className="text-indigo-600 font-semibold text-sm">
          {fmt(v)} so'm
        </span>
      ),
    },
    {
      title: "Foyda",
      width: 130,
      render: (_: unknown, record: ICredit) => {
        const foyda = Number(record.total_debt) - Number(record.cost_price);
        return (
          <span className="text-emerald-600 font-semibold text-sm">
            +{fmt(foyda)} so'm
          </span>
        );
      },
    },
    {
      title: "Qoldiq",
      dataIndex: "remaining_debt",
      width: 140,
      render: (v: number) => (
        <span
          className={`font-bold text-sm ${v > 0 ? "text-rose-500" : "text-gray-400"}`}
        >
          {fmt(v)} so'm
        </span>
      ),
    },
    {
      title: "Oxirgi hafta",
      width: 250,
      render: (_: unknown, record: ICredit) => (
        <WeeklyPayments payments={record.payments || []} />
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 130,
      render: (status: string) => <StatusTag status={status} />,
    },
    {
      title: "Harakat",
      fixed: "right" as const,
      width: 90,
      render: (_: unknown, record: ICredit) => (
        <div className="flex items-center gap-1">
          <Tooltip title="Batafsil">
            <button
              onClick={() => navigate(`/customers/${record.customer?.id}`)}
              className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <EyeOutlined />
            </button>
          </Tooltip>
          <Tooltip title="Tahrirlash">
            <button
              onClick={() => onEdit?.(record)}
              className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-500 transition-colors"
            >
              <EditOutlined />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <Table
        dataSource={credits}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "50"],
          showTotal: (total) => `Jami: ${total} ta nasiya`,
        }}
        rowClassName="hover:bg-blue-50/30 transition-colors"
        scroll={{ x: 1400 }}
        size="small"
        sticky
      />
    </div>
  );
};
