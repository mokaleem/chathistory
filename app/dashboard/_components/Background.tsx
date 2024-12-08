import Image from "next/image";
import React from "react";

function Background() {
  return (
    <div className="relative w-full h-[calc(100vh-110px)]">
      <Image
        src="/wa-bg.png"
        alt="background"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}

export default Background;
