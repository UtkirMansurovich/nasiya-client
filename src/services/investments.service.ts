import { api } from "./api";

export const investmentsService = {
  getByPartner: (partnerId: number) => api(`/investments/partner/${partnerId}`),

  create: (data: { partnerId: number; amount: number; notes?: string }) =>
    api("/investments", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    api(`/investments/@{id}`, {
      method: "DELETE",
    }),
};
