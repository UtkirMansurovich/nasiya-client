import { useState, type FC, type JSX } from "react";
import { PlusOutlined, FileExcelOutlined } from "@ant-design/icons";
import { AddPaymentModal } from "./AddPaymentModal";
import { PaymentExcelImportModal } from "./PaymentExcelImportModal";

export const PaymentsHeader: FC = (): JSX.Element => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isExcelModalOpen, setIsExcelModalOpen] = useState(false);

  return (
    <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">To'lovlar</h2>
        <p className="text-gray-500 text-sm mt-1">Mijozlardan to'lov qabul qilish va tarixni ko'rish</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => setIsExcelModalOpen(true)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-5 rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <FileExcelOutlined /> Excel import
        </button>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-(--secondary) hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center justify-center gap-2"
        >
          <PlusOutlined /> To'lov qo'shish
        </button>
      </div>

      <AddPaymentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <PaymentExcelImportModal
        isOpen={isExcelModalOpen}
        onClose={() => setIsExcelModalOpen(false)}
      />
    </div>
  );
};
