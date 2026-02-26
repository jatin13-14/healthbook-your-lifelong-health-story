import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
      const { data, error } = await supabase
        .from("medications")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Medication[];
    },
    enabled: !!user,
  });

  const addMedication = useMutation({
    mutationFn: async (med: Omit<Medication, "id" | "user_id" | "created_at">) => {
      const { data, error } = await supabase
        .from("medications")
        .insert({ ...med, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["medications"] }),
  });

  const updateMedication = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Medication> & { id: string }) => {
      const { error } = await supabase.from("medications").update(updates).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["medications"] }),
  });

  const deleteMedication = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("medications").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["medications"] }),
  });

  return { medications: query.data ?? [], isLoading: query.isLoading, addMedication, updateMedication, deleteMedication };
}
