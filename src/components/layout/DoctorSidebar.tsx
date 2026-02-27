import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { User, Users, Award, Building2, Settings, LogOut, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const items = [
  { title: "Profile", url: "/doctor/profile", icon: User },
  { title: "Patients", url: "/doctor/patients", icon: Users },
  { title: "Certificates", url: "/doctor/certificates", icon: Award },
  { title: "Clinic & Hospital", url: "/doctor/clinic", icon: Building2 },
  { title: "Settings", url: "/doctor/settings", icon: Settings },
];

export default function DoctorSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/doctor-login");
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="flex items-center gap-2 px-4 py-4">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-hero">
            <Heart className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && <span className="font-heading text-lg font-bold">HealthBook</span>}
        </div>

        <SidebarGroup>
          <SidebarGroupLabel>Doctor Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className="hover:bg-muted/50" activeClassName="bg-accent text-primary font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="hover:bg-destructive/10 text-muted-foreground hover:text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  {!collapsed && <span>Logout</span>}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
