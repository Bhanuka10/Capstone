// main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WatchLater from './Components/WatchLater/WatchLater';

import App from './App';
import Myprofile from './Pages/Myprofile/Myprofile';
import Dashboard from "@/Components/AdminPannel/dashboard.jsx";
import AddCourse from "@/Components/AdminAddCourses/AddCourse.jsx";
import User from "@/Components/AdminUser/User.jsx";
import Feedback from "@/Components/AdminFeedBack/Feedback.jsx";
import ContextProvider from './Context/Context';
import { ChatProvider } from './Context/ChatContext';

const router = createBrowserRouter(
  [
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
    {
      path: "/watchlater",
      element: <WatchLater />,
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatProvider> {/* Wrap the application with ChatProvider */}
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </ChatProvider>
  </React.StrictMode>
);
