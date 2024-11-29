import { ReactNode } from "react";
import Navbar from "./_components/Navbar";

function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="selection:bg-[hsl(199,53%,52%)]">
      <Navbar />
      {children}
    </div>
  );
}

export default MarketingLayout;
