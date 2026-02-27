import { Settings } from "lucide-react";

export default function PatientSettings() {
  return (
    <div className="container py-8">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="font-heading text-2xl font-bold">Settings</h1>
      </div>
      <div className="rounded-xl border bg-card p-12 text-center shadow-card">
        <p className="text-muted-foreground">Settings section is under development.</p>
      </div>
    </div>
  );
}
