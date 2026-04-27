import { type FC, type JSX } from "react";
import { HeaderBrand } from "../components/HeaderBrand";
import { HeaderSearch } from "../components/HeaderSearch";
import { HeaderActions } from "../components/HeaderActions";

export const Header: FC = (): JSX.Element => {
  return (
    <header className="row-start-1 row-end-2 col-start-1 col-end-3 h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0 shadow-sm z-20 transition-all">
      {/* Left side: Logo/Title & Search */}
      <div className="flex items-center gap-10">
        <HeaderBrand />
        <HeaderSearch />
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-6">
        <HeaderActions />
      </div>
    </header>
  );
};
