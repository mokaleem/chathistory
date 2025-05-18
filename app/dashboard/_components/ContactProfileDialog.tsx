"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useChatStore } from "../store/chatStore";
import { Button } from "@/components/ui/button";
import { Phone, Video, Bell, XCircle, Image as ImageIcon } from "lucide-react";

interface ContactProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appTheme: any;
}

export function ContactProfileDialog({
  open,
  onOpenChange,
  appTheme,
}: ContactProfileDialogProps) {
  const otherParticipant = useChatStore((state) => state.otherParticipant);

  // Mock data for demo purposes
  const [contactDetails, setContactDetails] = useState({
    phone: "+1 (555) 123-4567",
    status: "Online",
    about: "Hey there! I'm using this messaging app.",
    media: { count: 24 },
    muted: false,
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] overflow-hidden">
        <DialogHeader className="text-center pb-2">
          <DialogTitle className="text-xl font-semibold">
            Contact Info
          </DialogTitle>
        </DialogHeader>

        <div className="py-4 flex flex-col items-center space-y-4">
          {/* Contact Avatar */}
          <div
            className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center bg-gray-200"
            style={{ backgroundColor: appTheme.primaryColor }}
          >
            {otherParticipant.avatar ? (
              <img
                src={otherParticipant.avatar}
                alt={otherParticipant.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl text-white font-light">
                {otherParticipant.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Contact Name */}
          <h3 className="text-xl font-medium">{otherParticipant.name}</h3>

          {/* Action Buttons */}
          <div className="flex gap-4 w-full justify-center">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12"
              style={{ color: appTheme.primaryColor }}
            >
              <Phone className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12"
              style={{ color: appTheme.primaryColor }}
            >
              <Video className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-12 w-12"
              style={{ color: appTheme.primaryColor }}
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>

          {/* Contact Details */}
          <div className="w-full space-y-4 pt-2 pb-4">
            <div className="border-t border-b py-3">
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Phone Number
              </h4>
              <p>{contactDetails.phone}</p>
            </div>

            <div className="border-b py-3">
              <h4 className="text-sm font-medium text-gray-500 mb-1">About</h4>
              <p>{contactDetails.about}</p>
            </div>

            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-3">
                <ImageIcon className="h-5 w-5 text-gray-500" />
                <span>Media, links, and docs</span>
              </div>
              <span className="text-gray-500">
                {contactDetails.media.count}
              </span>
            </div>

            <div className="flex items-center justify-between py-2 border-b">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-gray-500" />
                <span>Mute notifications</span>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  className="rounded-full h-4 w-4"
                  checked={contactDetails.muted}
                  onChange={() =>
                    setContactDetails((prev) => ({
                      ...prev,
                      muted: !prev.muted,
                    }))
                  }
                />
              </div>
            </div>

            <Button
              variant="ghost"
              className="w-full flex items-center justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <XCircle className="h-5 w-5" />
              <span>Block {otherParticipant.name}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
