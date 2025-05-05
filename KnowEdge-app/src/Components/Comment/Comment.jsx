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
                <div className='comment-first-box'>
                    <div className='id'>
                        <img src="download.jpeg" alt="" />
                        <h2>Sophia Williams</h2>
                    </div>
                    <div className='comment-text'>
                        <p>"I appreciate how well-organized and informative this website is. The content is valuable, and the user experience is smooth. Keep it up!"</p>
                    </div>
                    


                </div>
            </div>
            <div className='first-column'>
                <div className='comment-first-box'>
                    <div className='id'>
                        <img src="handsome-man-pointing-lateral.jpg" alt="" />
                        <h2>Daniel Smith</h2>
                    </div>
                    <div className='comment-text'>
                        <p>"I love the clean layout and the variety of resources available. The site loads quickly, and everything is easy to find. Keep up the fantastic work!"</p>
                    </div>
                    


                </div>
                <div className='comment-first-box'>
                    <div className='id'>
                        <img src="young-smiling-young-woman-showing-copy-space.jpg" alt="" />
                        <h2>Emily Granger</h2>
                    </div>
                    <div className='comment-text'>
                        <p>"Fantastic website! The layout is clean and intuitive, making it easy to find information quickly. The content is clear, engaging, and highly informative. Well done!"</p>
                    </div>
                    


                </div>
            </div>

        </div>
    </div>
  )
}

export default Comment