import React from 'react'
import './Chatting.css'
import { assets } from '../../assets/assets'
import { useChat } from '../../Context/ChatContext';
import { useNavigate } from 'react-router-dom';

const Chatting = () => {
    const [extended, setExtended] = React.useState(false);
    const { chatHistory } = useChat(); // Use context to access chat history
    const navigate = useNavigate(); // Hook to navigate between routes

    const scrollToChat = (question) => {
        const chatElement = document.getElementById(question);
        if (chatElement) {
            chatElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const navigateToChat = (question) => {
        navigate('/chatbot', { state: { question } }); // Pass the question to ChatBot
    };

    return (
        <div className={`sidebar ${extended ? 'expanded' : 'collapsed'}`}>
            <div className='top'>
                <img className='menu' src={assets.menu_icon} alt="" onClick={() => setExtended(!extended)} />
                <div className='new-chat'>
                    <img src={assets.plus_icon} alt="" />
                    {extended && <p>New Chat</p>}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {chatHistory.map((chat, index) => (
                            <div
                                className="recent-entry"
                                key={index}
                                onClick={() => scrollToChat(chat.userMessage)} // Scroll to the chat
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={assets.message_icon} alt="" />
                                <p>
                                    {chat.userMessage.length > 10
                                        ? `${chat.userMessage.substring(0, 10)}...`
                                        : chat.userMessage}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='bottom'>
                <div className="bottom-item">
                    <img src={assets.question_icon} alt="" />
                    {extended && <p>Help</p>}
                </div>
                <div className="bottom-item">
                    <img src={assets.history_icon} alt="" />
                    {extended && <p>Activity</p>}
                </div>
                <div className="bottom-item">
                    <img src={assets.setting_icon} alt="" />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    )
}

export default Chatting