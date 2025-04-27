"use client";
import { useState, KeyboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useChatStore } from "../store/chatStore";

export const MessageEditor = ({ sender }: { sender: "user" | "other" }) => {
  const [input, setInput] = useState("");
  const otherParticipant = useChatStore((state) => state.otherParticipant);
  const addMessage = useChatStore((state) => state.addMessage);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
        // Fixed: Pass the correct parameters to addMessage
        // The previous implementation was trying to pass a JSON string of an object
        addMessage(input.trim(), sender);
        setInput("");
      }
    }
  };

  return (
    <Textarea
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
      placeholder={`${
        sender === "other"
          ? otherParticipant.name
            ? otherParticipant.name + "'s"
            : "Other user's"
          : "Your"
      } message...`}
      className="resize-none"
      rows={3}
    />
  );
};
