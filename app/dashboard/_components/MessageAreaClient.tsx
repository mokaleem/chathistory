"use client";

import Image from "next/image";
import { useChatStore } from "../store/chatStore";
import { EditableMessage } from "./EditableMessag";
import { MessageEditor } from "./MessageEditor";

export const MessageAreaClient = () => {
  const messages = useChatStore((state) => state.messages);
  const otherName = useChatStore((state) => state.otherParticipant.name);
  const otherAvatar = useChatStore((state) => state.otherParticipant.avatar);
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
          <EditableMessage key={message.id} message={message} />
        ))}
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <MessageEditor sender="other" />
        <MessageEditor sender="user" />
      </div>
    </div>
  );
};
