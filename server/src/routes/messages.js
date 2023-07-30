const router = require("express").Router();
const openai = require("../config");

router.get("/", async (req, res) => {
  try {
    const chatCompletion = await openai.createChatCompletion({
      model: process.env.OPENAI_MODEL,
      messages: [{ role: "user", content: "Hello world" }],
    });
    res.json(chatCompletion.data.choices[0].message);
  } catch (error) {
    res.status(429).json(error);
  }
});

module.exports = router;
