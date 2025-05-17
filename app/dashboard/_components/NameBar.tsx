"use client";
import { ChevronLeft, Phone, Video } from "lucide-react";
import React from "react";
import { useChatStore } from "../store/chatStore";

function NameBar() {
  const otherParticipant = useChatStore((state) => state.otherParticipant);

  return (
    <div className="w-full px-2 py-2 bg-white">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <ChevronLeft className="w-7 h-7 text-blue-500" strokeWidth={2.5} />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
              {/* Placeholder for profile image */}
            </div>
            <div className="flex flex-col">
              <span className="text-base font-semibold">
                {otherParticipant.name}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 mr-2">
          <Video className="w-6 h-6 text-blue-500" strokeWidth={1.2} />
          <Phone className="w-5 h-5 text-blue-500" strokeWidth={1.2} />
        </div>
      </div>
    </div>
  );
}

export default NameBar;
