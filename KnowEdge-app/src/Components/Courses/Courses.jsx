import React, { useState, useEffect, useRef } from 'react';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState(Array(8).fill(0)); // Start with 8 courses
  const [isPlaying, setIsPlaying] = useState(false); // State to track if a course is playing
  const [currentCourse, setCurrentCourse] = useState(null); // Track which course is being played
  const containerRef = useRef(null); // Ref to the holevideo-container
  const backToTopBtnRef = useRef(null); // Ref for the Back to Top button

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container) {
        const { scrollTop, scrollHeight, clientHeight } = container;
        if (scrollTop + clientHeight >= scrollHeight - 10) { 
          loadMoreCourses();
        }

        // Show the back-to-top button when scrolling down
        if (scrollTop > 100) { // Show button after scrolling 100px
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

  const loadMoreCourses = () => {
    setCourses(prev => [...prev, ...Array(4).fill(0)]); // Add 4 more courses
  };

  const backToTop = () => {
    containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCourseClick = (courseIndex) => {
    setCurrentCourse(courseIndex);
    setIsPlaying(true); // Set playing state to true when a course is clicked
  };

  const handleClosePlaybox = () => {
    setIsPlaying(false); // Hide the playbox when closing
    setCurrentCourse(null);
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
          {courses.map((_, index) => (
            <div className='first-box' key={index}>
              <div className='second-box'>
                {/* Trigger playbox when video-img is clicked */}
                <div className='video-img' onClick={() => handleCourseClick(index)}></div>
                <div className='thumnle'>
                  <h2>Hello World {index + 1}</h2>
                </div>
                <p>View count</p>
              </div>
              <div className='last'>
                <h3>availability</h3>
                <button 
                  className='add-btn'
                >
                  add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playbox should only be visible when a course is playing */}
      <div className={`playbox ${isPlaying ? 'show' : ''}`}>
        <h2>Playing Course {currentCourse + 1}</h2>
        {/* You can add a video player or other content here */}
        <button 
          className='close-btn' 
          onClick={handleClosePlaybox} // Close playbox
        >
          Close
        </button>
      </div>

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
}

export default Courses;
