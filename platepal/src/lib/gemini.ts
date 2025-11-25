import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set in environment variables.");
}

const genAI = new GoogleGenerativeAI(apiKey || "");

// Using gemini-pro for better stability
export const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export async function getRecommendations(history: string[], userRequest: string) {
  if (!apiKey) {
    console.error("API Key missing - cannot get recommendations");
    return [];
  }
  
  const prompt = `
    You are a smart dietary assistant.
    The user has eaten the following in the last 3 days: ${history.length > 0 ? history.join(", ") : "No meals recorded yet"}.
    The user wants: "${userRequest}".
    Based on their history and request, suggest 3 distinct dishes.
    Consider health balance (e.g., if they had heavy carbs, suggest something lighter or balanced).
    Return ONLY a JSON array of objects with keys: "name", "description", "calories" (approx), "reason" (why you picked it).
    Do not include markdown formatting like \`\`\`json. Just the raw JSON.
  `;

  try {
    console.log("Calling Gemini API for recommendations...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini response (recommendations):", text);
    
    // Clean up if model adds markdown
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanText);
    console.log("Parsed recommendations:", parsed);
    return parsed;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    return [];
  }
}

export async function getIngredients(dish: string) {
  if (!apiKey) {
    console.error("API Key missing - cannot get ingredients");
    return [];
  }

  const prompt = `List all the main ingredients needed to make "${dish}".
Return ONLY a JSON array of ingredient names as strings.
Example format: ["ingredient1", "ingredient2", "ingredient3"]
Do NOT include quantities, just the ingredient names.
Do NOT include any markdown formatting or code blocks.`;

  try {
    console.log(`Calling Gemini API for ingredients of: ${dish}`);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Gemini response (ingredients):", text);
    
    const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(cleanText);
    console.log("Parsed ingredients:", parsed);
    
    if (!Array.isArray(parsed)) {
      console.error("Response is not an array:", parsed);
      return [];
    }
    
    return parsed;
  } catch (error) {
    console.error("Error getting ingredients:", error);
    console.error("Full error details:", JSON.stringify(error, null, 2));
    return [];
  }
}
