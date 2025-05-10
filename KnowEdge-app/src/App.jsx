import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from "./Components/AdminPannel/dashboard";
import AddCourse from "./Components/AdminAddCourses/AddCourse";
import User from "./Components/AdminUser/User"
import Feedback from "./Components/AdminFeedBack/Feedback"
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Myprofile from './Pages/Myprofile/Myprofile';
import WatchLater from './Components/WatchLater/WatchLater';

const App = () => {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Myprofile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/user-details" element={<User />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path='/watchlater' element={<WatchLater/>}/>
      </Routes>
    </div>
  );
};

export default App;
