import { type FC } from "react";
import { Table, Tag, Tooltip } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Popconfirm } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCustomers, useDeleteCustomer } from "../hooks/useCustomers";
import type { ICustomer } from "../interfaces";

// --- Helpers ---
const fmt = (n: number) =>
  new Intl.NumberFormat("uz-UZ").format(Math.round(n));

const StatusTag: FC<{ status: string }> = ({ status }) => {
  const map: Record<string, { color: string; text: string }> = {
    active: { color: "blue", text: "Aktiv" },
    completed: { color: "green", text: "Tugagan" },
    defaulted: { color: "red", text: "Muddati o'tgan" },
    none: { color: "default", text: "Nasiya yo'q" },
  };
  const { color, text } = map[status] || map.none;
  return <Tag color={color}>{text}</Tag>;
};

// --- Component ---
export const CustomersTable: FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("limit")) || 10;

  const { data: response, isLoading } = useCustomers(currentPage, pageSize);
  const customers = response?.data || [];
  const total = response?.total || 0;

  const { mutate: deleteCustomer } = useDeleteCustomer();

  const columns = [
    {
      title: (
        <div className="h-10 flex items-center pl-2">
          F.I.O
        </div>
      ),
      dataIndex: "full_name",
      fixed: "left" as const,
      width: 200,
      render: (_: string, record: ICustomer) => {
        const colors = [
          "bg-emerald-100 text-emerald-600",
          "bg-blue-100 text-blue-600",
          "bg-rose-100 text-rose-600",
          "bg-purple-100 text-purple-600",
        ];
        const color = colors[record.full_name.charCodeAt(0) % colors.length];
        const initials = record.full_name
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
            <span className="font-semibold text-gray-800 text-sm">
              {record.full_name}
            </span>
          </div>
        );
      },
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      width: 140,
      render: (text: string) => (
        <span className="text-gray-500 text-sm">{text || "—"}</span>
      ),
    },
    {
      title: "Jami qarz",
      width: 140,
      render: (_: unknown, record: ICustomer) => {
        const val = record.stats?.jami_qarz;
        return (
          <span className="font-semibold text-gray-800">
            {val ? `${fmt(val)} so'm` : "—"}
          </span>
        );
      },
    },
    {
      title: "Ustama %",
      width: 100,
      render: (_: unknown, record: ICustomer) => {
        const val = record.stats?.ustama_foiz;
        return val ? <Tag color="orange">{val.toFixed(0)}%</Tag> : "—";
      },
    },
    {
      title: "Jami + foyda",
      width: 150,
      render: (_: unknown, record: ICustomer) => {
        const val = record.stats?.jami_qarz_va_foyda;
        return (
          <span className="text-indigo-600 font-semibold text-sm">
            {val ? `${fmt(val)} so'm` : "—"}
          </span>
        );
      },
    },
    {
      title: "Foyda",
      width: 130,
      render: (_: unknown, record: ICustomer) => {
        const val = record.stats?.foyda;
        return (
          <span className="text-emerald-600 font-semibold text-sm">
            {val ? `+${fmt(val)} so'm` : "—"}
          </span>
        );
      },
    },
    {
      title: "To'langan",
      width: 140,
      render: (_: unknown, record: ICustomer) => {
        const val = record.stats?.tolangan;
        return (
          <span className="text-blue-600 text-sm">
            {val ? `${fmt(val)} so'm` : "—"}
          </span>
        );
      },
    },
    {
      title: "Qolgan qarz",
      width: 140,
      render: (_: unknown, record: ICustomer) => {
        const val = record.stats?.qolgan_qarz;
        return (
          <span className={`font-semibold text-sm ${val && val > 0 ? "text-rose-500" : "text-gray-400"}`}>
            {val ? `${fmt(val)} so'm` : "—"}
          </span>
        );
      },
    },
    {
      title: "Oxirgi to'lov",
      width: 140,
      render: (_: unknown, record: ICustomer) => {
        const date = record.stats?.oxirgi_sana;
        return (
          <span className="text-gray-400 text-sm">
            {date
              ? new Date(date).toLocaleDateString("uz-UZ")
              : "—"}
          </span>
        );
      },
    },
    {
      title: "Status",
      width: 150,
      render: (_: unknown, record: ICustomer) => (
        <StatusTag status={record.stats?.status || "none"} />
      ),
    },
    {
      title: "Harakat",
      fixed: "right" as const,
      width: 100,
      render: (_: unknown, record: ICustomer) => (
        <div className="flex items-center gap-1">
          <Tooltip title="Batafsil">
            <button
              onClick={() => navigate(`/customers/${record.id}`)}
              className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors"
            >
              <EyeOutlined />
            </button>
          </Tooltip>
          <Popconfirm
            title="Mijozni o'chirish"
            description="Rostdan ham o'chirmoqchimisiz?"
            okText="Ha"
            cancelText="Yo'q"
            okButtonProps={{ danger: true }}
            onConfirm={() => deleteCustomer(record.id)}
          >
            <Tooltip title="O'chirish">
              <button className="p-1.5 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition-colors">
                <DeleteOutlined />
              </button>
            </Tooltip>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      dataSource={customers}
      columns={columns}
      rowKey="id"
      loading={isLoading}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: total,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "50", "100"],
        onChange: (page, size) => {
          setSearchParams({ page: page.toString(), limit: size.toString() });
        },
        showTotal: (total) => `Jami: ${total} ta mijoz`,
        style: {
          paddingRight: 20,
        },
      }}
      rowClassName="hover:bg-blue-50/30 cursor-pointer"
      onRow={(record) => ({
        onDoubleClick: () => navigate(`/customers/${record.id}`),
      })}
      sticky
      scroll={{ x: 1400 }}
      size="small"
    />
  );
};
