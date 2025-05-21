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
import { DOMAIN_PLAYLIST_IDS, DATA_SCIENCE_PLAYLIST_IDS, GAME_DEV_PLAYLIST_IDS, AI_PLAYLIST_IDS, MOBILE_DEV_PLAYLIST_IDS } from '../Courses/Courses';

const API_KEY = 'AIzaSyD-SJkFXqteSzaQPVUSqo5Lq3CaQh2j5pU';
const TECHNOLOGY_API_KEY = 'AIzaSyCrHMb5V__f_D2dNBNvGSeSzf2ziZnSKJs';
const AI_API_KEY = 'AIzaSyAF_buLKadyaFn0CwatrPP545plDQ_NQ4A';
const MOBILE_DEV_API_KEY = 'AIzaSyCrHMb5V__f_D2dNBNvGSeSzf2ziZnSKJs';

const PLAYLIST_ID = 'PLAY30bf7ZN4yWIfNufseR9IcbJzCZwCNP';

const PLAYLIST_IDS = [
  'PLsyeobzWxl7oa1WO9n4cP3OY9nOtUcZIg',
  'PLsyeobzWxl7qbKoSgR5ub6jolI8-ocxCF',
  'PLsyeobzWxl7q6oUFts2erdot6jxF_lisP',
  'PLsyeobzWxl7rccHHxqmSaNLD2gf7t_Eip',
  'PLsyeobzWxl7pSqMzPF_SlvQ0IdcGA-XI2',
  'PLsyeobzWxl7poL9JTVyndKe62ieoN-MZ3',
  'PLsyeobzWxl7rooJFZhc3qPLwVROovGCfh',
  'PLUhfM8afLE_N2rYb3C6BE6nBn6v_oCY9A',
  'PLUhfM8afLE_OaJOVXCboP9PRuhvirFqgk',
  'PLUhfM8afLE_NAzt-k3CIs4m4yndkku80D',
  'PLUhfM8afLE_Pn6ar3NLVHJ5WrH9mmQjbd',
  'PLUhfM8afLE_OhwmYSj3I0pc-7eV4gdhHh',
  'PLUhfM8afLE_OwjgXnBxikbym0d3QGvhTZ',
  'PLSrm9z4zp4mFwug3OIZnL9Fq_txkIhNJc',
  'PLSrm9z4zp4mFttjku-3wiRkPH1lDRQLYy',
  'PLSrm9z4zp4mHWc6emIR_X4WcLLA5pD2Fp',
  'PLSrm9z4zp4mGmSn4w5fBs5EsRiQxTSl-r',
  'PLSrm9z4zp4mE-o3sPq-PqzGHoFAIsQFI6',
  'PLMRqhzcHGw1YZ63-rrun604ee7M4iglaJ',
  'PLMRqhzcHGw1aYtbJQUR1lhmPzzaCQWl8z',
  'PLMRqhzcHGw1bXAOgzO8HokHyq9vmSeq1L',
  'PLMRqhzcHGw1ZsFRLAWa_Axx7daXteynjh',
  'PLMRqhzcHGw1Z-lZaaun3A3mV9PbEfHANI',
  'PLMRqhzcHGw1b89DXHOVA77ozWXWmuBkWX',
  'PLRAV69dS1uWRH0QDzQaKLQEYD26YCQ5eS',
  'PLRAV69dS1uWQ0DG7Z9oDOTCCGz_96ntzc',
  'PLRAV69dS1uWTNPzObtUpbxe1L1lB97z2R',
  'PLRAV69dS1uWR7KF-zV6YPYtKYEHENETyE',
  'PLRAV69dS1uWTcGaBdIhAU4rdvhWKl1spk',
  'PLRAV69dS1uWSjBBJ-egNNOd4mdblt1P4c',
  'PLRAV69dS1uWRPSfKzwZsIm-Axxq-LxqhW',
  'PL4cUxeGkcC9hNTz3sxqGTfxAwU-DIHJd2',
  'PL4cUxeGkcC9hgO93oEHPBMuLA20y0SBVK',
  'PL4cUxeGkcC9gwXT3edSVZitfmIhRcwx_T',
  'PL4cUxeGkcC9ic9O6xDW2d1qMp3rMOb0Nu',
  'PLlrATfBNZ98dudnM48yfGUldqGD0S4FFb',
  'PLZPZq0r_RZOOzY_vR4zJM32SqsSInGMwe',
  'PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on',
  'PLWKjhJtqVAbmUE5IqyfGYEYjrZBYzaT4m',
  'PLz8TdOA7NTzR1NxoC8yRIWfaO0Yrj9gVB',
  'PLAY30bf7ZN4yWIfNufseR9IcbJzCZwCNP',
  'PLAY30bf7ZN4zxLRs7Bxno0m3EQxemRoKo',
  'PLAY30bf7ZN4wroHBS3y_5XYQh_hy_PdvZ',
  'PLAY30bf7ZN4zVbF1V8X2zdsMnMJmUPIG_',
  'PLAY30bf7ZN4wrOAKoZ0TYF67rJMDy_CUV',
  'PLAY30bf7ZN4wI9SN4YMowKsU4geowi7w-',
  'PL_67py5gIqwPMI9sBUdDdEMVecZaXBBAK',
  'PL_67py5gIqwMiAoDhxIgt_z6vOt-6AYUr',
  'PL_67py5gIqwPpckEnMY3JtiRcJqqWUf3_',
  'PL_67py5gIqwPKo0gROo4uPLCSllZD7xt6'
];

