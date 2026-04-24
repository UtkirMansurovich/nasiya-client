import { type FC, type JSX } from "react";
import { LoansHeader } from "../ui/LoansHeader";
import { LoansCustomerInfo } from "../ui/LoansCustomerInfo";
import { LoansProductInfo } from "../ui/LoansProductInfo";
import { LoansSummary } from "../ui/LoansSummary";

export const Loans: FC = (): JSX.Element => {
    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1200px] mx-auto animate-fade-in">
            <LoansHeader />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form Fields */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <LoansCustomerInfo />
                    <LoansProductInfo />
                </div>

                {/* Right Column: Summary & Submit */}
                <LoansSummary />
            </div>
        </div>
    )
}