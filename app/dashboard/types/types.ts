export type Message = {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
  isEditing?: boolean;
  reactions?: string[];
};

export type Participant = {
  name: string;
  avatar?: string;
};
