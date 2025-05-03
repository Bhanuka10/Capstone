import React from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import About from '../../Components/About/About'
import Courses from '../../Components/Courses/Courses'
import Footer from '../../Components/Footer/Footer'
const Home = () => {
  return (
    <div>
        <Header />
        <About />
        <Courses />
        <Footer />
    </div>
  )
}

export default Home