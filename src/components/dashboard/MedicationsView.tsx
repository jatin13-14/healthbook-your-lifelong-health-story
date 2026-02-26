import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, ArrowLeft, Clock, AlertCircle, Trash2, Loader2 } from "lucide-react";
import { useMedications } from "@/hooks/useMedications";
import { useToast } from "@/hooks/use-toast";

export default function MedicationsView({ onBack }: { onBack: () => void }) {
  const { medications, isLoading, deleteMedication } = useMedications();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deleteMedication.mutateAsync(id);
      toast({ title: "Medication deleted" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="h-4 w-4" /></Button>
        <h2 className="font-heading text-lg font-bold">Medications ({medications.length})</h2>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : medications.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No medications tracked yet.</p>
      ) : (
        <div className="space-y-4">
          {medications.map((m) => (
            <div key={m.id} className="rounded-xl border bg-card p-5 transition-all hover:shadow-card">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-primary">
                    <Pill className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="font-heading text-sm font-bold">{m.name}</h3>
                    {m.prescriber && <p className="text-xs text-muted-foreground">Prescribed by {m.prescriber}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={m.status === "active" ? "default" : "secondary"} className="text-xs capitalize">{m.status}</Badge>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(m.id)}>
                    <Trash2 className="h-3.5 w-3.5 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                {m.purpose && (
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Purpose</span>
                    <p>{m.purpose}</p>
                  </div>
                )}
                {m.frequency && (
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Frequency</span>
                    <p className="flex items-center gap-1"><Clock className="h-3 w-3" /> {m.frequency}</p>
                  </div>
                )}
                {(m.start_date || m.end_date) && (
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Duration</span>
                    <p>{m.start_date ?? "—"} → {m.end_date ?? "—"}</p>
                  </div>
                )}
                {(m.refills_left ?? 0) > 0 && (
                  <div>
                    <span className="text-xs font-medium text-muted-foreground">Refills Left</span>
                    <p className="flex items-center gap-1"><AlertCircle className="h-3 w-3 text-primary" /> {m.refills_left}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
