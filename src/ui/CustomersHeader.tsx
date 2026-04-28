import { type FC, type JSX } from "react";
import { FileExcelOutlined, PlusOutlined } from "@ant-design/icons";

interface Props {
  onAdd: () => void;
  onImport: () => void;
}

export const CustomersHeader: FC<Props> = ({
  onAdd,
  onImport,
}): JSX.Element => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
    <div>
      <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
        Mijozlar
      </h2>
      <p className="text-gray-500 text-sm mt-1">
        Barcha mijozlar va ularning qarz ma'lumotlari
      </p>
    </div>
    <div className="flex items-center gap-3">
      <button
        onClick={onImport}
        className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-5 rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
      >
        <FileExcelOutlined /> Excel import
      </button>
      <button
        onClick={onAdd}
        className="bg-(--secondary) hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
      >
        <PlusOutlined /> Mijoz qo'shish
      </button>
    </div>
  </div>
);
