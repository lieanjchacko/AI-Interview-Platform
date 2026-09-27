# AI Interview Preparation Platform

An AI-powered interview preparation platform built using the MERN stack and Google Gemini API.

The platform allows users to create personalized technical interviews based on their job role, experience level, and technology stack. Gemini AI generates interview questions and evaluates the candidate's answers with scores and feedback.

---

## Features

- User Registration and Login
- JWT-based Authentication
- Secure Password Hashing
- Create Personalized AI Interviews
- AI-generated Interview Questions
- Job Role and Experience-based Questions
- Technology Stack Selection
- Interactive Interview Session
- Answer Submission
- AI-powered Answer Evaluation
- Question-wise Scores
- AI-generated Feedback
- Overall Interview Score
- Interview Result Dashboard
- Interview History
- Delete Interviews
- Responsive User Interface

---

## Technology Stack

### Frontend

- React.js
- React Router
- Axios
- Tailwind CSS
- Framer Motion
- React Icons
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs

### Artificial Intelligence

- Google Gemini API
- Gemini 2.5 Flash

### Development Tools

- Visual Studio Code
- MongoDB
- MongoDB Compass
- Thunder Client
- Git
- GitHub

---

## System Architecture

```text
User
 │
 ▼
React Frontend
 │
 │ Axios / REST API
 ▼
Node.js + Express.js
 │
 ├──────────────► JWT Authentication
 │
 ├──────────────► MongoDB
 │
 └──────────────► Google Gemini API
                       │
                       ▼
                AI Question Generation
                       │
                       ▼
                AI Answer Evaluation
                       │
                       ▼
                 Score + Feedback