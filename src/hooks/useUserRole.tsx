import { useAuth } from "./useAuth";

export function useUserRole() {
  const { user } = useAuth();
  const role = user?.role ?? null;
  return { role, loading: false };
}
