import { type FC, type JSX, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spin } from "antd";
import {
  ArrowLeftOutlined,
  PlusOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { usePartner } from "../hooks/usePartners";
import { PartnerInfoCards } from "../ui/PartnerInfoCards";
import { InvestmentsHistory } from "../ui/InvestmentsHistory";
import { AddInvestmentModal } from "../ui/AddInvestmentModal";
import { ResetPasswordModal } from "../ui/ResetPasswordModal";

export const PartnerProfile: FC = (): JSX.Element => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isInvestmentOpen, setIsInvestmentOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  const { data: partner, isLoading } = usePartner(Number(id));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-gray-500 text-lg">Sherik topilmadi</p>
        <Button onClick={() => navigate("/partners")}>Orqaga</Button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-400 mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/partners")}
            className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ArrowLeftOutlined className="text-lg" />
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
              {partner.full_name}
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {partner.phone} • @{partner.user?.username}
            </p>
          </div>
        </div>

        {/* Tugmalar */}
        <div className="flex items-center gap-3">
          <Button
            size="large"
            icon={<LockOutlined />}
            onClick={() => setIsResetPasswordOpen(true)}
          >
            Login/Parol
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={() => setIsInvestmentOpen(true)}
          >
            Mablag' qo'shish
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <PartnerInfoCards partner={partner} />

      {/* Investitsiyalar tarixi */}
      <InvestmentsHistory partnerId={Number(id)} />

      {/* Modals */}
      <AddInvestmentModal
        isOpen={isInvestmentOpen}
        onClose={() => setIsInvestmentOpen(false)}
        partnerId={Number(id)}
      />

      <ResetPasswordModal
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
        partnerId={Number(id)}
        initialUsername={partner.user?.username}
      />
    </div>
  );
};
