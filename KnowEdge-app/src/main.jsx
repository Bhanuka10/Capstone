// main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import WatchLater from './Components/WatchLater/WatchLater';

import App from './App';
import Myprofile from './Pages/Myprofile/Myprofile';
import Dashboard from "@/Components/AdminPannel/dashboard.jsx";
import AddCourse from "@/Components/AdminAddCourses/AddCourse.jsx";
import User from "@/Components/AdminUser/User.jsx";
import Feedback from "@/Components/AdminFeedBack/Feedback.jsx";



const router = createBrowserRouter([
  
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/contact",
    element: <Myprofile />,
  },

  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/add-course",
    element: <AddCourse />,
  },
  {
    path: "/user-details",
    element: <User />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  },


  {path: "/watchlater", 
    element: <WatchLater/>
    },

]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
