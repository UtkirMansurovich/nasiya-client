import type { FC, JSX } from "react";
import { PlusOutlined, InboxOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

interface Props {
  onAdd: () => void;
}

export const PartnersHeader: FC<Props> = ({ onAdd }): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
          Sheriklar
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Barcha sheriklar va ularning mablag'lari
        </p>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onAdd}
          className="bg-(--secondary) hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
        >
          <PlusOutlined /> Sherik qo'shish
        </button>
        <button
          onClick={() => navigate("/partners/archived")}
          className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-5 rounded-xl shadow-md shadow-amber-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2"
        >
          <InboxOutlined /> Arxivlangan sheriklar
        </button>
      </div>
    </div>
  );
};
