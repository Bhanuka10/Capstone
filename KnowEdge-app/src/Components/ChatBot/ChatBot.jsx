import React from 'react'
import './ChatBot.css'
import { assets } from '../../assets/assets'

const ChatBot=() => {
  return (
    <div className="main">
      <div className='nav' >
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />

      </div>
      <div className='main-container'>
        <div className="greet">
          <p><span>Hellow,there</span></p>
          <p>How can i Help you today</p>
        </div>
        <div className="cards">
          <div className="card">
            <p>Can you create a step-by-step roadmap for becoming a full-stack developer?</p>
            <img src={assets.compass_icon} alt="" />
          </div>
          <div className="card">
            <p>How should I structure my daily study schedule to master AI and machine learning in 6 months?</p>
            <img src={assets.code_icon} alt="" />
          </div>
          <div className="card">
            <p>What are the essential topics I need to learn to become a cybersecurity expert?</p>
            <img src={assets.bulb_icon} alt="" />
          </div>

        </div>
        <div className="main-botom">
          <div className="serch-box">
            <input type="text" placeholder='Enter a prompt here' />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              <img src={assets.send_icon} alt="" />
            </div>
          </div>
          <p className="bottom-info">
            Chat bot is a large language model trained by Gemini 
          </p>
        </div>

      </div>
    </div>
    
  )
}

export default ChatBot
