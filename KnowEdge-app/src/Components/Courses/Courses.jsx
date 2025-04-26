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
    <div className='buttn'>
      <button>All</button>
      <button>Paid</button>
      <button>Free</button>
    </div>
    <div className='holevideo-container'>
      <div className='video-row'>
        <div className='first-box'>
          <div className='second-box'>
            <div className='video-img'>

            </div>
            <div className='thumnle'>
              <h2>Hellow world</h2>

            </div>
            <p>View count</p>

          </div>
          <div className='last'>
          <h3>availability</h3>
          <button>add</button>
          </div>

        </div>
        <div className='first-box'>
          <div className='second-box'>
            <div className='video-img'>

            </div>
            <div className='thumnle'>
              <h2>Hellow world</h2>

            </div>
            <p>View count</p>

          </div>
          <div className='last'>
          <h3>availability</h3>
          <button>add</button>
          </div>

        </div>
        
        

      </div>
    </div>

    </div>
  )
}

export default Courses