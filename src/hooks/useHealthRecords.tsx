import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiHealthRecordsList,
  apiHealthRecordCreate,
  apiHealthRecordDelete,
} from "@/lib/api";
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
      if (!user?.id) return [];
      const data = await apiHealthRecordsList(user.id);
      return data.sort(
        (a, b) => new Date(b.record_date).getTime() - new Date(a.record_date).getTime()
      ) as HealthRecord[];
    },
    enabled: !!user,
  });

  const addRecord = useMutation({
    mutationFn: async (record: { type: string; title: string; description?: string; record_date: string; file_url?: string }) => {
      if (!user?.id) throw new Error("Not authenticated");
      return apiHealthRecordCreate(user.id, record);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["health_records"] }),
  });

  const deleteRecord = useMutation({
    mutationFn: async (id: string) => {
      if (!user?.id) throw new Error("Not authenticated");
      await apiHealthRecordDelete(user.id, id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["health_records"] }),
  });

  return { records: query.data ?? [], isLoading: query.isLoading, addRecord, deleteRecord };
}

/** File upload: not implemented (backend can add POST /api/health-records/upload/ later). Returns null so record is saved without file_url. */
export async function uploadMedicalFile(_userId: string, _file: File): Promise<string | null> {
  return null;
}
