import { type FC, type JSX, useState } from "react";
import { usePartners } from "../hooks/usePartners";
import { PartnersHeader } from "../ui/PartnersHeader";
import { PartnersKpiCards } from "../ui/PartnersKpiCards";
import { PartnersTable } from "../ui/PartnersTable";
import { AddPartnerModal } from "../ui/AddPartnerModal";

export const Partners: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: partners = [] } = usePartners();

  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-400 mx-auto animate-fade-in">
      <PartnersHeader onAdd={() => setIsModalOpen(true)} />

      <PartnersKpiCards partners={partners} />

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <PartnersTable />
      </div>

      <AddPartnerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
