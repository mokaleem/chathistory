import { FiGlobe } from "react-icons/fi";
import React from "react";

function BrandLogo() {
  return (
    <span className="flex items-center gap-2 font-semibold flex-shrink-0 mr-auto text-lg">
      <FiGlobe className="w-8 h-8 text-primary" />
      <span>Chat History</span>
    </span>
  );
}

export default BrandLogo;
