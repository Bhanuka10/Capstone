import React, { useEffect } from 'react';
import './Myprofile.css';
import Navbar from '../../Components/Navbar/Navbar';
import MyProfileHeader from '../../Components/MyProfileHeader/MyProfileHeader';
import ChatBotBanner from '../../Components/BannersMyProfile/ChatBotBanner';
import ChatBot from '../../Components/ChatBot/ChatBot';
import Chatting from '../../Components/Chatting/Chatting';
import WatchLater from '../../Components/WatchLater/WatchLater';
import Courses from '../../Components/Courses/Courses';
import Footer from '../../Components/Footer/Footer';
import Roadmap from '../../Components/Roadmap/Roadmap';

const Myprofile = () => {
  useEffect(() => {
    const headerElement = document.querySelector('.profile-container');
    if (headerElement) {
      headerElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div>
      <Navbar />
      
      <MyProfileHeader />
      <ChatBotBanner />
      <div className='cha'>
        <Chatting />
      <ChatBot />
      {/* <Roadmap /> */}
      
      
      </div>
      
      <WatchLater />
      <Footer/>
      <signIn/>
    </div>
  );
};

export default Myprofile;
