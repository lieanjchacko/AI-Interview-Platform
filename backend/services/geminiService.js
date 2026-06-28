const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateInterviewQuestions = async (
  role,
  experience,
  techStack,
  numberOfQuestions
) => {
  const prompt = `
Generate ${numberOfQuestions} interview questions.

Role: ${role}
Experience: ${experience}
Tech Stack: ${techStack}

Return ONLY a JSON array.

Example:

[
  {
    "question":"What is React?"
  },
  {
    "question":"Explain JWT."
  }
]
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  // Remove markdown if Gemini wraps the JSON
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

module.exports = {
  generateInterviewQuestions,
};