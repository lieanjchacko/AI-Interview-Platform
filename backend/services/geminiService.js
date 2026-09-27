const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// ==========================================
// GENERATE INTERVIEW QUESTIONS
// ==========================================

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
    "question": "What is React?"
  },
  {
    "question": "Explain JWT."
  }
]
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

// ==========================================
// EVALUATE INTERVIEW ANSWERS
// ==========================================

const evaluateInterviewAnswers = async (
  jobRole,
  experience,
  techStack,
  questions
) => {
  const formattedQuestions = questions
    .map(
      (item, index) => `
Question ${index + 1}:
${item.question}

Candidate Answer:
${item.answer || "No answer provided"}
`
    )
    .join("\n");

  const prompt = `
You are an AI technical interview evaluator.

Evaluate the candidate's answers based on:

- Technical correctness
- Understanding of the concept
- Relevance to the question
- Clarity
- Completeness

Interview Details:

Job Role: ${jobRole}
Experience Level: ${experience}
Tech Stack: ${techStack.join(", ")}

${formattedQuestions}

Give every question a score from 0 to 10.

Also provide concise and useful feedback for every answer.

Return ONLY valid JSON.

Required format:

{
  "results": [
    {
      "questionNumber": 1,
      "score": 8,
      "feedback": "Good explanation of the concept. Mentioning X would make the answer stronger."
    }
  ],
  "totalScore": 8,
  "overallFeedback": "Overall evaluation of the candidate."
}

Rules:

- score must be a number between 0 and 10
- questionNumber must match the question number
- feedback must be specific to the candidate's answer
- do not include Markdown
- return ONLY JSON
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
};

module.exports = {
  generateInterviewQuestions,
  evaluateInterviewAnswers,
};