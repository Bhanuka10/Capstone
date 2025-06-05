// src/Pages/ChatBot/ChatBot.jsx

import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ChatBot.css";
import { assets } from "../../assets/assets";
import callGeminiFlash from "../../Config/Gemini";
import { useChat } from "../../Context/ChatContext";
import ReactMarkdown from "react-markdown";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import {
  DOMAIN_PLAYLIST_IDS,
  DATA_SCIENCE_PLAYLIST_IDS,
  GAME_DEV_PLAYLIST_IDS,
  AI_PLAYLIST_IDS,
  MOBILE_DEV_PLAYLIST_IDS
} from '../../Config/playlistData';

const API_KEYS = [
  'AIzaSyD-SJkFXqteSzaQPVUSqo5Lq3CaQh2j5pU',
  'AIzaSyCrHMb5V__f_D2dNBNvGSeSzf2ziZnSKJs',
  'AIzaSyAF_buLKadyaFn0CwatrPP545plDQ_NQ4A'
];

const auth = getAuth();
const db = getFirestore();

const categoryMap = {
  domain: DOMAIN_PLAYLIST_IDS,
  data: DATA_SCIENCE_PLAYLIST_IDS, // Ensure this is correctly mapped
  game: GAME_DEV_PLAYLIST_IDS,
  ai: AI_PLAYLIST_IDS,
  mobile: MOBILE_DEV_PLAYLIST_IDS,
};

const intentKeywords = [
  { category: 'ai', keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'neural', 'tensorflow', 'keras', 'pytorch'] },
  { category: 'data', keywords: ['data science', 'data', 'pandas', 'numpy', 'statistics', 'analysis', 'analytics', 'big data', 'spark', 'hadoop', 'sql', 'data visualization', 'data cleaning'] },
  { category: 'mobile', keywords: ['mobile', 'android', 'ios', 'react native', 'flutter', 'kotlin', 'swift', 'app', 'mobile development', 'java'] },
  { category: 'game', keywords: ['game', 'unity', 'unreal', 'gamedev', 'game development', '2d', '3d', 'vr', 'ar', 'c#'] },
  { category: 'domain', keywords: ['web', 'frontend', 'backend', 'react', 'node', 'express', 'html', 'css', 'javascript', 'typescript', 'sass', 'webpack', 'api', 'full stack', 'django', 'flask', 'php', 'ruby', 'laravel'] }
];

function detectCategoryFromText(text) {
  const lower = text.toLowerCase();
  for (const entry of intentKeywords) {
    if (entry.keywords.some(kw => lower.includes(kw))) {
      return entry.category;
    }
  }
  return 'domain'; // default fallback
}

function detectCategoryFromMessages(messages) {
  const userText = messages
    .filter(msg => msg.role === "user")
    .map(msg => msg.text.toLowerCase())
    .join(" ");

  // Prioritize ML/AI and algorithm-related keywords
  if (userText.match(/\b(machine learning|ml|artificial intelligence|ai|deep learning|neural|algorithm|algorithms|scikit-learn|tensorflow|pytorch)\b/)) return 'ai';
  if (userText.match(/\b(data science|data|pandas|numpy|statistics|analysis|analytics)\b/)) return 'data';
  if (userText.match(/\b(mobile|android|ios|react native|flutter|kotlin|swift|app)\b/)) return 'mobile';
  if (userText.match(/\b(game|unity|unreal|gamedev|game development|2d|3d)\b/)) return 'game';
  if (userText.match(/\b(web|frontend|backend|react|node|express|html|css|javascript|mern|api)\b/)) return 'domain';
  return 'domain'; // fallback
}

