import { type FC, type JSX } from "react";
import { ReportsHeader } from "../ui/ReportsHeader";
import { ReportsKpiGrid } from "../ui/ReportsKpiGrid";
import { ReportsChartArea } from "../ui/ReportsChartArea";
import { ReportsTopDebtors } from "../ui/ReportsTopDebtors";

export const Reports: FC = (): JSX.Element => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 w-full max-w-400 mx-auto animate-fade-in">
      <ReportsHeader />
      <ReportsKpiGrid />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Chart Area */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ReportsChartArea />
        </div>

        {/* Right: Top Debtors */}
        <div className="flex flex-col gap-6">
          <ReportsTopDebtors />
        </div>
      </div>
    </div>
  );
};
