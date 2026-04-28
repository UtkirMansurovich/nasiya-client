import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customersService } from "../services/customers.service";
import type { IUpdateCustomer } from "../interfaces";

// Barcha mijozlar
export const useCustomers = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: ["customers", page, limit],
    queryFn: () => customersService.getAll(page, limit),
  });
};

// Bitta mijoz
export const useCustomer = (id: number) => {
  return useQuery({
    queryKey: ["customer", id],
    queryFn: () => customersService.getOne(id),
  });
};

// Yangi mijoz qo'shish
export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: customersService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

// Mijozni tahrirlash
export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: IUpdateCustomer }) =>
      customersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

// Mijozni o'chirish
export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customersService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useUpsertCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: customersService.upsert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};