const ADDITIONAL_PLAYLIST_IDS = [
  'PLZPZq0r_RZOO1zkgO4bIdfuLpizCeHYKv',
  'PLZPZq0r_RZOOxqHgOzPyCzIl4AJjXbCYt',
  'PLZPZq0r_RZOMRMjHB_IEBjOW_ufr00yG1',
  'PLZPZq0r_RZOOzY_vR4zJM32SqsSInGMwe',
  'PLZPZq0r_RZOMHoXIcxze_lP97j2Ase2on',
  'PLZPZq0r_RZOPNy28FDBys3GVP2LiaIyP_',
  'PL6n9fhu94yhWbn0ygHP_mLNk0hobvdvnj',
  'PL6n9fhu94yhWjzB2ss5SPaEUboyJAx-XM',
  'PL6n9fhu94yhVSqRSfp-6xJjVqR3xWK2IY',
  'PL6n9fhu94yhWlAv3hnHzOaMSeggILsZFs',
  'PLZPZq0r_RZOOkUQbat8LyQii36cJf2SWT',
  'PLBlnK6fEyqRhgMzWqbZXXd8TrBXtQiV3l',
  'PLBlnK6fEyqRjARC5ewEBG9FC-2ivxQKVA',
  'PLBlnK6fEyqRh6E-UvHKyBhoQNrRDSG-4j',
  'PLBlnK6fEyqRhytV4M_S_Nk5OJt_E0jEbW',
  'PLBlnK6fEyqRjcL24VVkQXUI_8KLv1zWc8',
  'PLZPZq0r_RZOOj_NOZYq_R2PECIMglLemc',
  'PLYwpaL_SFmcBqvw6QTRsA8gvZL3ao2ON-',
  'PLYwpaL_SFmcDz_8-pygbcNvNF0DEwKoIL',
  'PLYwpaL_SFmcAtxMe7ahYC4ZYjQHun_b-T',
  'PLu_C7oK7LrjqH7IxdBS2tMr20AHxPzcuf',
  'PLu_C7oK7Lrjr-h9d5rCjQ5X-oZuDY1ZYH',
  'PLFt_AvWsXl0fxTBI16tPwuVmF6l3_NkYF',
  'PLFt_AvWsXl0f_rlmTWiSPs8EXVuEnyB1h',
  'PLFt_AvWsXl0f4c56CbvYi038zmCmoZ4CQ',
  'PLFt_AvWsXl0cD2LPxcjxVjWTQLxJqKpgZ',
  'PLFt_AvWsXl0djuNM22htmz3BUtHHtOh7v',
  'PLFt_AvWsXl0fnA91TcmkRyhhixX9CO3Lw',
  'PLZPZq0r_RZON1eaqfafTnEexRzuHbfZX8',
  'PLWKjhJtqVAblvI1i46ScbKV2jH1gdL7VQ',
  'PLWKjhJtqVAbkoMsX4hgwxbJZW4aB0cbaB',
  'PLWKjhJtqVAblQe2CCWqV4Zy3LY01Z8aF1',
  'PLTjRvDozrdlxj5wgH4qkvwSOdHLOCx10f',
  'PL6Omre3duO-MPNUCcNO8TkhKqwq-9k313',
  'PL6Omre3duO-NB322ACbm4_HfdX_V02ugn',
  'PL6Omre3duO-P93dIofLn_QJv_MpmolO4D',
  'PL6Omre3duO-OqL2T_jENSW1JLITQS8_nj',
  'PL6Omre3duO-PMeRkxjU7pRkAlwqFXNWm9',
  'PL6Omre3duO-M1ISixj6xonN5_rSowMvoQ',
  'PL6Omre3duO-M1aP3UDtMHLM7rewneerqV',
  'PLeo1K3hjS3ut2o1ay5Dqh-r1kq6ZU8W0M',
  'PLeo1K3hjS3uvaRHZLl-jLovIjBP14QTXc',
  'PLeo1K3hjS3uuRh6Mvo3GJrXs87CEMGPWn',
  'PLeo1K3hjS3uu_n_a__MI_KktGTLYopZ12',
  'PLeo1K3hjS3uua3c-0jHMharEJRpmNT2gh',
  'PLYwpaL_SFmcCgBLQ9UCxMVWKqR8FEUzJ8',
  'PLYwpaL_SFmcDJ4M2i83kIwwnPit1aIOhQ',
  'PLWKjhJtqVAbl5SlE6aBHzUVZ1e6q1Wz0v',
  'PLoYCgNOIyGABDU532eesybur5HPBVfC1G',
  'PLTjRvDozrdlxEIuOBZkMAK5uiqp8rHUax',
  'PLXNgqM9ig24c7IdumyymD9q3e2hsz9U1m',
  'PLC3y8-rFHvwhIEc4I4YsRz5C7GOBnxSJY',
  'PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI',
  'PL1w1q3fL4pmg0ArGMe7-tZcDCYMvU0dG7',
  'PL1w1q3fL4pmj9k1FrJ3Pe91EPub2_h4jF',
  'PLTjRvDozrdlxEIuOBZkMAK5uiqp8rHUax',
  'PLZPZq0r_RZOO1zkgO4bIdfuLpizCeHYKv',
  'PLZPZq0r_RZOOxqHgOzPyCzIl4AJjXbCYt',
  'PLZPZq0r_RZOONc3kkuRmBOlj67YAG6jqo',
  'PLZPZq0r_RZOPoNttk9beDhO_Bu5DA-xwP',
  'PLWKjhJtqVAbnSe1qUNMG7AbPmjIG54u88',
  'PLewGdhs0k9xG6TRPgHDO03kN0wTmehw_0'
];

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
    console.log('Generating roadmap with multiple API keys...');
    setLoading(true);

    try {
      const allVideos = [];
      const apiKeys = [TECHNOLOGY_API_KEY, AI_API_KEY, MOBILE_DEV_API_KEY];
      const playlistIds = [...ADDITIONAL_PLAYLIST_IDS]; // Use the existing playlist IDs

      for (let i = 0; i < playlistIds.length; i++) {
        const apiKey = apiKeys[i % apiKeys.length]; // Rotate through API keys
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

      const videoList = allVideos.map(
        (video) => `- [${video.snippet.title}](https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId})`
      ).join('\n');

      const roadmapPrompt = `
Here is the list of videos from the playlists:

${videoList}

You can use these videos to create a personalized learning roadmap.`;

      console.log('Roadmap prompt:', roadmapPrompt);

      setMessages((prev) => [
        ...prev,
        { role: "bot", text: roadmapPrompt },
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

      <div className="category-buttons">
        <button onClick={() => setActiveCategory('domain')}>Domain</button>
        <button onClick={() => setActiveCategory('data')}>Data Science</button>
        <button onClick={() => setActiveCategory('game')}>Game Dev</button>
        <button onClick={() => setActiveCategory('ai')}>AI</button>
        <button onClick={() => setActiveCategory('mobile')}>Mobile</button>
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
                {msg.text && Array.from(msg.text.matchAll(/\[([^\]]+)\]\((https?:\/\/www\.youtube\.com\/watch\?v=[^\)]+)\)/g)).map((match, i) => (
                  <div key={i} className="youtube-video-list">
                    <a href={match[2]} target="_blank" rel="noopener noreferrer">
                      <img src={`https://img.youtube.com/vi/${new URL(match[2]).searchParams.get('v')}/mqdefault.jpg`} alt={match[1]} style={{width: '200px', borderRadius: '8px', margin: '8px 0'}} />
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        <img src={YoutubeIcon} alt="YouTube" style={{width:'24px'}} />
                        <span style={{fontWeight:'bold'}}>{match[1]}</span>
                      </div>
                    </a>
                  </div>
                ))}
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
        <button className="generate-btn" onClick={handleGenerate}>Generate</button>
        <button className="generate-btn" onClick={handleGenerateRoadmap}>Generate Roadmap</button>
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
