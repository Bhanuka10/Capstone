import React, { useState } from 'react';
import './Courses.css';

const Courses = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [playlistItems, setPlaylistItems] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [videoStats, setVideoStats] = useState({});

  const apiKey = 'AIzaSyD-SJkFXqteSzaQPVUSqo5Lq3CaQh2j5pU';

  const handleIconClick = async (icon) => {
    setSelectedIcon(icon);
    setSelectedVideoId(null);

    if (icon === 'domain') {
      const playlistId = 'PLoYCgNOIyGABDU532eesybur5HPBVfC1G';
      const apiUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=15&playlistId=${playlistId}&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const items = data.items || [];
        setPlaylistItems(items);

        const videoIds = items.map(item => item.snippet.resourceId.videoId).join(',');
        const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIds}&key=${apiKey}`;

        const statsResponse = await fetch(statsUrl);
        const statsData = await statsResponse.json();

        const statsMap = {};
        statsData.items.forEach(video => {
          statsMap[video.id] = video.statistics.viewCount;
        });

        setVideoStats(statsMap);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    } else {
      setPlaylistItems([]);
    }
  };

  const handleVideoClick = (videoId) => {
    setSelectedVideoId(videoId);
  };

  return (
    <div className='courses'>
      <div className='courses-icon-left'>
        <img
          src="select-all.png"
          alt="Select All"
          className={selectedIcon === 'select-all' ? 'selected' : ''}
          onClick={() => handleIconClick('select-all')}
        />
      </div>

      <div className='courses-icon-right'>
        {['domain', 'game-development', 'data-science', 'ai', 'mobile-development', 'technology'].map(icon => (
          <img
            key={icon}
            src={`${icon}.png`}
            alt={icon.replace('-', ' ')}
            className={selectedIcon === icon ? 'selected' : ''}
            onClick={() => handleIconClick(icon)}
          />
        ))}
      </div>

      {selectedIcon === 'domain' && playlistItems.length > 0 && (
        <div className='explore-box'>

          {selectedVideoId && (
            <div className='video-player'>
              <iframe
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <div className='playlist-row'>
            {playlistItems.map((item) => {
              const videoId = item.snippet.resourceId.videoId;
              return (
                <div key={item.id} className='playlist-card' onClick={() => handleVideoClick(videoId)}>
                  <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                  <div className='card-info'>
                    <p className='card-title'>{item.snippet.title}</p>
                    <p className='card-channel'>{item.snippet.videoOwnerChannelTitle}</p>
                    <p className='card-views'>{videoStats[videoId] ? `${parseInt(videoStats[videoId]).toLocaleString()} views` : '...'}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;
