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

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(initialQuestion);
  const [loading, setLoading] = useState(false);
  const { addToChatHistory } = useChat();

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    // Combine message history into a prompt
    const historyText = updatedMessages
      .map((msg) => `${msg.role === "user" ? "User" : "AI"}: ${msg.text}`)
      .join("\n");

    const prompt = `
You are an educational AI chatbot. Ask users one question at a time based on what they’ve said.
Avoid giving list answers. Focus only on education and learning.
Here is the current chat history:

${historyText}

Now continue the conversation naturally by asking the next helpful educational question.
`;

    const aiResponse = await callGeminiFlash(prompt);

    const botMessage = { role: "bot", text: aiResponse };
    setMessages((prev) => [...prev, botMessage]);
    addToChatHistory(input, aiResponse);
    setLoading(false);
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="User" />
      </div>

      <div className="chat-response">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.role === "user" ? "user-message" : "ai-message"}`}
          >
            {msg.role === "bot" ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              <p>{msg.text}</p>
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
            value={input}
            onChange={(e) => setInput(e.target.value)}
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
        <button className='generate-btn'>Generate</button>
        <p className="bottom-info">
          Chat bot is a large language model powered by Gemini
        </p>
      </div>
    </div>
  );
};

export default ChatBot;
