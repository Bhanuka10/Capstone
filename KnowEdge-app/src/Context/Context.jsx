import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../Pages/Home/Home"; // Assuming Home component exists
import Myprofile from "../Pages/Myprofile/Myprofile"; // Assuming Myprofile component exists
import ChatBot from "../Components/ChatBot/ChatBot"; // ChatBot component

const router = createBrowserRouter([
  {
    path: "/",
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
]);

const ContextProvider = ({ children }) => {
  return (
    <RouterProvider router={router}>
      {children}
    </RouterProvider>
  );
};

export default ContextProvider;
