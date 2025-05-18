import Image from "next/image";
import React from "react";

interface BackgroundProps {
  backgroundImage?: string;
}

function Background({ backgroundImage = "/wa-bg.png" }: BackgroundProps) {
  return (
    // <div className="relative w-full h-[calc(100vh-110px)] inset-0 z-0">
    <div className="w-full h-full">
      <Image
        // src="/whatsapp-bg.svg"
        src={backgroundImage}
        alt="background"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}

export default Background;
