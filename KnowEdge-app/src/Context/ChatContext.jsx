import React, { createContext, useContext, useState } from 'react';

// Create a ChatContext to share chat history between components
const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [chatHistory, setChatHistory] = useState([]);

    const addToChatHistory = (userMessage, aiResponse) => {
        setChatHistory((prevHistory) => [
            ...prevHistory,
            { userMessage, aiResponse }
        ]);
    };

    return (
        <ChatContext.Provider value={{ chatHistory, addToChatHistory }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);