import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Navbar from "./_components/Navbar";
import { AppSidebar } from "@/components/app-sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          {" "}
          {/* Added min-w-0 to prevent flex items from overflowing */}
          <SidebarTrigger className="h-12 shrink-0" />{" "}
          {/* Added shrink-0 to prevent shrinking */}
          <main className="flex-1 overflow-hidden">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
