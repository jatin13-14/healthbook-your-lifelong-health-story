import { useEffect, useState } from "react";
import { getAuthToken, clearAuthToken, me } from "@/lib/api";

export interface AuthUser {
  id: string;
  email: string;
  user_metadata: { full_name?: string };
  role?: string;
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    me(token)
      .then((data) => {
        setUser({
          id: data.user_id,
          email: data.email,
          user_metadata: { full_name: data.full_name || data.email },
          role: data.role,
        });
      })
      .catch(() => {
        clearAuthToken();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const signOut = () => {
    clearAuthToken();
    setUser(null);
  };

  const setUserFromLogin = (data: { user_id: string; email: string; full_name: string; role: string }) => {
    setUser({
      id: data.user_id,
      email: data.email,
      user_metadata: { full_name: data.full_name || data.email },
      role: data.role,
    });
  };

  return { user, session: user ? { user } : null, loading, signOut, setUserFromLogin };
}
