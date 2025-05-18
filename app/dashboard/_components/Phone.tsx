"use client";
import React, { useState, useRef } from "react";
import NetworkBar from "./NetworkBar";
import NameBar from "./NameBar";
import Background from "./Background";
import { PhoneMessagesClient } from "./PhoneMessagesClient";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  MessageCircle,
  Send,
  Shield,
  Instagram,
  Eye,
  Download,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import html2canvas from "html2canvas";

// Define app theme interface
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
  icon: React.ReactNode;
  fontSize: string;
}

// Define app themes dictionary
type AppThemeKey = "whatsapp" | "telegram" | "signal" | "instagram";

// Define app themes
const appThemes: Record<AppThemeKey, AppTheme> = {
  whatsapp: {
    primaryColor: "#128C7E",
    secondaryColor: "#25D366",
    headerBg: "#075E54",
    chatBg: "#E5DDD5",
    userBubbleBg: "#DCF8C6",
    otherBubbleBg: "#FFFFFF",
    backgroundImage: "/wa-bg.png",
    bubbleRadius: "rounded-lg",
    name: "WhatsApp",
    icon: <MessageCircle size={24} />,
    fontSize: "0.75rem",
  },
  telegram: {
    primaryColor: "#0088CC",
    secondaryColor: "#54B5F5",
    headerBg: "#0088CC",
    chatBg: "#FFFFFF",
    userBubbleBg: "#EFFDDE",
    otherBubbleBg: "#F0F0F0",
    backgroundImage: "/tg-bg.png",
    bubbleRadius: "rounded-2xl",
    name: "Telegram",
    icon: <Send size={24} />,
    fontSize: "0.85rem",
  },
  signal: {
    primaryColor: "#3A76F0",
    secondaryColor: "#2C6BED",
    headerBg: "#3A76F0",
    chatBg: "#FFFFFF",
    userBubbleBg: "#DCF8C6",
    otherBubbleBg: "#F5F5F5",
    backgroundImage: "/signal-bg.png",
    bubbleRadius: "rounded-xl",
    name: "Signal",
    icon: <Shield size={24} />,
    fontSize: "0.8rem",
  },
  instagram: {
    primaryColor: "#E1306C",
    secondaryColor: "#C13584",
    headerBg:
      "linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)",
    chatBg: "#FFFFFF",
    userBubbleBg: "#EFEFEF",
    otherBubbleBg: "#EFEFEF",
    backgroundImage: "/ig-bg.png",
    bubbleRadius: "rounded-3xl",
    name: "Instagram",
    icon: <Instagram size={24} />,
    fontSize: "0.9rem",
  },
};

