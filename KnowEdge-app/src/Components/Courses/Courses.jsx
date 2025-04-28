import React, { useState, useEffect, useRef } from 'react';
import './Courses.css';

const API_KEY = 'AIzaSyD-SJkFXqteSzaQPVUSqo5Lq3CaQh2j5pU';
const PLAYLIST_ID = 'PLoYCgNOIyGABDU532eesybur5HPBVfC1G';
const MAX_RESULTS = 20;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const containerRef = useRef(null);
  const backToTopBtnRef = useRef(null);

  useEffect(() => {
    fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${PLAYLIST_ID}&key=${API_KEY}`)
      .then(response => response.json())
      .then(data => {
        const fetchedCourses = data.items.map(item => ({
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          videoId: item.snippet.resourceId.videoId,
          viewCount: Math.floor(Math.random() * 10000) + 1000, // YouTube API needs another call for real views
        }));
        setCourses(fetchedCourses);
      })
      .catch(error => console.error('Error fetching YouTube playlist:', error));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          // You can implement load more videos if needed
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

  const handleVideoClick = (videoId) => {
    setCurrentVideoId(videoId);
    setIsPlaying(true);
  };

  const handleClosePlaybox = () => {
    setIsPlaying(false);
    setCurrentVideoId(null);
  };

  const backToTop = () => {
    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
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
          {courses.map((course, index) => (
            <div className='first-box' key={index}>
              <div className='second-box'>
                <div className='video-img' onClick={() => handleVideoClick(course.videoId)}>
                  <img src={course.thumbnail} alt="video thumbnail" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
                </div>
                <div className='thumnle'>
                  <h2>{course.title}</h2>
                </div>
                <p>Views: {course.viewCount}</p>
              </div>
              <div className='last'>
                <h3>YouTube Free</h3>
                <button className='add-btn'>add</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playbox */}
      <div className={`playbox ${isPlaying ? 'show' : ''}`}>
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

      {/* Back to Top Button */}
      <button className='back-to-top' onClick={backToTop} ref={backToTopBtnRef}>
        Back to Top
      </button>
    </div>
  );
}

export default Courses;
