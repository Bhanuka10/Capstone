import React from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import About from '../../Components/About/About'
import Courses from '../../Components/Courses/Courses'
const Home = () => {
  return (
    <div>
        <Header />
        <About />
        <Courses />
    </div>
  )
}

export default Home