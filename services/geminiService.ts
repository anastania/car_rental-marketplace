
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd handle this more gracefully.
  // For this context, we'll proceed but Gemini calls will fail.
  console.warn("Gemini API key not found. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateTripItinerary = async (location: string, duration: number): Promise<string> => {
  if (!API_KEY) {
    return "AI-powered itinerary suggestion is currently unavailable. Please check your API key setup.";
  }

  const prompt = `Create a suggested travel itinerary for a ${duration}-day trip in Morocco, starting from ${location}. Focus on scenic drives, cultural experiences, and must-see landmarks suitable for someone renting a car. The tone should be exciting and inviting. Format the response as a simple markdown list, with each day as a main point.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ parts: [{ text: prompt }] }],
    });
    return response.text;
  } catch (error) {
    console.error("Error generating itinerary with Gemini:", error);
    return "Could not generate an itinerary at this time. Please try again later.";
  }
};
