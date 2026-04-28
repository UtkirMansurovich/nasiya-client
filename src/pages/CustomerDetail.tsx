import { type FC } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tag, Table, Progress, Skeleton, Button } from "antd";
import {
  ArrowLeftOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  UserOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { useCustomer } from "../hooks/useCustomers";
import type { ICredit } from "../interfaces";

const fmt = (n: number) =>
  new Intl.NumberFormat("uz-UZ").format(Math.round(Number(n)));

const statusMap: Record<string, { color: string; text: string }> = {
  active: { color: "blue", text: "Aktiv" },
  completed: { color: "green", text: "Tugagan" },
  defaulted: { color: "red", text: "Muddati o'tgan" },
  none: { color: "default", text: "Nasiya yo'q" },
};

export const CustomerDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: customer, isLoading } = useCustomer(Number(id));

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="p-6 text-center text-gray-400">Mijoz topilmadi</div>
    );
  }

  const credits: ICredit[] = customer.credits ?? [];
  const stats = customer.stats || {
    jami_qarz: 0,
    ustama_foiz: 0,
    jami_qarz_va_foyda: 0,
    foyda: 0,
    tolangan: 0,
    qolgan_qarz: 0,
    oxirgi_sana: null,
    status: "none"
  };

  const progressPercent = stats.jami_qarz > 0 ? Math.round((stats.tolangan / stats.jami_qarz) * 100) : 0;

  // Credits table columns
  const creditColumns = [
    {
      title: "Mahsulot",
      dataIndex: "product_name",
      render: (v: string) => <span className="font-medium text-gray-800">{v}</span>,
    },
    {
      title: "Narxi",
      dataIndex: "cost_price",
      render: (v: number) => `${fmt(v)} so'm`,
    },
    {
      title: "Ustama %",
      dataIndex: "markup_percent",
      render: (v: number) => <Tag color="orange">{v}%</Tag>,
    },
    {
      title: "Jami qarz",
      dataIndex: "total_debt",
      render: (v: number) => (
        <span className="font-semibold text-gray-800">{fmt(v)} so'm</span>
      ),
    },
    {
      title: "To'langan",
      dataIndex: "paid_amount",
      render: (v: number) => (
        <span className="text-blue-600">{fmt(v)} so'm</span>
      ),
    },
    {
      title: "Qolgan",
      dataIndex: "remaining_debt",
      render: (v: number) => (
        <span className={`font-semibold ${Number(v) > 0 ? "text-rose-500" : "text-emerald-500"}`}>
          {fmt(v)} so'm
        </span>
      ),
    },
    {
      title: "Kunlik to'lov",
      dataIndex: "daily_payment",
      render: (v: number) => `${fmt(v)} so'm`,
    },
    {
      title: "Sana",
      dataIndex: "start_date",
      render: (v: string) => new Date(v).toLocaleDateString("uz-UZ"),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (v: string) => {
        const s = statusMap[v] ?? { color: "default", text: v };
        return <Tag color={s.color}>{s.text}</Tag>;
      },
    },
  ];

  return (
    <div className="h-full overflow-auto p-4 md:p-6 space-y-6 animate-fade-in">
      {/* Back button */}
      <div className="flex items-center gap-3">
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
          className="flex items-center gap-1"
        >
          Orqaga
        </Button>
        <h1 className="text-xl font-bold text-gray-800">{customer.full_name}</h1>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Personal info card */}
        <div className="xl:col-span-1 bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-5">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl font-bold shrink-0">
              {customer.full_name
                .split(" ")
                .slice(0, 2)
                .map((n: string) => n[0])
                .join("")}
            </div>
            <div>
              <p className="font-bold text-gray-800 text-base">{customer.full_name}</p>
              <p className="text-sm text-gray-400">
                Qo'shilgan:{" "}
                {new Date(customer.created_at).toLocaleDateString("uz-UZ")}
              </p>
            </div>
          </div>

          {/* Info list */}
          <div className="space-y-3">
            <InfoRow icon={<PhoneOutlined />} label="Telefon" value={customer.phone} />
            {customer.phone2 && (
              <InfoRow icon={<PhoneOutlined />} label="Qo'shimcha tel" value={customer.phone2} />
            )}
            {customer.address && (
              <InfoRow icon={<EnvironmentOutlined />} label="Manzil" value={customer.address} />
            )}
            {customer.workplace && (
              <InfoRow icon={<BankOutlined />} label="Ish joyi" value={customer.workplace} />
            )}
            {customer.referred_by && (
              <InfoRow icon={<UserOutlined />} label="Kim orqali" value={customer.referred_by} />
            )}
          </div>

          {/* Passport */}
          {(customer.passport_series || customer.passport_number) && (
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Pasport</p>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-400 text-xs">Seriya</p>
                  <p className="text-gray-700 font-medium">{customer.passport_series ?? "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Raqam</p>
                  <p className="text-gray-700 font-medium">{customer.passport_number ?? "—"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-400 text-xs">Kim bergan</p>
                  <p className="text-gray-700 font-medium">{customer.passport_issued_by ?? "—"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Sana</p>
                  <p className="text-gray-700 font-medium">{customer.passport_issued_date ?? "—"}</p>
                </div>
              </div>
            </div>
          )}

          {/* Guarantor */}
          {(customer.guarantor_name || customer.guarantor_phone) && (
            <div className="border-t border-gray-100 pt-4 space-y-2">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Kafil</p>
              <InfoRow icon={<UserOutlined />} label="Ismi" value={customer.guarantor_name} />
              <InfoRow icon={<PhoneOutlined />} label="Telefon" value={customer.guarantor_phone} />
            </div>
          )}
        </div>

        {/* Stats + Credits */}
        <div className="xl:col-span-2 space-y-4">
          {/* Summary stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="Jami qarz" value={`${fmt(stats.jami_qarz)} so'm`} color="text-gray-800" bg="bg-white" />
            <StatCard label="To'langan" value={`${fmt(stats.tolangan)} so'm`} color="text-blue-600" bg="bg-blue-50" />
            <StatCard label="Qolgan" value={`${fmt(stats.qolgan_qarz)} so'm`} color="text-rose-500" bg="bg-rose-50" />
            <StatCard label="Foyda" value={`${fmt(stats.foyda)} so'm`} color="text-emerald-600" bg="bg-emerald-50" />
          </div>

          {/* Progress bar */}
          {stats.jami_qarz > 0 && (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex justify-between items-center mb-3">
                <p className="text-sm font-semibold text-gray-600">To'lov jarayoni</p>
                <p className="text-sm font-bold text-blue-600">{progressPercent}%</p>
              </div>
              <Progress
                percent={progressPercent}
                strokeColor={{
                  "0%": "#3b82f6",
                  "100%": "#10b981",
                }}
                trailColor="#f1f5f9"
                strokeWidth={10}
                showInfo={false}
              />
              <div className="flex justify-between mt-2 text-xs text-gray-400">
                <span>To'langan: {fmt(stats.tolangan)} so'm</span>
                <span>Qolgan: {fmt(stats.qolgan_qarz)} so'm</span>
              </div>
            </div>
          )}

          {/* Credits table */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <p className="font-semibold text-gray-700">
                Nasiyalar tarixi{" "}
                <span className="ml-1 text-xs font-normal text-gray-400">
                  ({credits.length} ta)
                </span>
              </p>
            </div>
            <Table
              dataSource={credits}
              columns={creditColumns}
              rowKey="id"
              pagination={false}
              size="small"
              scroll={{ x: 900 }}
              locale={{ emptyText: "Nasiyalar mavjud emas" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper components ---
const InfoRow: FC<{ icon: React.ReactNode; label: string; value?: string }> = ({
  icon,
  label,
  value,
}) => (
  <div className="flex items-start gap-2 text-sm">
    <span className="text-gray-400 mt-0.5 shrink-0">{icon}</span>
    <div>
      <span className="text-gray-400 text-xs">{label}: </span>
      <span className="text-gray-700 font-medium">{value ?? "—"}</span>
    </div>
  </div>
);

const StatCard: FC<{
  label: string;
  value: string;
  color: string;
  bg: string;
}> = ({ label, value, color, bg }) => (
  <div className={`${bg} rounded-xl p-4 border border-gray-100 shadow-sm`}>
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <p className={`text-sm font-bold ${color} leading-tight`}>{value}</p>
  </div>
);
