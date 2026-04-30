import { api } from "./api";
import type { ICreatePartner } from "../interfaces";

export const partnersService = {
  getAll: () => api("/partners"),

  getOne: (id: number) => api(`/partners/${id}`),

  create: (data: ICreatePartner) =>
    api("/partners", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<ICreatePartner>) =>
    api(`/partners/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Yangi metod: Login va parolni yangilash uchun
  updateAccount: (id: number, data: { username?: string; password?: string }) =>
    api(`/partners/${id}/account`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    api(`/partners/${id}`, {
      method: "DELETE",
    }),
};
