import React, { useState, useEffect, useRef } from 'react';
import './Courses.css';

const Courses = () => {
  const [videos, setVideos] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const containerRef = useRef(null);
  const backToTopBtnRef = useRef(null);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=PLoYCgNOIyGABDU532eesybur5HPBVfC1G&key=AIzaSyD-SJkFXqteSzaQPVUSqo5Lq3CaQh2j5pU'
      );
      const data = await response.json();
      const fetchedVideos = data.items.map(item => ({
        videoId: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.high?.url,
      }));
      setVideos(fetchedVideos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        if (scrollTop + clientHeight >= scrollHeight - 10) { 
          // Can implement load more if you have pagination
        }

        if (scrollTop > 100) {
          backToTopBtnRef.current.style.display = 'block';
        } else {
          backToTopBtnRef.current.style.display = 'none';
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const backToTop = () => {
    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleVideoClick = (videoId) => {
    setCurrentVideoId(videoId);
    setIsPlaying(true);
  };

  const handleClosePlaybox = () => {
    setIsPlaying(false);
    setCurrentVideoId(null);
  };

  return (
    <div className='Courses'>
      <div className='Uper-bar'>
        <h1>Choose the Courses</h1>
      </div>

      <div className='icons-row'>
        <div className='icons-ai'>
          <img src="select-all.png" alt="" />
        </div>
        <div className='icons'>
          <ul>
            <li><img src="domain.png" alt="" /></li>
            <li><img src="game-development.png" alt="" /></li>
            <li><img src="data-science.png" alt="" /></li>
            <li><img src="ai.png" alt="" /></li>
            <li><img src="mobile-development.png" alt="" /></li>
            <li><img src="technology.png" alt="" /></li>
          </ul>
        </div>
      </div>

      <div className='buttn'>
        <button>All</button>
        <button>Paid</button>
        <button>Free</button>
      </div>

      <div className='holevideo-container' ref={containerRef}>
        <div className='video-row'>
          {videos.map((video, index) => (
            <div className='first-box' key={index}>
              <div className='second-box'>
                <div className='video-img' onClick={() => handleVideoClick(video.videoId)}>
                  <img src={video.thumbnail} alt="Thumbnail" className='thumbnail-img' />
                </div>
                <div className='thumnle'>
                  <h2>{video.title}</h2>
                </div>
                <p>Views: Public</p> {/* Can't fetch exact view count here without another API call */}
              </div>
              <div className='last'>
                <h3>Free • YouTube</h3>
                <button className='add-btn'>Add</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playbox */}
      {isPlaying && (
        <div className='playbox show'>
          <iframe 
            width="100%" 
            height="100%" 
            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1`} 
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
          <button className='close-btn' onClick={handleClosePlaybox}>
            Close
          </button>
        </div>
      )}

      {/* Back to Top Button */}
      <button 
        className='back-to-top' 
        onClick={backToTop} 
        ref={backToTopBtnRef}
      >
        Back to Top
      </button>
    </div>
  );
};

export default Courses;
