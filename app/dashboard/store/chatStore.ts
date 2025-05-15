import { create } from "zustand";
import { nanoid } from "nanoid";
import {
  Message,
  MessageStatus,
  Participant,
  TextMessage,
} from "../types/types";

interface ChatStore {
  messages: Message[];
  otherParticipant: Participant;
  addMessage: (message: string, sender: "user" | "other") => void;
  editMessage: (id: string, content: string) => void;
  deleteMessage: (id: string) => void;
  setOtherParticipant: (participant: Participant) => void;
  toggleMessageEdit: (id: string) => void;
  addReaction: (messageId: string, reaction: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [
    {
      id: "1",
      type: "text",
      content: "Hello! How can I help you today?",
      senderId: "other-id",
      sender: "other",
      timestamp: new Date().toISOString(),
      reactions: [],
      status: "read" as MessageStatus,
      replyTo: null,
      edited: false,
      editHistory: [],
    } as TextMessage,
    {
      id: "2",
      type: "text",
      content: "I need help with my account settings",
      senderId: "user-id",
      sender: "user",
      timestamp: new Date().toISOString(),
      reactions: [],
      status: "sent" as MessageStatus,
      replyTo: null,
      edited: false,
      editHistory: [],
    } as TextMessage,
  ],
  otherParticipant: {
    name: "Martha",
    setOtherName: (newName: string) => {
      set((state) => ({
        otherParticipant: { ...state.otherParticipant, name: newName },
      }));
    },
    setOtherAvatar: (newAvatar: string) => {
      set((state) => ({
        otherParticipant: { ...state.otherParticipant, avatar: newAvatar },
      }));
    },
  },
  // Fixed: Use proper typing for the message parameter and create a valid TextMessage object
  addMessage: (content: string, sender: "user" | "other") =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: nanoid(),
          type: "text",
          content,
          senderId: sender === "user" ? "user-id" : "other-id",
          sender, // Keep this for UI compatibility
          timestamp: new Date().toISOString(),
          reactions: [],
          status: "sent" as MessageStatus,
          replyTo: null,
          edited: false,
          editHistory: [],
        } as TextMessage,
      ],
    })),
  editMessage: (id, content) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id && msg.type === "text"
          ? {
              ...msg,
              content,
              edited: true,
              editHistory: [
                ...(msg.editHistory || []),
                {
                  content: (msg as TextMessage).content,
                  timestamp: new Date().toISOString(),
                },
              ],
            }
          : msg
      ),
    })),
  deleteMessage: (id) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg.id !== id),
    })),
  setOtherParticipant: (participant) => set({ otherParticipant: participant }),
  toggleMessageEdit: (id) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, isEditing: !msg.isEditing } : msg
      ),
    })),
  addReaction: (messageId, emoji) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              reactions: [
                ...(msg.reactions || []),
                { userId: "user-id", emoji, timestamp: Date.now() },
              ],
            }
          : msg
      ),
    })),
}));
