const express = require('express');
const router = express.Router();

router.post('/ai-chat', async (req, res) => {
  const { message } = req.body;
  try {
    const fetch = (await import('node-fetch')).default;

    // Choose a Hugging Face model (you can change this to any supported chat model)
    const HF_MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1";
    const hfRes = await fetch(`https://api-inference.huggingface.co/models/${HF_MODEL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: message
      })
    });
    const data = await hfRes.json();
    // The response format may vary by model. For most, it's an array with a 'generated_text' field.
    let reply = "Sorry, I couldn't understand that.";
    if (Array.isArray(data) && data[0]?.generated_text) {
      reply = data[0].generated_text;
    } else if (data.generated_text) {
      reply = data.generated_text;
    } else if (data.error) {
      reply = "AI service error: " + data.error;
    }
    res.json({ reply });
  } catch (err) {
    console.error("AI chat error:", err);
    res.status(500).json({ reply: "AI service error." });
  }
});

module.exports = router;