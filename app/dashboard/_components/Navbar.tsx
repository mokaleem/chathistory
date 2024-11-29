import BrandLogo from "@/components/BrandLogo";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <header className="flex py-4 shadow bg-background">
      <nav className="flex items-center gap-10 container">
        <Link className="mr-auto" href="/dashboard">
          <BrandLogo />
        </Link>
        <Link href="/dashboard/recents">Recents</Link>
        <Link href="/dashboard/subscription">Subscription</Link>
        <SignedIn>
          <SignOutButton>Sign Out</SignOutButton>
        </SignedIn>
      </nav>
    </header>
  );
}

export default Navbar;
