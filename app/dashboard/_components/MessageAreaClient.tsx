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
    <div className="h-full flex flex-col min-w-0 w-full">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {otherAvatar ? (
            <Image
              src={otherAvatar}
              alt="Display Picture"
              className="w-8 h-8 rounded-full"
              width={32} // Added missing required props
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
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[70%] rounded-lg p-2 mb-2 ${
              message.senderId === "user-id"
                ? "ml-auto bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            {/* Fixed: Use content for TextMessage and show appropriate content for different message types */}
            <div>
              {message.type === "text"
                ? (message as TextMessage).content
                : "Media message"}
            </div>
            <div className="text-xs opacity-70">
              {new Date(message.timestamp).toLocaleTimeString()}
            </div>
            {/* Display reactions if any */}
            {message.reactions && message.reactions.length > 0 && (
              <div className="flex gap-1 mt-1">
                {message.reactions.map((reaction, index) => (
                  <span key={index} className="text-xs">
                    {reaction.emoji}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <MessageEditor sender="other" />
        <MessageEditor sender="user" />
      </div>
    </div>
  );
};
