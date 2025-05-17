// src/Config/Gemini.js

import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

async function callGeminiFlash(promptText) {
  const ai = new GoogleGenAI({ apiKey });

  const config = {
    responseMimeType: "text/plain",
  };

  const model = "gemini-2.0-flash";

  const promptWithInstruction = `${promptText}

Please format the response in clear point form using markdown style with headings (###), bullet points (*), and bold text (**).`;

  const contents = [
    {
      role: "user",
      parts: [{ text: promptWithInstruction }],
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

    return result.trim();
  } catch (error) {
    console.error("Gemini API error:", error);
    return "Something went wrong.";
  }
}

export default callGeminiFlash;
