import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customersService } from "../services/customers.service";

// Barcha mijozlar
export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: customersService.getAll,
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
export const useUpdateCustomer = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      customersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

// Mijozni o'chirish
export const useDeleteCustomer = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: customersService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};
