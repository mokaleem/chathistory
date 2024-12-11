// import { auth } from "@clerk/nextjs/server";
import React from "react";
import ChatInterface from "./_components/ChatInterface";
import Phone from "./_components/Phone";
import MessageArea from "./_components/MessageArea";
import { Separator } from "@/components/ui/separator";

const DashboardPage = () => {
  return (
    <section className="grid grid-cols-2 h-full min-w-0">
      {" "}
      {/* Added min-w-0 */}
      <div className="min-w-0 h-full overflow-hidden">
        {" "}
        {/* Added min-w-0 */}
        <MessageArea />
      </div>
      <div className="relative h-full flex items-center justify-center min-w-0">
        {" "}
        {/* Added min-w-0 */}
        <Separator orientation="vertical" className="absolute left-0 h-full" />
        <Phone />
      </div>
    </section>
  );
};

export default DashboardPage;
