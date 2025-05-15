"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Message } from "../types/types";
import { useChatStore } from "../store/chatStore";
import {
  Edit,
  Trash,
  Copy,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  GripVertical,
  Menu,
} from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { useState } from "react";

export const EditableMessage = ({
  message,
  onDragStart,
  onDragEnd,
  onDragOver,
}: {
  message: Message;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDragOver?: () => void;
}) => {
  const {
    editMessage,
    deleteMessage,
    toggleMessageEdit,
    addReaction,
    moveMessageUp,
    moveMessageDown,
  } = useChatStore();
  const currentUserId = "user-id"; // This should match your store's user id logic
  const isUser = message.senderId === currentUserId;
  const [showMoveMenu, setShowMoveMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Debug message data
  console.log(
    "Rendering message:",
    message.id,
    message.content,
    message.senderId
  );

  const handleMoveUp = () => {
    moveMessageUp(message.id);
    setShowMoveMenu(false);
  };

  const handleMoveDown = () => {
    moveMessageDown(message.id);
    setShowMoveMenu(false);
  };

  // Placeholder handlers for move/add actions
  const handleCopy = () => {
    console.log("Copy message:", message.id);
    if (navigator?.clipboard && typeof message.content === "string") {
      navigator.clipboard.writeText(message.content);
    }
  };

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", message.id);
    e.dataTransfer.effectAllowed = "move";
    if (onDragStart) onDragStart();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (onDragEnd) onDragEnd();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (onDragOver) onDragOver();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    const targetId = message.id;

    if (draggedId === targetId) return;

    const draggedIndex = useChatStore
      .getState()
      .messages.findIndex((msg) => msg.id === draggedId);
    const targetIndex = useChatStore
      .getState()
      .messages.findIndex((msg) => msg.id === targetId);

    if (draggedIndex < targetIndex) {
      // If dragging down, move the target message up
      moveMessageUp(targetId);
    } else {
      // If dragging up, move the target message down
      moveMessageDown(targetId);
    }
  };

  return (
    <div
      className={`group relative p-3 rounded-lg mb-3 hover:shadow-sm transition-shadow ${
        isDragging ? "opacity-50" : ""
      }`}
      style={{
        backgroundColor: isUser ? "#1e88e5" : "#f5f5f5",
        color: isUser ? "white" : "black",
        marginLeft: isUser ? "auto" : "0",
        marginRight: isUser ? "0" : "auto",
        maxWidth: "80%",
        position: "relative",
      }}
      draggable={true}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Drag handle - visible on hover */}
      <div
        className="absolute -top-3 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        style={{
          left: isUser ? "auto" : "50%",
          right: isUser ? "50%" : "auto",
          transform: "translateX(-50%)",
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="button"
              className="cursor-grab bg-white rounded-full shadow p-1 border border-gray-200 hover:bg-gray-50 transition-all"
            >
              <GripVertical className="h-4 w-4 text-gray-400" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Drag message</TooltipContent>
        </Tooltip>
      </div>

      {/* Message content */}
      {message.isEditing ? (
        <Input
          defaultValue={message.content}
          onBlur={(e) => {
            editMessage(message.id, (e.target as HTMLInputElement).value);
            toggleMessageEdit(message.id);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              editMessage(message.id, (e.target as HTMLInputElement).value);
              toggleMessageEdit(message.id);
            }
          }}
          autoFocus
          style={{ color: "darkgray" }}
        />
      ) : (
        <>
          <div
            onClick={() => toggleMessageEdit(message.id)}
            className="mb-1 flex items-end justify-between gap-2"
          >
            <span className="text-[15px] leading-snug break-words flex-1">
              {message.content}
            </span>
            <span className="text-[11px] opacity-60 min-w-fit text-right pl-2">
              {typeof message.timestamp === "string"
                ? message.timestamp.slice(11, 16)
                : ""}
            </span>
          </div>
        </>
      )}

      {/* Action icons - Only visible on hover, horizontal arrangement */}
      <div
        className={`absolute z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-row items-center bg-gray-100 rounded-md px-1 py-0.5`}
        style={{
          top: "-25px",
          right: "0",
          left: "auto",
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => toggleMessageEdit(message.id)}
              type="button"
              className="p-1.5 text-blue-600 hover:bg-gray-200 hover:scale-110 transition-all"
            >
              <Edit className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={handleCopy}
              type="button"
              className="p-1.5 text-green-600 hover:bg-gray-200 hover:scale-110 transition-all"
            >
              <Copy className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Copy</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              onClick={() => deleteMessage(message.id)}
              type="button"
              className="p-1.5 text-red-600 hover:bg-gray-200 hover:scale-110 transition-all"
            >
              <Trash className="h-4 w-4" />
            </button>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
        </Tooltip>

        {/* Three dots menu for move actions */}
        <div className="relative">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setShowMoveMenu(!showMoveMenu)}
                type="button"
                className="p-1.5 text-gray-600 hover:bg-gray-200 hover:scale-110 transition-all"
              >
                <MoreVertical className="h-4 w-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>More actions</TooltipContent>
          </Tooltip>

          {/* Move options dropdown menu */}
          {showMoveMenu && (
            <div
              className="absolute top-8 right-0 bg-white shadow-md rounded-md border border-gray-200 p-1 z-50 flex flex-col gap-1 w-24"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleMoveUp}
                className="flex items-center gap-2 px-2 py-1 text-xs hover:bg-gray-100 rounded text-left whitespace-nowrap text-black"
              >
                <ArrowUp className="h-4 w-4 text-blue-500" /> Move up
              </button>
              <button
                onClick={handleMoveDown}
                className="flex items-center gap-2 px-2 py-1 text-xs hover:bg-gray-100 rounded text-left whitespace-nowrap text-black"
              >
                <ArrowDown className="h-4 w-4 text-blue-500" /> Move down
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
