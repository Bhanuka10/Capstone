import React, { useEffect, useState } from 'react';
import './WatchLater.css';

const WatchLater = () => {
  const [watchLaterList, setWatchLaterList] = useState([]);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("watchLater")) || [];
    setWatchLaterList(savedList);
  }, []);

  //to add remove button
  const handleRemove = (videoId) => {
    const updatedList = watchLaterList.filter(video => video.videoId !== videoId);
    setWatchLaterList(updatedList);
    localStorage.setItem("watchLater", JSON.stringify(updatedList));
    alert("Video removed from Watch Later");
  };

  return (
    <div className="watch-later-container">
      <h2>Watch Later</h2>
      <div className="video-grid">
      {watchLaterList.length > 0 ? watchLaterList.map(video => (
  <div key={video.videoId} className="video-card">
    <img src={video.thumbnail || video.image} alt={video.title} />
    <h3>{video.title}</h3>
    <p>Views: {video.viewCount || video.views}</p>
    <p>Label: {video.label || 'Free'}</p>
    <button onClick={() => handleRemove(video.videoId)}>Remove</button> {/* Add this line */}
  </div>
)) : (
          <p>No videos saved for later.</p>
        )}
      </div>
    </div>
  );
};

export default WatchLater;