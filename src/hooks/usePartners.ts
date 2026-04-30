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
      queryClient.invalidateQueries({
        queryKey: ["partner", updatedPartner.id],
      });
    },
  });
};

export const useUpdatePartnerAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { username?: string; password?: string };
    }) => partnersService.updateAccount(id, data),

    onSuccess: (_, { id, data }) => {
      // Keshdagi ma'lumotlarni optimistik yangilash yoki invalidate qilish
      queryClient.setQueryData(["partners"], (oldData: IPartner[]) => {
        if (!oldData) return [];
        return oldData.map((p) => {
          if (p.id === id) {
            // Agar username o'zgargan bo'lsa, uni keshda ham yangilaymiz
            return {
              ...p,
              user: data.username
                ? { ...p.user, username: data.username }
                : p.user,
            };
          }
          return p;
        });
      });

      // Qo'shimcha xavfsizlik uchun:
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      queryClient.invalidateQueries({ queryKey: ["partner", id] });
    },
  });
};

// Sherikni o'chirish
export const useDeletePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => partnersService.remove(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["partners"] });
      queryClient.invalidateQueries({ queryKey: ["partner", id] });
    },
  });
};
