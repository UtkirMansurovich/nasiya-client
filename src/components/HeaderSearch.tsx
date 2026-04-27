import { type FC, type JSX } from "react";
import { SearchOutlined } from "@ant-design/icons";

export const HeaderSearch: FC = (): JSX.Element => {
  return (
    <div className="hidden md:flex items-center bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 focus-within:bg-white focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-100/50 transition-all w-[320px]">
      <SearchOutlined className="text-gray-400 text-lg" />
      <input
        type="text"
        placeholder="Mijozlar, mahsulotlar qidiruvi..."
        className="bg-transparent border-none outline-none ml-3 w-full text-sm text-gray-700 placeholder-gray-400 font-medium"
      />
    </div>
  );
};
