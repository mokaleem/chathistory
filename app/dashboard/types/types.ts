// Image message
interface ImageMessage extends BaseMessage {
  type: "image";
  content?: string;
  mediaUrl: string;
  thumbnail: string;
  fileName: string;
  fileSize: number;
  dimensions: {
    width: number;
    height: number;
  };
}

// Video message
interface VideoMessage extends BaseMessage {
  type: "video";
  content?: string;
  mediaUrl: string;
  thumbnail: string;
  fileName: string;
  fileSize: number;
  duration: number;
  dimensions: {
    width: number;
    height: number;
  };
}

// Audio message (voice note)
interface AudioMessage extends BaseMessage {
  type: "audio";
  content?: string | null;
  mediaUrl: string;
  fileName: string;
  fileSize: number;
  duration: number;
  waveform?: number[];
}

// Document message
interface DocumentMessage extends BaseMessage {
  type: "document";
  content?: string;
  mediaUrl: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  thumbnail?: string;
}

// Location message
interface LocationMessage extends BaseMessage {
  type: "location";
  content?: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  locationName?: string;
}

// Contact card message
interface ContactMessage extends BaseMessage {
  type: "contact";
  content?: string;
  contactInfo: {
    name: string;
    phoneNumber: string;
    email?: string;
    avatar?: string;
  };
}

// System message
interface SystemMessage {
  id: string;
  type: "system";
  content: string;
  timestamp: number;
  systemEventType: SystemEventType;
  metadata?: Record<string, any>;
}

// Sticker message
interface StickerMessage extends BaseMessage {
  type: "sticker";
  stickerUrl: string;
  stickerPackId: string;
  stickerId: string;
  content?: string | null;
}

// Poll message
interface PollMessage extends BaseMessage {
  type: "poll";
  content: string;
  options: PollOption[];
  allowMultipleVotes: boolean;
}

// Disappearing message
interface DisappearingMessage extends BaseMessage {
  type: "text" | "image" | "video" | "audio" | "document";
  content: string;
  disappearing: true;
  expiresAt: number;
  mediaUrl?: string;
  // Other media properties might apply depending on the type
}

interface EditHistoryItem {
  content: string;
  timestamp: number;
}

interface Mention {
  userId: string;
  startIndex: number;
  endIndex: number;
}

interface PollOption {
  id: string;
  text: string;
  votes: string[]; // array of userIds
}

type SystemEventType =
  | "userJoined"
  | "userLeft"
  | "userAdded"
  | "userRemoved"
  | "groupCreated"
  | "groupIconChanged"
  | "groupNameChanged"
  | "groupDescriptionChanged"
  | "callMissed"
  | "callStarted"
  | "callEnded"
  | "encryptionEnabled"
  | "messageDeleted";

// Chat participants
interface User {
  id: string;
  name: string;
  profilePicture?: string;
  phoneNumber: string;
  status: "online" | "offline" | "typing" | "recording" | "away";
  lastSeen: number;
}

// Chat information
interface Chat {
  id: string;
  type: "private" | "group";
  participants: string[]; // array of userIds
  createdAt: number;
  name?: string | null;
  description?: string | null;
  icon?: string | null;
  groupAdmins?: string[]; // array of userIds for admins (for group chats)
  settings: {
    muted: boolean;
    pinned: boolean;
    disappearingMessages?: {
      enabled: boolean;
      duration: number; // in seconds
    };
  };
}

// types/types.ts - First let's define the types (this file probably exists but wasn't provided)
export type MessageType =
  | "text"
  | "image"
  | "video"
  | "audio"
  | "document"
  | "location"
  | "contact"
  | "system"
  | "sticker"
  | "poll";
export type MessageStatus = "sent" | "delivered" | "read";

export interface Reaction {
  userId: string;
  emoji: string;
  timestamp: number;
}

export interface BaseMessage {
  id: string;
  senderId: string;
  timestamp: string;
  status: MessageStatus;
  reactions: Reaction[];
  replyTo?: string | null;
  edited?: boolean;
  editHistory?: { content: string; timestamp: string }[];
  deletedForEveryone?: boolean;
  forwardedFrom?: string | null;
  mentions?: { userId: string; startIndex: number; endIndex: number }[];
  isEditing?: boolean;
}

export interface TextMessage extends BaseMessage {
  type: "text";
  content: string;
}

export interface MediaMessage extends BaseMessage {
  type: "image" | "video" | "audio" | "document";
  content?: string;
  mediaUrl: string;
  fileName?: string;
  fileSize?: number;
}

export type Message = TextMessage | MediaMessage;

export interface Participant {
  id?: string;
  name: string;
  avatar?: string;
  setOtherName: (newName: string) => void;
  setOtherAvatar: (newAvatar: string) => void;
}
