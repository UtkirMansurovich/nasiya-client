import { type FC, type JSX } from "react";

export const HeaderBrand: FC = (): JSX.Element => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-(--secondary) text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20">
        N
      </div>
      <span className="text-gray-800 text-[20px] font-bold tracking-tight hidden sm:block">
        Nasiya Savdo
      </span>
    </div>
  );
};
