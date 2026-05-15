import { type FC, useState } from "react";
import { useParams } from "react-router-dom";
import { useCustomer } from "../hooks/useCustomers";
import { usePaymentsByCustomer } from "../hooks/usePayments";
import { AddCreditModal } from "../ui/AddCreditModal";
import { AddPaymentModal } from "../ui/AddPaymentModal";
import type { ICredit } from "../interfaces";
import CustomerDetailHeader from "../ui/customer-detail/CustomerDetailHeader";
import CustomerDetailSidebar from "../ui/customer-detail/CustomerDetailSidebar";
import CustomerDetailTabs from "../ui/customer-detail/CustomerDetailTabs";
import { Skeleton, Progress } from "antd";
import StatCard from "../components/StatCard";

export const CustomerDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const customerId = Number(id);

  const { data: customer, isLoading } = useCustomer(customerId);
  const { data: allPayments = [], isLoading: isPaymentsLoading } =
    usePaymentsByCustomer(customerId);

  const [isCreditModalOpen, setIsCreditModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const credits: ICredit[] = customer?.credits ?? [];
  const stats = customer?.stats; // ← avval shu

  const progressPercent = // ← keyin shu
    stats?.jami_qarz_va_foyda > 0
      ? Math.min(
          100,
          Math.round((stats.tolangan / stats.jami_qarz_va_foyda) * 100),
        )
      : 0;

  const fmt = (n: number) =>
    new Intl.NumberFormat("uz-UZ").format(Math.round(Number(n)));

  if (isLoading)
    return (
      <div className="p-6">
        <Skeleton active paragraph={{ rows: 6 }} />
      </div>
    );

  if (!customer)
    return <div className="p-6 text-center text-gray-400">Mijoz topilmadi</div>;

  return (
    <div className="w-full mx-auto animate-fade-in space-y-6 overflow-y-auto h-full">
      <CustomerDetailHeader
        fullName={customer.full_name}
        phone={customer.phone}
        onPayment={() => setIsPaymentModalOpen(true)}
        onCredit={() => setIsCreditModalOpen(true)}
      />

      <div className="grid grid-cols-1 lg:grid-cols-[.5fr_.5fr_1fr] gap-6">
        {/* Chap: Sidebar */}
        <CustomerDetailSidebar customer={customer} stats={stats} />

        {/* O'rta: StatCards + Progress */}
        <div className="flex flex-col gap-4">
          {/* Stat Cards */}
          <div className="grid grid-cols-2 gap-3">
            <StatCard
              label="Jami qarz"
              value={fmt(stats.jami_qarz_va_foyda)}
              sub="so'm"
              color="text-gray-800"
              bg="bg-gray-50"
            />
            <StatCard
              label="To'langan"
              value={fmt(stats.tolangan)}
              sub="so'm"
              color="text-blue-600"
              bg="bg-blue-50"
            />
            <StatCard
              label="Qolgan"
              value={fmt(stats.qolgan_qarz)}
              sub="so'm"
              color="text-rose-500"
              bg="bg-rose-50"
            />
            <StatCard
              label="Foyda"
              value={fmt(stats.foyda)}
              sub="so'm"
              color="text-emerald-600"
              bg="bg-emerald-50"
            />
          </div>

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
            <Progress
              percent={progressPercent}
              showInfo={false}
              strokeColor={{ "0%": "#3b82f6", "100%": "#10b981" }}
              trailColor="#f1f5f9"
              strokeWidth={10}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>To'langan: {fmt(stats.tolangan)} so'm</span>
              <span>Qolgan: {fmt(stats.qolgan_qarz)} so'm</span>
            </div>
          </div>
        </div>

        {/* O'ng: Tabs */}
        <CustomerDetailTabs
          credits={credits}
          allPayments={allPayments}
          isPaymentsLoading={isPaymentsLoading}
        />
      </div>

      <AddCreditModal
        isOpen={isCreditModalOpen}
        onClose={() => setIsCreditModalOpen(false)}
        defaultCustomerId={customerId}
      />
      <AddPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        defaultCustomerId={customerId}
      />
    </div>
  );
};
