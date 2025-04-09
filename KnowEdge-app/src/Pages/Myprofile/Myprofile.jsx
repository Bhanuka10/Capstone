import React from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import MyProfileHeader from '../../Components/MyProfileHeader/MyProfileHeader';
import ChatBotBanner from '../../Components/BannersMyProfile/ChatBotBanner';

const Myprofile = () => {
  return (
    <div>
      
      <MyProfileHeader />
      <ChatBotBanner/>
    </div>
  );
};

export default Myprofile;
