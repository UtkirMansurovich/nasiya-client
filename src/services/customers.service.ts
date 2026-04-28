import type { ICreateCustomer, IUpdateCustomer } from "../interfaces";
import { api } from "./api";

export const customersService = {
  // Barcha mijozlar
  getAll: (page: number = 1, limit: number = 10) =>
    api(`/customers?page=${page}&limit=${limit}`),

  // Bitta mijoz
  getOne: (id: number) => api(`/customers/${id}`),

  // Yangi mijoz qo'shish
  create: (data: ICreateCustomer) =>
    api("/customers", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  // Mijozni tahrirlash
  update: (id: number, data: IUpdateCustomer) =>
    api(`/customers/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  // Mijozni o'chirish
  remove: (id: number) =>
    api(`/customers/${id}`, {
      method: "DELETE",
    }),

  upsert: (data: ICreateCustomer) =>
    api("/customers/upsert", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
