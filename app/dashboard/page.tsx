// import { auth } from "@clerk/nextjs/server";
import React from "react";
import ChatInterface from "./_components/ChatInterface";
import Phone from "./_components/Phone";

function DashboardPage() {
  // const { userId, redirectToSignIn } = auth();
  // if (!userId) return redirectToSignIn();

  return (
    <section className="container">
      <div>
        <Phone />
      </div>
    </section>
  );
}

export default DashboardPage;
