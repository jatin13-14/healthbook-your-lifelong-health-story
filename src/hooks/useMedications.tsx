import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiMedicationsList,
  apiMedicationCreate,
  apiMedicationUpdate,
  apiMedicationDelete,
} from "@/lib/api";
import { useAuth } from "./useAuth";

export interface Medication {
  id: string;
  user_id: string;
  name: string;
  prescriber: string | null;
  frequency: string | null;
  purpose: string | null;
  start_date: string | null;
  end_date: string | null;
  status: string;
  refills_left: number | null;
  created_at: string;
}

export function useMedications() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["medications", user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      const data = await apiMedicationsList(user.id);
      return data.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      ) as Medication[];
    },
    enabled: !!user,
  });

  const addMedication = useMutation({
    mutationFn: async (med: Omit<Medication, "id" | "user_id" | "created_at">) => {
      if (!user?.id) throw new Error("Not authenticated");
      return apiMedicationCreate(user.id, med);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["medications"] }),
  });

  const updateMedication = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Medication> & { id: string }) => {
      if (!user?.id) throw new Error("Not authenticated");
      await apiMedicationUpdate(user.id, id, updates);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["medications"] }),
  });

  const deleteMedication = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error("Not authenticated");
      await apiMedicationDelete(user.id, id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["medications"] }),
  });

  return { medications: query.data ?? [], isLoading: query.isLoading, addMedication, updateMedication, deleteMedication };
}
