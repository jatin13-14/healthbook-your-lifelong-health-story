import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  FileText, Pill, Syringe, Activity, Stethoscope,
  Heart, Calendar, AlertCircle, TrendingUp, User
} from "lucide-react";
import EmergencyQRDialog from "@/components/dashboard/EmergencyQRDialog";
import AddRecordDialog from "@/components/dashboard/AddRecordDialog";

const patientInfo = {
  name: "Sarah Johnson",
  age: 32,
  blood: "O+",
  allergies: ["Penicillin", "Dust"],
  chronic: ["Mild Asthma"],
  emergency: "+1 (555) 123-4567",
};

const timeline = [
  {
    date: "Feb 15, 2026",
    type: "Doctor Visit",
    icon: Stethoscope,
    title: "Annual Checkup — Dr. Patel",
    desc: "General physical exam. All vitals normal. Recommended vitamin D supplement.",
    tags: ["Checkup", "General"],
  },
  {
    date: "Jan 28, 2026",
    type: "Lab Report",
    icon: FileText,
    title: "Complete Blood Count (CBC)",
    desc: "Hemoglobin: 13.2 g/dL, WBC: 7,200, Platelets: 250,000. All within normal range.",
    tags: ["Lab", "Blood Work"],
  },
  {
    date: "Jan 10, 2026",
    type: "Prescription",
    icon: Pill,
    title: "Montelukast 10mg",
    desc: "Once daily at bedtime for asthma control. 3-month prescription by Dr. Kumar.",
    tags: ["Medication", "Asthma"],
  },
  {
    date: "Dec 20, 2025",
    type: "Vaccination",
    icon: Syringe,
    title: "Flu Vaccine (2025-26)",
    desc: "Annual influenza vaccination administered at City Health Center.",
    tags: ["Vaccine", "Preventive"],
  },
  {
    date: "Nov 5, 2025",
    type: "Vitals",
    icon: Activity,
    title: "Blood Pressure & Sugar Check",
    desc: "BP: 118/76 mmHg, Fasting Sugar: 92 mg/dL. Both normal.",
    tags: ["Vitals", "Monitoring"],
  },
];

const quickStats = [
  { label: "Records", value: "47", icon: FileText },
  { label: "Medications", value: "3", icon: Pill },
  { label: "Next Checkup", value: "Mar 15", icon: Calendar },
  { label: "Health Score", value: "92%", icon: TrendingUp },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <main className="container py-8">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold md:text-3xl">
              Good morning, {patientInfo.name.split(" ")[0]} 👋
            </h1>
            <p className="text-sm text-muted-foreground">
              Your health timeline — all your records in one place.
            </p>
          </div>
          <div className="flex gap-2">
            <EmergencyQRDialog patient={patientInfo} />
            <AddRecordDialog />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
          {quickStats.map((s) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border bg-card p-5 shadow-card"
            >
              <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                <s.icon className="h-4 w-4 text-primary" />
                <span className="text-xs font-medium">{s.label}</span>
              </div>
              <p className="font-heading text-2xl font-bold">{s.value}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Timeline */}
          <div>
            <h2 className="mb-6 font-heading text-lg font-bold">Health Timeline</h2>
            <div className="relative space-y-6 pl-8">
              {/* Timeline line */}
              <div className="absolute left-[13px] top-2 h-[calc(100%-16px)] w-0.5 bg-border" />

              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  {/* Dot */}
                  <div className="absolute -left-8 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-primary bg-card">
                    <item.icon className="h-3 w-3 text-primary" />
                  </div>

                  <div className="rounded-xl border bg-card p-5 shadow-card transition-all hover:shadow-soft">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-muted-foreground">{item.date}</span>
                      <Badge variant="secondary" className="text-xs">{item.type}</Badge>
                    </div>
                    <h3 className="mb-1 font-heading text-sm font-bold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                    <div className="mt-3 flex gap-2">
                      {item.tags.map((t) => (
                        <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar / Profile */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-card p-6 shadow-card">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold">{patientInfo.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {patientInfo.age} years · Blood: {patientInfo.blood}
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Allergies</span>
                  <div className="mt-1 flex gap-1">
                    {patientInfo.allergies.map((a) => (
                      <Badge key={a} variant="destructive" className="text-xs">{a}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Chronic Conditions</span>
                  <div className="mt-1 flex gap-1">
                    {patientInfo.chronic.map((c) => (
                      <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Emergency Contact</span>
                  <p className="mt-1">{patientInfo.emergency}</p>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="rounded-xl border bg-gradient-card p-6 shadow-card">
              <div className="mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-primary" />
                <h3 className="font-heading text-sm font-bold">AI Health Insights</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Heart className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  Vitamin D levels may need rechecking in 3 months
                </li>
                <li className="flex items-start gap-2">
                  <TrendingUp className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  Blood pressure trend: Stable over last 6 months
                </li>
                <li className="flex items-start gap-2">
                  <Calendar className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  Due for dental checkup (last visit: 8 months ago)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
