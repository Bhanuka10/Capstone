import React, { useState } from 'react';
import './ChatBot.css';
import { assets } from '../../assets/assets';
import callGeminiFlash from '../../Config/Gemini';

const ChatBot = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResponse, setShowResponse] = useState(false); // State to toggle main-container visibility

  const handleSend = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    const reply = await callGeminiFlash(prompt);
    setResponse(reply);
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

      {showResponse ? (
        <div className="chat-response">
          {loading ? <p>Thinking...</p> : <p>{response}</p>}
        </div>
      ) : (
        <div className="main-container">
          <div className="greet">
            <p><span>Hello, there</span></p>
            <p>How can I help you today?</p>
          </div>

          <div className="cards">
            <div className="card" onClick={() => setPrompt("Can you create a step-by-step roadmap for becoming a full-stack developer?")}>
              <p>Can you create a step-by-step roadmap for becoming a full-stack developer?</p>
              <img src={assets.compass_icon} alt="Compass" />
            </div>
            <div className="card" onClick={() => setPrompt("How should I structure my daily study schedule to master AI and machine learning in 6 months?")}>
              <p>How should I structure my daily study schedule to master AI and machine learning in 6 months?</p>
              <img src={assets.code_icon} alt="Code" />
            </div>
            <div className="card" onClick={() => setPrompt("What are the essential topics I need to learn to become a cybersecurity expert?")}>
              <p>What are the essential topics I need to learn to become a cybersecurity expert?</p>
              <img src={assets.bulb_icon} alt="Bulb" />
            </div>
          </div>
        </div>
      )}

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
