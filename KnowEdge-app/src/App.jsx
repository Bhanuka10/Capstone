import React from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import Myprofile from './Pages/Myprofile/Myprofile';
import MyProfileHeader from './Components/MyProfileHeader/MyProfileHeader';
import ChatBotBanner from './Components/BannersMyProfile/ChatBotBanner';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <MyProfileHeader />
      <ChatBotBanner/>
      
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/myprofile" element={<Myprofile />} />
        
      </Routes>
    </div>
  );
};

export default App;
