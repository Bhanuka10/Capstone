import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);