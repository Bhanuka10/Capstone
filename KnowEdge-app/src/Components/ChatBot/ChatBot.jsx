// src/Pages/ChatBot/ChatBot.jsx

import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ChatBot.css";
import { assets } from "../../assets/assets";
import callGeminiFlash from "../../Config/Gemini";
import { useChat } from "../../Context/ChatContext";
import ReactMarkdown from "react-markdown";
import Roadmap from "../Roadmap/Roadmap";

function Chatbot({ onProfileUpdate }) {
  const location = useLocation();
  const initialQuestion = location.state?.question || "";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(initialQuestion);
  const [loading, setLoading] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [roadmapContent, setRoadmapContent] = useState("");
  const chatEndRef = useRef(null);
  const { addToChatHistory } = useChat();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const historyText = updatedMessages
      .map((msg) => `${msg.role === "user" ? "User" : "AI"}: ${msg.text}`)
      .join("\n");

    const prompt = `
You're an AI tutor. Guide users in learning by asking one friendly educational question at a time.

- Focus only on education: ambition, skill level, subjects of interest.
- Never give a list unless asked.
- Extract their goal, skill level, and current struggles silently.
- Speak casually, like a friend.

Chat so far:
${historyText}

Now, respond naturally with the next educational question.
`;

    const aiResponse = await callGeminiFlash(prompt);
    const botMessage = { role: "bot", text: aiResponse };
    setMessages([...updatedMessages, botMessage]);
    setLoading(false);

    extractProfileData(input + " " + aiResponse);
    addToChatHistory(input, aiResponse);
  };

  const handleGenerate = async () => {
    setLoading(true);
    // Use the chat so far to generate a roadmap
    const historyText = messages
      .map((msg) => `${msg.role === "user" ? "User" : "AI"}: ${msg.text}`)
      .join("\n");
    const roadmapPrompt = `
You are an AI tutor. Based on the following chat history, generate a step-by-step personalized learning roadmap for the user. The roadmap should be clear, actionable, and tailored to the user's goals, skills, and struggles. Use friendly, encouraging language. Format the roadmap as a numbered or bulleted list, with each step on a new line.

Chat so far:
${historyText}

Respond ONLY with the roadmap, no extra text.`;
    const roadmap = await callGeminiFlash(roadmapPrompt);
    setMessages((prev) => [
      ...prev,
      { role: "bot", text: roadmap, isRoadmap: true }
    ]);
    setShowRoadmap(true);
    setLoading(false);
  };

  const extractProfileData = async (text) => {
    const extractionPrompt = `
Given the following chat, extract the user's:
- Ambition/goal
- Skill level
- Educational background
- Struggles or learning needs

Respond ONLY in JSON like this:
{
  "goal": "...",
  "skills": "...",
  "education": "...",
  "struggles": "..."
}

Text:
${text}
    `;

    const extracted = await callGeminiFlash(extractionPrompt);

    try {
      const json = JSON.parse(extracted.match(/\{[\s\S]*\}/)?.[0]);
      onProfileUpdate?.(json);
    } catch (e) {
      console.log("Extraction failed", e);
    }
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
            {msg.isRoadmap ? (
              <div className="ai-roadmap">
                <h2>AI Generated Roadmap</h2>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ) : msg.role === "bot" ? (
              <ReactMarkdown>{msg.text}</ReactMarkdown>
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
        {loading && (
          <div className="chat-message bot">
            <div className="avatar">🤖</div>
            <div className="message-text typing">Typing...</div>
          </div>
        )}
        <div ref={chatEndRef}></div>
      </div>

      <div className="main-botom">
        <div className="serch-box">
          <input
            type="text"
            placeholder="Enter a prompt here"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <div
            onClick={handleSend}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          >
            <img src={assets.gallery_icon} alt="Gallery" />
            <img src={assets.mic_icon} alt="Mic" />
            <img src={assets.send_icon} alt="Send" />
          </div>
        </div>
        <button className="generate-btn" onClick={handleGenerate}>Generate</button>
        {showRoadmap && (
          <div className="ai-roadmap">
            <h2>AI Generated Roadmap</h2>
            <ReactMarkdown>{roadmapContent}</ReactMarkdown>
          </div>
        )}
        <p className="bottom-info">
          Chat bot is a large language model powered by Gemini
        </p>
      </div>
    </div>
  );
}

export default Chatbot;
