import { type FC, type JSX } from "react";
import { EyeOutlined, LoadingOutlined } from "@ant-design/icons";
import { useCustomers } from "../hooks/useCustomers";
import type { ICustomer } from "../interfaces";

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-emerald-100 text-emerald-600",
    "bg-blue-100 text-blue-600",
    "bg-rose-100 text-rose-600",
    "bg-purple-100 text-purple-600",
  ];
  return colors[name.charCodeAt(0) % colors.length];
};

const getStatusColor = (credits: string[]) => {
  if (!credits || credits.length === 0)
    return {
      badge: "bg-gray-100 text-gray-600 border-gray-200",
      label: "Yangi",
    };
  const hasActive = credits.some((c: any) => c.status === "active");
  const hasDefaulted = credits.some((c: any) => c.status === "defaulted");
  if (hasDefaulted)
    return {
      badge: "bg-rose-50 text-rose-700 border-rose-200",
      label: "O'tgan",
    };
  if (hasActive)
    return {
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      label: "Faol",
    };
  return { badge: "bg-gray-100 text-gray-600 border-gray-200", label: "Yopiq" };
};

export const CustomersTable: FC = (): JSX.Element => {
  const { data: customers, isLoading, isError } = useCustomers();

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-20 text-blue-500">
        <LoadingOutlined className="text-3xl" />
      </div>
    );

  if (isError)
    return (
      <div className="flex items-center justify-center py-20 text-rose-500 font-semibold">
        Mijozlarni yuklashda xatolik!
      </div>
    );

  if (!customers?.length)
    return (
      <div className="flex items-center justify-center py-20 text-gray-400 font-semibold">
        Hali mijozlar yo'q
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="bg-gray-50/80 border-b border-gray-100">
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Ism
            </th>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Telefon
            </th>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider">
              Manzil
            </th>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
              Status
            </th>
            <th className="py-4 px-6 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">
              Harakat
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {customers.map((customer: ICustomer) => {
            const status = getStatusColor(customer.credits);
            const avatarColor = getAvatarColor(customer.full_name);
            const initials = customer.full_name
              ?.split(" ")
              .slice(0, 2)
              .map((n: string) => n[0])
              .join("");

            return (
              <tr
                key={customer.id}
                className="hover:bg-blue-50/50 transition-colors group"
              >
                <td className="py-4 px-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${avatarColor} group-hover:scale-105 transition-transform shadow-sm`}
                    >
                      {initials}
                    </div>
                    <span className="font-bold text-gray-800 text-[15px]">
                      {customer.full_name}
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-gray-500 font-medium text-[14px]">
                  {customer.phone}
                </td>
                <td className="py-4 px-6 text-gray-500 font-medium text-[14px]">
                  {customer.address || "—"}
                </td>
                <td className="py-4 px-6 text-center">
                  <span
                    className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-xs font-bold border ${status.badge}`}
                  >
                    {status.label}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <button className="text-gray-400 hover:text-(--secondary) transition-colors p-2 rounded-lg hover:bg-white border border-transparent hover:border-blue-100 hover:shadow-sm">
                    <EyeOutlined className="text-lg" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
