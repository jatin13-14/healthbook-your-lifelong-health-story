import { useAuth } from "@/hooks/useAuth";
import { User } from "lucide-react";

export default function PatientProfile() {
  const { user } = useAuth();

  return (
    <div className="container py-8">
      <div className="flex items-center gap-3 mb-6">
        <User className="h-6 w-6 text-primary" />
        <h1 className="font-heading text-2xl font-bold">My Profile</h1>
      </div>
      <div className="rounded-xl border bg-card p-6 shadow-card max-w-lg">
        <div className="space-y-4">
          <div>
            <span className="text-xs font-medium text-muted-foreground">Full Name</span>
            <p className="text-sm font-medium">{user?.user_metadata?.full_name || "Not set"}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-muted-foreground">Email</span>
            <p className="text-sm font-medium">{user?.email || "—"}</p>
          </div>
          <div>
            <span className="text-xs font-medium text-muted-foreground">Role</span>
            <p className="text-sm font-medium capitalize">Patient</p>
          </div>
        </div>
      </div>
    </div>
  );
}
