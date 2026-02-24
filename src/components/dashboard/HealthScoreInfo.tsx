import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Info, TrendingUp, Activity, Pill, Calendar, Heart } from "lucide-react";

const factors = [
  { icon: Activity, label: "Vitals in Range", weight: "30%", desc: "BP, blood sugar, and weight within healthy limits" },
  { icon: Calendar, label: "Regular Checkups", weight: "20%", desc: "Attending scheduled doctor visits on time" },
  { icon: Pill, label: "Medication Adherence", weight: "20%", desc: "Taking prescribed medicines consistently" },
  { icon: Heart, label: "Preventive Care", weight: "15%", desc: "Vaccinations up to date, screenings completed" },
  { icon: TrendingUp, label: "Lifestyle Trends", weight: "15%", desc: "Exercise frequency, diet logging, symptom tracking" },
];

export default function HealthScoreInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-muted-foreground hover:text-primary transition-colors">
          <Info className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            How Your Health Score Works
          </DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Your Health Score is a composite metric (0–100%) based on multiple factors from your health timeline. Here's how it's calculated:
        </p>
        <div className="mt-4 space-y-3">
          {factors.map((f) => (
            <div key={f.label} className="flex items-start gap-3 rounded-lg border bg-muted/30 p-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-primary">
                <f.icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{f.label}</span>
                  <span className="text-xs font-bold text-primary">{f.weight}</span>
                </div>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          💡 Keep your records up to date and maintain regular checkups to improve your score. The AI recalculates daily based on your latest data.
        </p>
      </DialogContent>
    </Dialog>
  );
}
