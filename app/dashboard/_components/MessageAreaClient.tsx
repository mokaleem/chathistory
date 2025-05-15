"use client";

import Image from "next/image";
import { useChatStore } from "../store/chatStore";
import { EditableMessage } from "./EditableMessag";
import { MessageEditor } from "./MessageEditor";
import { TextMessage } from "../types/types";

export const MessageAreaClient = () => {
  const messages = useChatStore((state) => state.messages);
  const otherName = useChatStore((state) => state.otherParticipant.name);
  const otherAvatar = useChatStore((state) => state.otherParticipant.avatar);
  // Fixed: Access the functions directly from the store instead of through otherParticipant
  const setOtherName = useChatStore(
    (state) => state.otherParticipant.setOtherName
  );
  const setOtherAvatar = useChatStore(
    (state) => state.otherParticipant.setOtherAvatar
  );

  return (
    <div className="h-full flex flex-col min-w-0 w-full max-h-screen">
      {/* Header section */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          {otherAvatar ? (
            <Image
              src={otherAvatar}
              alt="Display Picture"
              className="w-8 h-8 rounded-full"
              width={32}
              height={32}
            />
          ) : (
            <Image
              src="/default-avatar.png"
              alt="Display Picture"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
          )}
          <input
            type="text"
            placeholder="Other's Name"
            value={otherName}
            onChange={(e) => setOtherName(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white"
          />
        </div>
        <input
          type="text"
          value="You"
          disabled
          className="border rounded-sm border-gray-300 rounded px-2 py-1 text-sm bg-gray-100 text-gray-500"
        />
      </div>

      {/* Message area - critical fix for scrolling */}
      <div className="flex-1 overflow-hidden relative" style={{ zIndex: 10 }}>
        <div
          className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 custom-scrollbar"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "#e5e7eb transparent",
          }}
        >
          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background-color: #e5e7eb;
              border-radius: 3px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background-color: #d1d5db;
            }
          `}</style>
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-4">
              No messages yet. Start a conversation!
            </div>
          ) : (
            <>
              <div className="flex justify-between text-xs text-gray-500 mb-2">
                <div>
                  {otherName}:{" "}
                  {messages.filter((m) => m.senderId === "other-id").length}
                </div>
                <div>
                  You: {messages.filter((m) => m.senderId === "user-id").length}
                </div>
              </div>
              {messages.map((message) => (
                <EditableMessage key={message.id} message={message} />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Editor section */}
      <div className="p-4 grid grid-cols-2 gap-4 shrink-0 bg-white">
        <MessageEditor sender="other" />
        <MessageEditor sender="user" />
      </div>
    </div>
  );
};
