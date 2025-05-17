// main.jsx or index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ContextProvider from './Context/Context';
import { ChatProvider } from './Context/ChatContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </ChatProvider>
  </React.StrictMode>
);
