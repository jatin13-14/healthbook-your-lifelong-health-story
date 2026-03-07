import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  apiEmergencyProfileGet,
  apiEmergencyProfileCreate,
  apiEmergencyProfileUpdate,
} from "@/lib/api";
import { useAuth } from "./useAuth";

export interface EmergencyProfile {
  id: string;
  user_id: string;
  blood_group: string | null;
  allergies: string[];
  chronic_conditions: string[];
  emergency_contact_name: string | null;
  emergency_contact_phone: string | null;
  created_at: string;
  updated_at: string;
}

export function useEmergencyProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["emergency_profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      return apiEmergencyProfileGet(user.id) as Promise<EmergencyProfile | null>;
    },
    enabled: !!user,
  });

  const upsertProfile = useMutation({
    mutationFn: async (profile: Partial<Omit<EmergencyProfile, "id" | "user_id" | "created_at" | "updated_at">>) => {
      if (!user?.id) throw new Error("Not authenticated");
      const existing = await apiEmergencyProfileGet(user.id);
      if (existing) {
        await apiEmergencyProfileUpdate(user.id, profile);
      } else {
        await apiEmergencyProfileCreate(user.id, profile);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["emergency_profile"] }),
  });

  return { profile: query.data ?? null, isLoading: query.isLoading, upsertProfile };
}
