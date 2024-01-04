import { createContext, useContext, useState } from "react";

export const MessageContext = createContext();

export const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  return (
    <MessageContext.Provider value={{ messages, setMessages }}>
      {children}
    </MessageContext.Provider>
  );
};

export function useMessages() {
  return useContext(MessageContext);
}
