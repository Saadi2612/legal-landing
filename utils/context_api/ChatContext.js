"use client";

import React, { createContext, useContext, useState } from "react";

// Create a context
const ChatContext = createContext();

// Create a provider component
export const ChatProvider = ({ children }) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChatTitle, setSelectedChatTitle] = useState(null);
  const [refreshChat, setRefreshChat] = useState(false);

  const [briefData, setBriefData] = useState();
  const handleChatClick = (chatId, chatTitle) => {
    // You might perform additional logic here (e.g., making API requests)
    setSelectedChatId(chatId);
    setSelectedChatTitle(chatTitle);
  };
  const handleSetChatTitle = (chatTitle) => {
    // You might perform additional logic here (e.g., making API requests)
    setSelectedChatTitle(chatTitle);
  };

  return (
    <ChatContext.Provider
      value={{
        selectedChatId,
        handleChatClick,
        handleSetChatTitle,
        selectedChatTitle,
        briefData,
        setBriefData,
        refreshChat,
        setRefreshChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Create a custom hook for using the chat context
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
