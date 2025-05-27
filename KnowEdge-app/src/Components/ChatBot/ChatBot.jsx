// src/Pages/ChatBot/ChatBot.jsx

import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ChatBot.css";
import { assets } from "../../assets/assets";
import callGeminiFlash from "../../Config/Gemini";
import { useChat } from "../../Context/ChatContext";
import ReactMarkdown from "react-markdown";
import Roadmap from "../Roadmap/Roadmap";
import YoutubeIcon from '../../assets/youtube_icon.png';
import {
  DOMAIN_PLAYLIST_IDS,
  DATA_SCIENCE_PLAYLIST_IDS,
  GAME_DEV_PLAYLIST_IDS,
  AI_PLAYLIST_IDS,
  MOBILE_DEV_PLAYLIST_IDS,
  ADDITIONAL_PLAYLIST_IDS
} from '../../Config/playlistData';

const API_KEY = 'AIzaSyD-SJkFXqteSzaQPVUSqo5Lq3CaQh2j5pU';
const TECHNOLOGY_API_KEY = 'AIzaSyCrHMb5V__f_D2dNBNvGSeSzf2ziZnSKJs';
const AI_API_KEY = 'AIzaSyAF_buLKadyaFn0CwatrPP545plDQ_NQ4A';
const MOBILE_DEV_API_KEY = 'AIzaSyCrHMb5V__f_D2dNBNvGSeSzf2ziZnSKJs';

