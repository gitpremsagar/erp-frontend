'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ChatContextType {
  selectedConversation: string;
  setSelectedConversation: (id: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [selectedConversation, setSelectedConversation] = useState('1');

  return (
    <ChatContext.Provider value={{ selectedConversation, setSelectedConversation }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}
