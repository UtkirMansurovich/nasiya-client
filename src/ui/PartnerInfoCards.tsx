import { type FC } from "react";
import {
  WalletOutlined,
  RiseOutlined,
  FallOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import type { IPartner } from "../interfaces";

interface Props {
  partner: IPartner;
}

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("uz-UZ").format(amount) + " UZS";

export const PartnerInfoCards: FC<Props> = ({ partner }) => {
  const cards = [
    {
      title: "Jami kiritilgan mablag'",
      value: formatMoney(partner.total_invested),
      icon: <WalletOutlined />,
      color: "bg-purple-50 text-purple-500",
      shadow: "shadow-purple-100",
    },
    {
      title: "Joriy balans",
      value: formatMoney(partner.balance),
      icon: <DollarOutlined />,
      color: "bg-blue-50 text-blue-500",
      shadow: "shadow-blue-100",
    },
    {
      title: "Jami foyda",
      value: formatMoney(partner.total_profit),
      icon: <RiseOutlined />,
      color: "bg-emerald-50 text-emerald-500",
      shadow: "shadow-emerald-100",
    },
    {
      title: "Jami zarar",
      value: formatMoney(partner.total_loss),
      icon: <FallOutlined />,
      color: "bg-rose-50 text-rose-500",
      shadow: "shadow-rose-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`bg-white rounded-xl p-5 shadow-sm ${card.shadow} border border-gray-100`}
        >
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-gray-500">{card.title}</p>
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${card.color}`}
            >
              {card.icon}
            </div>
          </div>
          <p className="text-xl font-bold text-gray-800">{card.value}</p>
        </div>
      ))}
    </div>
  );
};
