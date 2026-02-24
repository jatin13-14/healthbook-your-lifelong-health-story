import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Stethoscope, Pill, Syringe, Activity, ArrowLeft } from "lucide-react";

const allRecords = [
  { date: "Feb 15, 2026", type: "Doctor Visit", icon: Stethoscope, title: "Annual Checkup — Dr. Patel", desc: "General physical exam. All vitals normal." },
  { date: "Jan 28, 2026", type: "Lab Report", icon: FileText, title: "Complete Blood Count (CBC)", desc: "Hemoglobin: 13.2 g/dL, WBC: 7,200. All normal." },
  { date: "Jan 10, 2026", type: "Prescription", icon: Pill, title: "Montelukast 10mg", desc: "Once daily at bedtime for asthma control." },
  { date: "Dec 20, 2025", type: "Vaccination", icon: Syringe, title: "Flu Vaccine (2025-26)", desc: "Annual influenza vaccination." },
  { date: "Nov 5, 2025", type: "Vitals", icon: Activity, title: "Blood Pressure & Sugar Check", desc: "BP: 118/76 mmHg, Fasting Sugar: 92 mg/dL." },
  { date: "Oct 12, 2025", type: "Doctor Visit", icon: Stethoscope, title: "Asthma Follow-up — Dr. Kumar", desc: "Breathing improved. Continue current medication." },
  { date: "Sep 3, 2025", type: "Lab Report", icon: FileText, title: "Lipid Panel", desc: "Total cholesterol: 185, LDL: 110, HDL: 55. Borderline." },
];

export default function RecordsView({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="h-4 w-4" /></Button>
        <h2 className="font-heading text-lg font-bold">All Health Records ({allRecords.length})</h2>
      </div>
      <div className="space-y-3">
        {allRecords.map((r, i) => (
          <div key={i} className="flex items-start gap-4 rounded-xl border bg-card p-4 transition-all hover:shadow-card">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-accent">
              <r.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-heading text-sm font-bold">{r.title}</h3>
                <Badge variant="secondary" className="text-xs">{r.type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{r.desc}</p>
              <span className="mt-1 block text-xs text-muted-foreground">{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
