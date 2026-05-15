import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentsService } from "../services/payments.service";
import type { ICreatePayment } from "../interfaces";

// Barcha to'lovlar
export const usePayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: paymentsService.getAll,
  });
};

// Nasiya bo'yicha to'lovlar
export const usePaymentsByCredit = (creditId: number) => {
  return useQuery({
    queryKey: ["payments", "credit", creditId],
    queryFn: () => paymentsService.getByCredit(creditId),
    enabled: !!creditId,
  });
};

// Mijoz bo'yicha hamma to'lovlar
export const usePaymentsByCustomer = (customerId: number) => {
  return useQuery({
    queryKey: ["payments", "customer", customerId],
    queryFn: () => paymentsService.getByCustomer(customerId),
    enabled: !!customerId,
  });
};

// Yangi to'lov qo'shish
export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreatePayment) => paymentsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["credits"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["customers"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["reports"],
        refetchType: "all",
      });
    },
  });
};

export const useImportBulkPayments = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { payments: unknown[]; dates: string[] }) =>
      paymentsService.importBulk(data), // ← payments o'rniga data
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["credits"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["customers"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["reports"],
        refetchType: "all",
      });
    },
  });
};

// To'lovni o'chirish
export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => paymentsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["payments"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["credits"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["customers"],
        refetchType: "all",
      });
      queryClient.invalidateQueries({
        queryKey: ["reports"],
        refetchType: "all",
      });
    },
  });
};
