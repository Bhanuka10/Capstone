import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import MyProfile from './Pages/Home/MyProfile/MyProfile'
import { Route, Routes } from 'react-router-dom'
import MyProfileHeader from './Components/MyProfileHeader/MyProfileHeader'

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <MyProfileHeader/>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path='/' element={<MyProfile/>}/>
       
      </Routes>
      
      

    </div>
  )
}

export default App