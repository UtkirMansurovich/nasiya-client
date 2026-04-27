import { api } from "./api";

export const customersService = {
  // Barcha mijozlar
  getAll: () => api("/customers"),

  // Bitta mijoz
  getOne: (id: number) => api(`/customers/${id}`),

  // Yangi mijoz qo'shish
  create: (data: any) =>
    api("/customers", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Mijozni tahrirlash
  update: (id: number, data: any) =>
    api(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Mijozni o'chirish
  remove: (id: number) =>
    api(`/customers/${id}`, {
      method: "DELETE",
    }),
};
