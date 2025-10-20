
import { GoogleGenAI } from "@google/genai";

// As per guidelines, the API key is obtained from the environment variable.
// An instance is created directly. Assume process.env.API_KEY is available.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });


export const generateTripItinerary = async (location: string, duration: number): Promise<string> => {
  // Do not check for API key here; it's assumed to be present by the guidelines.
  // The SDK will throw an error if it's missing, which will be caught below.

  const prompt = `Create a suggested travel itinerary for a ${duration}-day trip in Morocco, starting from ${location}. Focus on scenic drives, cultural experiences, and must-see landmarks suitable for someone renting a car. The tone should be exciting and inviting. Format the response as a simple markdown list, with each day as a main point.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    // Accessing response text directly with .text property as per guidelines.
    return response.text;
  } catch (error) {
    console.error("Error generating itinerary with Gemini:", error);
    return "Could not generate an itinerary at this time. Please try again later.";
  }
};
