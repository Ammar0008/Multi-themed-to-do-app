const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());

// Homepage route
app.get("/", (req, res) => {
  res.send("Welcome! Your backend is running smoothly 😊");
});

// Test API route
app.get("/api", (req, res) => {
  res.json({ message: "Backend is working perfectly!" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
