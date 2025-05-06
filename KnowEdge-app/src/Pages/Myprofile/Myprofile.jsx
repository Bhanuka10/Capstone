import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import MyProfileHeader from '../../Components/MyProfileHeader/MyProfileHeader';
import ChatBotBanner from '../../Components/BannersMyProfile/ChatBotBanner';
import ChatBot from '../../Components/ChatBot/ChatBot';
import Chatting from '../../Components/Chatting/Chatting';

const Myprofile = () => {
  return (
    <div>
      <Navbar />
      
      <MyProfileHeader />
      <ChatBotBanner />
      <ChatBot />
      <Chatting />
    </div>
  );
};

export default Myprofile;
