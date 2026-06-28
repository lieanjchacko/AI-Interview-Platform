const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateQuestions = async (
  jobRole,
  experience,
  techStack,
  numberOfQuestions
) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });

  const prompt = `
Generate ${numberOfQuestions} technical interview questions.

Job Role: ${jobRole}
Experience: ${experience}
Tech Stack: ${techStack.join(", ")}

Return only the questions as a numbered list.
`;
  console.log("Using Gemini model...");
  const result = await model.generateContent(prompt);

  return result.response.text();
};

module.exports = generateQuestions;