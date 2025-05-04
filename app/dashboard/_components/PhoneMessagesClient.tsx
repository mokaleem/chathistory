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
              <p className="break-words">{(message as MediaMessage).content}</p>
            )}
            <div className="text-xs mt-1">📷 Image</div>
          </div>
        );
      case "video":
        return (
          <div className="flex flex-col">
            {(message as MediaMessage).content && (
              <p className="break-words">{(message as MediaMessage).content}</p>
            )}
            <div className="text-xs mt-1">🎥 Video</div>
          </div>
        );
      case "audio":
        return (
          <div className="flex flex-col">
            {(message as MediaMessage).content && (
              <p className="break-words">{(message as MediaMessage).content}</p>
            )}
            <div className="text-xs mt-1">🎵 Audio</div>
          </div>
        );
      case "document":
        return (
          <div className="flex flex-col">
            {(message as MediaMessage).content && (
              <p className="break-words">{(message as MediaMessage).content}</p>
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
    // Custom scrollbar with controlled width and hiding horizontal scrollbar
    <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 h-full custom-scrollbar">
      {/* Date header like in the screenshot */}
      <div className="flex justify-center my-2">
        <div className="bg-white text-gray-500 rounded-md px-3 py-1 text-xs font-medium shadow-sm">
          WEDNESDAY
        </div>
      </div>

      {messages.map((message) => (
        <div
          key={message.id}
          className={`max-w-[75%] rounded-lg mb-1 px-2 pt-1.5 pb-1 relative ${
            message.senderId === "user-id"
              ? "ml-auto bg-[#dcf8c6] text-black" // WhatsApp green bubble for user
              : "bg-white text-black" // White bubble for others
          }`}
        >
          <div className="text-sm leading-tight mb-2 break-words overflow-wrap-anywhere">
            {renderMessageContent(message)}
          </div>

          {/* Time and status positioned at bottom-right corner inside the bubble */}
          <div className="flex justify-end items-center gap-0.5 text-[10px] text-gray-500 absolute bottom-0 right-2">
            <span>
              {new Date(message.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {message.senderId === "user-id" && (
              <span className="text-[#4fc3f7] ml-0.5">
                {message.status === "sent" && "✓"}
                {message.status === "delivered" && "✓✓"}
                {message.status === "read" && "✓✓"}
              </span>
            )}
          </div>

          {/* Show reactions if any - styled smaller to match WhatsApp */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex gap-1 mt-0.5 bg-white bg-opacity-70 rounded-md px-1 py-0.5 w-fit text-xs">
              {message.reactions.map((reaction, index) => (
                <span key={index}>{reaction.emoji}</span>
              ))}
            </div>
          )}

          {/* Edited indicator styled smaller */}
          {message.edited && (
            <div className="text-[9px] text-gray-400 mt-0.5 inline-block ml-1">
              edited
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
