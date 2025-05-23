import { SUMMARY_PROMPT } from "@/utils/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Make sure the API key is available
if (!process.env.GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is not defined in environment variables");
  throw new Error("Missing Gemini API key");
}

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export default async function geminisummary(pdftext: string) {
  try {
    // For very large texts, you may need to truncate
    const maxInputLength = 30000; // Gemini model has input limitations
    const truncatedText = pdftext.length > maxInputLength 
      ? pdftext.substring(0, maxInputLength) + "... (content truncated)"
      : pdftext;
      
    // Get the model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro-002' ,
        generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 1500, // Adjust as needed
            topP: 0.8,
            topK: 40,
            },
    });
    
    // Create the prompt with the summary instruction and PDF text
    const prompt = `${SUMMARY_PROMPT}\n\nText to summarize:\n${truncatedText}`;
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response =  result.response;
    const responseText =await response.text();
    
    console.log("Summary generated successfully");
    return responseText;

    
  } catch (error: any) {
    console.error("Error details:", error);
    
    if (error?.statusCode === 429) {
      console.error("Rate limit exceeded. Please try again later.");
      return { error: "Rate limit exceeded" };
    }
    
    return { error: String(error.message || "Unknown error in Gemini API call") };
  }
}