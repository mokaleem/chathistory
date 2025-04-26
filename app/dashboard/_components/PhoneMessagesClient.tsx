"use client";
import { format } from "date-fns";
import { useChatStore } from "../store/chatStore";

export const PhoneMessagesClient = () => {
  const messages = useChatStore((state) => state.messages);

  console.log("messages: ", messages);

  return (
    <div className="flex-1 overflow-y-auto px-3 py-2">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`max-w-[70%] rounded-lg p-2 mb-2 ${
            message.sender === "user"
              ? "ml-auto bg-blue-500 text-white"
              : "bg-gray-100"
          }`}
        >
          <div>{message.content}</div>
          <div className="text-xs opacity-70">
            {format(message.timestamp, "HH:mm")}
          </div>
          {message.reactions?.map((reaction, i) => (
            <span key={i} className="ml-1">
              {reaction}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
};
