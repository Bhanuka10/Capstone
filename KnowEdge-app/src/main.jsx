// main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import WatchLater from './Components/WatchLater/WatchLater';

import App from './App';
import Myprofile from './Pages/Myprofile/Myprofile';
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
    path: "/watchlater",
    element: <WatchLater />,
  },
  ],
  
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatProvider> {/* Wrap the application with ChatProvider */}
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </ChatProvider>
  </React.StrictMode>
);
