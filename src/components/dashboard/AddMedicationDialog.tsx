import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMedications } from "@/hooks/useMedications";

export default function AddMedicationDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [prescriber, setPrescriber] = useState("");
  const [frequency, setFrequency] = useState("");
  const [purpose, setPurpose] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("active");
  const [refillsLeft, setRefillsLeft] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { addMedication } = useMedications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      toast({ title: "Missing name", description: "Please enter the medication name.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await addMedication.mutateAsync({
        name,
        prescriber: prescriber || null,
        frequency: frequency || null,
        purpose: purpose || null,
        start_date: startDate || null,
        end_date: endDate || null,
        status,
        refills_left: refillsLeft ? parseInt(refillsLeft, 10) : 0,
      });
      toast({ title: "Medication added", description: `"${name}" is now being tracked.` });
      setName(""); setPrescriber(""); setFrequency(""); setPurpose(""); setStartDate(""); setEndDate(""); setRefillsLeft("");
      setOpen(false);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="gap-2"><Plus className="h-4 w-4" /> Add Medication</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading">Add Medication</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Medication Name *</Label>
            <Input placeholder="e.g. Montelukast 10mg" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Prescriber</Label>
              <Input placeholder="Dr. Kumar" value={prescriber} onChange={(e) => setPrescriber(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Frequency</Label>
              <Input placeholder="Once daily" value={frequency} onChange={(e) => setFrequency(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Purpose</Label>
            <Input placeholder="Asthma control" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Refills Left</Label>
              <Input type="number" min="0" placeholder="0" value={refillsLeft} onChange={(e) => setRefillsLeft(e.target.value)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Medication"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
