"use client";
import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FiMessageCircle,
  FiSend,
  FiImage,
  FiBattery,
  FiWifi,
  FiBarChart,
} from "react-icons/fi";

interface Platform {
  id: PlatformId;
  name: string;
  color: string;
}

type PlatformId =
  | "whatsapp"
  | "instagram"
  | "messenger"
  | "telegram"
  | "snap"
  | "tiktok";
type ViewMode = "mobile" | "desktop";
type MessageSender = "user" | "other";

interface Message {
  id: number;
  text: string;
  sender: MessageSender;
  timestamp: string;
}

interface PlatformStyle {
  container: string;
  message: string;
  userMessage: string;
  otherMessage: string;
}

interface PlatformStyles {
  [key: string]: PlatformStyle;
}

const platforms: Platform[] = [
  { id: "whatsapp", name: "WhatsApp", color: "bg-green-500" },
  { id: "instagram", name: "Instagram", color: "bg-pink-500" },
  { id: "messenger", name: "Messenger", color: "bg-blue-500" },
  { id: "telegram", name: "Telegram", color: "bg-sky-500" },
  { id: "snap", name: "Snapchat", color: "bg-yellow-400" },
  { id: "tiktok", name: "TikTok", color: "bg-black" },
];

const defaultMessages: Message[] = [
  { id: 1, text: "Hey, how are you?", sender: "other", timestamp: "10:00 AM" },
  {
    id: 2,
    text: "I'm good, thanks! How about you?",
    sender: "user",
    timestamp: "10:01 AM",
  },
  {
    id: 3,
    text: "Great! Want to grab coffee later?",
    sender: "other",
    timestamp: "10:02 AM",
  },
];

const IPhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div
      className="relative mx-auto"
      style={{ width: "430px", height: "932px" }}
    >
      {/* iPhone frame */}
      <div className="absolute inset-0 bg-black rounded-[55px] p-4 shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[126px] h-[37px] bg-black rounded-full mt-2 z-50">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[12px] h-[12px] bg-zinc-800 rounded-full"></div>
        </div>

        {/* Status Bar */}
        <div className="relative h-12 flex items-center justify-between px-6 text-white z-40">
          <div className="text-sm">9:41</div>
          <div className="flex items-center gap-2">
            <FiBarChart className="w-4 h-4" />
            <FiWifi className="w-4 h-4" />
            <FiBattery className="w-4 h-4" />
          </div>
        </div>

        {/* Main Content */}
        <div className="h-full rounded-[35px] overflow-hidden bg-white">
          {children}
        </div>
      </div>
    </div>
  );
};

const ChatInterface: React.FC = () => {
  const [platform, setPlatform] = useState<PlatformId>("whatsapp");
  const [viewMode, setViewMode] = useState<ViewMode>("mobile");
  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [newMessage, setNewMessage] = useState<string>("");
  const [userImage, setUserImage] = useState<string>("");
  const [otherImage, setOtherImage] = useState<string>("");

  const getPlatformStyles = (): PlatformStyle => {
    const baseStyles: PlatformStyles = {
      whatsapp: {
        container: "bg-gray-100",
        message: "rounded-lg",
        userMessage: "bg-green-500 text-white",
        otherMessage: "bg-white",
      },
      instagram: {
        container: "bg-white",
        message: "rounded-3xl",
        userMessage: "bg-blue-500 text-white",
        otherMessage: "bg-gray-100",
      },
      messenger: {
        container: "bg-white",
        message: "rounded-full",
        userMessage: "bg-blue-600 text-white",
        otherMessage: "bg-gray-200",
      },
      telegram: {
        container: "bg-[#1c2733]",
        message: "rounded-lg",
        userMessage: "bg-green-400 text-white",
        otherMessage: "bg-gray-700 text-white",
      },
      snap: {
        container: "bg-yellow-50",
        message: "rounded-xl",
        userMessage: "bg-blue-400 text-white",
        otherMessage: "bg-white",
      },
      tiktok: {
        container: "bg-gray-900",
        message: "rounded-xl",
        userMessage: "bg-pink-500 text-white",
        otherMessage: "bg-gray-800 text-white",
      },
    };

    return baseStyles[platform];
  };

  const handleSendMessage = (): void => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleImageUpload = (
    event: ChangeEvent<HTMLInputElement>,
    type: "user" | "other"
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string;
        if (type === "user") {
          setUserImage(result);
        } else {
          setOtherImage(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const styles = getPlatformStyles();

  const chatContent = (
    <div className={`h-full flex flex-col ${styles.container}`}>
      <div className="flex items-center p-4 border-b">
        <div className="relative">
          <Avatar className="w-10 h-10">
            <img
              src={otherImage || "/api/placeholder/40/40"}
              alt="Other user"
              className="w-full h-full object-cover"
            />
          </Avatar>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, "other")}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <div className="ml-3">
          <div className="font-semibold">John Doe</div>
          <div className="text-sm text-gray-500">Online</div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-end gap-2">
              {message.sender === "other" && (
                <Avatar className="w-8 h-8">
                  <img
                    src={otherImage || "/api/placeholder/32/32"}
                    alt="Other user"
                    className="w-full h-full object-cover"
                  />
                </Avatar>
              )}
              <div
                className={`px-4 py-2 max-w-xs ${styles.message} 
                  ${
                    message.sender === "user"
                      ? styles.userMessage
                      : styles.otherMessage
                  }`}
              >
                <div>{message.text}</div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp}
                </div>
              </div>
              {message.sender === "user" && (
                <Avatar className="w-8 h-8">
                  <img
                    src={userImage || "/api/placeholder/32/32"}
                    alt="User"
                    className="w-full h-full object-cover"
                  />
                </Avatar>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>
            <FiSend className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex gap-2 mb-4">
        {platforms.map((p) => (
          <Button
            key={p.id}
            onClick={() => setPlatform(p.id)}
            className={`${p.color} text-white ${
              platform === p.id ? "ring-2 ring-offset-2" : ""
            }`}
          >
            {p.name}
          </Button>
        ))}
      </div>

      <div className="flex gap-2 mb-4">
        <Button
          onClick={() => setViewMode("mobile")}
          variant={viewMode === "mobile" ? "default" : "outline"}
        >
          Mobile
        </Button>
        <Button
          onClick={() => setViewMode("desktop")}
          variant={viewMode === "desktop" ? "default" : "outline"}
        >
          Desktop
        </Button>
      </div>

      {viewMode === "mobile" ? (
        <IPhoneFrame>{chatContent}</IPhoneFrame>
      ) : (
        <Card className="w-full">{chatContent}</Card>
      )}
    </div>
  );
};

export default ChatInterface;
