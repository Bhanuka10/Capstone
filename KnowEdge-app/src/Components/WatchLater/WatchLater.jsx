import React, { useEffect, useState } from 'react';
import './WatchLater.css';

const WatchLater = () => {
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [currentVideoId,setCurrentVideoId] = useState(null);
  

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("watchLater")) || [];
    setWatchLaterList(savedList);
  }, []);

  const handleVideoClick = (videoId) => {setCurrentVideoId(videoId)};

  //to add remove button
  const handleRemove = (videoId) => {
    const updatedList = watchLaterList.filter(video => video.videoId !== videoId);
    setWatchLaterList(updatedList);
    localStorage.setItem("watchLater", JSON.stringify(updatedList));
    alert("Video removed from Watch Later");
  };

  const handleClosePlaybox = ()=> { setCurrentVideoId(null);

  }; //not sure place

  return (
    <div className="watch-later-container">
      <h2>Watch Later</h2>
      <div className="video-grid">
      {watchLaterList.length > 0 ? watchLaterList.map(video => (
  <div key={video.videoId} className="video-card">
    <img
  src={video.thumbnail || video.image}
  alt={video.title}
  onClick={() => handleVideoClick(video.videoId)}
  style={{ cursor: 'pointer' }}/>
    <h3>{video.title}</h3>
    <p>Views: {video.viewCount || video.views}</p>
    <p>Label: {video.label || 'Free'}</p>
    <button onClick={() => handleRemove(video.videoId)}>Remove</button> {/* Add this line */}
  </div>
)) : (
          <p>No videos saved for later.</p>
        )}
        
      </div>
      
      {currentVideoId && (
 <div className= "playbox">
        {currentVideoId && (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Video player"
          ></iframe>
        )}
        <button className='close-btn' onClick={handleClosePlaybox}>Close</button>
      </div>
)}
    </div>
    
  );
  
};

export default WatchLater;