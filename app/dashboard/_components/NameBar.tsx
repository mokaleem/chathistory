"use client";
import { ChevronLeft, Phone, Video } from "lucide-react";
import React, { useState } from "react";
import { useChatStore } from "../store/chatStore";
import { ContactProfileDialog } from "./ContactProfileDialog";

interface AppTheme {
  primaryColor: string;
  secondaryColor: string;
  headerBg: string;
  chatBg: string;
  userBubbleBg: string;
  otherBubbleBg: string;
  backgroundImage: string;
  bubbleRadius: string;
  name: string;
}

interface NameBarProps {
  appTheme: AppTheme;
}

function NameBar({ appTheme }: NameBarProps) {
  const otherParticipant = useChatStore((state) => state.otherParticipant);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <div
        className="w-full px-2 py-2"
        style={{ backgroundColor: appTheme.headerBg, color: "white" }}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            <ChevronLeft className="w-7 h-7 text-white" strokeWidth={2.5} />
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setIsProfileOpen(true)}
              >
                {otherParticipant.avatar ? (
                  <img
                    src={otherParticipant.avatar}
                    alt={otherParticipant.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-400">
                    <span className="text-sm font-medium text-white">
                      {otherParticipant.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-white">
                  {otherParticipant.name}
                </span>
                <span className="text-xs text-white opacity-80">online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 mr-2">
            <Video className="w-6 h-6 text-white" strokeWidth={1.2} />
            <Phone className="w-5 h-5 text-white" strokeWidth={1.2} />
          </div>
        </div>
      </div>

      <ContactProfileDialog
        open={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        appTheme={appTheme}
      />
    </>
  );
}

export default NameBar;
