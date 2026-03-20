import { LawReference } from './law';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: Date;
  references?: LawReference[];
}

export interface Conversation {
  id: string;
  title: string;
  model: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatRequest {
  messages: Omit<Message, 'id' | 'createdAt' | 'references'>[];
  model: string;
  conversationId?: string;
}

export interface ChatResponse {
  message: Message;
  conversationId: string;
}
