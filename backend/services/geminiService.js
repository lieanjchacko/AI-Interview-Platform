const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateQuestions = async (
  jobRole,
  experience,
  techStack,
  numberOfQuestions
) => {
  try {
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

    console.log("Using Gemini AI...");

    const result = await model.generateContent(prompt);

    return result.response.text();

  } catch (error) {

    console.log("Gemini unavailable. Using mock interview questions.");

    const mockQuestions = [
      "1. What is React and why is it used?",
      "2. Explain the Virtual DOM.",
      "3. What is Node.js?",
      "4. Difference between SQL and MongoDB.",
      "5. What is JWT Authentication?",
      "6. Explain Express middleware.",
      "7. What are React Hooks?",
      "8. Explain async/await in JavaScript.",
      "9. What is REST API?",
      "10. Difference between authentication and authorization."
    ];

    return mockQuestions
      .slice(0, numberOfQuestions)
      .join("\n");
  }
};

module.exports = generateQuestions;