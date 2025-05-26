import React from 'react';
import './Comment.css';

const feedbackData = [
  {
    name: 'James Carter',
    image: 'images.jpeg',
    text: 'This website is incredibly user-friendly and informative! The content is well-structured, and the design makes navigation seamless. Great work!',
  },
  {
    name: 'Daniel Smith',
    image: 'handsome-man-pointing-lateral.jpg',
    text: 'I love the clean layout and the variety of resources available. The site loads quickly, and everything is easy to find. Keep up the fantastic work!',
  },
  {
    name: 'Sophia Williams',
    image: 'download.jpeg',
    text: 'I appreciate how well-organized and informative this website is. The content is valuable, and the user experience is smooth. Keep it up!',
  },
  {
    name: 'Emily Granger',
    image: 'young-smiling-young-woman-showing-copy-space.jpg',
    text: 'Fantastic website! The layout is clean and intuitive, making it easy to find information quickly. The content is clear, engaging, and highly informative. Well done!',
  }
];

const Comment = () => {
  return (
    <div className='comment'>
      <div className='banner'><h1>Feedback</h1></div>
      <div className='scroll-container'>
        {feedbackData.map((feedback, index) => (
          <div className='comment-first-box' key={index}>
            <div className='id'>
              <img src={feedback.image} alt={feedback.name} />
              <h2>{feedback.name}</h2>
            </div>
            <div className='comment-text'>
              <p>"{feedback.text}"</p>
            </div>
          </div>
        ))}
      </div>
      <div className='after-scroll'></div>
    </div>
  );
};

export default Comment;