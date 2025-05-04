import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import MyProfileHeader from '../../Components/MyProfileHeader/MyProfileHeader';
import ChatBotBanner from '../../Components/BannersMyProfile/ChatBotBanner';
import ChatBot from '../../Components/ChatBot/ChatBot';
import Courses from '../../Components/Courses/Courses';
import WatchLater from '../../Components/WatchLater/WatchLater';

const Myprofile = () => {
  return (
    <div>
      <Navbar />
      
      <MyProfileHeader />
      <ChatBotBanner />
      <ChatBot />
      <Courses/>
      <WatchLater/>
    </div>
  );
};

export default Myprofile;
