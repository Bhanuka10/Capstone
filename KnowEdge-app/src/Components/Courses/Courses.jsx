import React, { useState } from 'react';
import './Courses.css';

const Courses = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
  };

  const exploreData = {
    'select-all': { color: '#007bff', text: 'Explore All Categories' },
    domain: { color: '#28a745', text: 'Explore Domain' },
    'game-development': { color: '#ffc107', text: 'Explore Game Development' },
    'data-science': { color: '#17a2b8', text: 'Explore Data Science' },
    ai: { color: '#6f42c1', text: 'Explore Artificial Intelligence' },
    'mobile-development': { color: '#fd7e14', text: 'Explore Mobile Development' },
    technology: { color: '#dc3545', text: 'Explore Technology' },
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
        <img
          src="domain.png"
          alt="Domain"
          className={selectedIcon === 'domain' ? 'selected' : ''}
          onClick={() => handleIconClick('domain')}
        />
        <img
          src="game-development.png"
          alt="Game Development"
          className={selectedIcon === 'game-development' ? 'selected' : ''}
          onClick={() => handleIconClick('game-development')}
        />
        <img
          src="data-science.png"
          alt="Data Science"
          className={selectedIcon === 'data-science' ? 'selected' : ''}
          onClick={() => handleIconClick('data-science')}
        />
        <img
          src="ai.png"
          alt="AI"
          className={selectedIcon === 'ai' ? 'selected' : ''}
          onClick={() => handleIconClick('ai')}
        />
        <img
          src="mobile-development.png"
          alt="Mobile Development"
          className={selectedIcon === 'mobile-development' ? 'selected' : ''}
          onClick={() => handleIconClick('mobile-development')}
        />
        <img
          src="technology.png"
          alt="Technology"
          className={selectedIcon === 'technology' ? 'selected' : ''}
          onClick={() => handleIconClick('technology')}
        />
      </div>

      {selectedIcon && (
        <div
          className='explore-box'
          style={{ backgroundColor: exploreData[selectedIcon].color }}
        >
          <p>{exploreData[selectedIcon].text}</p>
        </div>
      )}
    </div>
  );
};

export default Courses;