import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { FiArrowRight } from "react-icons/fi";
import React from "react";

function Hero() {
  return (
    <section className="min-h-[70vh] w-full flex flex-col items-center justify-center text-center gap-8 px-4 py-16 bg-gradient-to-br from-pink-100 via-yellow-50 to-white overflow-x-hidden">
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 max-w-2xl mx-auto text-balance">
        Transform Words into Social Stories
      </h1>
      <p className="text-base sm:text-lg md:text-2xl max-w-2xl mx-auto text-muted-foreground mb-6">
        Convert your text into authentic chats for WhatsApp, Telegram,
        Instagram, X, Facebook, and Snap in seconds.
      </p>
      <SignUpButton>
        <Button
          size="lg"
          variant="accent"
          className="rounded-xl font-semibold text-lg px-8 py-4 flex gap-2 items-center shadow-lg max-w-full"
        >
          Get started for free <FiArrowRight size={20} />
        </Button>
      </SignUpButton>
    </section>
  );
}

export default Hero;
