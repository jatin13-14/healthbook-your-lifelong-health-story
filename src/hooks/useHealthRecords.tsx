import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export interface HealthRecord {
  id: string;
  user_id: string;
  type: string;
  title: string;
  description: string | null;
  record_date: string;
  file_url: string | null;
  created_at: string;
}

export function useHealthRecords() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["health_records", user?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("health_records")
        .select("*")
        .order("record_date", { ascending: false });
      if (error) throw error;
      return data as HealthRecord[];
    },
    enabled: !!user,
  });

  const addRecord = useMutation({
    mutationFn: async (record: { type: string; title: string; description?: string; record_date: string; file_url?: string }) => {
      const { data, error } = await supabase
        .from("health_records")
        .insert({ ...record, user_id: user!.id })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["health_records"] }),
  });

  const deleteRecord = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("health_records").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["health_records"] }),
  });

  return { records: query.data ?? [], isLoading: query.isLoading, addRecord, deleteRecord };
}

export async function uploadMedicalFile(userId: string, file: File) {
  const path = `${userId}/${Date.now()}_${file.name}`;
  const { error } = await supabase.storage.from("medical-files").upload(path, file);
  if (error) throw error;
  const { data } = supabase.storage.from("medical-files").getPublicUrl(path);
  return data.publicUrl;
}
