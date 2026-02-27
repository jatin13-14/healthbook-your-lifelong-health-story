import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  FileText, Pill, Syringe, Activity, Stethoscope,
  Heart, Calendar, AlertCircle, TrendingUp, User, Loader2
} from "lucide-react";
import { useState } from "react";
import EmergencyQRDialog from "@/components/dashboard/EmergencyQRDialog";
import AddRecordDialog from "@/components/dashboard/AddRecordDialog";
import AddMedicationDialog from "@/components/dashboard/AddMedicationDialog";
import EmergencyProfileEditor from "@/components/dashboard/EmergencyProfileEditor";
import HealthScoreInfo from "@/components/dashboard/HealthScoreInfo";
import RecordsView from "@/components/dashboard/RecordsView";
import MedicationsView from "@/components/dashboard/MedicationsView";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useAuth } from "@/hooks/useAuth";
import { useHealthRecords } from "@/hooks/useHealthRecords";
import { useMedications } from "@/hooks/useMedications";
import { useEmergencyProfile } from "@/hooks/useEmergencyProfile";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import PatientProfile from "./PatientProfile";
import PatientSettings from "./PatientSettings";

const iconMap: Record<string, any> = {
  "Doctor Visit": Stethoscope,
  "Lab Report": FileText,
  "Prescription": Pill,
  "Vaccination": Syringe,
  "Vitals": Activity,
};

type DashboardView = "main" | "records" | "medications";

function PatientDashboardMain() {
  const [view, setView] = useState<DashboardView>("main");
  const { user } = useAuth();
  const { records, isLoading: recordsLoading } = useHealthRecords();
  const { medications, isLoading: medsLoading } = useMedications();
  const { profile, isLoading: profileLoading } = useEmergencyProfile();

  const emergencyPatient = {
    name: user?.user_metadata?.full_name || "User",
    age: 0,
    blood: profile?.blood_group || "—",
    allergies: profile?.allergies ?? [],
    chronic: profile?.chronic_conditions ?? [],
    emergency: profile?.emergency_contact_phone || "—",
  };

  const quickStats = [
    { label: "Records", value: String(records.length), icon: FileText, action: "records" as const },
    { label: "Medications", value: String(medications.length), icon: Pill, action: "medications" as const },
    { label: "Next Checkup", value: "—", icon: Calendar, action: null },
    { label: "Health Score", value: "—", icon: TrendingUp, action: "healthscore" as const },
  ];

  const handleStatClick = (action: string | null) => {
    if (action === "records") setView("records");
    else if (action === "medications") setView("medications");
  };

  if (view === "records") return (
    <div className="container py-8"><RecordsView onBack={() => setView("main")} /></div>
  );

  if (view === "medications") return (
    <div className="container py-8"><MedicationsView onBack={() => setView("main")} /></div>
  );

  const recentRecords = records.slice(0, 5);

  return (
    <div className="container py-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold md:text-3xl">
            Good morning, {user?.user_metadata?.full_name?.split(" ")[0] || "there"} 👋
          </h1>
          <p className="text-sm text-muted-foreground">Your health timeline — all your records in one place.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <EmergencyQRDialog patient={emergencyPatient} />
          <AddRecordDialog />
          <AddMedicationDialog />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {quickStats.map((s) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => handleStatClick(s.action)}
            className={`rounded-xl border bg-card p-5 shadow-card ${s.action && s.action !== "healthscore" ? "cursor-pointer hover:shadow-soft hover:border-primary/30 transition-all" : ""}`}
          >
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <s.icon className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">{s.label}</span>
              </div>
              {s.action === "healthscore" && <HealthScoreInfo />}
            </div>
            <p className="font-heading text-2xl font-bold">{s.value}</p>
            {s.action && s.action !== "healthscore" && (
              <p className="mt-1 text-xs text-primary">Click to view →</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        {/* Timeline */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-heading text-lg font-bold">Health Timeline</h2>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> How it works
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-xs text-xs">
                Records are sorted by date, showing your most recent health events first.
              </TooltipContent>
            </Tooltip>
          </div>
          {recordsLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
          ) : recentRecords.length === 0 ? (
            <div className="rounded-xl border bg-card p-8 text-center">
              <p className="text-muted-foreground">No records yet. Click "Add Record" to get started!</p>
            </div>
          ) : (
            <div className="relative space-y-6 pl-8">
              <div className="absolute left-[13px] top-2 h-[calc(100%-16px)] w-0.5 bg-border" />
              {recentRecords.map((item, i) => {
                const Icon = iconMap[item.type] || FileText;
                return (
                  <motion.div key={item.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="relative">
                    <div className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-card">
                      <Icon className="h-3 w-3 text-primary" />
                    </div>
                    <div className="rounded-xl border bg-card p-5 shadow-card transition-all hover:shadow-soft">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-muted-foreground">
                          {new Date(item.record_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                      </div>
                      <h3 className="mb-1 font-heading text-sm font-bold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
              {records.length > 5 && (
                <Button variant="ghost" size="sm" className="ml-0" onClick={() => setView("records")}>
                  View all {records.length} records →
                </Button>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="rounded-xl border bg-card p-6 shadow-card">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold">{user?.user_metadata?.full_name || "User"}</h3>
                  <p className="text-xs text-muted-foreground">Blood: {profile?.blood_group || "—"}</p>
                </div>
              </div>
              <EmergencyProfileEditor />
            </div>
            {profileLoading ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Allergies</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {(profile?.allergies ?? []).length > 0
                      ? profile!.allergies.map((a) => <Badge key={a} variant="destructive" className="text-xs">{a}</Badge>)
                      : <span className="text-xs text-muted-foreground">None set</span>}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Chronic Conditions</span>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {(profile?.chronic_conditions ?? []).length > 0
                      ? profile!.chronic_conditions.map((c) => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)
                      : <span className="text-xs text-muted-foreground">None set</span>}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Emergency Contact</span>
                  <p className="mt-1">{profile?.emergency_contact_phone || "Not set"}</p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-xl border bg-gradient-card p-6 shadow-card">
            <div className="mb-3 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-primary" />
              <h3 className="font-heading text-sm font-bold">Quick Tips</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><Heart className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> Set up your emergency profile for QR access</li>
              <li className="flex items-start gap-2"><TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> Add records regularly to track health trends</li>
              <li className="flex items-start gap-2"><Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /> Keep medications updated for accurate tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <DashboardLayout role="patient">
      <Routes>
        <Route path="profile" element={<PatientProfile />} />
        <Route path="settings" element={<PatientSettings />} />
        <Route path="*" element={<PatientDashboardMain />} />
      </Routes>
    </DashboardLayout>
  );
}
