import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEmergencyProfile } from "@/hooks/useEmergencyProfile";

export default function EmergencyProfileEditor() {
  const [open, setOpen] = useState(false);
  const { profile, upsertProfile } = useEmergencyProfile();
  const { toast } = useToast();

  const [bloodGroup, setBloodGroup] = useState("");
  const [allergies, setAllergies] = useState("");
  const [chronic, setChronic] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setBloodGroup(profile.blood_group ?? "");
      setAllergies(profile.allergies?.join(", ") ?? "");
      setChronic(profile.chronic_conditions?.join(", ") ?? "");
      setContactName(profile.emergency_contact_name ?? "");
      setContactPhone(profile.emergency_contact_phone ?? "");
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await upsertProfile.mutateAsync({
        blood_group: bloodGroup || null,
        allergies: allergies ? allergies.split(",").map((s) => s.trim()).filter(Boolean) : [],
        chronic_conditions: chronic ? chronic.split(",").map((s) => s.trim()).filter(Boolean) : [],
        emergency_contact_name: contactName || null,
        emergency_contact_phone: contactPhone || null,
      });
      toast({ title: "Emergency profile saved" });
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
        <Button variant="ghost" size="icon" className="h-7 w-7"><Settings className="h-3.5 w-3.5" /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Edit Emergency Profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Blood Group</Label>
            <Input placeholder="e.g. O+" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Allergies (comma-separated)</Label>
            <Input placeholder="Penicillin, Dust" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Chronic Conditions (comma-separated)</Label>
            <Input placeholder="Asthma, Diabetes" value={chronic} onChange={(e) => setChronic(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Emergency Contact Name</Label>
            <Input placeholder="Jane Doe" value={contactName} onChange={(e) => setContactName(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Emergency Contact Phone</Label>
            <Input placeholder="+1 555 123 4567" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
