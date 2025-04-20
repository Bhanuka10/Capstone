import React from 'react'
import './Courses.css'

const Courses = () => {
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
    </div>
  )
}

export default Courses