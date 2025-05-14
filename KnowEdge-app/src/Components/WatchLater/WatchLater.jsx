import React, { useEffect, useState } from 'react';
import './WatchLater.css';

const WatchLater = () => {
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [currentVideoId, setCurrentVideoId] = useState(null);

  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("watchLater")) || [];
    setWatchLaterList(savedList);
  }, []);

  const handleRemove = (videoId) => {
    const updatedList = watchLaterList.filter(video => video.videoId !== videoId);
    setWatchLaterList(updatedList);
    localStorage.setItem("watchLater", JSON.stringify(updatedList));
    alert("Video removed from Watch Later");
  };

  const handleVideoClick = (videoId) => {
    setCurrentVideoId(videoId); // Set the current video ID to play

    setWatchLaterList(prevList => {
        const updatedList = prevList.map(video =>
            video.videoId === videoId
                ? { ...video, viewCount: (video.viewCount || 0) + 1 } // Increment view count
                : video
        );

        localStorage.setItem("watchLater", JSON.stringify(updatedList)); // Save updated list to localStorage
        return updatedList;
    });
  };

  const handleClosePlaybox = () => {
    setCurrentVideoId(null); // Clear the current video ID to close the playbox
  };

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
              style={{ cursor: 'pointer' }}
            />
            <h3>{video.title}</h3>
            <p>Views: {video.viewCount || video.views}</p>
            <p>Label: {video.label || 'Free'}</p>
            <button onClick={() => handleRemove(video.videoId)}>Remove</button>
          </div>
        )) : (
          <p>No videos saved for later.</p>
        )}
      </div>

      {currentVideoId && (
        <div className={`playbox ${currentVideoId ? 'show' : ''}`}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=0`}
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Video player"
          ></iframe>
          <button className="close-btn" onClick={handleClosePlaybox}>Close</button>
        </div>
      )}
    </div>
  );
};

export default WatchLater;