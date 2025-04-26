"use client";
import { useState, KeyboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { useChatStore } from "../store/chatStore";

export const MessageEditor = ({ sender }: { sender: "user" | "other" }) => {
  const [input, setInput] = useState("");
  const addMessage = useChatStore((state) => state.addMessage);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim()) {
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
      placeholder="Type a message..."
      className="resize-none"
      rows={3}
    />
  );
};
