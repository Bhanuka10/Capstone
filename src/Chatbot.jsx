import { useContext, useState } from 'react';
import { CategoryContext } from './CategoryContext';
import ReactMarkdown from 'react-markdown';
import callGeminiFlash from './Config/Gemini';

const Chatbot = () => {
  const { setSelectedCategory } = useContext(CategoryContext);
  const [geminiResponse, setGeminiResponse] = useState("");
  const [input, setInput] = useState("");
  // Example video data; in a real app, get this from props/context or fetch
  const [youtubeVideos, setYoutubeVideos] = useState([
    // { title: 'Intro to AI', url: 'https://youtube.com/watch?v=...', duration: '10:00', views: 1000, tags: ['ai', 'beginner'] },
    // ...
  ]);

  const handleUserMessage = async (message) => {
    if (message.toLowerCase().includes("ai")) {
      setSelectedCategory("ai");
    } else if (message.toLowerCase().includes("game")) {
      setSelectedCategory("game");
    } else if (message.toLowerCase().includes("domain")) {
      setSelectedCategory("domain");
    }
    // Call Gemini and update response
    const response = await callGeminiFlash(message, youtubeVideos);
    setGeminiResponse(response);
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === 'Enter') {
            await handleUserMessage(input);
            setInput("");
          }
        }}
      />
      {geminiResponse && <ReactMarkdown children={geminiResponse} />}
    </div>
  );
};

export default Chatbot;
