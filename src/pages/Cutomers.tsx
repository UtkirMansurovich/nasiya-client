import { type FC, type JSX } from "react";
import { CustomersHeader } from "../ui/CustomersHeader";
import { CustomersMainCard } from "../ui/CustomersMainCard";
import { CustomersSearch } from "../ui/CustomersSearch";
import { CustomersTable } from "../ui/CustomersTable";

export const Customers: FC = (): JSX.Element => {
    return (
        <div className="p-4 sm:p-6 lg:p-8 w-full max-w-[1600px] mx-auto animate-fade-in">
            <CustomersHeader />

            <CustomersMainCard>
                <CustomersSearch />
                <CustomersTable />
            </CustomersMainCard>
        </div>
    )
}