// src/Pages/ChatBot/ChatBot.jsx

import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ChatBot.css';
import { assets } from '../../assets/assets';
import callGeminiFlash from '../../Config/Gemini';
import { useChat } from '../../Context/ChatContext';
import ReactMarkdown from 'react-markdown';

const ChatBot = () => {
  const location = useLocation();
  const initialQuestion = location.state?.question || '';

  const [prompt, setPrompt] = useState(initialQuestion);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false);
  const [messages, setMessages] = useState([]);
  const { addToChatHistory } = useChat();

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage = { text: prompt, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    const reply = await callGeminiFlash(prompt);
    const aiMessage = { text: reply, sender: "ai" };
    setMessages((prev) => [...prev, aiMessage]);

    addToChatHistory(prompt, reply);

    setLoading(false);
    setPrompt('');
    setShowResponse(true);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User" />
      </div>

      <div className="chat-response">
        {messages.map((message, index) => (
          <div
            key={index}
            id={message.text}
            className={message.sender === "user" ? "user-message" : "ai-message"}
          >
            {message.sender === "ai" ? (
              <ReactMarkdown>{message.text}</ReactMarkdown>
            ) : (
              <p>{message.text}</p>
            )}
          </div>
        ))}
        {loading && <p>Thinking...</p>}
      </div>

      <div className="main-botom">
        <div className="serch-box">
          <input
            type="text"
            placeholder="Enter a prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <div
            onClick={handleSend}
            style={{ cursor: 'pointer' }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          >
            <img src={assets.gallery_icon} alt="Gallery" />
            <img src={assets.mic_icon} alt="Mic" />
            <img src={assets.send_icon} alt="Send" />
          </div>
        </div>
        <p className="bottom-info">
          Chat bot is a large language model powered by Gemini
        </p>
      </div>
    </div>
  );
};

export default ChatBot;
