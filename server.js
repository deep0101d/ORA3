const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = "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"; // your OpenAI key

app.post("/chat", async (req, res) => {
  try {
    const { question } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful teaching assistant." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("AI proxy is running!");
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