function Phone() {
  const [currentApp, setCurrentApp] = useState<AppThemeKey>("whatsapp");
  const theme = appThemes[currentApp];
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);

  const handlePreview = () => {
    setIsPreviewOpen(true);
  };

  const handleExport = async () => {
    if (!phoneRef.current) return;

    try {
      // Add a class to hide scrollbars temporarily during capture
      phoneRef.current.classList.add("hide-scrollbars");

      // Use minimal options to avoid type issues
      const canvas = await html2canvas(phoneRef.current);

      // Remove the temporary class
      phoneRef.current.classList.remove("hide-scrollbars");

      // Create download link
      const link = document.createElement("a");
      link.download = `${theme.name}-conversation.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("Error exporting conversation:", error);
      alert("Failed to export conversation. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center w-full mx-auto">
      {/* App selection icons - vertical on left side */}
      <div className="flex flex-col gap-4 mr-12 ml-2">
        <TooltipProvider>
          {(Object.keys(appThemes) as AppThemeKey[]).map((app) => (
            <Tooltip key={app}>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setCurrentApp(app)}
                  className={`p-2 rounded-full transition-all hover:scale-110 ${
                    currentApp === app ? "shadow-md" : ""
                  }`}
                  style={{
                    backgroundColor:
                      currentApp === app
                        ? appThemes[app].primaryColor
                        : "transparent",
                    color:
                      currentApp === app
                        ? "white"
                        : appThemes[app].primaryColor,
                    border: `1px solid ${appThemes[app].primaryColor}`,
                  }}
                >
                  {appThemes[app].icon}
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{appThemes[app].name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      {/* Phone device */}
      <div
        ref={phoneRef}
        className="relative mx-auto border-gray-800 bg-gray-800 border-[10px] rounded-[2.5rem] h-[607px] w-[320px] phone-area-component"
        onMouseEnter={() => setShowScrollHint(true)}
        onMouseLeave={() => setShowScrollHint(false)}
      >
        {/* Scroll indicator hint */}
        {showScrollHint && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white text-xs py-1 px-3 rounded-full z-50 pointer-events-none transition-opacity duration-300 whitespace-nowrap">
            Scroll up and down to see more messages
          </div>
        )}

        <div className="w-[90px] h-[28px] bg-gray-800 rounded-[1rem] left-1/2 -translate-x-1/2 absolute top-1"></div>
        <div className="h-[32px] w-[4px] bg-gray-800 dark:bg-gray-800 absolute -start-[12px] top-[72px] rounded-s-lg"></div>
        <div className="h-[46px] w-[4px] bg-gray-800 dark:bg-gray-800 absolute -start-[12px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[4px] bg-gray-800 dark:bg-gray-800 absolute -start-[12px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[4px] bg-gray-800 dark:bg-gray-800 absolute -end-[12px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-[302px] h-[587px] !bg-white z-10">
          <div
            style={{
              background:
                typeof theme.headerBg === "string" &&
                theme.headerBg.includes("gradient")
                  ? theme.headerBg
                  : theme.headerBg,
            }}
          >
            <NetworkBar />
            <NameBar appTheme={theme} />
          </div>
          <div className="relative h-[calc(100%-80px)]">
            {/* Background with absolute positioning */}
            <div className="absolute inset-0 z-0">
              <Background backgroundImage={theme.backgroundImage} />
            </div>
            {/* Messages with relative positioning and higher z-index */}
            <div className="relative h-full z-10 overflow-y-auto">
              <PhoneMessagesClient
                userBubbleBg={theme.userBubbleBg}
                otherBubbleBg={theme.otherBubbleBg}
                bubbleRadius={theme.bubbleRadius}
                appTheme={theme}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons on the right */}
      <div className="flex flex-col gap-4 ml-12 mr-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handlePreview}
                className="group flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Eye size={20} />
                <span>Preview</span>
                <ArrowRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Preview conversation in a new window</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleExport}
                className="group flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-lg px-4 py-2 shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Download size={20} />
                <span>Export</span>
                <ArrowRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Export conversation as image or PDF</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{`${theme.name} Preview`}</DialogTitle>
            <DialogDescription>
              Preview how your conversation looks in a real messaging app.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <div className="border-gray-800 bg-gray-800 border-[8px] rounded-[2rem] h-[500px] w-[270px]">
              <div className="rounded-[1.8rem] overflow-hidden w-full h-full !bg-white">
                <div
                  style={{
                    background:
                      typeof theme.headerBg === "string" &&
                      theme.headerBg.includes("gradient")
                        ? theme.headerBg
                        : theme.headerBg,
                  }}
                >
                  <NetworkBar />
                  <NameBar appTheme={theme} />
                </div>
                <div className="relative h-[calc(100%-80px)]">
                  <div className="absolute inset-0 z-0">
                    <Background backgroundImage={theme.backgroundImage} />
                  </div>
                  <div className="relative h-full z-10 overflow-y-auto">
                    <PhoneMessagesClient
                      userBubbleBg={theme.userBubbleBg}
                      otherBubbleBg={theme.otherBubbleBg}
                      bubbleRadius={theme.bubbleRadius}
                      appTheme={theme}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Phone;
