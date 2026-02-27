import DashboardLayout from "@/components/layout/DashboardLayout";
import { Routes, Route } from "react-router-dom";
import { Users, Stethoscope, Shield, Pill, Settings } from "lucide-react";

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

export default function AdminDashboard() {
  return (
    <DashboardLayout role="admin">
      <Routes>
        <Route path="patients" element={<PlaceholderPage title="Patient Department" icon={Users} />} />
        <Route path="doctors" element={<PlaceholderPage title="Doctor Department" icon={Stethoscope} />} />
        <Route path="insurance" element={<PlaceholderPage title="Insurance Department" icon={Shield} />} />
        <Route path="medications" element={<PlaceholderPage title="Medication Department" icon={Pill} />} />
        <Route path="settings" element={<PlaceholderPage title="Settings" icon={Settings} />} />
        <Route path="*" element={
          <div className="container py-8">
            <h1 className="font-heading text-2xl font-bold mb-2">Admin Dashboard 🛡️</h1>
            <p className="text-muted-foreground mb-8">Oversee all departments and platform operations.</p>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Patients", value: "—", icon: Users },
                { label: "Doctors", value: "—", icon: Stethoscope },
                { label: "Insurance", value: "—", icon: Shield },
                { label: "Medications", value: "—", icon: Pill },
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
