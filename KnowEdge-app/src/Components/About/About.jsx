import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className='about'>
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