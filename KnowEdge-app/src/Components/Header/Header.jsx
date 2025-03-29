import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
        <div>
            <div>
           <h1>KnowEdge</h1>
            <p>Sharpen Your Knowledge with AI-Powered Guidance for a Smarter Learning Journey</p>
        </div>
        <div>
            <button>view courses</button>
            <button>Use ChatBot</button>
        </div> 

        </div>
        <div>
            <div>
            <img src="pngtree-3d-bot-ai-powered-marketing-and-notification-tools-png-image_9187783.png" alt="" />
            <img src="pngtree-round-gradient-black-shadow-png-image_4317601.png" alt="" />
            </div>
            <div>
            <img src="young-woman-sitting-floor-with-laptop-white.png" alt="" />
            <img src="pngtree-round-gradient-black-shadow-png-image_4317601.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Header