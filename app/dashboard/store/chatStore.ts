import { create } from "zustand";
import { nanoid } from "nanoid";
import { Message, Participant } from "../types/types";

interface ChatStore {
  messages: Message[];
  otherParticipant: Participant;
  addMessage: (content: string, sender: "user" | "other") => void;
  editMessage: (id: string, content: string) => void;
  deleteMessage: (id: string) => void;
  setOtherParticipant: (participant: Participant) => void;
  toggleMessageEdit: (id: string) => void;
  addReaction: (messageId: string, reaction: string) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: [],
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
  addMessage: (content, sender) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: nanoid(),
          content,
          sender,
          timestamp: new Date(),
        },
      ],
    })),
  editMessage: (id, content) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content } : msg
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
  addReaction: (messageId, reaction) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === messageId
          ? { ...msg, reactions: [...(msg.reactions || []), reaction] }
          : msg
      ),
    })),
}));
