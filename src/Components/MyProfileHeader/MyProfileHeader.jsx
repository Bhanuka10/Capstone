const handleScrollToChatBot = () => {
    const chatBotElement = document.querySelector('.cha');
    if (chatBotElement) {
        chatBotElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

// Update the button to include the scroll functionality
<button className='chatbot-button' onClick={handleScrollToChatBot}>Use Chatbot</button>