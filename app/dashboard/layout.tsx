import Navbar from "./_components/Navbar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-accent/5 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  );
}

export default DashboardLayout;
