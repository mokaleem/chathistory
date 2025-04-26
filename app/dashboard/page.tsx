// import { auth } from "@clerk/nextjs/server";
import React from "react";
import ChatInterface from "./_components/ChatInterface";
import Phone from "./_components/Phone";
import MessageArea from "./_components/MessageArea";
import { Separator } from "@/components/ui/separator";

const DashboardPage = () => {
  return (
    <section className="grid grid-cols-2 h-full w-full gap-0">
      <div className="w-full h-full overflow-hidden">
        <MessageArea />
      </div>
      <div className="relative w-full h-full flex items-center justify-center">
        <Separator orientation="vertical" className="absolute left-0 h-full" />
        <Phone />
      </div>
    </section>
  );
};

export default DashboardPage;
