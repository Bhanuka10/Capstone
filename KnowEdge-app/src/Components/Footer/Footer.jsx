import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer'>
        <div className='logo'><img src="/DALL·E 2025-03-07 23.02.25 - A modern, sleek logo design combining the letters K and E in an elegant and creative way. The design should focus on a clean, minimalistic aesthetic w.png" alt="Logo" /></div>
    <div className='footer-links'>
        <ul>
        <li>Home </li>
        <li>About</li>
        <li>Contact</li>
        <li>Courses</li>
        <li>Ai Chatbot</li>
        </ul>
    </div>
    <div className='social-media'>
        <div className='social-media-icons'>
            <img src="/instagram.png" alt="Instagram" />
            <img src="/facebook.png" alt="Facebook" />
            <img src="/tiktok.png" alt="TikTok" />
            <img src="/youtube.png" alt="YouTube" />
            <img src="/linkedin.png" alt="LinkedIn" />
        </div>
        <a href="http://"><h3>support@knowedge.com</h3></a>
        <h2>KnowEdge</h2>
    </div>
    <div className='footer-bottom'>
        <h3>© 2025 KnowEdge. All rights reserved.</h3>
    </div>
    </div>
  )
}

export default Footer