const express = require('express');
const router = express.Router();

router.post('/ai-chat', async (req, res) => {
  const { message } = req.body;
  try {
    // Dynamically import node-fetch for ESM compatibility
    const fetch = (await import('node-fetch')).default;

    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });
    const data = await openaiRes.json();
    console.log("OpenAI API response:", data); // For debugging
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't understand that.";
    res.json({ reply });
  } catch (err) {
    console.error("AI chat error:", err);
    res.status(500).json({ reply: "AI service error." });
  }
});

module.exports = router;