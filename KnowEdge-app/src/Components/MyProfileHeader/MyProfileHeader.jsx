import React from 'react'
import './MyProfileHeader.css'
<<<<<<< Updated upstream
import userimage from '../../Images/Maria.jpg'
=======
/*import userimage from '../../Images/Maria.jpg'*/
>>>>>>> Stashed changes

const MyProfileHeader=() => {
  return (
    <div>
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
      <div className='profile-container'>
        {/*knowedge box*/}
        <div className='knowedge-box'>
            <h2 className='title'>KnowEdge</h2>
            <p className='subtitle'>Sharpen your knowledge with AI-powered guidance for a smarter learning journey</p>
            <button className='chatbot-button'>Use Chatbot</button>
        </div>

        {/*user profile box*/}
        <div className='profile-box'>
<<<<<<< Updated upstream
            <img src={userimage} alt='User' className='profile-image'></img>
=======
            <img src='C:\Users\ADMIN\Documents\GitHub\Capstone\KnowEdge-app\src\Images\Maria.jpg' alt='User' className='profile-image'></img>
>>>>>>> Stashed changes
            <h3 className='username'>Hello Maria!</h3>
            <p className='user-role'>Bla Bla</p>

        </div>
      </div>
    </div>
  )
}
 
 export default MyProfileHeader

 