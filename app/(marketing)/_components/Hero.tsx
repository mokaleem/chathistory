import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon } from "lucide-react";
import React from "react";

function Hero() {
  return (
    <section className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
      <h1 className="text-6xl lg:text-6xl xl:text-8l font-bold tracking-tight m-4">
        Transform Words into Social Stories
      </h1>
      <p className="text-lg lg:text-2xl max-w-screen-xl">
        Convert your text into authentic chats for WhatsApp, Telegram,
        Instagram, X, Facebook, and Snap in seconds
      </p>
      <SignUpButton>
        <Button className="text-lg p-6 rounded-xl flex gap-2">
          Get started for free <ArrowRightIcon size="size-5" />
        </Button>
      </SignUpButton>
    </section>
  );
}

export default Hero;
