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
    <section className="grid grid-cols-2 h-screen">
      <div className="h-screen">
        <MessageArea />
      </div>
      <Separator
        orientation="vertical"
        className="absolute left-1/2 h-screen"
      />
      <div className="h-screen">
        <Phone />
      </div>
    </section>
  );
}

export default DashboardPage;
