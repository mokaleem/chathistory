"use client";

import { useChatStore } from "../store/chatStore";
import { EditableMessage } from "./EditableMessag";
import { MessageEditor } from "./MessageEditor";

export const MessageAreaClient = () => {
  const messages = useChatStore((state) => state.messages);

  return (
    <div className="h-full flex flex-col min-w-0 w-full">
      <div className="p-4 border-b border-gray-200">Message Area</div>
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
