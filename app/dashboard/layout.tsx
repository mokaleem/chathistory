import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "./_components/Navbar";
import { AppSidebar } from "@/components/app-sidebar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />
        <div className="flex-1">
          <SidebarTrigger />
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;
