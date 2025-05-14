import React, { useState, useEffect, useRef } from 'react';
import './Courses.css';
import { Link } from 'react-router-dom';



const API_KEY = 'AIzaSyD-SJkFXqteSzaQPVUSqo5Lq3CaQh2j5pU';
const DOMAIN_PLAYLIST_IDS = [
  'PLoYCgNOIyGABDU532eesybur5HPBVfC1G',
  'PLTjRvDozrdlw0x_FcXItVVVVh-RP-5hdP',
  'PLXNgqM9ig24c7IdumyymD9q3e2hsz9U1m',
  'PLC3y8-rFHvwhIEc4I4YsRz5C7GOBnxSJY',
  'PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI',
  'PL1w1q3fL4pmg0ArGMe7-tZcDCYMvU0dG7',
  'PL1w1q3fL4pmj9k1FrJ3Pe91EPub2_h4jF',
  'PLTjRvDozrdlxEIuOBZkMAK5uiqp8rHUax',
  'PLZPZq0r_RZOO1zkgO4bIdfuLpizCeHYKv',
  'PLZPZq0r_RZOOxqHgOzPyCzIl4AJjXbCYt',
  'PLZPZq0r_RZOONc3kkuRmBOlj67YAG6jqo',
  'PLZPZq0r_RZOPoNttk9beDhO_Bu5DA-xwP',
  'PLewGdhs0k9xG6TRPgHDO03kN0wTmehw_0'
  
];
const MAX_RESULTS = 20;

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

  const fetchPlaylistVideos = async (playlistId) => {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${MAX_RESULTS}&playlistId=${playlistId}&key=${API_KEY}`
    );
    const data = await response.json();
    const storedCounts = getStoredViewCounts();
    return data.items.map(item => {
      const videoId = item.snippet.resourceId.videoId;
      return {
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        videoId,
        viewCount: storedCounts[videoId] || 0
      };
    });
  };

  const loadDomainCourses = async () => {
    try {
      const allCourses = await Promise.all(DOMAIN_PLAYLIST_IDS.map(fetchPlaylistVideos));
      setCourses(allCourses.flat().sort(() => Math.random() - 0.5));
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  };

  useEffect(() => {
    loadDomainCourses();
  }, []);

  useEffect(() => {
    const storedCounts = getStoredViewCounts();
    setCourses(prevCourses => {
        return prevCourses.map(course => ({
            ...course,
            viewCount: storedCounts[course.videoId] || course.viewCount
        }));
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const isAtTop = containerRef.current.scrollTop > 100;
        backToTopBtnRef.current.style.display = isAtTop ? 'block' : 'none';
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

  useEffect(() => {
    const handlePageChange = () => {
      if (backToTopBtnRef.current) {
        backToTopBtnRef.current.style.display = 'none';
      }
    };

    window.addEventListener('popstate', handlePageChange);

    return () => {
      window.removeEventListener('popstate', handlePageChange);
    };
  }, []);

  const handleIconClick = (icon) => {
    if (icon === 'domain') {
      loadDomainCourses();
    } else {
      setCourses([]); // Placeholder action
    }
  };

  //add to watch later part

  const handleAddToWatchLater = (course) => {
    const stored = JSON.parse(localStorage.getItem('watchLater')) || [];
    const exists = stored.find(item => item.videoId === course.videoId);
  
    if (!exists) {
      stored.push(course);
      localStorage.setItem('watchLater', JSON.stringify(stored));
      alert(`${course.title} added to Watch Later`);
    } else {
      alert('Already added to Watch Later');
    }
  };

  const handleVideoClick = async (videoId) => {
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

    
  
    
  
    try {
      await setDoc(doc(db, "users", userId, "watchLater", videoId), courseData);
      console.log("Video added to Watch Later.");
    } catch (error) {
      console.error("Error adding to Watch Later: ", error);
    }
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
            <li onClick={() => handleIconClick('domain')}>
              <img src="domain.png" alt="Domain" />
            </li>
            <li onClick={() => handleIconClick('game')}>
              <img src="game-development.png" alt="Game Dev" />
            </li>
            <li onClick={() => handleIconClick('data')}>
              <img src="data-science.png" alt="Data Science" />
            </li>
            <li onClick={() => handleIconClick('ai')}>
              <img src="ai.png" alt="AI" />
            </li>
            <li onClick={() => handleIconClick('mobile')}>
              <img src="mobile-development.png" alt="Mobile Dev" />
            </li>
            <li onClick={() => handleIconClick('tech')}>
              <img src="technology.png" alt="Technology" />
            </li>
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
                <button className='add-btn' onClick={()=>handleAddToWatchLater(course)}>Add</button>
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



      <div className="watch-later-shortcut">
  <Link to="/watchlater">
    <button className="watch-later-btn">Go to Watch Later</button>
  </Link>
</div>

    </div>
  );
  
};

export default Courses;
