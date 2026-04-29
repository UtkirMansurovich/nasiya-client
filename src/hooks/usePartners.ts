import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { partnersService } from "../services/partners.service";
import type { ICreatePartner, IPartner } from "../interfaces";

// Barcha sheriklar
export const usePartners = () => {
  return useQuery({
    queryKey: ["partners"],
    queryFn: partnersService.getAll,
  });
};

// Bitta sherik
export const usePartner = (id: number) => {
  return useQuery({
    queryKey: ["partner", id],
    queryFn: () => partnersService.getOne(id),
  });
};

// Yangi sherik qo'shish
export const useCreatePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ICreatePartner) => partnersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
};

// Sherikni tahrirlash
export const useUpdatePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<ICreatePartner> }) =>
      partnersService.update(id, data),
    onSuccess: (updatedPartner) => {
      queryClient.setQueryData(["partners"], (oldData: IPartner[]) =>
        oldData?.map((p) =>
          p?.id === updatedPartner?.id ? updatedPartner : p,
        ),
      );
    },
  });
};

// Sherikni o'chirish
export const useDeletePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => partnersService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
  });
};
