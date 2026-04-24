import { type FC, type JSX } from "react";

export const PaymentsHeader: FC = (): JSX.Element => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">To'lovlar</h2>
        <p className="text-gray-500 text-sm mt-1">Mijozlardan to'lov qabul qilish va tarixni ko'rish</p>
    </div>
);
