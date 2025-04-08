import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
        <div className='header-left'>
            <div className='header-left-top'>
           <h1>KnowEdge</h1>
            <p>Sharpen Your Knowledge with AI-Powered Guidance for a Smarter Learning Journey</p>
        </div>
        <div className='header-left-bottom'>
            <button>view courses</button>
            <button>Use ChatBot</button>
        </div> 

        </div >
        <div className='header-right'>
            <div className='right-one'>
            <img className='robo' src="pngtree-3d-bot-ai-powered-marketing-and-notification-tools-png-image_9187783.png" alt="" />
            <img className='robo-shadow' src="pngtree-round-gradient-black-shadow-png-image_4317601.png" alt="" />
            </div>
            <div className='right-two'>

            <img className='lady' src="young-woman-sitting-floor-with-laptop-white.png" alt="" />
            </div>
        </div>
    </div>
  )
}

export default Header