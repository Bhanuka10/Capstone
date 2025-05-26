import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/Home/Home"; // Assuming Home component exists
import Myprofile from "../Pages/Myprofile/Myprofile"; // Assuming Myprofile component exists
import ChatBot from "../Components/ChatBot/ChatBot";
import Dashboard from "@/Components/AdminPannel/dashboard.jsx";
import AddCourse from "@/Components/AdminAddCourses/AddCourse.jsx";
import User from "@/Components/AdminUser/User.jsx";
import Feedback from "@/Components/AdminFeedBack/Feedback.jsx";
import WatchLater from "@/Components/WatchLater/WatchLater.jsx";
import Register from "@/Pages/Register/Register.jsx";
import RegisterForm from "../Pages/Register-Subform/RegisterForm";
import SignIn from "@/Pages/SignIn/SignIn.jsx";
import Content from "../Pages/Content/Content";

const router = createBrowserRouter([


    //Uncomment this to run sign in page
  {
    path: "/",
    element: <Register />,
  },

  {
    path: "/signin",
    element: <SignIn />
  },

  {
    path: "/registerForm",
    element: <RegisterForm />
  },
  
  // //Uncomment this to run Home page
  {
    path: "/home",
    element: <Home />, // Home page
  },
  {
    path: "/contact",
    element: <Myprofile />, // Myprofile page
  },
  {
    path: "/chatbot",
    element: <ChatBot />, // ChatBot page
  },
  {
    path: "/content",
    element: <Content />, // Content page
  },



// Uncomment this to run Admin panel
  {
    path: "/dashboard",
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

const ContextProvider = ({ children }) => {
  return (
    <RouterProvider router={router}>
      {children}
    </RouterProvider>
  );
};

export default ContextProvider;
