
import {GoogleGenAI} from "@google/genai";

export const getManagementInsights = async (stats: any) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{
          text: `As an AI Management Assistant for "Eco-Station Hub", analyze these stats: ${JSON.stringify(stats)}. Provide 3 brief, actionable insights for optimization.`
        }]
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error fetching insights:", error);
    return "Unable to generate insights at this time. Please check your connection.";
  }
};

export const generateJavaBackendCode = async () => {
  const prompt = `Generate a complete Java console application for an EV Charging Station Management System named "Eco-Station Hub".
          
          Must include:
          1. JDBC and MySQL connection logic (standard boilerplate).
          2. A Station class with fields: id (String), name (String), location (String), and status (Enum/String).
          3. CRUD operations: Add Station, View All Stations, and Update Status.
          4. The SQL Schema required for the 'stations' table.
          5. A "Sample Output" section showing how the console UI looks when running (the menu and result of operations).

          Format the response with clear Markdown code blocks for the Java source and SQL.`;

  try {
    // Attempt with the high-quality Pro model first for complex code generation
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [{ text: prompt }]
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating Java code with Pro model, attempting fallback...", error);
    
    // Fallback to Flash model if Pro is experiencing internal 500/RPC errors
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: {
          parts: [{ text: prompt }]
        }
      });
      return "### [Eco-Station Hub] Backend Logic (Flash Fallback)\n\n" + fallbackResponse.text;
    } catch (fallbackError) {
      console.error("Critical API error:", fallbackError);
      return "The AI service is currently experiencing technical difficulties (RPC Error 500). This is usually temporary. Please try again in a few minutes.";
    }
  }
};
