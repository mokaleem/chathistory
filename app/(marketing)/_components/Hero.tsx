import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { FiArrowRight } from "react-icons/fi";
import React from "react";

function Hero() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center text-center flex-col gap-8 px-4 bg-gradient-to-br from-pink-200 via-yellow-100 to-background">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-balance">
        Transform Words into Social Stories
      </h1>
      <p className="text-lg md:text-2xl max-w-2xl mx-auto text-muted-foreground mb-6">
        Convert your text into authentic chats for WhatsApp, Telegram,
        Instagram, X, Facebook, and Snap in seconds.
      </p>
      <SignUpButton>
        <Button
          size="lg"
          variant="accent"
          className="rounded-xl font-semibold text-lg px-8 py-6 flex gap-2 items-center shadow-lg"
        >
          Get started for free <FiArrowRight size={20} />
        </Button>
      </SignUpButton>
    </section>
  );
}

export default Hero;
