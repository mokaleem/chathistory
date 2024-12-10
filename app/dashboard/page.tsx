// import { auth } from "@clerk/nextjs/server";
import React from "react";
import ChatInterface from "./_components/ChatInterface";
import Phone from "./_components/Phone";
import MessageArea from "./_components/MessageArea";
import { Separator } from "@/components/ui/separator";

function DashboardPage() {
  // const { userId, redirectToSignIn } = auth();
  // if (!userId) return redirectToSignIn();

  return (
    <section className="grid grid-cols-2 h-[calc(100vh-48px)]">
      <div className="relative h-full overflow-y-auto">
        <div className="h-full p-4">
          <MessageArea />
        </div>
      </div>
      <div className="relative h-full flex items-center justify-center">
        <Separator orientation="vertical" className="absolute left-0 h-full" />
        <Phone />
      </div>
    </section>
  );
}

export default DashboardPage;
