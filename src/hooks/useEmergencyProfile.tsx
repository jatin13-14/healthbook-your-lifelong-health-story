import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
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
      const { data, error } = await supabase
        .from("emergency_profiles")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data as EmergencyProfile | null;
    },
    enabled: !!user,
  });

  const upsertProfile = useMutation({
    mutationFn: async (profile: Partial<Omit<EmergencyProfile, "id" | "user_id" | "created_at" | "updated_at">>) => {
      const { data: existing } = await supabase
        .from("emergency_profiles")
        .select("id")
        .eq("user_id", user!.id)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("emergency_profiles")
          .update(profile)
          .eq("id", existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("emergency_profiles")
          .insert({ ...profile, user_id: user!.id });
        if (error) throw error;
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["emergency_profile"] }),
  });

  return { profile: query.data ?? null, isLoading: query.isLoading, upsertProfile };
}
