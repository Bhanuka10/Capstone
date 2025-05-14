// src/Config/Gemini.js

import { GoogleGenAI } from "@google/genai";

// Load API key from Vite environment variable
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

// Main function to call Gemini 2.0 Flash
async function callGeminiFlash(promptText) {
  const ai = new GoogleGenAI({ apiKey });

  const config = {
    responseMimeType: "text/plain",
  };

  const model = "gemini-2.0-flash";

  const contents = [
    {
      role: "user",
      parts: [{ text: promptText }],
    },
  ];

  try {
    const response = await ai.models.generateContentStream({
      model,
      config,
      contents,
    });

    let result = "";
    for await (const chunk of response) {
      result += chunk.text;
    }

    // Return the response in one-phase mode
    return result.trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Something went wrong.";
  }
}

export default callGeminiFlash;
