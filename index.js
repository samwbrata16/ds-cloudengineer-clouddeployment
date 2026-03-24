const express = require("express");
const path = require("path");
const loremIpsum = require("lorem-ipsum").loremIpsum;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API endpoint for AJAX
app.post("/api/generate", (req, res) => {
  const { paragraphs = 3 } = req.body;
  const text = loremIpsum({
    count: parseInt(paragraphs),
    units: "paragraphs",
    format: "plain"
  });
  res.json({ text });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
