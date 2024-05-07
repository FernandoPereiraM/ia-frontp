export interface ChatMessage {
  sender: string;
  content: string;
  image?: string | ArrayBuffer | null;
  timestamp: Date;
}
