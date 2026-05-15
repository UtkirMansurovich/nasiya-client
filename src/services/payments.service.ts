import { api } from "./api";
import type { ICreatePayment } from "../interfaces";

export const paymentsService = {
  getAll: () => api("/payments"),

  getOne: (id: number) => api(`/payments/${id}`),

  getByCredit: (creditId: number) => api(`/payments/credit/${creditId}`),

  getByCustomer: (customerId: number) =>
    api(`/payments/customer/${customerId}`),

  create: (data: ICreatePayment) =>
    api("/payments", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  importBulk: (data: { payments: unknown[]; dates: string[] }) =>
    api("/payments/import-bulk", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    api(`/payments/${id}`, {
      method: "DELETE",
    }),
};
