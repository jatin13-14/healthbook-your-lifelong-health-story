import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Stethoscope, Pill, Syringe, Activity, ArrowLeft, Trash2, Loader2 } from "lucide-react";
import { useHealthRecords } from "@/hooks/useHealthRecords";
import { useToast } from "@/hooks/use-toast";

const iconMap: Record<string, any> = {
  "Doctor Visit": Stethoscope,
  "Lab Report": FileText,
  "Prescription": Pill,
  "Vaccination": Syringe,
  "Vitals": Activity,
};

export default function RecordsView({ onBack }: { onBack: () => void }) {
  const { records, isLoading, deleteRecord } = useHealthRecords();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await deleteRecord.mutateAsync(id);
      toast({ title: "Record deleted" });
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}><ArrowLeft className="h-4 w-4" /></Button>
        <h2 className="font-heading text-lg font-bold">All Health Records ({records.length})</h2>
      </div>
      {isLoading ? (
        <div className="flex justify-center py-12"><Loader2 className="h-6 w-6 animate-spin text-primary" /></div>
      ) : records.length === 0 ? (
        <p className="py-12 text-center text-muted-foreground">No records yet. Add your first health record!</p>
      ) : (
        <div className="space-y-3">
          {records.map((r) => {
            const Icon = iconMap[r.type] || FileText;
            return (
              <div key={r.id} className="flex items-start gap-4 rounded-xl border bg-card p-4 transition-all hover:shadow-card">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-accent">
                  <Icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-heading text-sm font-bold">{r.title}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{r.type}</Badge>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleDelete(r.id)}>
                        <Trash2 className="h-3.5 w-3.5 text-destructive" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.description}</p>
                  <span className="mt-1 block text-xs text-muted-foreground">
                    {new Date(r.record_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                  {r.file_url && (
                    <a href={r.file_url} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs text-primary hover:underline">
                      View attachment →
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
