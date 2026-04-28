import type { FC, JSX } from "react";

export const CustomersMainCard: FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col flex-1 min-h-0">
        {children}
    </div>
);