function Chatbot({ onProfileUpdate }) {
  const location = useLocation();
  const initialQuestion = location.state?.question || "";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(initialQuestion);
  const [loading, setLoading] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [roadmapContent, setRoadmapContent] = useState("");
  const [activeCategory, setActiveCategory] = useState('domain'); // Default to 'domain'
  const chatEndRef = useRef(null);
  const { addToChatHistory } = useChat();

  const categoryMap = {
    domain: DOMAIN_PLAYLIST_IDS,
    data: DATA_SCIENCE_PLAYLIST_IDS,
    game: GAME_DEV_PLAYLIST_IDS,
    ai: AI_PLAYLIST_IDS,
    mobile: MOBILE_DEV_PLAYLIST_IDS,
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchPlaylistItems = async (playlistId, apiKey) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${apiKey}`
      );

      if (!response.ok) {
        console.error('API Error:', response.status, response.statusText);
        return [];
      }

      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        console.warn('No videos found in the playlist:', playlistId);
      }

      return data.items || [];
    } catch (error) {
      console.error('Failed to fetch playlist items:', error);
      return [];
    }
  };

  const fetchAllPlaylists = async (playlistIds) => {
    const allVideos = [];
    for (let id of playlistIds) {
      const videos = await fetchPlaylistItems(id, API_KEY);
      allVideos.push(...videos);
    }
    return allVideos;
  };

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

  const handleGenerateRoadmap = async () => {
    setLoading(true);
    try {
      const allVideos = [];
      // Use the playlist group based on the activeCategory (user's interest)
      const playlistIds = categoryMap[activeCategory] || DOMAIN_PLAYLIST_IDS;
      const apiKeys = [TECHNOLOGY_API_KEY, AI_API_KEY, MOBILE_DEV_API_KEY];
      for (let i = 0; i < playlistIds.length; i++) {
        const apiKey = apiKeys[i % apiKeys.length];
        const videos = await fetchPlaylistItems(playlistIds[i], apiKey);
        allVideos.push(...videos);
      }

      console.log('Fetched videos:', allVideos);

      if (allVideos.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "No videos found in the playlists. Please check the playlist IDs or try again later.",
          },
        ]);
        setLoading(false);
        return;
      }

      // Extract user preferences from chat history
      const userPreferences = messages
        .filter(msg => msg.role === "user")
        .map(msg => msg.text.toLowerCase())
        .join(" ");

      // Use keywords only (remove stopwords and short words)
      const stopwords = ["the","is","at","which","on","a","an","and","or","for","to","of","in","with","by","as","from","that","this","it","are","be","was","were","has","have","had","but","not","so","if","then","than","too","very","can","will","just","about","into","over","after","before","more","most","some","such","no","nor","only","own","same","so","than","too","very","s","t","can","will","don","should","now"];
      const keywords = userPreferences.split(/\W+/).filter(word => word.length > 2 && !stopwords.includes(word));

      // Filter videos based on keywords (title and description)
      const relevantVideos = allVideos.filter(video => {
        const title = video.snippet.title.toLowerCase();
        const description = (video.snippet.description || '').toLowerCase();
        return keywords.some(keyword =>
          title.includes(keyword) || description.includes(keyword)
        );
      });

      // Remove already suggested videos
      const suggestedVideoIds = new Set(messages
        .filter(msg => msg.role === "bot" && msg.suggestedVideos)
        .flatMap(msg => msg.suggestedVideos));

      const uniqueVideos = relevantVideos.filter(video => !suggestedVideoIds.has(video.snippet.resourceId.videoId));

      // Select the top 20 videos
      const selectedVideos = uniqueVideos.slice(0, 20);

      if (selectedVideos.length === 0) {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: "No new relevant videos found based on your preferences. Please try asking something different.",
          },
        ]);
        setLoading(false);
        return;
      }

      const videoList = selectedVideos.map(
        (video) => `- [${video.snippet.title}](https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId})`
      ).join('\n');

      const roadmapPrompt = `
Based on your chat, here is a personalized learning roadmap with 20 videos:

${videoList}

These videos are tailored to help you progress further in your learning journey.`;

      console.log('Roadmap prompt:', roadmapPrompt);

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: roadmapPrompt, suggestedVideos: selectedVideos.map(video => video.snippet.resourceId.videoId) },
        {
          role: "bot",
          text: "download this roadmap:",
          isSaveButton: true,
          saveAction: () => {
            const blob = new Blob([roadmapPrompt], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'roadmap.txt';
            link.click();
          },
        },
      ]);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "An error occurred while generating the roadmap. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
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
              <>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
                {/* Extract and display YouTube video links as thumbnails */}
                {msg.text && Array.from(msg.text.matchAll(/\[([^\]]+)\]\((https?:\/\/www\.youtube\.com\/watch\?v=[^\)]+)\)/g)).map((match, i) => {
                  const title = match[1];
                  const videoUrl = match[2];
                  const videoId = new URL(videoUrl).searchParams.get('v');

                  return (
                    <div key={i} className="youtube-video-list" style={{ marginBottom: '16px' }}>
                      <a href={videoUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <img
                          src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                          alt={title}
                          style={{
                            width: '100%',
                            maxWidth: '360px',
                            borderRadius: '10px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                          }}
                        />
                        <p style={{
                          marginTop: '6px',
                          fontWeight: '500',
                          fontSize: '15px',
                          maxWidth: '360px'
                        }}>{title}</p>
                      </a>
                    </div>
                  );
                })}
                {msg.isSaveButton && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="download-btn" onClick={msg.saveAction}>Download</button>
                    <button className="save-btn">Save</button>
                  </div>
                )}
              </>
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
        <div className="gbutton">
          <button className="generate-btn" onClick={handleGenerate}>Generate</button>
          <button className="generate-btn" onClick={handleGenerateRoadmap}>Generate Roadmap</button>
        </div>
        {showRoadmap && (
          <div className="ai-roadmap">
            <h2>AI Generated Roadmap</h2>
            <ReactMarkdown>{roadmapContent}</ReactMarkdown>
            <button className="save-btn" onClick={() => {
              const roadmapText = messages.find(msg => msg.isRoadmap)?.text;
              if (roadmapText) {
                const blob = new Blob([roadmapText], { type: 'text/plain' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'roadmap.txt';
                link.click();
              } else {
                alert('No roadmap available to save. Please generate one first.');
              }
            }}>Save Roadmap</button>
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
