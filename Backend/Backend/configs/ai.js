// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.OPENAI_API_KEY);

// export const geminiModel = genAI.getGenerativeModel({
//   model: process.env.OPENAI_MODEL,
// });
import axios from "axios";

const OLLAMA_URL = "http://localhost:11434/api/generate";

export const geminiModel = {
  generateContent: async (prompt) => {
    try {

      const response = await axios.post(OLLAMA_URL, {
        model: "qwen2.5:7b",
        prompt: prompt,
        stream: false
      });

      return {
        response: {
          text: () => response.data.response
        }
      };

    } catch (error) {
      console.error("AI Error:", error.message);
      throw new Error("AI generation failed");
    }
  }
};








