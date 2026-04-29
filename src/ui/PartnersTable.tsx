import { type FC, useState } from "react";
import { Table, Popconfirm } from "antd";
import { EditOutlined, EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { usePartners, useDeletePartner } from "../hooks/usePartners";
import type { IPartner } from "../interfaces";
import type { ColumnType } from "antd/es/table";
import { AddPartnerModal } from "./AddPartnerModal";
import { useNavigate } from "react-router-dom";

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("uz-UZ").format(amount) + " UZS";

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-emerald-100 text-emerald-600",
    "bg-blue-100 text-blue-600",
    "bg-rose-100 text-rose-600",
    "bg-purple-100 text-purple-600",
  ];
  return colors[name.charCodeAt(0) % colors.length];
};

interface EditableColumn extends ColumnType<IPartner> {
  editable?: boolean;
}

export const PartnersTable: FC = () => {
  const navigate = useNavigate();

  const [editData, setEditData] = useState<IPartner | null>(null);

  const { data: partners, isLoading } = usePartners();
  const { mutate: deletePartner } = useDeletePartner();

  const columns: EditableColumn[] = [
    {
      title: "Ism",
      dataIndex: "full_name",
      editable: true,
      fixed: "left" as const,
      width: 200,
      render: (_: unknown, record: IPartner) => (
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${getAvatarColor(record.full_name)}`}
          >
            {record.full_name
              ?.split(" ")
              .slice(0, 2)
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <p className="font-semibold text-gray-800">{record.full_name}</p>
            <p className="text-xs text-gray-400">{record.user?.username}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      editable: true,
      width: 160,
      render: (text: string) => (
        <span className="text-gray-500">{text || "—"}</span>
      ),
    },
    {
      title: "Kiritgan mablag'",
      dataIndex: "total_invested",
      editable: false,
      width: 180,
      render: (amount: number) => (
        <span className="font-semibold text-gray-800">
          {formatMoney(amount)}
        </span>
      ),
    },
    {
      title: "Balans",
      dataIndex: "balance",
      editable: false,
      width: 180,
      render: (amount: number) => (
        <span className="font-semibold text-blue-600">
          {formatMoney(amount)}
        </span>
      ),
    },
    {
      title: "Jami foyda",
      dataIndex: "total_profit",
      editable: false,
      width: 180,
      render: (amount: number) => (
        <span className="font-semibold text-emerald-600">
          {formatMoney(amount)}
        </span>
      ),
    },
    {
      title: "Jami zarar",
      dataIndex: "total_loss",
      editable: false,
      width: 180,
      render: (amount: number) => (
        <span className="font-semibold text-rose-600">
          {formatMoney(amount)}
        </span>
      ),
    },
    {
      title: "Izoh",
      dataIndex: "notes",
      editable: true,
      width: 160,
      render: (text: string) => (
        <span className="text-gray-400 text-sm">{text || "—"}</span>
      ),
    },
    {
      title: "Qo'shilgan sana",
      dataIndex: "created_at",
      editable: false,
      width: 160,
      render: (text: string) => (
        <span className="text-gray-400 text-sm">
          {new Date(text).toLocaleDateString("uz-UZ")}
        </span>
      ),
    },
    // Harakat columnini o'zgartiring:
    {
      title: "Harakat",
      fixed: "right" as const,
      width: 130,
      render: (_: unknown, record: IPartner) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEditData(record)} // ← modal ochadi
            className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <EditOutlined />
          </button>
          <button
            onClick={() => navigate(`/partners/${record.id}`)}
            className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <EyeOutlined />
          </button>
          <Popconfirm
            title="Sherikni o'chirish"
            description="Rostdan ham o'chirmoqchimisiz?"
            okText="Ha"
            cancelText="Yo'q"
            okButtonProps={{ danger: true }}
            onConfirm={() => deletePartner(record.id)}
          >
            <button className="p-1.5 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition-colors">
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // Table pastida modal qo'shing:
  return (
    <>
      <Table
        dataSource={partners}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={{
          pageSize: 10,
          showTotal: (total) => `Jami: ${total} ta sherik`,
        }}
        rowClassName="hover:bg-blue-50/30"
        scroll={{ x: 1400 }}
      />

      {/* Edit Modal */}
      <AddPartnerModal
        isOpen={!!editData}
        onClose={() => setEditData(null)}
        editData={editData}
      />
    </>
  );
};
