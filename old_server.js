 // Simple backend using Express.js
const express = require("express");
const app = express();
const port = 3000;

// This lets your backend serve frontend files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Example API route (for your to-do app later)
app.get("/api/message", (req, res) => {
  res.json({ message: "Backend is working fine!" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
