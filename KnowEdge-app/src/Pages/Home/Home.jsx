import React from 'react'
import './Home.css'
import Header from '../../Components/Header/Header'
import About from '../../Components/About/About'
import Courses from '../../Components/Courses/Courses'
import Footer from '../../Components/Footer/Footer'
import Comment from '../../Components/Comment/Comment'
const Home = () => {
  return (
    <div>
        <Header />
        <About />
        <Courses />
        <Comment />
        <Footer />
    </div>
  )
}

export default Home