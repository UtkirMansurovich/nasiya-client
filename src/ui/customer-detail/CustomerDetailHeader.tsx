import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftOutlined,
  WalletOutlined,
  PlusOutlined,
} from "@ant-design/icons";

interface CustomerDetailHeaderProps {
  fullName: string;
  phone: string;
  onPayment: () => void;
  onCredit: () => void;
}

const CustomerDetailHeader: FC<CustomerDetailHeaderProps> = ({
  fullName,
  phone,
  onPayment,
  onCredit,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeftOutlined className="text-lg" />
        </button>
        <div>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            {fullName}
          </h1>
          <p className="text-gray-400 text-sm">{phone}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onPayment}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2.5 px-5 rounded-xl shadow-md shadow-emerald-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <WalletOutlined /> To'lov
        </button>
        <button
          onClick={onCredit}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-5 rounded-xl shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:-translate-y-0.5"
        >
          <PlusOutlined /> Nasiya
        </button>
      </div>
    </div>
  );
};

export default CustomerDetailHeader;
