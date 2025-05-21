// src/Config/Gemini.js

import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

async function callGeminiFlash(promptText, relatedVideos = []) {
  const ai = new GoogleGenAI({ apiKey });

  const config = {
    responseMimeType: "text/plain",
  };

  const model = "gemini-2.0-flash";

  // Prepare video metadata for Gemini
  const videoMetadata = relatedVideos.map(v => ({
    title: v.title,
    url: v.url,
    duration: v.duration,
    views: v.views,
    tags: v.tags
  }));

  const prompt = `User asked: "${promptText}"

Here is a list of videos. Recommend 1-2 most relevant ones:
${JSON.stringify(videoMetadata, null, 2)}

Please reply with the best recommendations in markdown format (with clickable links, bold titles, and a short reason for each).`;

  const contents = [
    {
      role: "user",
      parts: [{ text: prompt }],
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
