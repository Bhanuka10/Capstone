import React, { useState, useEffect, useRef } from 'react';
import './Courses.css';

const API_KEY = 'AIzaSyD-SJkFXqteSzaQPVUSqo5Lq3CaQh2j5pU';
const PLAYLIST_IDS = [
  'PLoYCgNOIyGABDU532eesybur5HPBVfC1G',
  'PLTjRvDozrdlw0x_FcXItVVVVh-RP-5hdP'
];
const MAX_RESULTS = 10;

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const containerRef = useRef(null);
  const backToTopBtnRef = useRef(null);

  const getStoredViewCounts = () => {
    const stored = localStorage.getItem('videoViewCounts');
    return stored ? JSON.parse(stored) : {};
  };

  const saveViewCounts = (counts) => {
    localStorage.setItem('videoViewCounts', JSON.stringify(counts));
  };

  useEffect(() => {
    const storedCounts = getStoredViewCounts();

    const fetchPlaylistVideos = async (playlistId) => {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${playlistId}&key=${API_KEY}`
      );
      const data = await response.json();
      return data.items.map(item => {
        const videoId = item.snippet.resourceId.videoId;
        return {
          title: item.snippet.title,
          thumbnail: item.snippet.thumbnails.medium.url,
          videoId: videoId,
          viewCount: storedCounts[videoId] || 0,
        };
      });
    };

    const fetchAllPlaylists = async () => {
      try {
        const allCourses = await Promise.all(PLAYLIST_IDS.map(fetchPlaylistVideos));
        const mergedCourses = allCourses.flat();
        setCourses(mergedCourses.sort(() => Math.random() - 0.5)); // shuffle
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchAllPlaylists();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        backToTopBtnRef.current.style.display = container.scrollTop > 100 ? 'block' : 'none';
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
    setIsPlaying(true);
    setCurrentVideoId(videoId);

    setCourses(prevCourses => {
      const updated = prevCourses.map(course =>
        course.videoId === videoId
          ? { ...course, viewCount: course.viewCount + 1 }
          : course
      );

      const updatedCounts = getStoredViewCounts();
      updatedCounts[videoId] = (updatedCounts[videoId] || 0) + 1;
      saveViewCounts(updatedCounts);

      return updated;
    });
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
          <img src="select-all.png" alt="All Courses" />
        </div>
        <div className='icons'>
          <ul>
            <li><img src="domain.png" alt="Domain" /></li>
            <li><img src="game-development.png" alt="Game Dev" /></li>
            <li><img src="data-science.png" alt="Data Science" /></li>
            <li><img src="ai.png" alt="AI" /></li>
            <li><img src="mobile-development.png" alt="Mobile Dev" /></li>
            <li><img src="technology.png" alt="Technology" /></li>
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
                  <img src={course.thumbnail} alt="video thumbnail" />
                </div>
                <div className='thumnle'>
                  <h2>{course.title}</h2>
                </div>
              </div>
              <p>Views: {course.viewCount}</p>
              <div className='last'>
                <h3>YouTube Free</h3>
                <button className='add-btn'>add</button>
              </div>
            </div>
          ))}
        </div>
      </div>

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

      <button className='back-to-top' onClick={backToTop} ref={backToTopBtnRef}>
        Back to Top
      </button>
    </div>
  );
};

export default Courses;
