"use client";
import { Button } from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";
import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { useTransition, animated } from "@react-spring/web";
import { useState, useEffect } from "react";

function Hero() {
  const platforms = ["Shorts", "TikTok", "Reels", "X"];
  const [index, setIndex] = useState(0);

  const transitions = useTransition(platforms[index], {
    from: { opacity: 0, transform: "translateY(-20px)" },
    enter: { opacity: 1, transform: "translateY(0px)" },
    leave: { opacity: 0, transform: "translateY(20px)" },
    config: { duration: 500 },
    exitBeforeEnter: true, // Ensures no overlap between transitions
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % platforms.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen bg-[radial-gradient(hsl(0,72%,65%,40%),hsl(24,62%,73%,40%),hsl(var(--background))_60%)] flex items-center justify-center text-center text-balance flex-col gap-8 px-4">
      <h1 className="text-5xl lg:text-5xl xl:text-7l font-bold tracking-tight m-4">
        Text to Viral Videos for{" "}
        {transitions((style, item) => (
          <animated.span
            style={style}
            className="platform bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"
          >
            {item}
          </animated.span>
        ))}
      </h1>
      <p className="text-lg lg:text-2xl max-w-screen-xl">
        Bring your stories to life with real like chat videos with WhatsApp,
        Telegram, Signal, Instagram, X, Messenger, and Snapchat interface.
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
