import { api } from "./api";

export const reportsService = {
  getSummary: () => api("/reports/summary"),

  getTodayPayments: () => api("/reports/today-payments"),

  getDefaulted: () => api("/reports/defaulted"),

  getMonthlyStats: () => api("/reports/monthly-stats"),

  getTopDebtors: () => api("/reports/top-debtors"),

  getPartnerReport: (partnerId: number) =>
    api(`/reports/partner/${partnerId}`),
};
