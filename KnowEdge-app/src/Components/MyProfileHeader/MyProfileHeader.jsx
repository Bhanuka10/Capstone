import React from 'react'
import './MyProfileHeader.css'
import userimage from '../../Images/Maria.jpg'
import robotimage from '../../Images/Maria.jpg'

const MyProfileHeader=() => {
  return (
    <div>
      <div className='profile-container'>
        {/*SKILLFORGE box*/}
        <div className='skillfordge-box'>
          <div className='text-section'>
            <h2 className='title'>SKILL FORGE</h2>
            <p className='subtitle'>Sharpen your knowledge with AI-powered guidance for a smarter learning journey</p>

            <div className='chatbot-button-wrapper'>
            <button className='chatbot-button'>Use Chatbot</button> 
            </div>

            </div>
            
            

            <div className='image-section'>
            <img src="pngtree-3d-bot-ai-powered-marketing-and-notification-tools-png-image_9187783.png" alt='AI Bot' className='robot-image'/>  
            </div>    
        </div>

        

        {/*user profile box*/}
        <div className='profile-box'>
            <img src={userimage} alt='User' className='profile-image'></img>
            <h3 className='username'>Hello Maria!</h3>
            <div className='content'>
            <p>Content</p>
            <p>Profile</p>
            <p>Continous Learning</p>
            </div>
           

        </div>
      </div>
    </div>
  )
}
 
 export default MyProfileHeader

 