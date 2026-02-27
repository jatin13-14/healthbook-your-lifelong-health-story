import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import PatientSidebar from "./PatientSidebar";
import DoctorSidebar from "./DoctorSidebar";
import AdminSidebar from "./AdminSidebar";

interface DashboardLayoutProps {
  role: "patient" | "doctor" | "admin";
  children: React.ReactNode;
}

export default function DashboardLayout({ role, children }: DashboardLayoutProps) {
  const SidebarComponent = role === "doctor" ? DoctorSidebar : role === "admin" ? AdminSidebar : PatientSidebar;

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <SidebarComponent />
        <div className="flex-1 flex flex-col">
          <header className="h-14 flex items-center border-b bg-card/80 backdrop-blur-lg px-4">
            <SidebarTrigger className="mr-4" />
            <span className="text-sm font-medium text-muted-foreground capitalize">{role} Portal</span>
          </header>
          <main className="flex-1 bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
