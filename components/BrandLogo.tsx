import { Globe2Icon } from "lucide-react";
import React from "react";

function BrandLogo() {
  return (
    <span className="flex items-center gap-2 font-semibold flex-shrink-0 mr-auto text-lg">
      <Globe2Icon className="size-8" />
      <span>Chat History</span>
    </span>
  );
}

export default BrandLogo;
