import { useQuery } from "@tanstack/react-query";
import { reportsService } from "../services/reports.service";

// Umumiy hisobot (KPI kartalar uchun)
export const useReportsSummary = () => {
  return useQuery({
    queryKey: ["reports", "summary"],
    queryFn: reportsService.getSummary,
  });
};

// Bugungi to'lovlar
export const useTodayPayments = () => {
  return useQuery({
    queryKey: ["reports", "today-payments"],
    queryFn: reportsService.getTodayPayments,
  });
};

// Muddati o'tgan nasiyalar
export const useDefaultedCredits = () => {
  return useQuery({
    queryKey: ["reports", "defaulted"],
    queryFn: reportsService.getDefaulted,
  });
};

// Oylik to'lov statistikasi
export const useMonthlyStats = () => {
  return useQuery({
    queryKey: ["reports", "monthly-stats"],
    queryFn: reportsService.getMonthlyStats,
  });
};

// Eng ko'p qarzdorlar
export const useTopDebtors = () => {
  return useQuery({
    queryKey: ["reports", "top-debtors"],
    queryFn: reportsService.getTopDebtors,
  });
};
