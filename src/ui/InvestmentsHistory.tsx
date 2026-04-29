import { type FC } from "react";
import { Table, Popconfirm, Empty } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useInvestments, useDeleteInvestment } from "../hooks/useInvestments";
import type { IInvestment } from "../interfaces";

interface Props {
  partnerId: number;
}

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("uz-UZ").format(amount) + " UZS";

export const InvestmentsHistory: FC<Props> = ({ partnerId }) => {
  const { data: investments, isLoading } = useInvestments(partnerId);
  const { mutate: deleteInvestment } = useDeleteInvestment();

  const columns = [
    {
      title: "Sana",
      dataIndex: "created_at",
      width: 180,
      render: (text: string) => (
        <span className="text-gray-600 font-medium">
          {new Date(text).toLocaleString("uz-UZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      ),
    },
    {
      title: "Summa",
      dataIndex: "amount",
      width: 200,
      render: (amount: number) => (
        <span className="font-bold text-lg text-emerald-600">
          + {formatMoney(amount)}
        </span>
      ),
    },
    {
      title: "Izoh",
      dataIndex: "notes",
      render: (text: string) => (
        <span className="text-gray-500">{text || "—"}</span>
      ),
    },
    {
      title: "Harakat",
      width: 100,
      render: (_: unknown, record: IInvestment) => (
        <Popconfirm
          title="Investitsiyani o'chirish"
          description="Rostdan ham o'chirmoqchimisiz?"
          okText="Ha"
          cancelText="Yo'q"
          okButtonProps={{ danger: true }}
          onConfirm={() => deleteInvestment(record.id)}
        >
          <button className="p-1.5 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-500 transition-colors">
            <DeleteOutlined />
          </button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-800">
          Investitsiyalar tarixi
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Sherik tomonidan kiritilgan barcha mablag'lar
        </p>
      </div>

      <Table
        dataSource={investments}
        columns={columns}
        rowKey="id"
        loading={isLoading}
        pagination={false}
        locale={{
          emptyText: (
            <Empty
              description="Hali investitsiyalar yo'q"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
      />
    </div>
  );
};
