import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { investmentsService } from "../services/investments.service";

// Sherik bo'yicha investitsiyalar
export const useInvestments = (partnerId: number) => {
  return useQuery({
    queryKey: ["investments", partnerId],
    queryFn: () => investmentsService.getByPartner(partnerId),
    enabled: !!partnerId,
  });
};

// Yangi investitsiya qo'shish
export const useCreateInvestment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: investmentsService.create,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["investments", variables.partnerId],
      });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
};

// Investitsiyani o'chirish
export const useDeleteInvestment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["investments"] });
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
};
