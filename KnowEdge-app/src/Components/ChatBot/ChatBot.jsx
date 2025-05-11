import React, { useState } from 'react';
import './ChatBot.css';
import { assets } from '../../assets/assets';
import callGeminiFlash from '../../Config/Gemini';

const ChatBot = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false); // State to toggle main-container visibility
  const [messages, setMessages] = useState([]); // State to store all messages

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage = { text: prompt, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]); // Add user message to messages

    setLoading(true);
    const reply = await callGeminiFlash(prompt);
    const aiMessage = { text: reply, sender: "ai" };
    setMessages((prevMessages) => [...prevMessages, aiMessage]); // Add AI message to messages

    setLoading(false);
    setPrompt('');
    setShowResponse(true); // Show response and hide main-container
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
            className={message.sender === "user" ? "user-message" : "ai-message"}
          >
            <p>{message.text}</p>
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
          <div onClick={handleSend} style={{ cursor: 'pointer' }}>
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
