import { api } from "./api";
import type { ICreateCredit } from "../interfaces";

export const creditsService = {
  getAll: () => api("/credits"),

  getOne: (id: number) => api(`/credits/${id}`),

  getByCustomer: (customerId: number) => api(`/credits/customer/${customerId}`),

  getByPartner: (partnerId: number) => api(`/credits/partner/${partnerId}`),

  create: (data: ICreateCredit) =>
    api("/credits", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<ICreateCredit>) =>
    api(`/credits/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  updateStatus: (id: number, status: "active" | "completed" | "defaulted") =>
    api(`/credits/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),

  remove: (id: number) =>
    api(`/credits/${id}`, {
      method: "DELETE",
    }),
};
