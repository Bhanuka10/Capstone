import React from 'react';
import './Chatting.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

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

    const handleSend = async (message) => {
        const newMessage = {
            message: message,
            sentTime: "just now",
            sender: "user",
            direction: "outgoing"
        };
        const newMessages = [...messages, newMessage];
        setMessages(newMessages);

        setTyping(true);
        await processMessageToChatGPT(newMessages);
    };

    // Added detailed logging to debug API request and response
    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message };
        });

        const systemMessage = {
            role: "system",
            content: "explain the concepts like a 2 years old child"
        };

        const apiRequestBody = {
            model: "gpt-3.5-turbo",
            messages: [
                systemMessage,
                ...apiMessages
            ]
        };

        console.log("API Request Body:", JSON.stringify(apiRequestBody, null, 2)); // Log the request body

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Use environment variable for API key
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            });

            console.log("API Response Status:", response.status); // Log the response status

            if (!response.ok) {
                const errorText = await response.text(); // Capture error response text
                console.error("API Error Response:", errorText);
                throw new Error(`API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log("API Response Data:", JSON.stringify(data, null, 2)); // Log the response data

            setMessages([
                ...chatMessages,
                {
                    message: data.choices[0].message.content,
                    sender: "ChatGPT"
                }
            ]);
            setTyping(false);
        } catch (error) {
            console.error("Error communicating with ChatGPT API:", error);
            setTyping(false);
        }
    }

    return (
        <div>
            <div className='chatting-container'>
                <MainContainer>
                    <ChatContainer>
                        <MessageList typingIndicator={typing ? <TypingIndicator content="ChatGPT is typing..." /> : null}>
                            {messages.map((message, i) => (
                                <Message key={i} model={message} />
                            ))}
                        </MessageList>
                        <MessageInput placeholder="Type message here" onSend={handleSend} />
                    </ChatContainer>
                </MainContainer>
            </div>
        </div>
    );
};

export default Chatting;
