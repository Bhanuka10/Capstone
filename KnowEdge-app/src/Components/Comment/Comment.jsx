import React from 'react'
import './Comment.css'
const Comment = () => {
  return (
    <div className='comment'>
        <div className='banner'><h1>Feedback</h1></div>
        <div className='comment-container'>
            <div className='first-column'>
                <div className='comment-first-box'>
                    <div className='id'>
                        <img src="images.jpeg" alt="" />
                        <h2>James Carter</h2>
                    </div>
                    <div className='comment-text'>
                        <p>"This website is incredibly user-friendly and informative! The content is well-structured, and the design makes navigation seamless. Great work!"</p>
                    </div>
                    


                </div>
            </div>

        </div>
    </div>
  )
}

export default Comment