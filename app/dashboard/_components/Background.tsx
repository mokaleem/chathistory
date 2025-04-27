import Image from "next/image";
import React from "react";

function Background() {
  return (
    <div className="relative w-full h-[calc(100vh-110px)]">
      <Image
        src="/whatsapp-bg.svg"
        alt="background"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}

export default Background;
