import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export function useUserRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      const { data, error } = await supabase.rpc("get_user_role", {
        _user_id: user.id,
      });
      if (!error && data) {
        setRole(data as string);
      }
      setLoading(false);
    };

    fetchRole();
  }, [user]);

  return { role, loading };
}