function Chatbot({ onProfileUpdate }) {
  const location = useLocation();
  const initialQuestion = location.state?.question || "";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState(initialQuestion);
  const [loading, setLoading] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [roadmapContent, setRoadmapContent] = useState("");
  const [activeCategory, setActiveCategory] = useState('domain');
  const chatEndRef = useRef(null);
  const { addToChatHistory } = useChat();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update category on each user message
  useEffect(() => {
    if (messages.length > 0) {
      const lastUserMsg = messages.filter(m => m.role === 'user').slice(-1)[0];
      if (lastUserMsg) {
        const detected = detectCategoryFromText(lastUserMsg.text);
        setActiveCategory(detected);
      }
    }
  }, [messages]);

  const fetchPlaylistItems = async (playlistId, apiKey) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${apiKey}`
      );
      if (!response.ok) return [];
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Failed to fetch playlist items:', error);
      return [];
    }
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
      // 1. Always detect the most relevant category
      const detectedCategory = detectCategoryFromMessages(messages);
      setActiveCategory(detectedCategory);

      // 2. Use only the relevant playlists
      const playlistIds = categoryMap[detectedCategory] || DOMAIN_PLAYLIST_IDS;
      const allVideos = [];
      for (let i = 0; i < playlistIds.length; i++) {
        const apiKey = API_KEYS[i % API_KEYS.length];
        const videos = await fetchPlaylistItems(playlistIds[i], apiKey);
        allVideos.push(...videos);
      }

      // 3. Extract user preferences and keywords
      const userPreferences = messages
        .filter(msg => msg.role === "user")
        .map(msg => msg.text.toLowerCase())
        .join(" ");

      // 4. Use keywords focused on ML/AI and algorithms
      const stopwords = ["the","is","at","which","on","a","an","and","or","for","to","of","in","with","by","as","from","that","this","it","are","be","was","were","has","have","had","but","not","so","if","then","than","too","very","can","will","just","about","into","over","after","before","more","most","some","such","no","nor","only","own","same","so","than","too","very","s","t","can","will","don","should","now"];
      let keywords = userPreferences.split(/\W+/)
        .filter(word => word.length > 2 && !stopwords.includes(word));

      // Boost with core topic keywords based on detected category
      if (activeCategory === 'ai') {
        keywords = [...new Set([...keywords, 'machine', 'learning', 'algorithm', 'algorithms', 'python', 'scikit-learn', 'tensorflow', 'pytorch', 'ml', 'ai'])];
      } else if (activeCategory === 'data') {
        keywords = [...new Set([...keywords, 'data', 'pandas', 'numpy', 'statistics', 'analysis', 'analytics'])];
      } else if (activeCategory === 'mobile') {
        keywords = [...new Set([...keywords, 'mobile', 'android', 'ios', 'react native', 'flutter', 'kotlin', 'swift', 'app'])];
      } else if (activeCategory === 'game') {
        keywords = [...new Set([...keywords, 'game', 'unity', 'unreal', 'gamedev', 'game development', '2d', '3d'])];
      } else if (activeCategory === 'domain') {
        keywords = [...new Set([...keywords, 'web', 'frontend', 'backend', 'react', 'node', 'express', 'html', 'css', 'javascript', 'mern', 'api'])];
      }

      // Score and filter videos
      const scoredVideos = allVideos.map(video => {
        const title = video.snippet.title.toLowerCase();
        const description = (video.snippet.description || '').toLowerCase();
        const matchCount = keywords.filter(keyword =>
          title.includes(keyword) || description.includes(keyword)
        ).length;
        return { video, matchCount };
      });

      const relevantVideos = scoredVideos
        .filter(v => v.matchCount > 0)
        .sort((a, b) => b.matchCount - a.matchCount)
        .map(v => v.video)
        .slice(0, 20);

      const selectedVideos = relevantVideos.slice(0, 20); // Ensure selectedVideos is defined before use

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
Based on your chat, here is a personalized machine learning roadmap with 20 videos:

${videoList}

These videos are tailored to help you progress further in your machine learning journey.
`;

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: roadmapPrompt, isRoadmap: true, suggestedVideos: selectedVideos.map(video => video.snippet.resourceId.videoId) },
        {
          role: "bot",
          text: "download this roadmap:",
          isSaveButton: true,
          saveAction: () => {
            const blob = new Blob([roadmapPrompt], { type: 'text/plain' });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'ml-roadmap.txt';
            link.click();
          },
        },
      ]);
    } catch (error) {
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

  // Save Button Function
  const handleSaveRoadmap = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("User not authenticated.");
      return;
    }
    const email = user.email;
    const roadmapMsg = messages.find((msg) => msg.isRoadmap);
    if (!roadmapMsg) {
      alert("No roadmap to save.");
      return;
    }
    try {
      await addDoc(collection(db, "users", email, "roadmaps"), {
        text: roadmapMsg.text,
        timestamp: serverTimestamp(),
      });
      alert("✅ Roadmap saved to database!");
    } catch (error) {
      alert("❌ Failed to save roadmap.");
    }
  };

  const handleSendMessage = async (userMessage) => {
    const category = detectCategory(userMessage);
    let aiResponse = '';

    if (category) {
      const roadmap = generateRoadmap(category);
      const filterKeywords = userMessage.toLowerCase().split(' '); // Extract keywords from user message
      const videos = await fetchPlaylistVideos(category, filterKeywords);

      aiResponse = roadmap;
      setMessages(prev => [...prev, { role: 'bot', text: roadmap }]);

      if (videos.length > 0) {
        setMessages(prev => [...prev, { role: 'bot', text: 'Here are some videos related to your query:' }]);
        videos.forEach(video => {
          setMessages(prev => [...prev, { role: 'bot', text: `[${video.title}](${video.url})` }]);
        });
      } else {
        setMessages(prev => [...prev, { role: 'bot', text: "No specific videos found for your request. Please try refining your query." }]);
      }
    } else {
      aiResponse = await callGeminiFlash(userMessage);
      setMessages(prev => [...prev, { role: 'bot', text: aiResponse }]);
    }

    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, 'messages'), {
        user: user.email,
        message: userMessage,
        response: aiResponse,
        timestamp: serverTimestamp(),
      });
    }

    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
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
                        <div className="video-thumbnail">
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                            alt={title}
                            style={{ width: '100%', borderRadius: '8px' }}
                          />
                          <div style={{ marginTop: '8px', fontWeight: 'bold' }}>{title}</div>
                        </div>
                      </a>
                    </div>
                  );
                })}
                {msg.isSaveButton && (
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="download-btn" onClick={msg.saveAction}>Download</button>
                    <button className="save-btn" onClick={handleSaveRoadmap}>Save</button>
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
