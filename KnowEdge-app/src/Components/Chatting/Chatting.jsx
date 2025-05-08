import React from 'react'
import './Chatting.css'
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react'
// const openai = new OpenAI({
//     apiKey: import.meta.env.VITE_OPENAI_API_KEY,
//   });
const api_Key=""
  
const Chatting = () => {
    const [typing, setTyping] = React.useState(false);
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

        setTyping(true);
        await processMessageToChatGPT(newMessages);
    }
    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role ="";
            if (messageObject.sender === "Chatgpt") {
                role = "assistant"
            }else {
                role = "user"
            }
            return {role: role, content: messageObject.message}

    });
    const apiRequestBody = {
        model: "gpt-3.5-turbo",
        "messages" : [
            ...apiMessages
        ]
    }
    await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer" +API_Key,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(apiRequestBody)

            
        })
    }
    return (
        <div>
            <div className='chatting-container'>
                <MainContainer>
                    <ChatContainer>
                        <MessageList 
                            typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing" /> : null}
                            >
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

