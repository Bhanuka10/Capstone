import React, { useEffect, useRef, useState } from 'react';
import './About.css';

const About = () => {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing after first appearance
          }
        });
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => {
      if (aboutRef.current) observer.unobserve(aboutRef.current);
    };
  }, []);

  return (
    <div ref={aboutRef} className={`about ${isVisible ? 'visible' : ''}`}>
      <div className='about-header'>
        <h2>About us</h2>
      </div>
      <div className='line'></div>
      <div className='about-content'>
        <p>
          Skill Forge is an AI-powered platform designed to deliver personalized learning experiences. 
          It recommends the most relevant educational resources—from beginner to expert levels—based 
          on your goals and learning pace. Whether you're exploring programming, cybersecurity, data 
          science, or other IT fields, Skill Forge curates the best content to guide you step by step. 
          With smart learning paths and an integrated chatbot, you’ll stay motivated and on track. 
          Unlock your potential with Skill Forge.
        </p>
      </div>
    </div>
  );
};

export default About;
