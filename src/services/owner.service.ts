import { api } from "./api";

export const ownerService = {
  getBalance: () => api("/owner/balance"),

  addBalance: (data: { amount: number; notes?: string }) =>
    api("/owner/add-balance", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
