import React, { useState } from 'react';
import './Courses.css';

const Courses = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [videos, setVideos] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const icons = [
    { key: 'domain', src: 'domain.png', playlistId: 'PLoYCgNOIyGABDU532eesybur5HPBVfC1G' },
    { key: 'ai', src: 'ai.png', playlistId: 'PL6XklZ2rk8TMWcgpQ2dIY2DLzI2SLz3n4' },
    { key: 'data-science', src: 'data-science.png', playlistId: 'PLblh5JKOoLUICTaGLRoHQDuF_7q2GfuJF' },
    { key: 'game-development', src: 'game-development.png', playlistId: 'PL4cUxeGkcC9jLYyp2Aoh6hcWuxFDX6PBJ' },
    { key: 'mobile-development', src: 'mobile-development.png', playlistId: 'PLRAV69dS1uWSYbnsbTgkPoHmc3J1NAMcZ' },
    { key: 'technology', src: 'technology.png', playlistId: 'PLFjhmG6Y8eMqvksv0LTFFRjZ74d0sVYFx' },
  ];

  const apiKey = 'AIzaSyD-SJkFXqteSzaQPVUSqo5Lq3CaQh2j5pU';

  const handleIconClick = async (iconKey, playlistId) => {
    setSelectedIcon(iconKey);
    setVideos([]);
    setCurrentVideoIndex(0);

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${apiKey}`
      );
      const data = await res.json();
      const videoItems = data.items.map((item) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));
      setVideos(videoItems);
    } catch (error) {
      console.error('Error fetching playlist:', error);
    }
  };

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prevIndex) =>
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const currentVideo = videos[currentVideoIndex];

  return (
    <div className="courses">
      <div className="courses-icon">
        {icons.map((icon) => (
          <img
            key={icon.key}
            src={icon.src}
            alt={icon.key}
            className={selectedIcon === icon.key ? 'selected' : ''}
            onClick={() => handleIconClick(icon.key, icon.playlistId)}
          />
        ))}
      </div>

      {currentVideo && (
        <div className="video-player-box">
          <div className="video-top-section">
            <iframe
              width="100%"
              height="360"
              src={`https://www.youtube.com/embed/${currentVideo.id}`}
              frameBorder="0"
              allowFullScreen
              title={currentVideo.title}
            ></iframe>
            <div className="video-title">{currentVideo.title}</div>
          </div>

          <div className="video-controls">
            <button onClick={handlePrev}>⏮ Prev</button>
            <button onClick={handleNext}>Next ⏭</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
