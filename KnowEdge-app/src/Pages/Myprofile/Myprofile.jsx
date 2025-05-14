import React from 'react';
import './Myprofile.css';
import Navbar from '../../Components/Navbar/Navbar';
import MyProfileHeader from '../../Components/MyProfileHeader/MyProfileHeader';
import ChatBotBanner from '../../Components/BannersMyProfile/ChatBotBanner';
import ChatBot from '../../Components/ChatBot/ChatBot';
import Chatting from '../../Components/Chatting/Chatting';
import WatchLater from '../../Components/WatchLater/WatchLater';
import Courses from '../../Components/Courses/Courses';
import Footer from '../../Components/Footer/Footer';

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
      <Courses/>
      <Footer/>
      <signIn/>
    </div>
  );
};

export default Myprofile;
