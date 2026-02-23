import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PatientInfo {
  name: string;
  age: number;
  blood: string;
  allergies: string[];
  chronic: string[];
  emergency: string;
}

export default function EmergencyQRDialog({ patient }: { patient: PatientInfo }) {
  const qrData = encodeURIComponent(
    `Name: ${patient.name}\nAge: ${patient.age}\nBlood: ${patient.blood}\nAllergies: ${patient.allergies.join(", ")}\nChronic: ${patient.chronic.join(", ")}\nEmergency: ${patient.emergency}`
  );
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <QrCode className="h-4 w-4" /> Emergency QR
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Emergency QR Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4">
          <img src={qrUrl} alt="Emergency QR Code" className="rounded-lg border" width={200} height={200} />
          <p className="text-sm text-muted-foreground text-center">
            Scan this QR code to view emergency medical information.
          </p>
          <div className="w-full space-y-2 rounded-lg border bg-muted/50 p-4 text-sm">
            <p><span className="font-medium">Name:</span> {patient.name}</p>
            <p><span className="font-medium">Age:</span> {patient.age} · <span className="font-medium">Blood:</span> {patient.blood}</p>
            <div className="flex items-center gap-2">
              <span className="font-medium">Allergies:</span>
              {patient.allergies.map((a) => (
                <Badge key={a} variant="destructive" className="text-xs">{a}</Badge>
              ))}
            </div>
            <p><span className="font-medium">Emergency:</span> {patient.emergency}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
