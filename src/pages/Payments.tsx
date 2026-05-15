import { useState, type FC, type JSX } from "react";
import { PaymentsTable } from "../ui/PaymentsTable";
import { AddPaymentModal } from "../ui/AddPaymentModal";
import { PaymentExcelImportModal } from "../ui/PaymentExcelImportModal";
import type { ICredit } from "../interfaces";

export const Payments: FC = (): JSX.Element => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [editCredit, setEditCredit] = useState<ICredit | null>(null);

  return (
    <div className="w-full h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            To'lovlar
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Barcha nasiyalar va to'lov holatlari
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsImportOpen(true)}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-5 rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
          >
            Excel import
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-(--secondary) hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
          >
            + To'lov qo'shish
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1 min-h-0">
        <div className="overflow-auto flex-1 min-h-0">
          <PaymentsTable
            onEdit={(credit) => {
              setEditCredit(credit);
              setIsAddOpen(true);
            }}
          />
        </div>
      </div>

      {/* Modals */}
      <AddPaymentModal
        isOpen={isAddOpen}
        onClose={() => {
          setIsAddOpen(false);
          setEditCredit(null);
        }}
        defaultCreditId={editCredit?.id}
      />

      <PaymentExcelImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
      />
    </div>
  );
};
