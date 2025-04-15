import React from 'react'
import './ChatBot.css'

const ChatBot=() => {
  return (
    <div className='chatbot-container'>
      <h1 className='chatbot-heading'>Hello There</h1>
      <h2 className='subheading'>How can I help you today?</h2>

<div className='prompt-grid'>
    <div className='prompt-box'>Can you create step-by-step roadmap for becoming a full stack developer</div>
    <div className='prompt-box'>How should I structure my daily study schedule to master AI and machine learing in 6 months?</div>
<div className='prompt-box'>What are the essential topics I need to learn to become a cybersecurity expert?</div>
</div>

<div className='input-section'>
  <input type='text' placeholder='Enter a prompt here' className='prompt-input'/>
  <button className='generate-button'>Generate</button>
  
</div>

    </div>

    
  )
}

export default ChatBot
