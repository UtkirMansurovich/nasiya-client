import { type FC } from "react";
import {
  PhoneOutlined,
  HomeOutlined,
  BankOutlined,
  IdcardOutlined,
  SafetyOutlined,
} from "@ant-design/icons";
import StatusTag from "../../components/StatusTag";

const fmt = (n: number) =>
  new Intl.NumberFormat("uz-UZ").format(Math.round(Number(n)));

interface Customer {
  full_name: string;
  phone: string;
  phone2?: string;
  address?: string;
  workplace?: string;
  passport_series?: string;
  passport_number?: string;
  passport_issued_by?: string;
  passport_issued_date?: string;
  guarantor_name?: string;
  guarantor_phone?: string;
}

interface Stats {
  jami_qarz: number;
  jami_qarz_va_foyda: number;
  tolangan: number;
  qolgan_qarz: number;
  foyda: number;
  status: string;
}

interface CustomerDetailSidebarProps {
  customer: Customer;
  stats: Stats;
}

const CustomerDetailSidebar: FC<CustomerDetailSidebarProps> = ({
  customer,
  stats,
}) => {
  const progressPercent =
    stats.jami_qarz_va_foyda > 0
      ? Math.min(
          100,
          Math.round((stats.tolangan / stats.jami_qarz_va_foyda) * 100),
        )
      : 0;

  const avatarColors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-purple-500",
    "bg-rose-500",
  ];
  const avatarColor =
    avatarColors[customer.full_name.charCodeAt(0) % avatarColors.length];
  const initials = customer.full_name
    .split(" ")
    .slice(0, 2)
    .map((n: string) => n[0])
    .join("");

  return (
    <div className="flex flex-col gap-4">
      {/* Avatar + Info */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center gap-4 mb-5">
          <div
            className={`w-14 h-14 rounded-2xl ${avatarColor} text-white flex items-center justify-center font-black text-xl shadow-md`}
          >
            {initials}
          </div>
          <div>
            <p className="font-bold text-gray-800 text-lg leading-tight">
              {customer.full_name}
            </p>
            <StatusTag status={stats.status} />
          </div>
        </div>

        <div className="flex flex-col gap-3 text-sm">
          {customer.phone && (
            <div className="flex items-center gap-2 text-gray-600">
              <PhoneOutlined className="text-gray-400" />
              <span>{customer.phone}</span>
            </div>
          )}
          {customer.phone2 && (
            <div className="flex items-center gap-2 text-gray-600">
              <PhoneOutlined className="text-gray-400" />
              <span>{customer.phone2}</span>
            </div>
          )}
          {customer.address && (
            <div className="flex items-center gap-2 text-gray-600">
              <HomeOutlined className="text-gray-400" />
              <span>{customer.address}</span>
            </div>
          )}
          {customer.workplace && (
            <div className="flex items-center gap-2 text-gray-600">
              <BankOutlined className="text-gray-400" />
              <span>{customer.workplace}</span>
            </div>
          )}
        </div>
      </div>

      {/* Pasport */}
      {(customer.passport_series || customer.passport_number) && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <IdcardOutlined /> Pasport
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Seriya/Raqam:</span>
              <span className="font-semibold">
                {customer.passport_series} {customer.passport_number}
              </span>
            </div>
            {customer.passport_issued_by && (
              <div className="flex justify-between">
                <span className="text-gray-400">Kim bergan:</span>
                <span className="font-semibold">
                  {customer.passport_issued_by}
                </span>
              </div>
            )}
            {customer.passport_issued_date && (
              <div className="flex justify-between">
                <span className="text-gray-400">Sana:</span>
                <span className="font-semibold">
                  {customer.passport_issued_date}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Kafil */}
      {customer.guarantor_name && (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <SafetyOutlined /> Kafil
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Ismi:</span>
              <span className="font-semibold">{customer.guarantor_name}</span>
            </div>
            {customer.guarantor_phone && (
              <div className="flex justify-between">
                <span className="text-gray-400">Telefon:</span>
                <span className="font-semibold">
                  {customer.guarantor_phone}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
        <div className="flex justify-between items-center mb-3">
          <span className="font-bold text-gray-700 text-sm">
            To'lov jarayoni
          </span>
          <span className="text-sm font-black text-blue-600">
            {progressPercent}%
          </span>
        </div>

        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>To'langan: {fmt(stats.tolangan)} so'm</span>
          <span>Qolgan: {fmt(stats.qolgan_qarz)} so'm</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailSidebar;
