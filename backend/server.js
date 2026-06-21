require("dotenv").config();
const express = require("express");

const connectDB = require("./config/db");

const app = express();

app.use(express.json());

// Connect Database
connectDB();

// Import Routes
const userRoutes = require("./routes/userRoutes");
const interviewRoutes = require("./routes/interviewRoutes");
// Home Route
app.get("/", (req, res) => {
  res.send("Server running successfully");
});

// User Routes
app.use("/api/users", userRoutes);
// Interview Routes
app.use("/api/interviews", interviewRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});