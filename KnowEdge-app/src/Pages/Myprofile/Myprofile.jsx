import React from 'react';
import './Myprofile.css';
import Navbar from '../../Components/Navbar/Navbar';
import MyProfileHeader from '../../Components/MyProfileHeader/MyProfileHeader';
import ChatBotBanner from '../../Components/BannersMyProfile/ChatBotBanner';
import ChatBot from '../../Components/ChatBot/ChatBot';
import Chatting from '../../Components/Chatting/Chatting';
import WatchLater from '../../Components/WatchLater/WatchLater';

const Myprofile = () => {
  return (
    <div>
      <Navbar />
      
      <MyProfileHeader />
      <ChatBotBanner />
      <div className='cha'>
        <Chatting />
      <ChatBot />
      
      
      </div>
      <WatchLater/>
    </div>
  );
};

export default Myprofile;
