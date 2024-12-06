import { ChevronLeft, Circle, Phone, Video } from "lucide-react";
import React from "react";
import ProfileImage from "./ProfileImage";

function NameBar() {
  return (
    <div className="flex items-center h-[44px] flex-row justify-between">
      <div className="flex items-center gap-2">
        <ChevronLeft size={30} />
        <Circle className="h-10 w-10">
          <ProfileImage />
        </Circle>
      </div>
      <div className="flex items-center gap-2 mr-4 ">
        <Video size={30} strokeWidth={1} />
        <Phone size={25} strokeWidth={1} />
      </div>
    </div>
  );
}

export default NameBar;
