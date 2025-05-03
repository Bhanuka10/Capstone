import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import MyProfileHeader from '../../Components/MyProfileHeader/MyProfileHeader';
import ChatBotBanner from '../../Components/BannersMyProfile/ChatBotBanner';
import ChatBot from '../../Components/ChatBot/ChatBot';

const Myprofile = () => {
  return (
    <div>
      
      <MyProfileHeader />
      <ChatBotBanner />
      <ChatBot />
    </div>
  );
};

export default Myprofile;
