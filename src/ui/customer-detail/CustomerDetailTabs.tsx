import { type FC } from "react";
import { Table, Tag, Tabs, Empty, Skeleton } from "antd";
import { usePaymentsByCredit } from "../../hooks/usePayments";
import StatusTag from "../../components/StatusTag";
import type { ICredit, IPayment } from "../../interfaces";

const fmt = (n: number) =>
  new Intl.NumberFormat("uz-UZ").format(Math.round(Number(n)));

const methodMap: Record<string, string> = {
  cash: "Naqd",
  card: "Karta",
  transfer: "O'tkazma",
};

// --- Har bir nasiya uchun to'lovlar ---
const CreditPayments: FC<{ creditId: number }> = ({ creditId }) => {
  const { data: payments = [], isLoading } = usePaymentsByCredit(creditId);

  if (isLoading) return <Skeleton active paragraph={{ rows: 2 }} />;
  if (payments.length === 0)
    return (
      <Empty
        description="To'lovlar yo'q"
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        className="py-4"
      />
    );

  const cols = [
    {
      title: "Sana",
      dataIndex: "payment_date",
      width: 160,
      render: (v: string) =>
        new Date(v).toLocaleDateString("uz-UZ", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "Miqdor",
      dataIndex: "amount",
      width: 150,
      render: (v: number) => (
        <span className="font-bold text-emerald-600">+{fmt(v)} so'm</span>
      ),
    },
    {
      title: "Usul",
      dataIndex: "method",
      width: 100,
      render: (v: string) => <Tag color="blue">{methodMap[v] ?? v}</Tag>,
    },
    {
      title: "Izoh",
      dataIndex: "notes",
      render: (v: string) => (
        <span className="text-gray-400 text-sm italic">{v || "—"}</span>
      ),
    },
  ];

  return (
    <Table
      dataSource={payments}
      columns={cols}
      rowKey="id"
      pagination={false}
      size="small"
      className="mt-2"
    />
  );
};

// --- Props ---
interface CustomerDetailTabsProps {
  credits: ICredit[];
  allPayments: IPayment[];
  isPaymentsLoading: boolean;
}

const CustomerDetailTabs: FC<CustomerDetailTabsProps> = ({
  credits,
  allPayments,
  isPaymentsLoading,
}) => {
  const creditColumns = [
    {
      title: "Mahsulot",
      dataIndex: "product_name",
      render: (v: string) => (
        <span className="font-semibold text-gray-800">{v}</span>
      ),
    },
    {
      title: "Jami qarz",
      dataIndex: "total_debt",
      width: 150,
      render: (v: number) => (
        <span className="font-bold text-indigo-600">{fmt(v)} so'm</span>
      ),
    },
    {
      title: "To'langan",
      dataIndex: "paid_amount",
      width: 150,
      render: (v: number) => (
        <span className="text-blue-600 font-semibold">{fmt(v)} so'm</span>
      ),
    },
    {
      title: "Qolgan",
      dataIndex: "remaining_debt",
      width: 150,
      render: (v: number) => (
        <span
          className={`font-bold ${v > 0 ? "text-rose-500" : "text-gray-400"}`}
        >
          {fmt(v)} so'm
        </span>
      ),
    },
    {
      title: "Kunlik",
      dataIndex: "daily_payment",
      width: 130,
      render: (v: number) => (
        <span className="text-gray-600 text-sm">{fmt(v)} so'm</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 120,
      render: (v: string) => <StatusTag status={v} />,
    },
  ];

  const paymentColumns = [
    {
      title: "Sana",
      dataIndex: "payment_date",
      width: 160,
      render: (v: string) =>
        new Date(v).toLocaleDateString("uz-UZ", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
    },
    {
      title: "Miqdor",
      dataIndex: "amount",
      width: 150,
      render: (v: number) => (
        <span className="font-bold text-emerald-600">+{fmt(v)} so'm</span>
      ),
    },
    {
      title: "Mahsulot",
      width: 180,
      render: (_: unknown, record: IPayment) => (
        <span className="text-gray-600 text-sm">
          {record.credit?.product_name || "—"}
        </span>
      ),
    },
    {
      title: "Usul",
      dataIndex: "method",
      width: 100,
      render: (v: string) => <Tag color="blue">{methodMap[v] ?? v}</Tag>,
    },
    {
      title: "Izoh",
      dataIndex: "notes",
      render: (v: string) => (
        <span className="text-gray-400 text-sm italic">{v || "—"}</span>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden h-full">
      <Tabs
        defaultActiveKey="credits"
        className="px-5"
        items={[
          {
            key: "credits",
            label: (
              <span className="font-semibold">
                Nasiyalar ({credits.length})
              </span>
            ),
            children: (
              <Table
                dataSource={credits}
                columns={creditColumns}
                rowKey="id"
                pagination={false}
                size="small"
                scroll={{ x: 700 }}
                expandable={{
                  expandedRowRender: (record: ICredit) => (
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                        To'lovlar tarixi
                      </p>
                      <CreditPayments creditId={record.id} />
                    </div>
                  ),
                  rowExpandable: () => true,
                }}
              />
            ),
          },
          {
            key: "payments",
            label: (
              <span className="font-semibold">
                Barcha to'lovlar ({allPayments.length})
              </span>
            ),
            children: (
              <Table
                dataSource={allPayments}
                columns={paymentColumns}
                rowKey="id"
                loading={isPaymentsLoading}
                size="small"
                scroll={{ x: 700 }}
                pagination={{
                  pageSize: 10,
                  showTotal: (t) => `Jami: ${t} ta to'lov`,
                }}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default CustomerDetailTabs;
