import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatboxes, setChatboxes] = useState([]);

  return (
    <ChatContext.Provider value={{ chatboxes, setChatboxes }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
