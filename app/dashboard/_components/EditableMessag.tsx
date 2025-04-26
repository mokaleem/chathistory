"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Message } from "../types/types";
import { useChatStore } from "../store/chatStore";

export const EditableMessage = ({ message }: { message: Message }) => {
  const { editMessage, deleteMessage, toggleMessageEdit, addReaction } =
    useChatStore();

  return (
    <div
      className={`group relative p-2 rounded-lg ${
        message.sender === "user"
          ? "ml-auto bg-blue-500 text-white"
          : "bg-gray-100"
      } max-w-[80%] mb-2`}
      draggable
    >
      {message.isEditing ? (
        <Input
          defaultValue={message.content}
          onBlur={(e) => {
            editMessage(message.id, e.target.value);
            toggleMessageEdit(message.id);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              editMessage(message.id, e.target.value);
              toggleMessageEdit(message.id);
            }
          }}
          autoFocus
          style={{ color: "darkgray" }}
        />
      ) : (
        <>
          <div onClick={() => toggleMessageEdit(message.id)}>
            {message.content}
          </div>
          <div className="text-xs opacity-70">
            {format(message.timestamp, "HH:mm")}
          </div>
        </>
      )}
      <div className="absolute -right-8 top-0 hidden group-hover:flex flex-col gap-1">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => deleteMessage(message.id)}
        >
          🗑️
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => addReaction(message.id, "❤️")}
        >
          ❤️
        </Button>
      </div>
    </div>
  );
};
