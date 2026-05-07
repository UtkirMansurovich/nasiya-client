import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { creditsService } from "../services/credits.service";
import type { ICreateCredit, ICredit } from "../interfaces";

// Barcha nasiyalar
export const useCredits = () => {
  return useQuery({
    queryKey: ["credits"],
    queryFn: creditsService.getAll,
  });
};

// Bitta nasiya
export const useCredit = (id: number) => {
  return useQuery({
    queryKey: ["credit", id],
    queryFn: () => creditsService.getOne(id),
    enabled: !!id,
  });
};

// Mijoz bo'yicha nasiyalar
export const useCreditsByCustomer = (customerId: number) => {
  return useQuery({
    queryKey: ["credits", "customer", customerId],
    queryFn: () => creditsService.getByCustomer(customerId),
    enabled: !!customerId,
  });
};

// Sherik bo'yicha nasiyalar
export const useCreditsByPartner = (partnerId: number) => {
  return useQuery({
    queryKey: ["credits", "partner", partnerId],
    queryFn: () => creditsService.getByPartner(partnerId),
    enabled: !!partnerId,
  });
};

// Yangi nasiya qo'shish
export const useCreateCredit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreateCredit) => creditsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credits"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
};

// Nasiya statusini yangilash
export const useUpdateCreditStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: number;
      status: "active" | "completed" | "defaulted";
    }) => creditsService.updateStatus(id, status),
    onSuccess: (updatedCredit) => {
      queryClient.setQueryData(["credits"], (oldData: ICredit[]) =>
        oldData?.map((c) => (c.id === updatedCredit.id ? updatedCredit : c)),
      );
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
};

// Nasiyani o'chirish
export const useDeleteCredit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => creditsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credits"] });
    },
  });
};
