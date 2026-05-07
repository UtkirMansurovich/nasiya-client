import { type FC, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Popconfirm, message, Empty, Tag } from "antd";
import { ArrowLeftOutlined, RollbackOutlined } from "@ant-design/icons";
import { useArchivedPartners, useRestorePartner } from "../hooks/usePartners";
import type { IPartner } from "../interfaces";
import dayjs from "dayjs";

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("uz-UZ").format(Math.round(amount)) + " UZS";

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-emerald-100 text-emerald-600",
    "bg-blue-100 text-blue-600",
    "bg-rose-100 text-rose-600",
    "bg-purple-100 text-purple-600",
  ];
  return colors[name.charCodeAt(0) % colors.length];
};

export const ArchivedPartners: FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { data: partners = [], isLoading } = useArchivedPartners();
  const { mutate: restorePartner } = useRestorePartner();

  const columns = [
    {
      title: "Ism",
      dataIndex: "full_name",
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
            <p className="text-xs text-gray-400">@{record.user?.username}</p>
          </div>
        </div>
      ),
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      width: 160,
      render: (text: string) => (
        <span className="text-gray-500">{text || "—"}</span>
      ),
    },
    {
      title: "Kiritgan mablag'",
      dataIndex: "total_invested",
      width: 180,
      render: (amount: number) => (
        <span className="font-semibold text-gray-800">
          {formatMoney(amount)}
        </span>
      ),
    },
    {
      title: "Jami foyda",
      dataIndex: "total_profit",
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
      width: 180,
      render: (amount: number) => (
        <span className="font-semibold text-rose-600">
          {formatMoney(amount)}
        </span>
      ),
    },
    {
      title: "Holat",
      dataIndex: "status",
      width: 120,
      render: () => <Tag color="orange">Arxivlangan</Tag>,
    },
    {
      title: "Arxivlangan sana",
      dataIndex: "archived_at",
      width: 180,
      render: (text: string) => (
        <span className="text-gray-400 text-sm">
          {dayjs(text).format("DD.MM.YYYY HH:mm")}
        </span>
      ),
    },
    {
      title: "Harakat",
      fixed: "right" as const,
      width: 120,
      render: (_: unknown, record: IPartner) => (
        <Popconfirm
          title="Sherikni tiklash"
          description="Sherikni qayta faollashtirmoqchimisiz?"
          okText="Ha"
          cancelText="Yo'q"
          onConfirm={() =>
            restorePartner(record.id, {
              onSuccess: () => message.success("Sherik tiklandi!"),
              onError: (error: Error) => message.error(error.message),
            })
          }
        >
          <button className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-emerald-50 text-gray-400 hover:text-emerald-500 transition-colors cursor-pointer">
            <RollbackOutlined />
            <span className="text-sm">Tiklash</span>
          </button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-400 mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/partners")}
          className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeftOutlined className="text-lg" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Arxivlangan sheriklar
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Chiqib ketgan sheriklar tarixi
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <Table
          dataSource={partners}
          columns={columns}
          rowKey="id"
          loading={isLoading}
          pagination={{
            pageSize: 10,
            showTotal: (total) => `Jami: ${total} ta arxivlangan sherik`,
          }}
          rowClassName="hover:bg-amber-50/30"
          scroll={{ x: 1400 }}
          locale={{
            emptyText: (
              <Empty
                description="Arxivlangan sheriklar yo'q"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            ),
          }}
        />
      </div>
    </div>
  );
};
