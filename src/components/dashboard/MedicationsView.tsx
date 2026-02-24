import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, ArrowLeft, Clock, AlertCircle } from "lucide-react";

const medications = [
  {
    name: "Montelukast 10mg",
    prescriber: "Dr. Kumar",
    frequency: "Once daily at bedtime",
    purpose: "Asthma control",
    startDate: "Jan 10, 2026",
    endDate: "Apr 10, 2026",
    status: "active",
    refillsLeft: 2,
  },
  {
    name: "Vitamin D3 60,000 IU",
    prescriber: "Dr. Patel",
    frequency: "Once weekly",
    purpose: "Vitamin D deficiency",
    startDate: "Feb 15, 2026",
    endDate: "May 15, 2026",
    status: "active",
    refillsLeft: 10,
  },
  {
    name: "Cetirizine 10mg",
    prescriber: "Dr. Patel",
    frequency: "As needed",
    purpose: "Allergic rhinitis",
    startDate: "Feb 15, 2026",
    endDate: "—",
    status: "active",
    refillsLeft: 0,
  },
];

export default function MedicationsView({ onBack }: { onBack: () => void }) {
  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="h-4 w-4" /></Button>
        <h2 className="font-heading text-lg font-bold">Active Medications ({medications.length})</h2>
      </div>
      <div className="space-y-4">
        {medications.map((m, i) => (
          <div key={i} className="rounded-xl border bg-card p-5 transition-all hover:shadow-card">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                  <Pill className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-heading text-sm font-bold">{m.name}</h3>
                  <p className="text-xs text-muted-foreground">Prescribed by {m.prescriber}</p>
                </div>
              </div>
              <Badge variant={m.status === "active" ? "default" : "secondary"} className="text-xs capitalize">{m.status}</Badge>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-xs font-medium text-muted-foreground">Purpose</span>
                <p>{m.purpose}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground">Frequency</span>
                <p className="flex items-center gap-1"><Clock className="h-3 w-3" /> {m.frequency}</p>
              </div>
              <div>
                <span className="text-xs font-medium text-muted-foreground">Duration</span>
                <p>{m.startDate} → {m.endDate}</p>
              </div>
              {m.refillsLeft > 0 && (
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Refills Left</span>
                  <p className="flex items-center gap-1">
                    <AlertCircle className="h-3 w-3 text-primary" /> {m.refillsLeft}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
