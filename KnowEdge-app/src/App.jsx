import React, {useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from "./Components/AdminPannel/dashboard";
import AddCourse from "./Components/AdminAddCourses/AddCourse";
import User from "./Components/AdminUser/User"
import Feedback from "./Components/AdminFeedBack/Feedback"
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import Myprofile from './Pages/Myprofile/Myprofile';
import WatchLater from './Components/WatchLater/WatchLater';
import Chatbot from "./Components/ChatBot/ChatBot";
import SignIn from "./Pages/SignIn/SignIn.jsx";
import Register from "@/Pages/Register/Register.jsx";
import Roadmap from './Components/Roadmap/Roadmap.jsx';
import Content from './Pages/Content/Content.jsx';


const App = () => {
  const [profile, setProfile] = useState(null);

  const handleProfileUpdate = (data) => {
    setProfile(data);
    // Optional: save to DB here
    console.log("Updated profile:", data);
  };

  return (
    <div className='app'>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/contact" element={<Myprofile />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/user-details" element={<User />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path='/watchlater' element={<WatchLater />} />
          <Route path="/Content" element={<Content />} />
          
          

        </Routes>
      </BrowserRouter>
      <Chatbot onProfileUpdate={handleProfileUpdate} />
      {profile && (
        <pre style={{ padding: "20px" }}>
          🎯 User Goal: {profile.goal}
          {"\n"}📚 Skills: {profile.skills}
          {"\n"}🎓 Education: {profile.education}
          {"\n"}🧩 Struggles: {profile.struggles}
        </pre>
      )}
    </div>
  );
};

export default App;
