import React, { useEffect, useState } from 'react';
import './WatchLater.css'; // Importing CSS file for styling

const WatchLater = () => {
  // State to hold the list of videos saved for "Watch Later"
  const [watchLaterList, setWatchLaterList] = useState([]);

  // Load saved Watch Later list from localStorage when component mounts
  useEffect(() => {
    const savedList = JSON.parse(localStorage.getItem("watchLater")) || [];
    setWatchLaterList(savedList);
  }, []);

  // Sample video data (in real scenario, this will come from YouTube API)
  const videos = [
    {
      id: "1",
      title: "HTML Full Course for Beginners (2023)",
      image: "https://img.youtube.com/vi/qz0aGYrrlhU/mqdefault.jpg",
      label: "free",
      rating: 5,
      views: "1.2M",
    },
    {
      id: "2",
      title: "Complete Web Development Roadmap",
      image: "https://img.youtube.com/vi/3JluqTojuME/mqdefault.jpg",
      label: "free",
      rating: 5,
      views: "930K",
    },
    {
      id: "3",
      title: "HTML & CSS Full Course – Beginner to Pro",
      image: "https://img.youtube.com/vi/G3e-cpL7ofc/mqdefault.jpg",
      label: "free",
      rating: 5,
      views: "860K",
    },
  ];

  // Function to add video to Watch Later and store it in localStorage
  const addToWatchLater = (video) => {
    const updatedList = [...watchLaterList, video];
    setWatchLaterList(updatedList);
    localStorage.setItem("watchLater", JSON.stringify(updatedList));
  };

  return (
    <div className="watched-later">
      {/* Watch Later Section Title */}
      <h2 className="watched-title">Watch later</h2>

      {/* List of saved videos */}
      <div className="video-cards">

        
        {watchLaterList.map((video) => (
          <div key={video.id} className="video-card">
            <img src={video.image} alt={video.title} className="video-img" />
            <div className="video-details">
              <p className="video-title">{video.title}</p>
              <div className="video-footer">
                <span className="free-label">{video.label}</span>
                <span className="stars">{"★".repeat(video.rating)}</span>
              </div>
              {/* Views count displayed below the card */}
              <div className="views-count">{video.views} views</div>
            </div>
          </div>
        ))}
      </div>

      {/* Simulated Search Result Section */}
      {/*<h3 style={{ textAlign: "left", marginTop: "40px" }}>Search Results (Simulated)</h3>*/}
      <div className="video-cards">
        {videos.map((video) => (
          <div key={video.id} className="video-card">
            <img src={video.image} alt={video.title} className="video-img" />
            <div className="video-details">
              <p className="video-title">{video.title}</p>
              <div className="video-footer">
                <span className="free-label">{video.label}</span>
                <span className="stars">{"★".repeat(video.rating)}</span>
                <button className="add-btn" onClick={() => addToWatchLater(video)}>Add</button>
              </div>
              <div className="views-count">{video.views} views</div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional future functionality */}
      <button className="view-more-btn">view more</button>
    </div>
  );
};

export default WatchLater;