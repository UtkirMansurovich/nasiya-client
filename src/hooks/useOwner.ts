import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ownerService } from "../services/owner.service";

// Owner balansini olish
export const useOwner = () => {
  return useQuery({
    queryKey: ["owner"],
    queryFn: ownerService.getBalance,
  });
};

// Mablag' qo'shish
export const useAddOwnerBalance = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { amount: number; notes?: string }) =>
      ownerService.addBalance(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["owner"] });
    },
  });
};
