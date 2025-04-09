import React from 'react'
import './MyProfileHeader.css'
import userimage from '../../Images/Maria.jpg'
import robotimage from '../../Images/Maria.jpg'

const MyProfileHeader=() => {
  return (
    <div>
      <div className='profile-container'>
        {/*SKILLFORGE box*/}
        <div className='knowedge-box'>
          <div className='text-section'>
            <h2 className='title'>SKILL FORGE</h2>
            <p className='subtitle'>Sharpen your knowledge with AI-powered guidance for a smarter learning journey</p>

            <div className='left-bottom'>
            <button className='chatbot-button'>Use Chatbot</button> 
            </div>

            </div>
            
            

            <div className='image-section'>
            <img src={robotimage} alt='AI Bot' className='robot-image'/>  
            </div>    
        </div>

        

        {/*user profile box*/}
        <div className='profile-box'>
            <img src={userimage} alt='User' className='profile-image'></img>
            <h3 className='username'>Hello Maria!</h3>
            <p className='user-role'>Bla Bla</p>

        </div>
      </div>
    </div>
  )
}
 
 export default MyProfileHeader

 