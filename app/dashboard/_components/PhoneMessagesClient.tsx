"use client";
import { useChatStore } from "../store/chatStore";
import { TextMessage, MediaMessage } from "../types/types";

export const PhoneMessagesClient = () => {
  const messages = useChatStore((state) => state.messages);

  // Helper function to render message content based on type
  const renderMessageContent = (message: TextMessage | MediaMessage) => {
    switch (message.type) {
      case "text":
        return (message as TextMessage).content;
      case "image":
        return (
          <div className="flex flex-col">
            {(message as MediaMessage).content && (
              <p>{(message as MediaMessage).content}</p>
            )}
            <div className="text-xs mt-1">📷 Image</div>
          </div>
        );
      case "video":
        return (
          <div className="flex flex-col">
            {(message as MediaMessage).content && (
              <p>{(message as MediaMessage).content}</p>
            )}
            <div className="text-xs mt-1">🎥 Video</div>
          </div>
        );
      case "audio":
        return (
          <div className="flex flex-col">
            {(message as MediaMessage).content && (
              <p>{(message as MediaMessage).content}</p>
            )}
            <div className="text-xs mt-1">🎵 Audio</div>
          </div>
        );
      case "document":
        return (
          <div className="flex flex-col">
            {(message as MediaMessage).content && (
              <p>{(message as MediaMessage).content}</p>
            )}
            <div className="text-xs mt-1">
              📄 Document: {(message as MediaMessage).fileName}
            </div>
          </div>
        );
      default:
        return "Unsupported message type";
    }
  };

  return (
    <div className="flex-1 overflow-y-auto px-3 py-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`max-w-[70%] rounded-lg p-2 mb-2 ${
            message.senderId === "user-id"
              ? "ml-auto bg-green-500 text-white" // WhatsApp uses green for user's messages
              : "bg-white text-black" // WhatsApp uses white for others' messages
          }`}
        >
          {renderMessageContent(message)}

          {/* Show message status indicators */}
          <div className="flex justify-end items-center gap-1 text-xs opacity-70">
            <span>
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {message.senderId === "user-id" && (
              <span>
                {message.status === "sent" && "✓"}
                {message.status === "delivered" && "✓✓"}
                {message.status === "read" && "✓✓"}
              </span>
            )}
          </div>

          {/* Show reactions if any */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex gap-1 mt-1 bg-white bg-opacity-70 rounded-md px-1 py-0.5 w-fit">
              {message.reactions.map((reaction, index) => (
                <span key={index}>{reaction.emoji}</span>
              ))}
            </div>
          )}

          {/* Edited indicator */}
          {message.edited && (
            <div className="text-xs opacity-50 mt-0.5">edited</div>
          )}
        </div>
      ))}
    </div>
  );
};
