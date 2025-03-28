import React from 'react'
import './MyProfileHeader.css'

const MyProfileHeader=() => {
  return (
    <div>
      <div className='profile-container'>
        {/*knowedge box*/}
        <div className='knowedge-box'>
            <h2 className='title'>KnowEdge</h2>
            <p className='subtitle'>Sharpen your knowledge with AI-powered guidance for a smarter learning journey</p>
            <button className='chatbot-button'>Use Chatbot</button>
        </div>

        {/*user profile box*/}
        <div className='profile-box'>
            <img src='C:\Users\ADMIN\Documents\GitHub\Capstone\KnowEdge-app\src\Images\Maria.jpg' alt='User' className='profile-image'></img>
            <h3 className='username'>Hello Maria!</h3>
            <p className='user-role'>Bla Bla</p>
            
        </div>
      </div>
    </div>
  )
}

export default MyProfileHeader
