import React from 'react'
import './Chatting.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'
const Chatting = () => {
    const [messages, setMessages] = React.useState([
        {
        message: "Hello, I'm here to help you with your learning journey!",
        sentTime: "just now",
        sender: "ChatGPT",
        direction: "incoming"
        }
    ]);
    const handlesend = async (message) => {
        const newMessage = {
            message: message,
            sentTime: "just now",
            sender: "user",
            direction: "outgoing"
        }
        const newMessages = [...messages, newMessage]
        setMessages(newMessages);
    }
    return (
        <div>
            <div className='chatting-container'>
                <MainContainer>
                    <ChatContainer>
                        <MessageList> 
                            {messages.map((message, i) => <Message key={i} model={message} />)}

                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handlesend}>
                        </MessageInput>
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
}

export default Chatting