import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { Routes, Route } from "react-router-dom";
import { User, Users, Award, Building2, Settings } from "lucide-react";

function PlaceholderPage({ title, icon: Icon }: { title: string; icon: any }) {
  return (
    <div className="container py-8">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="h-6 w-6 text-primary" />
        <h1 className="font-heading text-2xl font-bold">{title}</h1>
      </div>
      <div className="rounded-xl border bg-card p-12 text-center shadow-card">
        <p className="text-muted-foreground">This section is under development.</p>
      </div>
    </div>
  );
}

export default function DoctorDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout role="doctor">
      <Routes>
        <Route path="profile" element={<PlaceholderPage title="Doctor Profile" icon={User} />} />
        <Route path="patients" element={<PlaceholderPage title="Patients" icon={Users} />} />
        <Route path="certificates" element={<PlaceholderPage title="Certificates" icon={Award} />} />
        <Route path="clinic" element={<PlaceholderPage title="Clinic & Hospital" icon={Building2} />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" icon={Settings} />} />
        <Route path="*" element={
          <div className="container py-8">
            <h1 className="font-heading text-2xl font-bold mb-2">
              Welcome, Dr. {user?.user_metadata?.full_name?.split(" ")[0] || "Doctor"} 👋
            </h1>
            <p className="text-muted-foreground mb-8">Manage your patients, certificates, and clinic from here.</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Total Patients", value: "—", icon: Users },
                { label: "Certificates", value: "—", icon: Award },
                { label: "Clinics", value: "—", icon: Building2 },
                { label: "Profile", value: "Complete", icon: User },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border bg-card p-5 shadow-card">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <s.icon className="h-4 w-4 text-primary" />
                    <span className="text-xs font-medium">{s.label}</span>
                  </div>
                  <p className="font-heading text-2xl font-bold">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        } />
      </Routes>
    </DashboardLayout>
  );
}
