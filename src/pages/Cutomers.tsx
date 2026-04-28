import { useState, type FC, type JSX } from "react";
import { CustomersHeader } from "../ui/CustomersHeader";
import { CustomersMainCard } from "../ui/CustomersMainCard";
// import { CustomersSearch } from "../ui/CustomersSearch";
import { CustomersTable } from "../ui/CustomersTable";
import { AddCustomerModal } from "../ui/AddCustomer";
import { ExcelImportModal } from "../ui/ExcelImportModal";

export const Customers: FC = (): JSX.Element => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  return (
    <div className="w-full h-full flex flex-col animate-fade-in">
      <CustomersHeader
        onAdd={() => setIsModalOpen(true)}
        onImport={() => setIsImportOpen(true)}
      />

      <CustomersMainCard>
        {/* <CustomersSearch /> */}
        <div className="overflow-auto flex-1 min-h-0">
          <CustomersTable />
        </div>
      </CustomersMainCard>

      <AddCustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <ExcelImportModal
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
      />
    </div>
  );
};
