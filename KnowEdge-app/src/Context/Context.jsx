import React, { useState } from "react";
import callGeminiFlash from "../Config/Gemini";

const GeminiChat = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const reply = await callGeminiFlash(input);
    setResponse(reply);
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Send</button>
      <p>{response}</p>
    </div>
  );
};

export default GeminiChat;
