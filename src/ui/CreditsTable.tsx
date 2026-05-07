import { type FC, useState } from "react";
import { Table, Tag, Popconfirm, Select, message } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  useCredits,
  useDeleteCredit,
  useUpdateCreditStatus,
} from "../hooks/useCredits";
import type { ICredit } from "../interfaces";

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("uz-UZ").format(Math.round(amount)) + " UZS";

const statusConfig = {
  active: { color: "blue", label: "Aktiv" },
  completed: { color: "green", label: "Yopilgan" },
  defaulted: { color: "red", label: "Muddati o'tgan" },
};

export const CreditsTable: FC = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: credits = [], isLoading } = useCredits();
  const { mutate: deleteCredit } = useDeleteCredit();
  const { mutate: updateStatus } = useUpdateCreditStatus();

  // Filter
  const filteredCredits =
    statusFilter === "all"
      ? credits
      : credits.filter((c: ICredit) => c.status === statusFilter);

  const columns = [
    {
      title: "Mijoz",
      dataIndex: "customer",
      width: 180,
      render: (_: unknown, record: ICredit) => (
        <div>
          <p className="font-semibold text-gray-800">
            {record.customer?.full_name}
          </p>
          <p className="text-xs text-gray-400">{record.customer?.phone}</p>
        </div>
      ),
    },
    {
      title: "Sherik",
      dataIndex: "partner",
      width: 150,
      render: (_: unknown, record: ICredit) => (
        <span className="text-gray-600">
          {record.partner?.full_name || "—"}
        </span>
      ),
    },
    {
      title: "Mahsulot",
      dataIndex: "product_name",
      width: 160,
      render: (text: string) => (
        <span className="font-medium text-gray-700">{text}</span>
      ),
    },
    {
      title: "Jami qarz",
      dataIndex: "total_debt",
      width: 160,
      render: (amount: number) => (
        <span className="font-semibold text-gray-800">
          {formatMoney(amount)}
        </span>
      ),
    },
    {
      title: "To'langan",
      dataIndex: "paid_amount",
      width: 160,
      render: (amount: number) => (
        <span className="font-semibold text-emerald-600">
          {formatMoney(amount)}
        </span>
      ),
    },
    {
      title: "Qolgan qarz",
      dataIndex: "remaining_debt",
      width: 160,
      render: (amount: number) => (
        <span className="font-semibold text-rose-600">
          {formatMoney(amount)}
        </span>
      ),
    },
    {
      title: "Kunlik to'lov",
      dataIndex: "daily_payment",
      width: 160,
      render: (amount: number) => (
        <span className="font-medium text-blue-600">{formatMoney(amount)}</span>
      ),
    },
    {
      title: "Muddat",
      dataIndex: "duration_days",
      width: 120,
      render: (_: unknown, record: ICredit) => (
        <span className="text-gray-500">
          {record.working_days} / {record.duration_days} kun
        </span>
      ),
    },
    {
      title: "Boshlanish",
      dataIndex: "start_date",
      width: 130,
      render: (text: string) => (
        <span className="text-gray-500">
          {new Date(text).toLocaleDateString("uz-UZ")}
        </span>
      ),
    },
    {
      title: "Holat",
      dataIndex: "status",
      width: 140,
      render: (status: string) => (
        <Tag color={statusConfig[status as keyof typeof statusConfig]?.color}>
          {statusConfig[status as keyof typeof statusConfig]?.label}
        </Tag>
      ),
    },
    {
      title: "Harakat",
      fixed: "right" as const,
      width: 150,
      render: (_: unknown, record: ICredit) => (
        <div className="flex items-center gap-2">
          {/* Ko'rish */}
          <button
            onClick={() => navigate(`/loans/${record.id}`)}
            className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <EyeOutlined />
          </button>

          {/* Yopish */}
          {record.status === "active" && (
            <Popconfirm
              title="Nasiyani yopish"
              description="Nasiyani yopilgan deb belgilaysizmi?"
              okText="Ha"
              cancelText="Yo'q"
              onConfirm={() =>
                updateStatus(
                  { id: record.id, status: "completed" },
                  {
                    onSuccess: () => message.success("Nasiya yopildi!"),
                  },
                )
              }
            >
              <button className="p-1.5 rounded-lg hover:bg-emerald-50 text-gray-400 hover:text-emerald-500 transition-colors">
                <CheckCircleOutlined />
              </button>
            </Popconfirm>
          )}

          {/* Muddati o'tgan */}
          {record.status === "active" && (
            <Popconfirm
              title="Muddati o'tgan"
              description="Nasiyani muddati o'tgan deb belgilaysizmi?"
              okText="Ha"
              cancelText="Yo'q"
              okButtonProps={{ danger: true }}
              onConfirm={() =>
                updateStatus(
                  { id: record.id, status: "defaulted" },
                  {
                    onSuccess: () => message.warning("Nasiya muddati o'tgan!"),
                  },
                )
              }
            >
              <button className="p-1.5 rounded-lg hover:bg-amber-50 text-gray-400 hover:text-amber-500 transition-colors">
                <CloseCircleOutlined />
              </button>
            </Popconfirm>
          )}

          {/* O'chirish */}
          <Popconfirm
            title="Nasiyani o'chirish"
            description="Rostdan ham o'chirmoqchimisiz?"
            okText="Ha"
            cancelText="Yo'q"
            okButtonProps={{ danger: true }}
            onConfirm={() =>
              deleteCredit(record.id, {
                onError: (error: Error) => message.error(error.message),
              })
            }
          >
            <button className="p-1.5 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition-colors">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Filter */}
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">Nasiyalar ro'yxati</h3>
        <Select
          value={statusFilter}
          onChange={setStatusFilter}
          size="large"
          style={{ width: 180 }}
          options={[
            { value: "all", label: "Barchasi" },
            { value: "active", label: "Aktiv" },
            { value: "completed", label: "Yopilgan" },
            { value: "defaulted", label: "Muddati o'tgan" },
          ]}
        />
      </div>

      <Table
        dataSource={filteredCredits}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{
          pageSize: 10,
          showTotal: (total) => `Jami: ${total} ta nasiya`,
        }}
        rowClassName="hover:bg-blue-50/30"
        scroll={{ x: 1600 }}
      />
    </div>
  );
};
